import argon2 from "argon2";
import { RedisStore } from "connect-redis";
import { DataSource } from "typeorm";
import { PASSWORD_RECOVERY } from "../constants";
import { User } from "../entities/user.entity";
import { UserInput } from "../types/UserInput";
import { UserResponse } from "../types/UserResponse";
import { sendEmail } from "../utils/sendEmail";

export class UserService {
  constructor(private AppDataSource: DataSource) {}

  private get repo() {
    return this.AppDataSource.getRepository(User);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findByEmailOrUsername(usernameOrEmail: string) {
    return this.repo.findOneBy(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );
  }

  async verifyPassword(user: User, password: string) {
    return argon2.verify(user.password, password);
  }

  async createUser(user: UserInput): Promise<UserResponse> {
    try {
      const hashedPassword = await argon2.hash(user.password);
      user.password = hashedPassword;
    } catch (error) {
      return {
        errors: [{ field: "password", message: "Could not hash password." }],
      };
    }

    try {
      const typeUser = new User();

      const newUser = await this.repo.save({ ...typeUser, ...user });

      return { user: newUser };
    } catch (error) {
      console.log("----", error);
      if (error instanceof Error && "code" in error && error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "The user already exists.",
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: "username",
              message: "Unexpteced error during user creation.",
            },
          ],
        };
      }
    }
  }

  async updatePassword(user: User, password: string) {
    try {
      const hashedPassword = await argon2.hash(password);
      user.password = hashedPassword;
      const updatedUser = await this.repo.save(user);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordRecovery(
    email: string,
    userId: number,
    redisStore: RedisStore
  ) {
    const token = crypto.randomUUID();

    await redisStore.client.set(PASSWORD_RECOVERY + token, userId, {
      expiration: { type: "EX", value: 1000 * 60 * 60 * 24 },
    });

    const href = `http://localhost:3000/update-password?recoveryToken=${token}`;

    await sendEmail(
      email,
      "Password reset",
      `<p>Reset password: <a href="${href}" target="_blank">click</a></p>`
    );
  }
}
