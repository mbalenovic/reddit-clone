import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const LOGOUT = graphql(`
  mutation Logout {
    logout
  }
`);

export function useLogoutMutation() {
  return useMutation(LOGOUT);
}
