import { treaty } from "@elysiajs/eden";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import type { App } from "~/routes/api";
import "./app.css";

export const { api } = treaty<App>("http://localhost:3000");

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solidstart</Title>
          <Nav />
          <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
