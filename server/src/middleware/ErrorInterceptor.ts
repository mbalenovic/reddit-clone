import { MiddlewareFn } from "type-graphql";
import { AppError } from "../errors/AppError";

export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof Error) {
      // TODO: add a cleaner check
      if (err.message === "User is unauthenticated.") {
        throw err;
      }
    }
    // Handle known app errors
    if (err instanceof AppError) {
      return {
        errors: [{ field: err.field, message: err.message }],
      };
    }

    // TODO: Handle database constraint errors, etc.
    // for now, hardcoded for existing user registration
    if (err instanceof Error && "code" in err && err.code === "23505") {
      return {
        errors: [{ field: "username", message: "User already exists" }],
      };
    }

    // Log and return fallback
    console.error("Unhandled Error:", err);
    return {
      errors: [{ field: "unknown", message: "Unexpected server error" }],
    };
  }
};
