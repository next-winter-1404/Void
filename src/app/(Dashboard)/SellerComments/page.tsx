import { getToken, getUserId } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import { SellerCommentsAPI, SellerCommentsResponse } from "@/util/service/api/DashboardApis/seller_comments_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import SellerCommentsPage from "./SellerCommentsPage";

const PAGE_SIZE = 10;

export default async function Page() {
  const token    = await getToken();
  const sellerId = await getUserId();

  if (!token || !sellerId) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-sm text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }

  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);
  const api    = SellerCommentsAPI(client);
  const result = await handleAsyncAction(
    api.getComments(sellerId, { page: 1, limit: PAGE_SIZE })
  );

  const initialData: SellerCommentsResponse = result.success
    ? result.data
    : { comments: [], totalCount: 0, currentPage: 1, totalPages: 1 };

  return (
    <SellerCommentsPage
      sellerId={sellerId}
      token={token}
      initialData={initialData}
    />
  );
}