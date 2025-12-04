import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { POSTS } from "../queries/usePostsQuery";

const DELETE_POST = graphql(`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`);

export function useDeletePostMutation(id: number) {
  return useMutation(DELETE_POST, {
    variables: { id },
    refetchQueries: [{ query: POSTS, variables: { first: 10 } }],
  });
}
