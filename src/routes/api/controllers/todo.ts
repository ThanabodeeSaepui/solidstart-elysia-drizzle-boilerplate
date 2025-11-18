import { and, eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "~/database";
import {
  todo,
  todoDeleteSchema,
  todoInsertSchema,
} from "~/database/schema/todos";
import { authMiddleware } from "~/lib/auth";

export const todoRoute = new Elysia({ prefix: "/todo" })
  .use(authMiddleware)
  .get("/user", ({ user }) => user, {
    auth: true,
  })
  // Get all todos for the authenticated user
  .get(
    "",
    async ({ user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      return await db.select().from(todo).where(eq(todo.userId, user.id));
    },
    { auth: true },
  )

  // Create a new todo for the authenticated user
  .post(
    "",
    async ({ body, user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      return await db.insert(todo).values({
        ...body,
        userId: user.id, // Automatically set from authenticated user
      });
    },
    {
      body: todoInsertSchema,
      auth: true,
    },
  )

  // Update a todo (only if it belongs to the authenticated user)
  .patch(
    "/:id",
    async ({ params, body, user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }

      // First check if the todo exists and belongs to the user
      const existingTodo = await db
        .select()
        .from(todo)
        .where(and(eq(todo.id, params.id), eq(todo.userId, user.id)))
        .limit(1);

      if (existingTodo.length === 0) {
        throw new Error("Todo not found or unauthorized");
      }

      return await db
        .update(todo)
        .set(body)
        .where(and(eq(todo.id, params.id), eq(todo.userId, user.id)));
    },
    {
      params: todoDeleteSchema,
      body: t.Partial(
        t.Object({
          description: t.String({ minLength: 1 }),
        }),
      ),
      auth: true,
    },
  )

  // Delete a todo (only if it belongs to the authenticated user)
  .delete(
    "/:id",
    async ({ params, user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }

      // First check if the todo exists and belongs to the user
      const existingTodo = await db
        .select()
        .from(todo)
        .where(and(eq(todo.id, params.id), eq(todo.userId, user.id)))
        .limit(1);

      if (existingTodo.length === 0) {
        throw new Error("Todo not found or unauthorized");
      }

      return await db
        .delete(todo)
        .where(and(eq(todo.id, params.id), eq(todo.userId, user.id)));
    },
    {
      params: todoDeleteSchema,
      auth: true,
    },
  )

  // Get a specific todo by id (only if it belongs to the authenticated user)
  .get(
    "/:id",
    async ({ params, user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }

      const userTodo = await db
        .select()
        .from(todo)
        .where(and(eq(todo.id, params.id), eq(todo.userId, user.id)))
        .limit(1);

      if (userTodo.length === 0) {
        throw new Error("Todo not found or unauthorized");
      }

      return userTodo[0];
    },
    {
      params: todoDeleteSchema,
      auth: true,
    },
  );
