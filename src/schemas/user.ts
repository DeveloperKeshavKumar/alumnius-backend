import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
   id: uuid().primaryKey().defaultRandom(),
   name: varchar({ length: 255 }).notNull(),
   email: varchar({ length: 255 }).notNull().unique(),
   password: varchar({ length: 255 }).notNull(),
   role: varchar({ length: 255 }).notNull().default('student'),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt").defaultNow().notNull(),
   isDeleted: varchar("isDeleted", { length: 1 }).default("N").notNull(), // 'N' for active, 'Y' for deleted
   deletedAt: timestamp("deletedAt"),
});