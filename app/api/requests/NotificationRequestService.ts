import { and, eq, inArray } from "drizzle-orm";

import { NotificationData } from "@/app/api/requests/NotificationData";
import { getCurrentUserId } from "@/app/api/utils/getCurrentUserId";
import { db } from "@/db";
import { notifications } from "@/db/schema";

export class NotificationRequestService {
  async getNotifications(): Promise<NotificationData[]> {
    const currentUserId = await getCurrentUserId();
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.user_id, currentUserId))
      .then((notifications) => {
        return notifications.map((notification) => {
          return {
            id: notification.id,
            type: notification.type,
            isRead: notification.read,
            projectName: notification.context?.projectName ?? "",
            requesterImg: notification.context?.requesterImg ?? "",
            requesterName: notification.context?.requesterName ?? "",
            approverName: notification.context?.approverName ?? "",
            approverImg: notification.context?.approverImg ?? "",
          } as NotificationData;
        });
      });
  }

  async sendNotification(notification: Omit<NotificationData, "id">) {
    // TODO add slack notification

    await db.insert(notifications).values({
      type: notification.type,
      context: {
        projectName: notification.projectName,
        requesterName: notification.requesterName,
        requesterImg: notification.requesterImg,
        approverName: notification.approverName,
        approverImg: notification.approverImg,
      },
      user_id: await getCurrentUserId(),
      read: false,
    });
  }

  async markNotificationsAsRead(notificationIds: number[]): Promise<void> {
    if (notificationIds.length === 0) return;
    const currentUserId = await getCurrentUserId();
    await db
      .update(notifications)
      .set({ read: true })
      .where(
        and(
          eq(notifications.user_id, currentUserId),
          inArray(notifications.id, notificationIds),
        ),
      );
  }
}
