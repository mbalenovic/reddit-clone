import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const REGISTER = graphql(`
  mutation Register($userInput: UserInput!) {
    register(userInput: $userInput) {
      errors {
        field
        message
      }
      user {
        ...UserFragment
      }
    }
  }
`);

export function useRegisterMutation() {
  return useMutation(REGISTER);
}
