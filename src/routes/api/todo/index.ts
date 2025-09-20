import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "~/database";
import  { todo, todoDeleteSchema, todoInsertSchema }  from "~/database/schema/todos";

export const todoRoute = new Elysia({ prefix: "/todo" })
  .get("", async () => await db.select().from(todo))
  .post("", async ({ body }) => await db.insert(todo).values(body), {
    body: todoInsertSchema,
  })
  .delete(
    "/:id",
    async ({ params }) => await db.delete(todo).where(eq(todo.id, params.id)),
    { params: todoDeleteSchema },
  );
