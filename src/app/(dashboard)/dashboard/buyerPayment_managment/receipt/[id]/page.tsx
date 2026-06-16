import { getToken } from "@/util/service/api/token";
import { ApiClient } from "@/util/service/api/apiClient";
import { UserPaymentsAPI, UserPayment, UserPaymentsResponse } from "@/util/service/api/DashboardApis/user_payments_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import ReceiptClient from "./RecieptClient";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const token = await getToken();

  if (!token) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-sm text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }
  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);
  const api = UserPaymentsAPI(client);
  const result = await handleAsyncAction(api.getPayments({ limit: 100 }));

  const payment: UserPayment | null = result.success
    ? (result.data as UserPaymentsResponse).payments?.find(
        (p) => String(p.id) === String(params.id)
      ) ?? null
    : null;

  return <ReceiptClient payment={payment} />;
}