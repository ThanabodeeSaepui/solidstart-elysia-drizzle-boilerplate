import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { Auth } from "./controllers/auth";
import { todoRoute } from "./controllers/todo";

export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(Auth)
  .use(todoRoute)
  .compile();

export type App = typeof app;
