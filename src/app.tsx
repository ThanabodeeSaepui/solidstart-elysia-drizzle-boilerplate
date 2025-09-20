import { treaty } from "@elysiajs/eden";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import type { App } from "~/routes/api";
import "./app.css";

export const { api } = treaty<App>("localhost:3000");

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: (previousData: unknown) => previousData,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
    }),
  });

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solidstart</Title>
          <Nav />
          <QueryClientProvider client={queryClient}>
            <Suspense>{props.children}</Suspense>
          </QueryClientProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
