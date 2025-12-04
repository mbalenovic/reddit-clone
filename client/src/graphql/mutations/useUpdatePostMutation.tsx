import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const UPDATE_POST = graphql(`
  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
    updatePost(id: $id, title: $title, text: $text) {
      ...PostFragment
    }
  }
`);

export function useUpdatePostMutation() {
  return useMutation(UPDATE_POST);
}
