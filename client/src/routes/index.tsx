import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Route as PostsRoute } from "@/routes/posts/index";

export const Route = createFileRoute("/")({
  component: () => <Navigate to={PostsRoute.to} />,
});
