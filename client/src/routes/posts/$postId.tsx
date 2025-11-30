import { usePostQuery } from "@/graphql/queries/usePostQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  // In a loader
  // loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data } = usePostQuery({ id: parseInt(postId) });

  if (!data?.post) return <p>No post.</p>;

  return (
    <div>
      <h2>{data.post.title}</h2>
      <p>{data.post.text}</p>
    </div>
  );
}
