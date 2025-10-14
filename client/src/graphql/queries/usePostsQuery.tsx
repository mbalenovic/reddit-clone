import { graphql } from "@/gql";
import { useQuery } from "@apollo/client/react";

const POSTS = graphql(`
  query Posts {
    posts {
      id
      createdAt
      updatedAt
      title
    }
  }
`);

export function usePostsQuery() {
  return useQuery(POSTS);
}
