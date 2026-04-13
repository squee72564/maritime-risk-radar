import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const setupChecks = pgTable("setup_checks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
