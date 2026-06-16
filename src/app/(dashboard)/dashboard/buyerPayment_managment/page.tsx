import { getToken } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import { UserPaymentsAPI, UserPaymentsResponse } from "@/util/service/api/DashboardApis/user_payments_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import UserPaymentsPage from "./UserPaymentsPage"

const PAGE_SIZE = 10;

export default async function Page() {
  const token = await getToken();

  if (!token) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-sm text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }
  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);
  const api = UserPaymentsAPI(client);
  const result = await handleAsyncAction(api.getPayments({ page: 1, limit: PAGE_SIZE }));

  const initialData: UserPaymentsResponse = result.success
    ? result.data
    : { payments: [], totalCount: 0 };

  return <UserPaymentsPage token={token} initialData={initialData} />;
}