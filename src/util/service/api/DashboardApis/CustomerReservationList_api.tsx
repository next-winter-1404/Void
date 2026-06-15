import { ApiClient } from "@/util/service/api/apiClient";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface TravelerDetail {
  gender: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  nationalId: string;
}

export interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: string[];
  traveler_details: TravelerDetail[];
  status: BookingStatus;
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  house: {
    title: string;
    price: string;
  };
}

export interface BookingsResponse {
  data: Booking[];
  totalCount: number;
}

export interface GetBookingsParams {
  page?: number;
  limit?: number;
  status?: BookingStatus | "";
  search?: string;
  startDate?: string;
  endDate?: string;
}

export function CustomerReservationAPI(client: ApiClient) {
  return {
    getBookings: (params: GetBookingsParams = {}) => {
      const { page = 1, limit = 10, status, search, startDate, endDate } = params;
      const q = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort: "created_at",
        order: "DESC",
      });
      if (status)    q.set("status", status);
      if (search)    q.set("search", search);
      if (startDate) q.set("startDate", startDate);
      if (endDate)   q.set("endDate", endDate);
      return client.get<BookingsResponse>(`/api/bookings?${q}`);
    },

    getBookingById: (id: number) =>
      client.get<Booking>(`/api/bookings/${id}`),

    deleteBooking: (id: number) =>
      client.delete(`/api/bookings/${id}`),
  };
}