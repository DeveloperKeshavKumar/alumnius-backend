import { createInsertSchema } from "drizzle-zod";
import { successStoriesTable } from "../schemas";

export const createSuccessStorySchema = createInsertSchema(successStoriesTable).omit({
   id: true,
   createdAt: true,
   editedAt: true,
   isDeleted: true,
   deletedAt: true
});

export const updateSuccessStorySchema = createInsertSchema(successStoriesTable).omit({
   id: true,
   createdAt: true,
   editedAt: true,
   isDeleted: true,
   deletedAt: true
});
