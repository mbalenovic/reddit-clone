import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const VOTE = graphql(`
  mutation Vote($postId: Int!, $value: Int!) {
    vote(postId: $postId, value: $value) {
      id
      points
      voteStatus
    }
  }
`);

export function useVoteMutation() {
  return useMutation(VOTE);
}
