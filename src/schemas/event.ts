import { pgTable, varchar, uuid, timestamp, text, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const eventsTable = pgTable("events", {
   id: uuid("id").defaultRandom().primaryKey(),
   organizerId: uuid("organizerId").references(() => usersTable.id).notNull(),
   title: varchar("title", { length: 255 }).notNull(),
   description: text("description").notNull(),
   date: timestamp("date").notNull(),
   location: varchar("location", { length: 255 }).notNull(),
   isPublic: boolean("isPublic").default(true),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt").defaultNow().notNull(),
   isDeleted: varchar("isDeleted", { length: 1 }).default("N").notNull(),
   deletedAt: timestamp("deletedAt"),
});

export const eventRegistrationsTable = pgTable("eventRegistrations", {
   id: uuid("id").defaultRandom().primaryKey(),
   eventId: uuid("eventId").references(() => eventsTable.id).notNull(),
   userId: uuid("userId").references(() => usersTable.id).notNull(),
   registeredAt: timestamp("registeredAt").defaultNow().notNull(),
});
