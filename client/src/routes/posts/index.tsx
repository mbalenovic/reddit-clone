import PostList from "@/routes/(index)/components/post-list";
import { Button } from "@/components/ui/button";
import { usePostsQuery } from "@/graphql/queries/usePostsQuery";
import { Route as PostCreateRoute } from "@/routes/_auth/create-post";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: App,
});

function App() {
  const { data, loading, fetchMore } = usePostsQuery({ first: 10 });
  const loadMore = () => {
    if (!data?.posts.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: data?.posts.pageInfo.endCursor,
        first: 10,
      },
    });
  };

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className="flex">
        <Button asChild className="ml-auto">
          <Link to={PostCreateRoute.to}>Create Post</Link>
        </Button>
      </div>
      <PostList edges={data?.posts.edges ?? []} />
      {data?.posts.pageInfo.hasNextPage && (
        <div className="flex mt-4">
          <Button className="m-auto" onClick={loadMore}>
            load more
          </Button>
        </div>
      )}
    </>
  );
}
