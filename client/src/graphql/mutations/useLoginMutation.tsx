import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const LOGIN = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(userInput: { username: $username, password: $password }) {
      user {
        id
        username
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`);

export function useLoginMutation() {
  return useMutation(LOGIN);
}
