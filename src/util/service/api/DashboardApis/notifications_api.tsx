import { ApiClient } from "../apiClient";

export type Notification = {
  id: number
  userId: number
  title: string
  message: string
  type: string
  data: Record<string, any>
  isRead: boolean
  createdAt: string
}

export type NotificationsResponse = {
  data: Notification[]
  totalCount: number
}

export const NotificationsAPI = (client: ApiClient) => ({
  getNotifications: (userId: string | number, page = 1, limit = 10) =>
    client.get<NotificationsResponse>(`/api/notifications/${userId}?page=${page}&limit=${limit}`),

  markAllRead: (userId: string | number) =>
    client.put(`/api/notifications/${userId}/read-all`),
})