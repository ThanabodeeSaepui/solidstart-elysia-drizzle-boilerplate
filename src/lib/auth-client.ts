import { createAuthClient } from "better-auth/solid";

const auth = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const authClient = auth;
export const { signIn, signUp, useSession } = auth;
