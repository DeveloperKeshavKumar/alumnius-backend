import { createInsertSchema } from "drizzle-zod";
import { successStoriesTable } from "../schemas";
import { z } from 'zod';

export const createSuccessStorySchema = createInsertSchema(successStoriesTable).omit({
   id: true,
   alumniId: true,
   createdAt: true,
   editedAt: true,
   isDeleted: true,
   deletedAt: true
});

export const updateSuccessStorySchema = z.object({
   title: z.string().optional(),
   content: z.string().optional(),
});
