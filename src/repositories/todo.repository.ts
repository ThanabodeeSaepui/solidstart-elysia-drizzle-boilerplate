import { and, eq } from "drizzle-orm";
import { db } from "~/database";
import { type Todo, todo } from "~/database/schema/todos";

export interface TodoRepository {
  findByUserId: (userId: string) => Promise<Todo[]>;
  findById: (id: number, userId: string) => Promise<Todo | undefined>;
  create: (data: { description: string; userId: string }) => Promise<Todo>;
  update: (
    id: number,
    userId: string,
    data: { description?: string },
  ) => Promise<Todo | undefined>;
  delete: (id: number, userId: string) => Promise<boolean>;
}

export const todoRepository: TodoRepository = {
  findByUserId: async (userId: string) => {
    return await db.select().from(todo).where(eq(todo.userId, userId));
  },

  findById: async (id: number, userId: string) => {
    const result = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .limit(1);
    return result[0];
  },

  create: async (data: { description: string; userId: string }) => {
    const result = await db.insert(todo).values(data).returning();
    return result[0];
  },

  update: async (
    id: number,
    userId: string,
    data: { description?: string },
  ) => {
    const result = await db
      .update(todo)
      .set(data)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning();
    return result[0];
  },

  delete: async (id: number, userId: string) => {
    const result = await db
      .delete(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning();
    return result.length > 0;
  },
};
