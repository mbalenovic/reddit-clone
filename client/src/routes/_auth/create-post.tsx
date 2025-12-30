import { useCreatePostMutation } from "@/graphql/mutations/useCreatePostMutation";
import { CombinedGraphQLErrors } from "@apollo/client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/__root";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export const Route = createFileRoute("/_auth/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  const [createPost, { loading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    try {
      await createPost({
        variables: { postInput: { title, text } },
      });

      navigate({ to: IndexRoute.to });
    } catch (error) {
      // TODO: validation error
      if (CombinedGraphQLErrors.is(error)) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter post title"
                id="title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Textarea
                name="text"
                placeholder="Enter post content"
                id="text"
                required
                rows={6}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: IndexRoute.to })}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
