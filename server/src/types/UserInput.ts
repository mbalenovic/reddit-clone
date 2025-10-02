import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  @MinLength(3, {
    message: "Username length should be at least 3 characters.",
  })
  username!: string;

  @Field()
  @MinLength(5, {
    message: "Password length should be at least 5 characters.",
  })
  password!: string;
}
