"use client";
// import checked from '@/assets/Images/Dashboard/checked.png'
import { useState, useCallback, useTransition } from "react";
import { CheckCircle, ChevronDown, Bell, BellOff } from "lucide-react";
import { ApiClient } from "@/util/service/api/apiClient";
import {
  NotificationsAPI,
  type Notification,
  type NotificationsResponse,
  type FilterType,
} from "@/util/service/api/DashboardApis/notifications_api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";

function formatPersianDate(iso: string) {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
    const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    return `${time} – ${date}`;
  } catch {
    return iso;
  }
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function Pagination({
  current,
  total,
  onChange,
  disabled,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
  disabled: boolean;
}) {
  if (total <= 1) return null;

  const visiblePages = total <= 6
    ? Array.from({ length: total }, (_, i) => i + 1)
    : [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1.5 flex-wrap" dir="rtl">
      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          disabled={disabled}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
            p === current
              ? "bg-green-400 text-white shadow-sm shadow-green-200"
              : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
          }`}
        >
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 6 && (
        <>
          <span className="text-gray-300 text-sm">•••</span>
          <button
            onClick={() => onChange(total)}
            disabled={disabled}
            className={`w-8 h-8 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 ${
              current === total
                ? "bg-green-400 text-white border-green-400 shadow-sm shadow-green-200"
                : "border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
            }`}
          >
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
  disabled,
}: {
  value: FilterType;
  onChange: (v: FilterType) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const options: FilterType[] = ["همه", "خوانده شده", "خوانده نشده"];

  return (
    <div className="relative" dir="rtl">
      <p className="text-xs text-gray-400 mb-1 text-center">: نوع اعلان</p>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white hover:border-green-300 hover:text-green-600 min-w-[110px] justify-between transition-colors disabled:opacity-50"
      >
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span>{value}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-[130px] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`block w-full text-right px-4 py-2.5 text-sm transition-colors ${
                opt === value
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationCard({
  notification,
  onMarkRead,
  isPending,
}: {
  notification: Notification;
  onMarkRead: (id: number) => void;
  isPending: boolean;
}) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      notification.isRead
        ? "bg-white border-gray-100"
        : "bg-green-50/40 border-green-100"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
          notification.isRead ? "bg-gray-100" : "bg-green-100"
        }`}>
          {notification.isRead
            ? <BellOff size={13} className="text-gray-400" />
            : <Bell size={13} className="text-green-500" />
          }
        </div>

        <div className="flex-1 min-w-0 text-right">
          <p className={`text-sm font-medium leading-relaxed ${notification.isRead ? "text-gray-500" : "text-gray-800"}`}>
            {notification.title}
          </p>
          {notification.message && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{notification.message}</p>
          )}
          <p className="text-xs text-gray-300 mt-1.5">
            {formatPersianDate(notification.createdAt ?? notification.created_at)}
          </p>
        </div>
      </div>

      {!notification.isRead && (
        <button
          onClick={() => onMarkRead(notification.id)}
          disabled={isPending}
          className="mt-3 w-full flex items-center justify-center gap-1.5 bg-green-400 hover:bg-green-500 disabled:opacity-60 text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          <CheckCircle size={13} />
          علامت‌گذاری به عنوان خوانده شده
        </button>
      )}
    </div>
  );
}

function NotificationRow({
  notification,
  onMarkRead,
  isPending,
}: {
  notification: Notification;
  onMarkRead: (id: number) => void;
  isPending: boolean;
}) {
  return (
    <tr className={`border-b border-gray-50 transition-colors ${
      notification.isRead ? "hover:bg-gray-50/30" : "bg-green-50/20 hover:bg-green-50/40"
    }`}>
      <td className="py-3.5 px-5">
        <div className="flex items-center gap-2.5 justify-start">
          {!notification.isRead && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
          )}
          <span className={`text-sm ${notification.isRead ? "text-gray-500" : "text-gray-800 font-medium"}`}>
            {notification.title}
          </span>
          {notification.message && (
            <span className="text-gray-400 text-xs hidden lg:inline"> – {notification.message}</span>
          )}
        </div>
      </td>
      <td className="py-3.5 px-5 text-right text-xs text-gray-400 whitespace-nowrap">
        {formatPersianDate(notification.createdAt ?? notification.created_at)}
      </td>
      <td className="py-3.5 px-5 text-left">
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            disabled={isPending}
            className="flex items-center gap-1.5 bg-green-400 hover:bg-green-500 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            <CheckCircle size={12} />
            <span className="hidden sm:inline">علامت‌گذاری به عنوان خوانده شده</span>
            <span className="sm:hidden">خوانده شد</span>
          </button>
        )}
      </td>
    </tr>
  );
}

function SectionDividerRow({
  label,
  onToggle,
  open,
  count,
}: {
  label: string;
  onToggle: () => void;
  open: boolean;
  count: number;
}) {
  return (
    <tr className="cursor-pointer select-none group" onClick={onToggle}>
      <td colSpan={3} className="py-2 px-5 bg-gray-50 border-y border-gray-100">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
            {label}
          </span>
          <span className="text-xs text-gray-300 bg-gray-100 rounded-full px-1.5 py-0.5 leading-none">
            {toPersianDigits(count)}
          </span>
          <ChevronDown
            size={12}
            className={`text-gray-300 transition-transform duration-200 group-hover:text-gray-500 ${open ? "" : "-rotate-90"}`}
          />
        </div>
      </td>
    </tr>
  );
}

function SectionDividerMobile({
  label,
  onToggle,
  open,
  count,
}: {
  label: string;
  onToggle: () => void;
  open: boolean;
  count: number;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-end gap-2 py-2 px-1 group"
    >
      <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{label}</span>
      <span className="text-xs text-gray-300 bg-gray-100 rounded-full px-1.5 py-0.5 leading-none">
        {toPersianDigits(count)}
      </span>
      <ChevronDown
        size={12}
        className={`text-gray-300 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
      />
    </button>
  );
}

const PAGE_SIZE = 5;

interface Props {
  userId: number;
  token: string;
  initialData: NotificationsResponse;
  pageSize: number;
}

export default function NotificationsPage({ userId, token, initialData }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>(initialData.data);
  const [totalCount, setTotalCount]         = useState(initialData.totalCount);
  const [page, setPage]                     = useState(1);
  const [filter, setFilter]                 = useState<FilterType>("همه");
  const [unreadOpen, setUnreadOpen]         = useState(true);
  const [readOpen, setReadOpen]             = useState(true);
  const [error, setError]                   = useState<string | null>(null);
  const [isFetching, startFetchTransition]  = useTransition();
  const [markingId, setMarkingId]           = useState<number | null>(null);
  const [isMarkingAll, setIsMarkingAll]     = useState(false);

  const getApi = useCallback(
    () => NotificationsAPI(new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)),
    [token]
  );

  const fetchPage = useCallback(
    (p: number, f: FilterType = filter) => {
      startFetchTransition(async () => {
        setError(null);
        const res = await handleAsyncAction(getApi().getNotifications(userId, p, PAGE_SIZE, f));
        if (res.success) {
          setNotifications(res.data.data);
          setTotalCount(res.data.totalCount);
          setPage(p);
        } else {
          setError(res.message ?? "خطا در دریافت اعلان‌ها");
        }
      });
    },
    [userId, filter, getApi]
  );

  const handleFilterChange = useCallback(
    (f: FilterType) => { setFilter(f); fetchPage(1, f); },
    [fetchPage]
  );

  const handleMarkRead = useCallback(async (id: number) => {
    setMarkingId(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    const res = await handleAsyncAction(getApi().markAsRead(id));
    setMarkingId(null);
    if (!res.success) {
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: false } : n));
    }
  }, [getApi]);

  const handleMarkAllRead = useCallback(async () => {
    setIsMarkingAll(true);
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    await Promise.all(unreadIds.map((id) => handleAsyncAction(getApi().markAsRead(id))));
    fetchPage(page, filter);
    setIsMarkingAll(false);
  }, [notifications, page, filter, getApi, fetchPage]);

  const unread = notifications.filter((n) => !n.isRead);
  const read   = notifications.filter((n) => n.isRead);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasUnread  = unread.length > 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
          
          

          
          <h1 className="text-sm sm:text-base font-bold text-gray-800 order-first sm:order-none w-full sm:w-auto text-center sm:text-right">
            لیست اعلان های شما
          </h1>

          
          <div className='flex gap-5' >
            <FilterDropdown value={filter} onChange={handleFilterChange} disabled={isFetching} />
            <button
              onClick={handleMarkAllRead}
              disabled={isMarkingAll || !hasUnread || isFetching}
              className="flex items-center gap-2 bg-green-400 hover:bg-green-500 active:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-3 sm:px-4 py-2 rounded-xl transition-colors whitespace-nowrap shadow-sm shadow-green-200"
            >
              <CheckCircle size={15} />
              <span className="hidden xs:inline">علامت‌گذاری به عنوان خوانده شده</span>
              <span className="xs:hidden"> خواندن همه به عنوان خوانده شده</span>
            </button>
          </div>
        </div>

        
        {isFetching && (
          <div className="py-16 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400 mt-3">در حال بارگذاری...</p>
          </div>
        )}

        
        {!isFetching && error && (
          <div className="py-10 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => fetchPage(page, filter)}
              className="mt-3 text-xs text-green-500 hover:text-green-600 underline"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        
        {!isFetching && !error && (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-300 border-b rounded- border-gray-100">
                    <th className="py-3 px-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">اعلان</th>
                    <th className="py-3 px-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">تاریخ</th>
                    <th className="py-3 px-5 w-48" />
                  </tr>
                </thead>
                <tbody>
                  {unread.length > 0 && (
                    <>
                      <SectionDividerRow
                        label="خوانده نشده"
                        onToggle={() => setUnreadOpen((o) => !o)}
                        open={unreadOpen}
                        count={unread.length}
                      />
                      {unreadOpen && unread.map((n) => (
                        <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} isPending={markingId === n.id} />
                      ))}
                    </>
                  )}
                  {read.length > 0 && (
                    <>
                      <SectionDividerRow
                        label="خوانده شده"
                        onToggle={() => setReadOpen((o) => !o)}
                        open={readOpen}
                        count={read.length}
                      />
                      {readOpen && read.map((n) => (
                        <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} isPending={markingId === n.id} />
                      ))}
                    </>
                  )}
                  {notifications.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-16 text-center">
                        <Bell size={28} className="mx-auto text-gray-200 mb-2" />
                        <p className="text-sm text-gray-400">اعلانی یافت نشد</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            
            <div className="md:hidden px-4 py-3 space-y-3">
              {unread.length > 0 && (
                <div>
                  <SectionDividerMobile
                    label="خوانده نشده"
                    onToggle={() => setUnreadOpen((o) => !o)}
                    open={unreadOpen}
                    count={unread.length}
                  />
                  {unreadOpen && (
                    <div className="space-y-2 mt-1">
                      {unread.map((n) => (
                        <NotificationCard key={n.id} notification={n} onMarkRead={handleMarkRead} isPending={markingId === n.id} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {read.length > 0 && (
                <div>
                  <SectionDividerMobile
                    label="خوانده شده"
                    onToggle={() => setReadOpen((o) => !o)}
                    open={readOpen}
                    count={read.length}
                  />
                  {readOpen && (
                    <div className="space-y-2 mt-1">
                      {read.map((n) => (
                        <NotificationCard key={n.id} notification={n} onMarkRead={handleMarkRead} isPending={markingId === n.id} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {notifications.length === 0 && (
                <div className="py-12 text-center">
                  <Bell size={28} className="mx-auto text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">اعلانی یافت نشد</p>
                </div>
              )}
            </div>
          </>
        )}

        
        {!isFetching && totalPages > 1 && (
          <div className="px-4 sm:px-5 py-4 border-t border-gray-100 flex justify-end">
            <Pagination
              current={page}
              total={totalPages}
              onChange={(p) => fetchPage(p, filter)}
              disabled={isFetching}
            />
          </div>
        )}

      </div>
    </div>
  );
}