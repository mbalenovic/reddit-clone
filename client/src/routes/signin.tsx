import { FieldError } from "@/gql/graphql";
import { CombinedGraphQLErrors } from "@apollo/client";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Route as IndexRoute } from "./_auth/index";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const [errors, setErrors] = useState<FieldError[]>([]);
  const navigate = useNavigate({ from: "/signin" });
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = Route.useRouteContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);
      const response = await auth.login(username, password);

      if (response.data?.login.errors) {
        setErrors(response.data.login.errors);
      } else {
        if (response.data?.login.user) {
          navigate({ to: IndexRoute.to });
        }
      }
    } catch (error) {
      // TODO: validation error
      if (CombinedGraphQLErrors.is(error)) {
        console.log(error?.errors[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen ">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block">
            Username:{" "}
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            required
            className="bg-white rounded-sm p-2"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="block">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            required
            className="bg-white rounded-sm p-2"
          />
        </div>
        <div className="mt-2">
          {errors.map((error) => (
            <span className="text-red-400" aria-live="polite">
              {error.message}
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <input
            type="submit"
            disabled={isLoading}
            value="Sign In"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
