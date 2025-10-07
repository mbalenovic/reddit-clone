import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export const Route = createRootRoute({
  component: () => (
    <>
      <ApolloProvider client={client}>
        <div className="h-screen">
          <Outlet />
        </div>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </ApolloProvider>
    </>
  ),
});
