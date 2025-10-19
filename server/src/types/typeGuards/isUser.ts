import { User } from "../../entities/user.entity";

export function isUser(user: unknown): user is User {
  return user instanceof User;
}
