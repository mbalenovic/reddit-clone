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
        data?.posts.map((post) => (
          <div key={post.id} className="border-solid border-2 mt-2 p-2">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.text}</p>
          </div>
        ))
      )}
    </>
  );
}
