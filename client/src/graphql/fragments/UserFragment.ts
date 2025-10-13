import { graphql } from "@/gql";

export const UserFragment = graphql(`
  fragment UserFragment on User {
    id
    username
  }
`);
