import { pgTable, varchar, uuid, timestamp, text, integer } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const jobsTable = pgTable("jobs", {
   id: uuid("id").defaultRandom().primaryKey(),
   alumniId: uuid("alumniId").references(() => usersTable.id).notNull(),
   title: varchar("title", { length: 255 }).notNull(),
   description: text("description").notNull(),
   company: varchar("company", { length: 255 }).notNull(),
   location: varchar("location", { length: 255 }),
   salary: integer("salary"), // optional
   applicationLink: text("applyLink").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt").defaultNow().notNull(),
   isDeleted: varchar("isDeleted", { length: 1 }).default("N").notNull(),
   deletedAt: timestamp("deletedAt"),
});
