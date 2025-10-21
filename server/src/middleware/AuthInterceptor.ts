import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/context.type";

export const AuthInterceptor: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  if (!context.req.session.userId) {
    throw new Error("User is unauthenticated.");
  }

  return next();
};
