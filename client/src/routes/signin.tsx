import { FieldError } from "@/gql/graphql";
import { useLoginMutation } from "@/graphql/mutations/useLoginMutation";
import { CombinedGraphQLErrors } from "@apollo/client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [login, { data, loading }] = useLoginMutation();
  const navigate = useNavigate({ from: "/signin" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login({
        variables: { userInput: { username, password } },
      });

      console.log(response.data?.login.errors);

      if (response.data?.login.errors) {
        setErrors(response.data.login.errors);
      } else {
        navigate({ to: "/" });
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
            disabled={loading}
            value="Sign In"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
