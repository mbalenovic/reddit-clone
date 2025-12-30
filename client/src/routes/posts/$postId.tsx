import { Button } from "@/components/ui/button";
import { useDeletePostMutation } from "@/graphql/mutations/useDeletePostMutation";
import { usePostQuery } from "@/graphql/queries/usePostQuery";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Route as PostsRoute } from "@/routes/posts/index";
import { useState } from "react";
import { useAuth } from "@/auth";
import PostUpdateForm from "./(post)/components/post-update-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/posts/$postId")({
  // In a loader
  // loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
});

function PostComponent() {
  const navigate = useNavigate();
  const { postId } = Route.useParams();
  const { data } = usePostQuery({ id: parseInt(postId) });
  const [deletePost] = useDeletePostMutation(parseInt(postId));
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const [updateView, setUpdateView] = useState(false);

  async function handleDelete() {
    const result = await deletePost();

    if (result.data?.deletePost) navigate({ to: PostsRoute.to });

    setError(true);
  }

  function handleUpdateView() {
    setUpdateView((prev) => !prev);
  }

  if (!data?.post) return (
    <div className="max-w-2xl mx-auto py-8">
      <Alert variant="destructive">
        <AlertDescription>Post not found.</AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {updateView ? (
        <PostUpdateForm
          title={data.post.title}
          text={data.post.text}
          handleUpdateView={handleUpdateView}
          id={parseInt(postId)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{data.post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              by {data.post.author.username}
            </p>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{data.post.text}</p>
          </CardContent>
          {user?.id === data.post.authorId && (
            <CardFooter className="gap-2">
              <Button variant="outline" onClick={handleUpdateView}>
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>Error deleting the post.</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
