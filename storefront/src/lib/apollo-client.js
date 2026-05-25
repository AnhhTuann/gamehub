"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
