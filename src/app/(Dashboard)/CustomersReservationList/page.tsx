import { getToken } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import { CustomerReservationAPI, BookingsResponse } from "@/util/service/api/DashboardApis/CustomerReservationList_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import ReservationListPage from "./Reservationlistpage";

const PAGE_SIZE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; startDate?: string; endDate?: string; page?: string };
}) {
  const token = await getToken();

  if (!token) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-sm text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }

  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);
  const api = CustomerReservationAPI(client);

  const page   = Number(searchParams.page ?? 1);
  const status = (searchParams.status ?? "") as any;
  const search = searchParams.search ?? "";
  const startDate = searchParams.startDate ?? "";
  const endDate   = searchParams.endDate ?? "";

  const result = await handleAsyncAction(
    api.getBookings({ page, limit: PAGE_SIZE, status, search, startDate, endDate })
  );

  const initialData: BookingsResponse = result.success
    ? result.data
    : { data: [], totalCount: 0 };

  return (
    <ReservationListPage
      token={token}
      initialData={initialData}
      initialStatus={status}
      initialSearch={search}
      initialStartDate={startDate}
      initialEndDate={endDate}
      initialPage={page}
    />
  );
}