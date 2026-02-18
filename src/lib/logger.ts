import { Elysia } from "elysia";
import pino from "pino";

// Create pino logger instance
// Note: pino-pretty transport is optional and may not be available in all environments
const shouldUsePrettyPrint = process.env.NODE_ENV !== "production";

let loggerConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || "info",
};

// Only use pino-pretty transport if available (try-catch for optional dependency)
if (shouldUsePrettyPrint) {
  try {
    // Check if pino-pretty is available
    await import("pino-pretty");
    loggerConfig = {
      ...loggerConfig,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
    };
  } catch {
    // pino-pretty not available, use default logging
    console.warn("pino-pretty not found, using default logging format");
  }
}

export const logger = pino(loggerConfig);

// Elysia logger plugin
export const loggerPlugin = new Elysia({ name: "logger" })
  .decorate("logger", logger)
  .onRequest(({ request }) => {
    logger.info(`${request.method} ${new URL(request.url).pathname}`);
  })
  .onAfterHandle(({ request, set }) => {
    logger.info(
      `${request.method} ${new URL(request.url).pathname} - ${set.status}`,
    );
  })
  .onError(({ request, error }) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(
      `${request.method} ${new URL(request.url).pathname} - Error: ${errorMessage}`,
    );
  });
