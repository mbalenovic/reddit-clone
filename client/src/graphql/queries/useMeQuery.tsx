import { graphql } from "@/gql";
import { useQuery } from "@apollo/client/react";

const ME = graphql(`
  query Query {
    me {
      ...UserFragment
    }
  }
`);

export function useMeQuery() {
  return useQuery(ME);
}
