import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const PASSWORD_RECOVERY = graphql(`
  mutation PasswordRecovery($email: String!) {
    passwordRecovery(email: $email)
  }
`);

export function usePasswordRecoveryMutation() {
  return useMutation(PASSWORD_RECOVERY);
}
