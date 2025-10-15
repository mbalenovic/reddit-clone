import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInputLogin {
  @Field()
  // TODO: add separate validation for email and username
  usernameOrEmail!: string;

  @Field()
  @MinLength(5, {
    message: "Password length should be at least 5 characters.",
  })
  password!: string;
}
