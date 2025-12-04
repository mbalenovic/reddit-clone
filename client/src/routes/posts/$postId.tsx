import { Button } from "@/components/ui/button";
import { useDeletePostMutation } from "@/graphql/mutations/useDeletePostMutation";
import { usePostQuery } from "@/graphql/queries/usePostQuery";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Route as PostsRoute } from "@/routes/posts/index";
import { useState } from "react";
import { useAuth } from "@/auth";
import PostUpdateForm from "./(post)/components/post-update-form";

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

  if (!data?.post) return <p>No post.</p>;

  return (
    <div>
      {updateView ? (
        <PostUpdateForm
          title={data.post.title}
          text={data.post.text}
          handleUpdateView={handleUpdateView}
          id={parseInt(postId)}
        />
      ) : (
        <>
          <h2>{data.post.title}</h2>
          <p>{data.post.text}</p>
          {user?.id === data.post.authorId && (
            <>
              <div className="mt-2">
                <Button onClick={handleDelete}>Delete</Button>
                {error && <p>Error deleting the post.</p>}
                <Button
                  onClick={handleUpdateView}
                  className={`${!updateView && "ml-2"}`}
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
