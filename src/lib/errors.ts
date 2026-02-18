import { Elysia, t } from "elysia";

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Predefined error factories
export const Errors = {
  BAD_REQUEST: (message = "Bad request") =>
    new AppError("BAD_REQUEST", message, 400),
  UNAUTHORIZED: (message = "Unauthorized") =>
    new AppError("UNAUTHORIZED", message, 401),
  FORBIDDEN: (message = "Forbidden") => new AppError("FORBIDDEN", message, 403),
  NOT_FOUND: (message = "Resource not found") =>
    new AppError("NOT_FOUND", message, 404),
  CONFLICT: (message = "Resource already exists") =>
    new AppError("CONFLICT", message, 409),
  INTERNAL: (message = "Internal server error") =>
    new AppError("INTERNAL_SERVER_ERROR", message, 500),
};

// Error response schema
export const ErrorResponse = t.Object({
  success: t.Literal(false),
  error: t.Object({
    code: t.String(),
    message: t.String(),
  }),
});

// Error plugin for Elysia
export const errorPlugin = new Elysia({ name: "errors" }).onError(
  ({ code, error, set }) => {
    // Handle known AppErrors
    if (error instanceof AppError) {
      set.status = error.status;
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }

    // Handle validation errors from Elysia
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: {
          code: "BAD_REQUEST",
          message: "Validation error",
          details: error.message,
        },
      };
    }

    // Handle unknown errors
    set.status = 500;
    return {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  },
);
