import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { env } from "~/lib/env";
import { errorPlugin } from "~/lib/errors";
import { loggerPlugin } from "~/lib/logger";
import { Auth } from "./controllers/auth";
import { todoRoute } from "./controllers/todo";

export const app = new Elysia({ prefix: "/api" })
  // Plugins
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  )
  .use(
    rateLimit({
      max: 100,
      duration: 60000, // 1 minute
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "SolidStart Elysia Drizzle API",
          version: "1.0.0",
          description:
            "API documentation for SolidStart Elysia Drizzle boilerplate",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Todo", description: "Todo management endpoints" },
          { name: "Health", description: "Health check endpoints" },
        ],
      },
      path: "/docs",
    }),
  )
  .use(loggerPlugin)
  .use(errorPlugin)
  // Health check endpoint
  .get(
    "/health",
    () => ({
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
    {
      response: t.Object({
        status: t.Literal("ok"),
        timestamp: t.String(),
        uptime: t.Number(),
      }),
      detail: {
        summary: "Health check",
        description: "Returns the health status of the API",
        tags: ["Health"],
      },
    },
  )
  // Routes
  .use(Auth)
  .use(todoRoute)
  .compile();

export type App = typeof app;
