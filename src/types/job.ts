import { createInsertSchema } from "drizzle-zod";
import { jobsTable } from "../schemas";

export const createJobSchema = createInsertSchema(jobsTable).omit({
   id: true,
   createdAt: true,
   updatedAt: true,
   isDeleted: true,
   deletedAt: true
});

export const updateJobSchema = createInsertSchema(jobsTable).omit({
   id: true,
   createdAt: true,
   updatedAt: true,
   isDeleted: true,
   deletedAt: true
});
