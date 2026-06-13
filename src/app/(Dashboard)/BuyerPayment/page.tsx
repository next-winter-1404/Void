import { Api } from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import PaymentsTable from "./PaymentsTable";
import { Pagination } from "@/components/DashboardComps/ReUsableTable/ui/Pagination";
import type {
  PaymentStatus,
  PaymentSort,
  PaymentOrder,
} from "@/util/service/api/DashboardApis/payments_api";

const LIMIT = 10;

const STATUS_OPTIONS: { label: string; value: PaymentStatus }[] = [
  { label: "همه", value: "" },
  { label: "تایید شده", value: "verified" },
  { label: "تایید نشده", value: "pending" },
];

const SORT_OPTIONS: { label: string; value: PaymentSort }[] = [
  { label: "همه", value: "" },
  { label: "تاریخ", value: "createdAt" },
  { label: "مبلغ", value: "amount" },
];

type SearchParams = {
  page?: string;
  status?: PaymentStatus;
  sort?: PaymentSort;
  order?: PaymentOrder;
};

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const status = params.status ?? "";
  const sort = params.sort ?? "createdAt";
  const order = params.order ?? "ASC";

  const client = Api();
  const result= await handleAsyncAction(() =>
    client.getPayments(page, LIMIT, status, sort, order)
  );

  const payments = result?.payments ?? [];
  const totalCount = result?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

  function buildUrl(overrides: Partial<SearchParams>) {
    const next = { page, status, sort, order, ...overrides };
    const q = new URLSearchParams();
    if (next.page && next.page > 1) q.set("page", String(next.page));
    if (next.status) q.set("status", next.status);
    if (next.sort) q.set("sort", next.sort);
    if (next.order) q.set("order", next.order);
    return `/payments?${q.toString()}`;
  }

  return (
    <div className="p-6 space-y-4" dir="rtl">
      <h1 className="text-xl font-bold text-right">لیست تراکنش های شما</h1>


      <div className="flex items-center gap-4 flex-row-reverse">

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm">
          <span className="text-sm text-gray-500">وضعیت پرداخت</span>
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <a
                key={opt.value}
                href={buildUrl({ status: opt.value, page: 1 })}
                className={`text-xs px-2 py-1 rounded ${
                  status === opt.value
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>


        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm">
          <span className="text-sm text-gray-500">نوع تراکنش</span>
          <div className="flex gap-1">
            {SORT_OPTIONS.map((opt) => (
              <a
                key={opt.value}
                href={buildUrl({ sort: opt.value, page: 1 })}
                className={`text-xs px-2 py-1 rounded ${
                  sort === opt.value
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      
      {/* {error && (
        <p className="text-red-500 text-sm">خطا در بارگذاری تراکنش‌ها</p>
      )} */}


      <div className="bg-white rounded-xl shadow overflow-hidden">
        <PaymentsTable data={payments} />
      </div>


      <Pagination
        currentPage={page}
        totalPages={totalPages}
        buildUrl={(p) => buildUrl({ page: p })}
      />
    </div>
  );
}
