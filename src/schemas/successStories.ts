import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const successStoriesTable = pgTable("successStories", {
   id: uuid("id").defaultRandom().primaryKey(),
   alumniId: uuid("alumniId").references(() => usersTable.id).notNull(),
   title: varchar("title", { length: 255 }).notNull(),
   story: text("story").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   editedAt: timestamp("editedAt").defaultNow().notNull(),
   isDeleted: varchar("isDeleted", { length: 1 }).default("N").notNull(),
   deletedAt: timestamp("deletedAt"),
});
