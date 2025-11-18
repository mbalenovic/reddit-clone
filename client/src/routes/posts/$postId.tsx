import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  // In a loader
  // loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  return <div>Post ID: {postId}</div>;
}
