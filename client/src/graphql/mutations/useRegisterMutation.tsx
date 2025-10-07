import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const REGISTER = graphql(`
  mutation Register($username: String!, $password: String!) {
    register(userInput: { username: $username, password: $password }) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`);

export function useRegisterMutation() {
  return useMutation(REGISTER);
}
