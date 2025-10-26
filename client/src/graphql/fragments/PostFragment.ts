import { graphql } from "@/gql";

export const PostFragment = graphql(`
  fragment PostFragment on Post {
    id
    createdAt
    updatedAt
    title
    text
    points
    authorId
  }
`);
