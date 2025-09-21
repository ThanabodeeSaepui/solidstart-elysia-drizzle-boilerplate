import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";
import { Elysia, t } from "elysia";
import { user } from "./auth"; // Import user table for reference

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const todoSelectSchema = createSelectSchema(todo, {
  description: t.String({ minLength: 1, default: "" }),
  userId: t.String(),
});
export type Todo = typeof todoSelectSchema.static;

// For inserting todos, userId should be required but will be set from the authenticated user
export const todoInsertSchema = t.Omit(todoSelectSchema, [
  "id",
  "createdAt",
  "updatedAt",
  "userId", // Remove userId from insert schema since it will be set from auth context
]);

// For public insert schema (if you want to allow userId to be specified)
export const todoInsertWithUserSchema = t.Omit(todoSelectSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const todoDeleteSchema = t.Object({ id: t.Numeric() });

// Update schema for todos (optional - allows updating description)
export const todoUpdateSchema = t.Object({
  id: t.Numeric(),
  description: t.Optional(t.String({ minLength: 1 })),
});

export const { models: todoSchemas } = new Elysia().model({
  select: todoSelectSchema,
  insert: todoInsertSchema,
  insertWithUser: todoInsertWithUserSchema,
  delete: todoDeleteSchema,
  update: todoUpdateSchema,
});
