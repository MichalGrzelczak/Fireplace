"use server";

import { NotificationData } from "@/app/api/requests/NotificationData";
import { NotificationRequestService } from "@/app/api/requests/NotificationRequestService";

const notificationRequestService = new NotificationRequestService();

export async function getNotifications(): Promise<NotificationData[]> {
  return notificationRequestService.getNotifications();
}

export async function markNotificationsAsRead(
  notificationIds: number[],
): Promise<void> {
  return notificationRequestService.markNotificationsAsRead(notificationIds);
}
