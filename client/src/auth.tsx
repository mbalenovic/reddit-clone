import { useApolloClient } from "@apollo/client/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { QueryQuery, User, UserInput, UserInputLogin } from "./gql/graphql";
import { useLoginMutation } from "./graphql/mutations/useLoginMutation";
import { useLogoutMutation } from "./graphql/mutations/useLogoutMutation";
import { useRegisterMutation } from "./graphql/mutations/useRegisterMutation";
import { AuthState } from "./types/AuthState";

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginUser] = useLoginMutation();
  const [registerUser] = useRegisterMutation();
  const [logoutUser] = useLogoutMutation();
  const client = useApolloClient();

  // Restore auth state on app load
  useEffect(() => {
    fetch(import.meta.env.VITE_GRAPHQL_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query: `
          query Query {
            me {
              id
              createdAt
              updatedAt
              username
            }
          }
        `,
      }),
    })
      .then((res) => res.json() as Promise<{ data: QueryQuery }>)
      .then((data) => {
        if (data.data.me?.id) {
          setUser(data.data.me);
          setIsAuthenticated(true);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (
    usernameOrEmail: UserInputLogin["usernameOrEmail"],
    password: UserInputLogin["password"]
  ) => {
    const response = await loginUser({
      variables: { userInputLogin: { usernameOrEmail, password } },
    });

    if (response.data?.login.user?.id) {
      setUser(response.data.login.user);
      setIsAuthenticated(true);
      await client.resetStore();
    }

    return response;
  };

  const register = async (
    username: UserInput["username"],
    password: UserInput["password"],
    email: UserInput["email"]
  ) => {
    const response = await registerUser({
      variables: { userInput: { username, password, email } },
    });

    if (response.data?.register.user?.id) {
      setUser(response.data.register.user);
      setIsAuthenticated(true);
    }

    return response;
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);

    await logoutUser();
    await client.resetStore();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
