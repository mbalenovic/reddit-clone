import {
  LoginMutation,
  RegisterMutation,
  User,
  UserInput,
} from "@/gql/graphql";
import { ApolloClient } from "@apollo/client";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    username: UserInput["username"],
    password: UserInput["password"]
  ) => Promise<ApolloClient.MutateResult<LoginMutation>>;
  register: (
    username: UserInput["username"],
    password: UserInput["password"],
    email: UserInput["email"]
  ) => Promise<ApolloClient.MutateResult<RegisterMutation>>;
  logout: () => void;
}
