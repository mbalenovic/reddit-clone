import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useState } from "react";
import { FieldError } from "@/gql/graphql";
import { Route as IndexRoute } from "./_auth/index";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const navigate = useNavigate({ from: "/signup" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);
      const response = await auth.register(username, password, email);

      if (response.data?.register.errors) {
        setErrors(response.data?.register.errors);
      } else {
        navigate({ to: IndexRoute.to });
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
            Username
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
          <label htmlFor="username" className="block">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="email"
            id="email"
            required
            className="bg-white rounded-sm p-2"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="block">
            Password
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
            value="Register"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
