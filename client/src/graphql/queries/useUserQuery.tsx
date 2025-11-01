import { graphql } from "@/gql";
import { QueryUserArgs } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

const USER = graphql(`
  query User($userId: Float!) {
    user(userId: $userId) {
      ...UserFragment
    }
  }
`);

export function useUserQuery({ userId }: QueryUserArgs) {
  return useQuery(USER, { variables: { userId } });
}
