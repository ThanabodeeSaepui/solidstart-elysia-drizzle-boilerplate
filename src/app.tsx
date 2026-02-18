import { treaty } from "@elysiajs/eden";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { ThemeProvider } from "~/lib/theme";
import type { App as ApiApp } from "~/routes/api";
import "./app.css";

export const { api } = treaty<ApiApp>(
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
);

export default function SolidStartApp() {
  return (
    <Router
      root={(props) => (
        <ThemeProvider>
          <MetaProvider>
            <Title>Solidstart</Title>
            <Nav />
            <Suspense fallback={<div>Loading...</div>}>
              {props.children}
            </Suspense>
          </MetaProvider>
        </ThemeProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
