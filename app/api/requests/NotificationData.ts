import { NotificationContext, NotificationType } from "@/db/schema";

export interface NotificationData extends NotificationContext {
  id: number;
  type: NotificationType;
  isRead?: boolean;
}
