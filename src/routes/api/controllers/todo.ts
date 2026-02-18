import { Elysia, t } from "elysia";
import { todoDeleteSchema, todoInsertSchema } from "~/database/schema/todos";
import { authMiddleware } from "~/lib/auth";
import { Errors } from "~/lib/errors";
import { todoRepository } from "~/repositories/todo.repository";

export const todoRoute = new Elysia({ prefix: "/todo", tags: ["Todo"] })
  .use(authMiddleware)
  // Get current user info
  .get("/user", ({ user }) => user, {
    auth: true,
    detail: {
      summary: "Get current user",
      description: "Returns the currently authenticated user",
    },
  })
  // Get all todos for the authenticated user
  .get(
    "",
    async ({ user }) => {
      if (!user) {
        throw Errors.UNAUTHORIZED();
      }
      return await todoRepository.findByUserId(user.id);
    },
    {
      auth: true,
      detail: {
        summary: "Get all todos",
        description: "Returns all todos for the authenticated user",
      },
    },
  )
  // Create a new todo for the authenticated user
  .post(
    "",
    async ({ body, user }) => {
      if (!user) {
        throw Errors.UNAUTHORIZED();
      }
      return await todoRepository.create({
        description: body.description,
        userId: user.id,
      });
    },
    {
      body: todoInsertSchema,
      auth: true,
      detail: {
        summary: "Create a todo",
        description: "Creates a new todo for the authenticated user",
      },
    },
  )
  // Get a specific todo by id
  .get(
    "/:id",
    async ({ params, user }) => {
      if (!user) {
        throw Errors.UNAUTHORIZED();
      }

      const userTodo = await todoRepository.findById(params.id, user.id);

      if (!userTodo) {
        throw Errors.NOT_FOUND("Todo not found or unauthorized");
      }

      return userTodo;
    },
    {
      params: todoDeleteSchema,
      auth: true,
      detail: {
        summary: "Get a todo by ID",
        description:
          "Returns a specific todo if it belongs to the authenticated user",
      },
    },
  )
  // Update a todo
  .patch(
    "/:id",
    async ({ params, body, user }) => {
      if (!user) {
        throw Errors.UNAUTHORIZED();
      }

      const existingTodo = await todoRepository.findById(params.id, user.id);

      if (!existingTodo) {
        throw Errors.NOT_FOUND("Todo not found or unauthorized");
      }

      return await todoRepository.update(params.id, user.id, body);
    },
    {
      params: todoDeleteSchema,
      body: t.Partial(
        t.Object({
          description: t.String({ minLength: 1 }),
        }),
      ),
      auth: true,
      detail: {
        summary: "Update a todo",
        description: "Updates a todo if it belongs to the authenticated user",
      },
    },
  )
  // Delete a todo
  .delete(
    "/:id",
    async ({ params, user }) => {
      if (!user) {
        throw Errors.UNAUTHORIZED();
      }

      const deleted = await todoRepository.delete(params.id, user.id);

      if (!deleted) {
        throw Errors.NOT_FOUND("Todo not found or unauthorized");
      }

      return { success: true };
    },
    {
      params: todoDeleteSchema,
      auth: true,
      detail: {
        summary: "Delete a todo",
        description: "Deletes a todo if it belongs to the authenticated user",
      },
    },
  );
