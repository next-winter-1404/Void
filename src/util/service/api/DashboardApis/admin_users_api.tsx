import { ApiClient } from "@/util/service/api/apiClient";

export type UserRole = "buyer" | "seller" | "admin";

export interface AdminUser {
  id: number;
  role: UserRole;
  membershipDate: string | null;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUsersResponse {
  data: AdminUser[];
  totalCount: number;
}

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  email?: string;
  role?: UserRole | "";
  membershipDate?: string;
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  membershipDate?: string | null;
  profilePicture?: string | null;
}

export function AdminUsersAPI(client: ApiClient) {
  return {
    getUsers: (params: GetAdminUsersParams = {}) => {
      const { page = 1, limit = 10, sort = "createdAt", order = "DESC", email, role, membershipDate } = params;
      const q = new URLSearchParams({ page: String(page), limit: String(limit), sort, order });
      if (email)          q.set("email", email);
      if (role)           q.set("role", role);
      if (membershipDate) q.set("membershipDate", membershipDate);
      return client.get<AdminUsersResponse>(`/api/admin/users?${q}`);
    },
    updateUserRole: (id: number) =>
      client.put(`/api/admin/users/${id}/role`),
    deleteUser: (id: number) =>
      client.delete(`/api/admin/users/${id}`),
    updateUser: (id: number, payload: UpdateUserPayload) =>
      client.put<AdminUser>(`/api/admin/users/${id}`, payload),
  };
}