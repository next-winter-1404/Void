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
  updatedAt: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  data: Notification[];
  totalCount: number;
}

export type FilterType = "همه" | "خوانده شده" | "خوانده نشده";

export function NotificationsAPI(client: ApiClient) {
  return {
    getNotifications: (
      userId: number,
      page: number,
      limit: number,
      filter: FilterType = "همه"
    ) => {
      const isReadParam =
        filter === "خوانده شده"
          ? "&isRead=true"
          : filter === "خوانده نشده"
          ? "&isRead=false"
          : "";
      return client.get<NotificationsResponse>(
        `/api/notifications/${userId}?page=${page}&limit=${limit}&sort=createdAt&order=DESC${isReadParam}`
      );
    },


    markAsRead: (notificationId: number) =>
      client.put(`/api/notifications/${notificationId}/read`),
  };
}