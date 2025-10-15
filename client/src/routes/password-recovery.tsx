import { FieldError } from "@/gql/graphql";
import { usePasswordRecoveryMutation } from "@/graphql/mutations/usePasswordRecoveryMutation";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/password-recovery")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [passwordRecovery] = usePasswordRecoveryMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      setIsLoading(true);
      const response = await passwordRecovery({ variables: { email } });

      if (!response.data?.passwordRecovery) {
        return setErrors([{ field: "email", message: "Email doesn't exist." }]);
      }

      setIsComplete(true);
    } catch (error) {
      setErrors([{ field: "email", message: "Error while reseting email." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen ">
      {isComplete ? (
        <p>We sent you the reset email.</p>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block">
              Email{" "}
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
              value="Recover"
              className="bg-red-300 p-1 px-3 rounded-sm"
            />
          </div>
        </form>
      )}
    </div>
  );
}
