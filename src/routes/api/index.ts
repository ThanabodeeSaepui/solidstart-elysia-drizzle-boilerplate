import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
// import { todoRoute } from './todo';

export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  // .use(todoRoute)
  .compile();

export type App = typeof app;
