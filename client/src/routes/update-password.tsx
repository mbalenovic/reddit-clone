import { FieldError } from "@/gql/graphql";
import { usePasswordUpdateMutation } from "@/graphql/mutations/usePasswordUpdateMutation";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { Route as SigninRoute } from "./signin";

export const Route = createFileRoute("/update-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const search: { recoveryToken?: string } = useSearch({
    from: "/update-password",
  });

  const navigate = useNavigate({ from: "/update-password" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [updatePassword] = usePasswordUpdateMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search.recoveryToken) {
      return setErrors([
        { field: "password", message: "Follow the link from the email." },
      ]);
    }

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      return setErrors([
        { field: "password", message: "Passwords don't match." },
      ]);
    }

    try {
      setIsLoading(true);
      const response = await updatePassword({
        variables: { password, recoveryToken: search.recoveryToken },
      });

      if (!response.data?.updatePassword) {
        setErrors([{ field: "password", message: "Password update failed." }]);
      } else {
        navigate({ to: SigninRoute.to });
      }
    } catch (error) {
      setErrors([{ field: "password", message: "Password update failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen ">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="block">
            Password{" "}
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
          <label htmlFor="confirm-password" className="block">
            Confirm password{" "}
          </label>
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            id="confirm-password"
            required
            className="bg-white rounded-sm p-2"
          />
        </div>
        <div className="mt-2">
          {errors.map((error) => (
            <span
              className="text-red-400"
              aria-live="polite"
              key={Math.random()}
            >
              {error.message}
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <input
            type="submit"
            disabled={isLoading}
            value="Update"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
