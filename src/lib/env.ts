import { Elysia, t } from "elysia";

const envSchema = t.Object({
  PORT: t.Optional(t.String()),
  VITE_HOST_URL: t.Optional(t.String()),
  DATABASE_URL: t.String(),
  DATABASE_USER: t.Optional(t.String()),
  DATABASE_PASSWORD: t.Optional(t.String()),
  DATABASE_NAME: t.Optional(t.String()),
  BETTER_AUTH_SECRET: t.String({ minLength: 32 }),
  BETTER_AUTH_URL: t.String(),
  CORS_ORIGIN: t.String(),
});

type Env = typeof envSchema.static;

const validateEnv = (): Env => {
  const env = {
    PORT: process.env.PORT,
    VITE_HOST_URL: process.env.VITE_HOST_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
  };

  // Check required fields
  const requiredFields: (keyof Env)[] = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "CORS_ORIGIN",
  ];

  const missingFields = requiredFields.filter(
    (field) => !env[field] || env[field] === "",
  );

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingFields.join(", ")}`,
    );
  }

  // Validate BETTER_AUTH_SECRET length
  if (env.BETTER_AUTH_SECRET && env.BETTER_AUTH_SECRET.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be at least 32 characters long");
  }

  return env as Env;
};

export const env = validateEnv();

export const envPlugin = new Elysia({ name: "env" }).decorate("env", env);
