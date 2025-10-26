import argon2 from "argon2";
import { RedisStore } from "connect-redis";
import { DataSource } from "typeorm";
import { PASSWORD_RECOVERY } from "../constants";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { UserInput } from "../types/UserInput";
import { sendEmail } from "../utils/sendEmail";
import { BaseService } from "./base.service";

export class UserService extends BaseService<User> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, User);
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

  async createUser(user: UserInput): Promise<User> {
    try {
      const hashedPassword = await argon2.hash(user.password);
      user.password = hashedPassword;
    } catch (error) {
      throw new AppError("password", "Could not hash password.");
    }

    const typeUser = new User();

    const newUser = await this.repo.save({ ...typeUser, ...user });

    return newUser;
  }

  async updatePassword(user: User, password: string) {
    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    return this.repo.save(user);
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
