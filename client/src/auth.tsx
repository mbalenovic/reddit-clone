import React, { createContext, useContext, useState, useEffect } from "react";
import { QueryQuery, User, UserInput } from "./gql/graphql";
import { useLoginMutation } from "./graphql/mutations/useLoginMutation";
import { AuthState } from "./types/AuthState";
import { redirect } from "@tanstack/react-router";
import { Route as SigninRoute } from "./routes/signin";

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginUser] = useLoginMutation();

  // Restore auth state on app load
  useEffect(() => {
    fetch("http://localhost:4000/graphql", {
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
        } else {
          throw redirect({
            to: SigninRoute.to,
            search: {
              // Save current location for redirect after login
              redirect: location.href,
            },
          });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const login = async (
    username: UserInput["username"],
    password: UserInput["password"]
  ) => {
    const response = await loginUser({
      variables: { userInput: { username, password } },
    });

    if (response.data?.login.user?.id) {
      setUser(response.data.login.user);
      setIsAuthenticated(true);
    }

    return response;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // TODO: add logout on server and delete cookies
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
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
