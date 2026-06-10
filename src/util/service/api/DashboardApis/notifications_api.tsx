import type { ApiClient } from "@/util/service/api/apiClient";

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  data: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;created_at: string;
  updated_at: string;
}

interface NotificationsResponse {
  data: Notification[];
  totalCount: number;
}

export function NotificationsAPI(client: ApiClient) {
  return {
    getNotifications: (userId: number, page: number, limit: number) =>
      client.get<NotificationsResponse>(
        `/api/notifications/${userId}?page=${page}&limit=${limit}`
      ),

    markAsRead: (userId: number, notificationId: number) =>
      client.put(`/api/notifications/${userId}/${notificationId}/read`),
  };
}
