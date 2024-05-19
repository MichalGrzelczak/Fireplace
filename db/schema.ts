import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const participation_requests = sqliteTable("participation_requests", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  project_id: text("project_id").notNull(),
  user_id: text("user_id").notNull(),
  request_date: integer("request_date", { mode: "timestamp_ms" }).notNull(),
  request_user_message: text("request_user_message"),
  request_user_role: text("request_user_role", {
    enum: ["developer", "designer", "product manager", "tester"],
  }),
  resolution: text("resolution", { enum: ["DECLINED", "ACCEPTED"] }),
  resolver: text("resolver"),
  resolution_date: integer("resolution_date", { mode: "timestamp_ms" }),
});

export const NotificationTypes = [
  "requested-participation",
  "declined-participation",
  "accepted-participation",
] as const;
export type NotificationType = (typeof NotificationTypes)[number];

export const notifications = sqliteTable("notifications", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  type: text("type", {
    enum: NotificationTypes,
  }).notNull(),
  context: text("context", { mode: "json" }).$type<NotificationContext>(),
  user_id: text("user_id").notNull(),
  read: integer("read", { mode: "boolean" }).default(false),
});

export type NotificationContext = {
  projectName: string;
  requesterImg?: string;
  requesterName?: string;
  approverName?: string;
  approverImg?: string;
};
