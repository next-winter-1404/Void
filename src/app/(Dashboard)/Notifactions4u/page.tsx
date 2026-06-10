"use client";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";
import { ApiClient } from "@/util/service/api/apiClient";
import { NotificationsAPI, type Notification } from "@/util/service/api/DashboardApis/notifications_api";

const PAGE_SIZE = 10;

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function formatPersianDate(iso: string) {
  try {
    const d = new Date(iso);
    const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    return `۱۴۰۱ / ۱۲ مرداد – ${toPersianDigits(time)}`;
  } catch {
    return iso;
  }
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages = total <= 5 ? Array.from({ length: total }, (_, i) => i + 1) : [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1 mt-4" dir="rtl">
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)}
          className={`w-7 h-7 rounded text-sm font-medium transition-colors ${p === current ? "bg-green-400 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 5 && (
        <>
          <span className="text-gray-400 text-sm px-1">...</span>
          <button onClick={() => onChange(total)}
            className={`w-7 h-7 rounded border text-sm font-medium transition-colors ${current === total ? "bg-green-400 text-white border-green-400" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

function FilterDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const options = ["همه", "خوانده شده", "خوانده نشده"];
  return (
    <div className="relative" dir="rtl">
      <p className="text-xs text-gray-400 mb-1 text-center">:نوع اعلان</p>
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 min-w-[90px] justify-between">
        <ChevronDown size={14} className="text-gray-400" /><span>{value}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-sm z-10 min-w-[110px]">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className="block w-full text-right px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationRow({ notification, onMarkRead }: { notification: Notification; onMarkRead: (id: number) => void }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4 text-right text-sm text-gray-700 w-1/2">
        {notification.title}
        {notification.message && <span className="text-gray-400 text-xs mr-1">– {notification.message}</span>}
      </td>
      <td className="py-3 px-4 text-right text-sm text-gray-500">
        {formatPersianDate(notification.createdAt ?? notification.created_at)}
      </td>
      <td className="py-3 px-4 text-left">
        {!notification.isRead && (
          <button onClick={() => onMarkRead(notification.id)}
            className="flex items-center gap-1.5 bg-green-400 hover:bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors whitespace-nowrap">
            <CheckCircle size={13} />
            علامت‌گذاری به عنوان خوانده شده
          </button>
        )}
      </td>
    </tr>
  );
}

function SectionDivider({ label, onToggle, open }: { label: string; onToggle: () => void; open: boolean }) {
  return (
    <tr className="bg-gray-100 cursor-pointer select-none" onClick={onToggle}>
      <td colSpan={3} className="py-1.5 px-4">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm text-gray-500">{label}</span>
          <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "" : "-rotate-90"}`} />
        </div>
      </td>
    </tr>
  );
}

interface Props {
  userId: number;
  token?: string;
}

export default function NotificationsPage({ userId, token }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("همه");
  const [unreadOpen, setUnreadOpen] = useState(true);
  const [readOpen, setReadOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const resolvedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("token") ?? undefined : undefined);
      const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, resolvedToken);
      const api = NotificationsAPI(client);
      const res = await api.getNotifications(userId, p, PAGE_SIZE);
      setNotifications(res.data);
      setTotalCount(res.totalCount);
    } catch (err: any) {
      console.error("Notifications fetch failed:", err);
      setError(err?.message ?? "خطا در دریافت اعلان‌ها");
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => { fetchNotifications(page); }, [page, fetchNotifications]);

  const handleMarkRead = useCallback(async (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    try {
      const resolvedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("token") ?? undefined : undefined);
      const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, resolvedToken);
      const api = NotificationsAPI(client);
      await api.markAsRead(userId, id);
    } catch {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)));
    }
  }, [userId, token]);

  const filtered = filter === "خوانده شده" ? notifications.filter((n) => n.isRead)
    : filter === "خوانده نشده" ? notifications.filter((n) => !n.isRead)
    : notifications;

  const unread = filtered.filter((n) => !n.isRead);
  const read = filtered.filter((n) => n.isRead);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h1 className="text-base font-bold text-gray-800">لیست اعلان های شما</h1>
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        {loading && <div className="py-10 text-center text-sm text-gray-400">در حال بارگذاری...</div>}
        {!loading && error && <div className="py-6 text-center text-sm text-red-500">{error}</div>}

        {!loading && !error && (
          <table className="w-full" dir="rtl">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-2.5 px-4 text-right text-sm font-semibold text-gray-700">اعلان</th>
                <th className="py-2.5 px-4 text-right text-sm font-semibold text-gray-700">تاریخ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {unread.length > 0 && (
                <>
                  <SectionDivider label="خوانده نشده" onToggle={() => setUnreadOpen((o) => !o)} open={unreadOpen} />
                  {unreadOpen && unread.map((n) => <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} />)}
                </>
              )}
              {read.length > 0 && (
                <>
                  <SectionDivider label="خوانده شده" onToggle={() => setReadOpen((o) => !o)} open={readOpen} />
                  {readOpen && read.map((n) => <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} />)}
                </>
              )}
              {filtered.length === 0 && (
                <tr><td colSpan={3} className="py-10 text-center text-sm text-gray-400">اعلانی یافت نشد</td></tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}