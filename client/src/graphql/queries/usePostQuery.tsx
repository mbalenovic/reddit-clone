import { graphql } from "@/gql";
import { QueryPostArgs } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

export const POST = graphql(`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostFragment
      author {
        id
        username
      }
    }
  }
`);

export function usePostQuery({ id }: QueryPostArgs) {
  return useQuery(POST, {
    variables: { id },
  });
}
