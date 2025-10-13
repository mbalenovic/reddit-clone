import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { type Context } from "../types/context.type";
import { User } from "../entities/user.entity";
import argon2 from "argon2";
import { UserResponse } from "../types/UserResponse";
import { UserInput } from "../types/UserInput";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: Context): Promise<User | null> {
    if (!req.session.userId) return null;

    const user = await em.findOne(User, { id: req.session.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userInput", () => UserInput) userInput: UserInput,
    @Ctx() { em, req }: Context
  ): Promise<UserResponse> {
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
      const createUserQuery = em
        .createQueryBuilder(User)
        .insert({ ...userInput, createdAt: new Date(), updatedAt: new Date() })
        .returning("*");
      user = await createUserQuery.execute("get");
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

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("userInput", () => UserInput) userInput: UserInput,
    @Ctx() { em, req }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: userInput.username,
    });

    if (!user) {
      return {
        errors: [
          { field: "username", message: "That username doesn't exist." },
        ],
      };
    }

    const valid = await argon2.verify(user.password, userInput.password);

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
