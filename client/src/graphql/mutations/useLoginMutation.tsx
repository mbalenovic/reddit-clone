import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const LOGIN = graphql(`
  mutation Login($userInputLogin: UserInputLogin!) {
    login(userInputLogin: $userInputLogin) {
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

export function useLoginMutation() {
  return useMutation(LOGIN);
}
