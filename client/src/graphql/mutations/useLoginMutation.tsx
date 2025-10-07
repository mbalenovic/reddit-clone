import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const LOGIN = graphql(`
  mutation Login($userInput: UserInput!) {
    login(userInput: $userInput) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
`);

export function useLoginMutation() {
  return useMutation(LOGIN);
}
