import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { Route as SigninRoute } from "./signin";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: SigninRoute.to,
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => <Outlet />,
});
