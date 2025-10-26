import { usePostsQuery } from "@/graphql/queries/usePostsQuery";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as PostCreateRoute } from "@/routes/_auth/create-post";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data, loading } = usePostsQuery();

  return (
    <>
      <div className="text-center">Posts</div>
      <Link to={PostCreateRoute.to} className="bg-red-300 p-1 px-3 rounded-sm">
        Create Post
      </Link>
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
