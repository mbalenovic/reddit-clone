import { LoginMutation, User, UserInput } from "@/gql/graphql";
import { ApolloClient } from "@apollo/client";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    username: UserInput["username"],
    password: UserInput["password"]
  ) => Promise<ApolloClient.MutateResult<LoginMutation>>;
  logout: () => void;
}
