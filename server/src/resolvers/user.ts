import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PASSWORD_RECOVERY } from "../constants";
import { User } from "../entities/user.entity";
import AppDataSource from "../typeorm.config";
import { type Context } from "../types/context.type";
import { UserInput } from "../types/UserInput";
import { UserInputLogin } from "../types/UserInputLogin";
import { UserResponse } from "../types/UserResponse";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.userId) return null;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: req.session.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userInput", () => UserInput) userInput: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const userRepo = AppDataSource.getRepository(User);

    try {
      const hashedPassword = await argon2.hash(userInput.password);
      userInput.password = hashedPassword;
    } catch (error) {
      return {
        errors: [{ field: "password", message: "Could not hash password." }],
      };
    }

    let user;

    try {
      const newUser = new User();
      user = await userRepo.save({
        ...newUser,
        ...userInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "The user already exists.",
            },
          ],
        };
      }
    }

    if (!user) {
      return {
        errors: [{ field: "username", message: "Registration failed." }],
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async passwordRecovery(
    @Arg("email") email: string,
    @Ctx() { redisStore }: Context
  ): Promise<Boolean> {
    if (!email.includes("@")) {
      // return error
    }

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ email });

      if (!user) {
        return false;
      }
      const token = crypto.randomUUID();

      redisStore.client.set(PASSWORD_RECOVERY + token, user.id, {
        expiration: { type: "EX", value: 1000 * 60 * 60 * 24 },
      });

      const href = `http://localhost:3000/update-password?recoveryToken=${token}`;

      await sendEmail(
        email,
        "Password reset",
        `<p>Reset password: <a href="${href}" target="_blank">click</a></p>`
      );

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Arg("recoveryToken") recoveryToken: string,
    @Arg("password") password: string,
    @Ctx() { redisStore }: Context
  ): Promise<Boolean> {
    if (password.length < 5) {
      // return error
    }

    const userRepo = AppDataSource.getRepository(User);

    try {
      const userId = await redisStore.client.get(
        PASSWORD_RECOVERY + recoveryToken
      );

      if (!userId) {
        return false;
      }

      const user = await userRepo.findOneBy({ id: parseInt(userId, 10) });

      if (!user) {
        return false;
      }

      const hashedPassword = await argon2.hash(password);

      user.password = hashedPassword;
      await userRepo.save(user);

      await redisStore.client.del(PASSWORD_RECOVERY + recoveryToken);

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("userInputLogin") userInputLogin: UserInputLogin,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const { usernameOrEmail, password } = userInputLogin;

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );

    if (!user) {
      return {
        errors: [{ field: "username", message: "That user doesn't exist." }],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Username or password doesn't match.",
          },
        ],
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context) {
    res.clearCookie("qid");

    return new Promise((res) =>
      req.session.destroy((err) => {
        if (err) {
          res(false);
          return;
        }

        res(true);
      })
    );
  }
}
