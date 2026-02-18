import { type Context, Elysia } from "elysia";
import { auth } from "~/lib/auth";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.set.status = 405;
    return { error: "Method Not Allowed" };
  }
};

export const Auth = new Elysia({ prefix: "/auth" }).all("/*", betterAuthView);
