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

  if (loading && !data) return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <p className="text-muted-foreground">Loading posts...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link to={PostCreateRoute.to}>Create Post</Link>
        </Button>
      </div>
      <PostList edges={data?.posts.edges ?? []} />
      {data?.posts.pageInfo.hasNextPage && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
