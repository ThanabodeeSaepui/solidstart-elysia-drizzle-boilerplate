import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";
import { Elysia, t } from "elysia";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const userSelectSchema = createSelectSchema(usersTable, {
  name: t.String({ minLength: 1 }),
  email: t.String({ format: "email" }),
});
export type User = typeof userSelectSchema.static;
export const userInsertSchema = t.Omit(userSelectSchema, ["id"]);
export const userDeleteSchema = t.Pick(userSelectSchema, ["id"]);

export const { models: userSchemas } = new Elysia().model({
  select: userSelectSchema,
  insert: userInsertSchema,
  delete: userDeleteSchema,
});
