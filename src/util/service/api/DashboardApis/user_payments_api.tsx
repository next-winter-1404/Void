import { ApiClient } from "@/util/service/api/apiClient";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface UserPayment {
  id: number;
  userId: number;
  bookingId: number;
  amount: string;
  description: string;
  status: PaymentStatus;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UserPaymentsResponse {
  payments: UserPayment[];
  totalCount: number;
}

export interface GetUserPaymentsParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus | "";
  sort?: string;
  order?: "ASC" | "DESC";
}

export function UserPaymentsAPI(client: ApiClient) {
  return {
    getPayments: (params: GetUserPaymentsParams = {}) => {
      const { page = 1, limit = 10, status, sort = "createdAt", order = "ASC" } = params;
      const statusParam = status ? `&status=${status}` : "";
      return client.get<UserPaymentsResponse>(
        `/api/payments?page=${page}&limit=${limit}&sort=${sort}&order=${order}${statusParam}`
      );
    },
  };
}