import { graphql } from "@/gql";
import { useQuery } from "@apollo/client/react";

export const POSTS = graphql(`
  query Posts {
    posts {
      ...PostFragment
    }
  }
`);

export function usePostsQuery() {
  return useQuery(POSTS);
}
