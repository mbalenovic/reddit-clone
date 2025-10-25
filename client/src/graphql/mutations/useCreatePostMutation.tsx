import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const CREATE_POST = graphql(`
  mutation CreatePost($createPostPostInput: PostInput!) {
    createPost(postInput: $createPostPostInput) {
      id
      createdAt
      updatedAt
      title
      text
      points
      authorId
    }
  }
`);

export function useCreatePostMutation() {
  return useMutation(CREATE_POST);
}
