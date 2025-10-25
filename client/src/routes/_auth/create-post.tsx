import { useCreatePostMutation } from "@/graphql/mutations/useCreatePostMutation";
import { CombinedGraphQLErrors } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    try {
      setIsLoading(true);
      await createPost({
        variables: { createPostPostInput: { title, text } },
      });
    } catch (error) {
      // TODO: validation error
      if (CombinedGraphQLErrors.is(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen ">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block">
            title
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            id="title"
            required
            className="bg-white rounded-sm p-2"
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
            rows={3}
          />
          <div className="mt-1 flex justify-end"></div>
        </div>
        <div className="flex justify-center mt-4">
          <input
            type="submit"
            disabled={isLoading}
            value="Create"
            className="bg-red-300 p-1 px-3 rounded-sm"
          />
        </div>
      </form>
    </div>
  );
}
