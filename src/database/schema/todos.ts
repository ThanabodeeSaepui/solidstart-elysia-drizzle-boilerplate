import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";
import { Elysia, t } from "elysia";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const todoSelectSchema = createSelectSchema(todo, {
  description: t.String({ minLength: 1, default: "" }),
});
export type Todo = typeof todoSelectSchema.static;
export const todoInsertSchema = t.Omit(todoSelectSchema, ["id", "createdAt"]);
export const todoDeleteSchema = t.Object({ id: t.Numeric() });

export const { models: todoSchemas } = new Elysia().model({
  select: todoSelectSchema,
  insert: todoInsertSchema,
  delete: todoDeleteSchema,
});
