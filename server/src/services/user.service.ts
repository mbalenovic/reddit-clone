import argon2 from "argon2";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { UserInput } from "../types/UserInput";
import { UserResponse } from "../types/UserResponse";

export class UserService {
  constructor(private AppDataSource: DataSource) {}

  private get repo() {
    return this.AppDataSource.getRepository(User);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
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
}
