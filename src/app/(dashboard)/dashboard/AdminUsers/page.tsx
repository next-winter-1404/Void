import { getToken } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import { AdminUsersAPI, AdminUsersResponse } from "@/util/service/api/DashboardApis/admin_users_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import AdminUsersPage from "./AdminUsersPage";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; email?: string; role?: string; membershipDate?: string };
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
  const api = AdminUsersAPI(client);
  const page = Number(searchParams.page ?? 1);

  const result = await handleAsyncAction(
    api.getUsers({
      page,
      limit: 10,
      email: searchParams.email,
      role: searchParams.role as any,
      membershipDate: searchParams.membershipDate,
    })
  );

  const initialData: AdminUsersResponse = result.success
    ? result.data
    : { data: [], totalCount: 0 };

  return (
    <AdminUsersPage
      token={token}
      initialData={initialData}
      initialPage={page}
      initialEmail={searchParams.email ?? ""}
      initialRole={(searchParams.role ?? "") as any}
    />
  );
}