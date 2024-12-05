import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "../schemas";

export const registerUserSchema = createInsertSchema(usersTable).omit({
   id: true,
   createdAt: true,
   updatedAt: true,
   isDeleted: true,
   deletedAt: true
});

export const loginUserSchema = createInsertSchema(usersTable).omit({
   id: true,
   name: true,
   role: true,
   createdAt: true,
   updatedAt: true,
   isDeleted: true,
   deletedAt: true
});