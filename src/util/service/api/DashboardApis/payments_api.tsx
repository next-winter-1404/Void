import { ApiClient } from "../apiClient";

export type Payment = {
  id: number;
  userId: number;
  bookingId: number | null;
  amount: string;
  description: string;
  status: "pending" | "verified" | "failed";
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type PaymentsResponse = {
  payments: Payment[];
  totalCount: number;
};

export type PaymentStatus = "pending" | "verified" | "failed" | "";
export type PaymentSort = "createdAt" | "amount" | "";
export type PaymentOrder = "ASC" | "DESC";

export function PaymentsAPI(client: ApiClient) {
  return {
    getPayments: (
      page: number,
      limit: number,
      status: PaymentStatus = "",
      sort: PaymentSort = "",
      order: PaymentOrder = "DESC"
    ) => {
      const statusParam = status ? `&status=${status}` : "";
      const sortParam = sort ? `&sort=${sort}` : "";
      return client.get<PaymentsResponse>(
        `/api/payments?page=${page}&limit=${limit}&order=${order}${statusParam}${sortParam}`
      );
    },
  };
}
