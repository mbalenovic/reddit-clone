import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useState } from "react";
import { FieldError } from "@/gql/graphql";
import { Route as IndexRoute } from "./posts/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: IndexRoute.to });
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
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="username"
                id="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                id="password"
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
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
