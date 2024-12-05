import { createInsertSchema } from "drizzle-zod";
import { eventsTable, eventRegistrationsTable } from "../schemas";

import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().refine(val => !isNaN(Date.parse(val))),
  location: z.string().min(1, "Location is required")
});

export const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  date: z.string().refine(val => !isNaN(Date.parse(val))).optional(),
  location: z.string().min(1).optional()
});

export const createEventRegistrationSchema = createInsertSchema(eventRegistrationsTable).omit({
  id: true,
  userId: true,
  registeredAt: true
});

export const updateEventRegistrationSchema = createInsertSchema(eventRegistrationsTable).omit({
  id: true,
  userId: true,
  registeredAt: true
});