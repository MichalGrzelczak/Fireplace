import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const participation_requests = sqliteTable("participation_requests", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  project_id: text("project_id").notNull(),
  user_id: text("user_id").notNull(),
  request_date: integer("request_date", { mode: "timestamp_ms" }).notNull(),
  resolution: text("resolution"),
  resolver: text("resolver"),
  resolution_date: integer("resolution_date", { mode: "timestamp_ms" }),
});
