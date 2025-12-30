import { FieldError } from "@/gql/graphql";
import { CombinedGraphQLErrors } from "@apollo/client";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { Route as IndexRoute } from "./posts/index";
import { Route as PasswordRecoveryRoute } from "./password-recovery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: IndexRoute.to });
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
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or email</Label>
              <Input
                type="text"
                name="username"
                placeholder="username or email"
                id="username"
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
              <div className="flex justify-end">
                <Link to={PasswordRecoveryRoute.to} className="text-xs text-muted-foreground hover:text-primary">
                  Forgot password?
                </Link>
              </div>
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
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
