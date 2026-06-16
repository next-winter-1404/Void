"use client";

import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ApiClient } from "@/util/service/api/apiClient";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { ActionMenu } from "@/components/dashboard/DashboardComps/ReUsableTable/ui/ActionMenu";
import {
  CustomerReservationAPI,
  Booking,
  BookingStatus,
  BookingsResponse,
} from "@/util/service/api/DashboardApis/CustomerReservationList_api";

function formatDate(iso: string | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fa-IR", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function formatAmount(price: string | undefined) {
  if (!price) return "—";
  return Number(price).toLocaleString("fa-IR") + " تومان";
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

type StatusType = "تایید شده" | "لغو شده" | "در انتظار";

const statusStyles: Record<StatusType, string> = {
  "تایید شده": "bg-green-100 text-green-700 border border-green-300",
  "لغو شده":   "bg-red-100 text-red-500 border border-red-300",
  "در انتظار": "bg-yellow-100 text-yellow-700 border border-yellow-300",
};

const statusIcons: Record<StatusType, string> = {
  "تایید شده": "✓",
  "لغو شده":   "✕",
  "در انتظار": "●",
};

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <span>{statusIcons[status]}</span>
      {status}
    </span>
  );
}

const statusMap: Record<BookingStatus, StatusType> = {
  confirmed: "تایید شده",
  pending:   "در انتظار",
  cancelled: "لغو شده",
  completed: "تایید شده",
};

function FilterDropdown({
  onApply, initialStatus, initialStartDate, initialEndDate,
}: {
  onApply: (status: BookingStatus | "", startDate: string, endDate: string) => void;
  initialStatus: BookingStatus | "";
  initialStartDate: string;
  initialEndDate: string;
}) {
  const [open, setOpen]           = useState(false);
  const [status, setStatus]       = useState<BookingStatus | "">(initialStatus);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate]     = useState(initialEndDate);
  const ref                       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasActive = !!(initialStatus || initialStartDate || initialEndDate);

  return (
    <div className="relative" ref={ref} dir="rtl">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 bg-green-400 hover:bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
      >
        فیلتر ها
        {hasActive && <span className="w-2 h-2 rounded-full bg-white opacity-80 shrink-0" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-5" style={{ width: '400px', maxWidth: 'calc(100vw - 1rem)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">فیلتر ها</h3>
            <button onClick={() => setOpen(false)} className="flex items-center gap-1 text-xs text-red-400 border border-red-300 rounded-full px-3 py-1 hover:bg-red-50 transition-colors">
              <span>✕</span> بستن
            </button>
          </div>
          <div className="space-y-3 border-t border-dashed border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative border border-gray-200 rounded-xl px-3 py-2.5">
                <label className="absolute -top-2 right-3 bg-white px-1 text-xs text-gray-400">تاریخ رفت</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs shrink-0">📅</span>
                  <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="۱۴۰۴-۰۱-۰۱"
                    className="outline-none text-sm text-gray-700 w-full text-right bg-transparent" />
                </div>
              </div>
              <div className="relative border border-gray-200 rounded-xl px-3 py-2.5">
                <label className="absolute -top-2 right-3 bg-white px-1 text-xs text-gray-400">تاریخ برگشت</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs shrink-0">📅</span>
                  <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="۱۴۰۴-۱۲-۲۹"
                    className="outline-none text-sm text-gray-700 w-full text-right bg-transparent" />
                </div>
              </div>
            </div>
            <div className="relative border border-gray-200 rounded-xl px-3 py-2.5">
              <label className="absolute -top-2 right-3 bg-white px-1 text-xs text-gray-400">وضعیت رزرو</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs shrink-0">▾</span>
                <select value={status} onChange={e => setStatus(e.target.value as any)}
                  className="outline-none text-sm text-gray-700 w-full appearance-none bg-transparent cursor-pointer text-right">
                  <option value="">همه</option>
                  <option value="confirmed">تایید شده</option>
                  <option value="pending">در انتظار</option>
                  <option value="cancelled">لغو شده</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => { setStatus(""); setStartDate(""); setEndDate(""); onApply("", "", ""); setOpen(false); }}
              className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors">
              پاک کردن
            </button>
            <button onClick={() => { onApply(status, startDate, endDate); setOpen(false); }}
              className="flex-1 bg-green-400 hover:bg-green-500 text-white font-medium py-2 rounded-xl transition-colors text-sm">
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-xs text-red-400 border border-red-200 rounded-full px-2.5 py-1 hover:bg-red-50 transition-colors">
      <span>✕</span> بستن
    </button>
  );
}

function DetailWindows({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const [activeWindow, setActiveWindow] = useState<"main" | "payments" | "reservations" | "travelers">("main");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-4 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-800 truncate">{booking.house.title}</h2>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400 text-xs">★ ★ ★ ★ ★</span>
              <span className="text-xs text-gray-400 mr-1">۵ ستاره</span>
            </div>
          </div>
          <CloseButton onClick={onClose} />
        </div>
        <div className="p-4 text-xs text-gray-400 leading-relaxed border-b border-gray-100">
          اطلاعات اقامتگاه و جزئیات رزرو شما در این بخش نمایش داده می‌شود.
        </div>
        <div className="px-4 py-2 border-b border-gray-100 flex flex-wrap gap-3 text-xs text-gray-500">
          <span>📍 {booking.house.title}</span>
          <span>👥 {toPersianDigits(booking.traveler_details?.length ?? 0)} نفر</span>
        </div>
        <div className="px-4 py-2 flex gap-2 flex-wrap border-b border-gray-100">
          {["بالکن", "مسکونی", "آپارتمان"].map((tag, i) => (
            <span key={i} className="text-xs border border-gray-200 rounded-full px-2.5 py-0.5 text-gray-500">{tag}</span>
          ))}
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-right">
            <span className="text-xs text-gray-400">قیمت خرید:</span>
            <span className="text-sm font-bold text-gray-800 mr-1">{formatAmount(booking.house.price)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveWindow("reservations")} className="text-xs bg-green-400 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg transition-colors">رزرو ها</button>
            <button onClick={() => setActiveWindow("payments")} className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition-colors">پرداختی ها</button>
          </div>
        </div>
        {activeWindow === "payments" && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-700">لیست پرداختی ها</h3>
              <CloseButton onClick={() => setActiveWindow("main")} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="py-2 px-4 text-right text-gray-500 font-medium">تاریخ</th>
                    <th className="py-2 px-4 text-right text-gray-500 font-medium">شماره پیگیری</th>
                    <th className="py-2 px-4 text-right text-gray-500 font-medium">مبلغ</th>
                    <th className="py-2 px-4" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-2.5 px-4 text-gray-600">{formatDate(booking.createdAt)}</td>
                    <td className="py-2.5 px-4 text-gray-600">{toPersianDigits(booking.id)}</td>
                    <td className="py-2.5 px-4 font-medium text-gray-700">{formatAmount(booking.house.price)}</td>
                    <td className="py-2.5 px-4"><button className="text-blue-400 hover:underline text-xs">مشاهده رسید</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeWindow === "reservations" && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-700">لیست رزرو ها</h3>
              <CloseButton onClick={() => setActiveWindow("main")} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="py-2 px-4 text-right text-gray-500 font-medium">تاریخ</th>
                    <th className="py-2 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {booking.reservedDates?.length >= 2 ? (
                    <tr className="border-b border-gray-50">
                      <td className="py-2.5 px-4 text-gray-600">
                        {formatDate(booking.reservedDates[0])} تا {formatDate(booking.reservedDates[1])}
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setActiveWindow("travelers")} className="text-blue-400 hover:underline text-xs whitespace-nowrap">اطلاعات مسافر ها</button>
                      </td>
                    </tr>
                  ) : (
                    <tr><td colSpan={2} className="py-4 text-center text-gray-400">تاریخی ثبت نشده</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeWindow === "travelers" && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-700">لیست مسافر ها</h3>
              <CloseButton onClick={() => setActiveWindow("reservations")} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="py-2 px-3 text-right text-gray-500 font-medium">نام</th>
                    <th className="py-2 px-3 text-right text-gray-500 font-medium">کد ملی</th>
                    <th className="py-2 px-3 text-right text-gray-500 font-medium">جنسیت</th>
                    <th className="py-2 px-3 text-right text-gray-500 font-medium">تاریخ تولد</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.traveler_details?.map((t, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-3 text-gray-700">{t.firstName} {t.lastName}</td>
                      <td className="py-2.5 px-3 text-gray-600">{t.nationalId}</td>
                      <td className="py-2.5 px-3 text-gray-600">{t.gender}</td>
                      <td className="py-2.5 px-3 text-gray-600">{t.birthDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DeleteConfirm({ booking, onConfirm, onCancel, loading }: {
  booking: Booking; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 z-10 text-center">
        <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-red-500 text-lg">✕</span>
        </div>
        <h2 className="text-sm font-bold text-gray-800 mb-1.5">حذف رزرو</h2>
        <p className="text-xs text-gray-500 mb-5">
          آیا از حذف رزرو <strong className="text-gray-700">{booking.house.title}</strong> مطمئن هستید؟
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50">انصراف</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 bg-red-400 hover:bg-red-500 disabled:opacity-60 text-white py-2 rounded-xl text-sm">
            {loading ? "..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReservationCard({ booking, onDetail, onDelete, onConfirm, onCancel }: {
  booking: Booking; onDetail: () => void; onDelete: () => void;
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-gray-800">{booking.house.title}</span>
        <ActionMenu actions={[
          { label: "تایید رزرو", icon: "✓", onClick: onConfirm },
          { label: "لغو رزرو",  icon: "✕", onClick: onCancel,  className: "text-orange-500" },
          { label: "جزئیات",    icon: "☰", onClick: onDetail },
          { label: "حذف",       icon: "✕", onClick: onDelete,  className: "text-red-500" },
        ]} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400 block mb-0.5">تعداد مسافر</span>
          <span className="text-gray-700">{toPersianDigits(booking.traveler_details?.length ?? 0)} عدد مسافر</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">تاریخ رزرو</span>
          <span className="text-gray-700">{booking.reservedDates?.[0] ? formatDate(booking.reservedDates[0]) : "—"}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">قیمت کل</span>
          <span className="font-medium text-gray-800">{formatAmount(booking.house.price)}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">وضعیت رزرو</span>
          <StatusBadge status={statusMap[booking.status] ?? "در انتظار"} />
        </div>
      </div>
    </div>
  );
}

function Pagination({ current, total, onChange, disabled }: {
  current: number; total: number; onChange: (p: number) => void; disabled: boolean;
}) {
  if (total <= 1) return null;
  const pages = total <= 7 ? Array.from({ length: total }, (_, i) => i + 1) : [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1 flex-wrap" dir="rtl">
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} disabled={disabled}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${p === current ? "bg-green-400 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"}`}>
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 7 && (
        <>
          <span className="text-gray-300 text-sm">•••</span>
          <button onClick={() => onChange(total)} disabled={disabled}
            className={`w-8 h-8 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 ${current === total ? "bg-green-400 text-white border-green-400" : "border-gray-200 text-gray-600 hover:border-green-300"}`}>
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

const PAGE_SIZE = 10;

interface Props {
  token: string;
  initialData: BookingsResponse;
  initialStatus: BookingStatus | "";
  initialSearch: string;
  initialStartDate: string;
  initialEndDate: string;
  initialPage: number;
}

export default function ReservationListPage({
  token, initialData, initialStatus, initialSearch, initialStartDate, initialEndDate, initialPage,
}: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const [bookings, setBookings]           = useState<Booking[]>(initialData.data);
  const [totalCount, setTotalCount]       = useState(initialData.totalCount);
  const [page, setPage]                   = useState(initialPage);
  const [statusFilter, setStatusFilter]   = useState<BookingStatus | "">(initialStatus);
  const [startDate, setStartDate]         = useState(initialStartDate);
  const [endDate, setEndDate]             = useState(initialEndDate);
  const [search, setSearch]               = useState(initialSearch);
  const [isFetching, startTransition]     = useTransition();
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [deleteBooking, setDeleteBooking] = useState<Booking | null>(null);
  const [isDeleting, setIsDeleting]       = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const searchTimeout                     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushParams = useCallback((params: Record<string, string>) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) q.set(k, v); });
    router.push(`${pathname}?${q}`);
  }, [router, pathname]);

  const getApi = useCallback(
    () => CustomerReservationAPI(new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)),
    [token]
  );

  const fetchPage = useCallback((
    p: number,
    status: BookingStatus | "" = statusFilter,
    q: string = search,
    sd: string = startDate,
    ed: string = endDate,
  ) => {
    startTransition(async () => {
      setError(null);
      const res = await handleAsyncAction(
        getApi().getBookings({ page: p, limit: PAGE_SIZE, status, search: q, startDate: sd, endDate: ed })
      );
      if (res.success) {
        setBookings(res.data.data);
        setTotalCount(res.data.totalCount);
        setPage(p);
        pushParams({ page: String(p), status, search: q, startDate: sd, endDate: ed });
      } else {
        setError(res.message ?? "خطا در دریافت اطلاعات");
      }
    });
  }, [statusFilter, search, startDate, endDate, getApi, pushParams]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchPage(1, statusFilter, value, startDate, endDate);
    }, 400);
  }, [fetchPage, statusFilter, startDate, endDate]);

  const handleFilterApply = useCallback((status: BookingStatus | "", sd: string, ed: string) => {
    setStatusFilter(status);
    setStartDate(sd);
    setEndDate(ed);
    fetchPage(1, status, search, sd, ed);
  }, [fetchPage, search]);

  const handleDelete = useCallback(async () => {
    if (!deleteBooking) return;
    setIsDeleting(true);
    const res = await handleAsyncAction(getApi().deleteBooking(deleteBooking.id));
    setIsDeleting(false);
    setDeleteBooking(null);
    if (res.success) fetchPage(page);
  }, [deleteBooking, page, getApi, fetchPage]);

 
  const handleConfirmBooking = useCallback(async (booking: Booking) => {
    const res = await handleAsyncAction(
      getApi().confirmBooking(booking.id)
    );
    if (res.success) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "confirmed" } : b));
    }
  }, [getApi]);

  
  const handleCancelBooking = useCallback(async (booking: Booking) => {
    const res = await handleAsyncAction(
      getApi().cancelBooking(booking.id)
    );
    if (res.success) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "cancelled" } : b));
    }
  }, [getApi]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

 
  const getRowActions = (row: Booking) => [
    { label: "تایید رزرو", icon: "✓", onClick: () => handleConfirmBooking(row) },
    { label: "لغو رزرو",  icon: "✕", onClick: () => handleCancelBooking(row),  className: "text-orange-500" },
    { label: "جزئیات",    icon: "☰", onClick: () => setDetailBooking(row) },
    { label: "حذف",       icon: "✕", onClick: () => setDeleteBooking(row),      className: "text-red-500" },
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-5" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-dashed border-gray-200 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">
            لیست رزرو های شما
            {totalCount > 0 && <span className="text-gray-400 font-normal mr-1">({toPersianDigits(totalCount)})</span>}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="نام مسافر مورد نظر ...."
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-green-400 w-36 sm:w-52 transition-colors"
            />
            <FilterDropdown
              onApply={handleFilterApply}
              initialStatus={statusFilter}
              initialStartDate={startDate}
              initialEndDate={endDate}
            />
          </div>
        </div>

        {isFetching && (
          <div className="py-12 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400 mt-2">در حال بارگذاری...</p>
          </div>
        )}

        {!isFetching && error && <div className="py-8 text-center text-sm text-red-400">{error}</div>}

        {!isFetching && !error && (
          <>
       
            <div className="hidden sm:block rounded-2xl border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
            
                    {["نام اقامتگاه","تعداد مسافر","تاریخ رزرو","قیمت کل","وضعیت رزرو","وضعیت پرداخت",""].map(h => (
                      <th key={h} className="py-3 px-4 text-right text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-400">رزروی یافت نشد</td></tr>
                  ) : bookings.map((row, i) => (
                    <tr key={row.id ?? i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{row.house.title}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{toPersianDigits(row.traveler_details?.length ?? 0)} عدد مسافر</td>
                      <td className="py-3 px-4 text-gray-600 text-xs whitespace-nowrap">{row.reservedDates?.[0] ? formatDate(row.reservedDates[0]) : "—"}</td>
                      <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{formatAmount(row.house.price)}</td>
                      <td className="py-3 px-4"><StatusBadge status={statusMap[row.status] ?? "در انتظار"} /></td>
                      <td className="py-3 px-4"><StatusBadge status={row.status === "confirmed" ? "تایید شده" : "در انتظار"} /></td>
                   
                      <td className="py-3 px-4">
                        <ActionMenu actions={getRowActions(row)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {bookings.length === 0
                ? <div className="py-12 text-center text-sm text-gray-400">رزروی یافت نشد</div>
                : bookings.map((row, i) => (
                    <ReservationCard
                      key={row.id ?? i}
                      booking={row}
                      onDetail={() => setDetailBooking(row)}
                      onDelete={() => setDeleteBooking(row)}
                      onConfirm={() => handleConfirmBooking(row)}
                      onCancel={() => handleCancelBooking(row)}
                    />
                  ))
              }
            </div>

            {totalPages > 1 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Pagination current={page} total={totalPages} onChange={(p) => fetchPage(p)} disabled={isFetching} />
              </div>
            )}
          </>
        )}
      </div>

      {detailBooking && <DetailWindows booking={detailBooking} onClose={() => setDetailBooking(null)} />}
      {deleteBooking && <DeleteConfirm booking={deleteBooking} onConfirm={handleDelete} onCancel={() => setDeleteBooking(null)} loading={isDeleting} />}
    </div>
  );
}