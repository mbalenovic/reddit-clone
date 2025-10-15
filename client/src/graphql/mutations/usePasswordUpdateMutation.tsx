import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const UPDATE_PASSWORD = graphql(`
  mutation UpdatePassword($recoveryToken: String!, $password: String!) {
    updatePassword(recoveryToken: $recoveryToken, password: $password)
  }
`);

export function usePasswordUpdateMutation() {
  return useMutation(UPDATE_PASSWORD);
}
