import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
  uri: "/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token =
    localStorage.getItem("accessToken");

  operation.setContext({
    headers: {
      Authorization: token
        ? `Bearer ${token}`
        : "",
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});