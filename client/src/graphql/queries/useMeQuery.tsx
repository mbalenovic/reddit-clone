import { graphql } from "@/gql";
import { useQuery } from "@apollo/client/react";

const ME = graphql(`
  query Query {
    me {
      id
      createdAt
      updatedAt
      username
    }
  }
`);

export function useMeQuery() {
  return useQuery(ME);
}
