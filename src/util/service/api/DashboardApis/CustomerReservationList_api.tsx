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
}

export function CustomerReservationAPI(client: ApiClient) {
  return {
    getBookings: (params: GetBookingsParams = {}) => {
      const { page = 1, limit = 10, status } = params;
      const statusParam = status ? `&status=${status}` : "";
      return client.get<BookingsResponse>(
        `/api/bookings?page=${page}&limit=${limit}${statusParam}`
      );
    },

    getBookingById: (id: number) =>
      client.get<Booking>(`/api/bookings/${id}`),

    deleteBooking: (id: number) =>
      client.delete(`/api/bookings/${id}`),
  };
}