import { createInsertSchema } from "drizzle-zod";
import { jobsTable } from "../schemas";
import { z } from 'zod';

export const createJobSchema = createInsertSchema(jobsTable).omit({
   id: true,
   alumniId: true,
   createdAt: true,
   updatedAt: true,
   isDeleted: true,
   deletedAt: true
});

export const updateJobSchema = z.object({
   title: z.string().optional(),
   description: z.string().optional(),
   company: z.string().optional(),
   location: z.string().optional(),
   salary: z.number().optional(),
   applicationLink: z.string().optional(),
   //   applicationDeadline: z.string().refine(val => !isNaN(Date.parse(val)), {
   //     message: "Invalid date format for deadline",
   //   }).optional(),
});
