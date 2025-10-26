import { User } from "../../entities/user.entity";

export function isUser(user: unknown): user is User {
  return (
    typeof user === "object" && user != null && "id" in user && "email" in user
  );
}
