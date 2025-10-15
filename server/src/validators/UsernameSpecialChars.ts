import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "username", async: false })
export class UsernameSpecialChars implements ValidatorConstraintInterface {
  validate(text: string) {
    return !text.includes("@");
  }

  defaultMessage(args: ValidationArguments) {
    return "Username must not contain @.";
  }
}
