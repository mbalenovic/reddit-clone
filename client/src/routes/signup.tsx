import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

import { CombinedGraphQLErrors } from "@apollo/client";
import { useRegisterMutation } from "@/graphql/mutations/useRegisterMutation";
import { useState } from "react";
import { FieldError } from "@/gql/graphql";
import { Route as IndexRoute } from "./_auth.index";

function RouteComponent() {
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [signup, { data, loading }] = useRegisterMutation();
  const navigate = useNavigate({ from: "/signup" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userInput = { username, password };

    try {
      const response = await signup({ variables: { userInput } });

      if (response.data?.register.errors) {
        setErrors(response.data?.register.errors);
      } else {
        navigate({ to: IndexRoute.to });
      }
    } catch (error) {
      // TODO: validation error
      if (CombinedGraphQLErrors.is(error)) {
        console.log(data, error?.errors[0]);
      }
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
            Password:
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
            disabled={loading}
            value="Register"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
