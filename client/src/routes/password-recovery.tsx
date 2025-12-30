import { FieldError } from "@/gql/graphql";
import { usePasswordRecoveryMutation } from "@/graphql/mutations/usePasswordRecoveryMutation";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

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
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Recovery</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isComplete ? (
            <Alert>
              <AlertDescription>
                We sent you the reset email. Please check your inbox.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  id="email"
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
                {isLoading ? "Sending..." : "Send Recovery Email"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
