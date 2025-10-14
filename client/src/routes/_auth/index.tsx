import { usePostsQuery } from "@/graphql/queries/usePostsQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: App,
});

function App() {
  const { data, loading } = usePostsQuery();

  return (
    <>
      <div className="text-center">index</div>
      {loading ? (
        <p>loading...</p>
      ) : (
        data?.posts.map((post) => <p key={post.id}>{post.title}</p>)
      )}
    </>
  );
}
