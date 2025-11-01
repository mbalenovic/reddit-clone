import { graphql } from "@/gql";
import { QueryPostsArgs } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

export const POSTS = graphql(`
  query Posts($first: Float!, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          ...PostFragment
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export function usePostsQuery({ first, after }: QueryPostsArgs) {
  return useQuery(POSTS, {
    variables: { first, after },
    notifyOnNetworkStatusChange: true,
  });
}
