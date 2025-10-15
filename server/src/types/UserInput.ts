import { IsEmail, MinLength, Validate } from "class-validator";
import { Field, InputType } from "type-graphql";
import { UsernameSpecialChars } from "../validators/UsernameSpecialChars";

@InputType()
export class UserInput {
  @Field()
  @MinLength(3, {
    message: "Username length should be at least 3 characters.",
  })
  @Validate(UsernameSpecialChars)
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(5, {
    message: "Password length should be at least 5 characters.",
  })
  password!: string;
}
