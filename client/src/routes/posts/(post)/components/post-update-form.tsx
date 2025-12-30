import { Button } from "@/components/ui/button";
import { useUpdatePostMutation } from "@/graphql/mutations/useUpdatePostMutation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

type PostInputs = {
  title: string;
  text: string;
};

type PostInputsProps = PostInputs & {
  id: number;
  handleUpdateView: () => void;
};

function PostUpdateForm({
  id,
  title,
  text,
  handleUpdateView,
}: PostInputsProps) {
  const [postInputs, setPostInputs] = useState({
    title,
    text,
  });
  const [mutate] = useUpdatePostMutation();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPostInputs({ ...postInputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await mutate({ variables: { ...postInputs, id } });
    } catch {
      console.error("Failed at post update.");
    }
    handleUpdateView();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Post title"
              id="title"
              required
              value={postInputs.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              name="text"
              placeholder="Post content"
              id="text"
              required
              value={postInputs.text}
              onChange={handleChange}
              rows={6}
            />
          </div>
          <CardFooter className="px-0 gap-2 justify-end">
            <Button onClick={handleUpdateView} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default PostUpdateForm;
