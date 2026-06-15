"use client";
import { useRouter } from 'next/navigation'
import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { ApiClient } from "@/util/service/api/apiClient";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import {
  UserPaymentsAPI,
  UserPayment,
  PaymentStatus,
  UserPaymentsResponse,
} from "@/util/service/api/DashboardApis/user_payments_api";

function formatAmount(amount: string) {
  return Number(amount).toLocaleString("fa-IR") + " تومان";
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fa-IR", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string; border: string }> = {
  completed: { label: "تایید شده",  dot: "bg-green-500",  bg: "bg-green-50",  text: "text-green-700", border: "border-green-200" },
  pending:   { label: "تایید نشده", dot: "bg-red-400",    bg: "bg-red-50",    text: "text-red-600",   border: "border-red-200"   },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selected = options.find(o => o.value === value)?.label ?? label;

  return (
    <div className="relative" ref={ref} dir="rtl">
      <p className="text-xs text-gray-400 mb-1 text-right">: {label}</p>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 bg-white hover:border-gray-300 min-w-[110px] justify-between transition-colors"
      >
        <span className={`text-gray-400 transition-transform duration-200 text-xs ${open ? "rotate-180" : ""}`}>▾</span>
        <span>{selected}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-[130px] overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`block w-full text-right px-4 py-2 text-sm transition-colors ${
                opt.value === value ? "bg-green-50 text-green-600 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function Pagination({ current, total, onChange, disabled }: {
  current: number; total: number; onChange: (p: number) => void; disabled: boolean;
}) {
  if (total <= 1) return null;

  const pages = total <= 7
    ? Array.from({ length: total }, (_, i) => i + 1)
    : [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 flex-wrap" dir="rtl">
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)} disabled={disabled}
          className={`w-7 h-7 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
            p === current
              ? "bg-green-500 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}>
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 7 && (
        <>
          <span className="text-gray-400 text-sm px-1">...</span>
          <button onClick={() => onChange(total)} disabled={disabled}
            className={`w-7 h-7 rounded border text-sm font-medium transition-colors disabled:opacity-50 ${
              current === total
                ? "bg-green-500 text-white border-green-500"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

function PaymentCard({ payment }: { payment: UserPayment }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <StatusBadge status={payment.status} />
        <span className="text-xs text-gray-400">{formatDate(payment.createdAt)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400 block mb-0.5">شماره پیگیری</span>
          <span className="text-gray-700 font-medium">{toPersianDigits(payment.bookingId)}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">مبلغ</span>
          <span className="font-bold text-gray-800">{formatAmount(payment.amount)}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 block mb-0.5">نوع تراکنش</span>
          <span className="text-gray-600">{payment.description}</span>
        </div>
      </div>
      {payment.paymentUrl && (
        <a href={payment.paymentUrl} target="_blank" rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-xs">
          مشاهده رسید ←
        </a>
      )}
    </div>
  );
}

const PAGE_SIZE = 10;

const statusOptions = [
  { value: "",          label: "همه" },
  { value: "completed", label: "تایید شده" },
  { value: "pending",   label: "تایید نشده" },
];

const typeOptions = [
  { value: "",               label: "همه" },
  { value: "رزرو",           label: "رزرو" },
  { value: "شارژ کیف پول",   label: "شارژ کیف پول" },
];

interface Props {
  token: string;
  initialData: UserPaymentsResponse;
}

export default function UserPaymentsPage({ token, initialData }: Props) {
  const [payments, setPayments]         = useState<UserPayment[]>(initialData.payments);
  const [totalCount, setTotalCount]     = useState(initialData.totalCount);
  const [page, setPage]                 = useState(1);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "">("");
  const [typeFilter, setTypeFilter]     = useState("");
  const [isFetching, startTransition]   = useTransition();
  const [error, setError]               = useState<string | null>(null);

  const getApi = useCallback(
    () => UserPaymentsAPI(new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)),
    [token]
  );

  const fetchPage = useCallback((p: number, status: PaymentStatus | "" = statusFilter) => {
    startTransition(async () => {
      setError(null);
      const res = await handleAsyncAction(
        getApi().getPayments({ page: p, limit: PAGE_SIZE, status })
      );
      if (res.success) {
        setPayments(res.data.payments);
        setTotalCount(res.data.totalCount);
        setPage(p);
      } else {
        setError(res.message ?? "خطا در دریافت اطلاعات");
      }
    });
  }, [statusFilter, getApi]);

  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status as PaymentStatus | "");
    fetchPage(1, status as PaymentStatus | ""); 
  }, [fetchPage]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-5" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-dashed border-gray-200 flex-wrap">
          <span className="text-sm font-semibold text-gray-700 pt-5">
            لیست تراکنش های شما
          </span>
          <div className="flex items-end gap-3 flex-wrap">
            <FilterSelect
              label="وضعیت پرداخت"
              value={statusFilter}
              options={statusOptions}
              onChange={handleStatusChange}
            />
            {/* <FilterSelect
              label="نوع تراکنش"
              value={typeFilter}
              options={typeOptions}
              onChange={setTypeFilter}
            /> */}
          </div>
        </div>

        {isFetching && (
          <div className="py-14 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400 mt-2">در حال بارگذاری...</p>
          </div>
        )}

        {!isFetching && error && (
          <div className="py-10 text-center text-sm text-red-400">{error}</div>
        )}

        {!isFetching && !error && (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["تاریخ", "شماره پیگیری", "مبلغ", "وضعیت پرداخت", "نوع تراکنش", ""].map(h => (
                      <th key={h} className="py-3 px-5 text-right text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-14 text-center text-sm text-gray-400">تراکنشی یافت نشد</td>
                    </tr>
                  ) : payments.map((row, i) => (
                    <tr key={row.id ?? i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-5 text-xs text-gray-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="py-3 px-5 text-gray-700">{toPersianDigits(row.bookingId)}</td>
                      <td className="py-3 px-5 font-medium text-gray-800 whitespace-nowrap">{formatAmount(row.amount)}</td>
                      <td className="py-3 px-5"><StatusBadge status={row.status} /></td>
                      <td className="py-3 px-5 text-gray-600">{row.description}</td>
                      <td className="py-3 px-5">
                        {row.paymentUrl && (
                          <button 
                            onClick={() => router.push(row.paymentUrl)}
                            className="text-blue-400 hover:text-blue-500 hover:underline text-xs whitespace-nowrap transition-colors"
                          >
                            مشاهده رسید
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden divide-y divide-gray-50 px-4 py-3 space-y-3">
              {payments.length === 0
                ? <div className="py-10 text-center text-sm text-gray-400">تراکنشی یافت نشد</div>
                : payments.map((row, i) => <PaymentCard key={row.id ?? i} payment={row} />)
              }
            </div>
          </>
        )}

        {!isFetching && totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <Pagination
              current={page}
              total={totalPages}
              onChange={p => fetchPage(p, statusFilter)}
              disabled={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
}