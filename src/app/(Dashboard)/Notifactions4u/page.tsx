import { getToken, getUserId } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import {
  NotificationsAPI,
  type NotificationsResponse,
} from "@/util/service/api/DashboardApis/notifications_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import NotificationsPage from "./NotificationsPage";

const PAGE_SIZE = 10;

export default async function Page() {
  const token = await getToken();
  const userId = await getUserId();

  if (!userId || !token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-sm text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }

  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);
  const api = NotificationsAPI(client);
  const result = await handleAsyncAction(api.getNotifications(userId, 1, PAGE_SIZE, "همه"));

  const initialData: NotificationsResponse = result.success
    ? result.data
    : { data: [], totalCount: 0 };

  return (
    <NotificationsPage
      userId={userId}
      token={token}
      initialData={initialData}
      pageSize={PAGE_SIZE}
    />
  );
}