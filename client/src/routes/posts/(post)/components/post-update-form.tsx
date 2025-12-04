import { Button } from "@/components/ui/button";
import { useUpdatePostMutation } from "@/graphql/mutations/useUpdatePostMutation";
import { useState } from "react";

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
    <>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            id="title"
            required
            className="bg-white rounded-sm p-2"
            value={postInputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="text" className="block">
            Text
          </label>
          <textarea
            name="text"
            placeholder="text"
            id="text"
            required
            className="bg-white rounded-sm p-2"
            value={postInputs.text}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit">Save</Button>
          <Button onClick={handleUpdateView} type="button" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostUpdateForm;
