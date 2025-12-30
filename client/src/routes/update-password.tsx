import { FieldError } from "@/gql/graphql";
import { usePasswordUpdateMutation } from "@/graphql/mutations/usePasswordUpdateMutation";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { Route as SigninRoute } from "./signin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

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
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter new password"
                id="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                name="confirm-password"
                placeholder="Confirm new password"
                id="confirm-password"
                required
              />
            </div>
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.map((error, index) => (
                    <div key={index}>{error.message}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
