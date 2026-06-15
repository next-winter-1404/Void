"use client";

import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { ApiClient } from "@/util/service/api/apiClient";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import {
  SellerCommentsAPI,
  SellerComment,
  SellerCommentsResponse,
} from "@/util/service/api/DashboardApis/seller_comments_api";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch { return iso; }
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`;
}

function StarRating({ rating }: { rating: string }) {
  const n = Number(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-sm ${i <= n ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
      <span className="text-xs text-gray-400 mr-1">{toPersianDigits(rating)}</span>
    </div>
  );
}

function Avatar({ user }: { user: SellerComment["user"] }) {
  if (user.profilePicture) {
    return <img src={user.profilePicture} alt="" className="w-9 h-9 rounded-full object-cover" />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 text-sm font-bold flex items-center justify-center shrink-0">
      {getInitials(user.firstName, user.lastName)}
    </div>
  );
}

function RatingFilter({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const options = [
    { value: "", label: "همه امتیازها" },
    { value: "5", label: "★★★★★ عالی" },
    { value: "4", label: "★★★★☆ خوب" },
    { value: "3", label: "★★★☆☆ متوسط" },
    { value: "2", label: "★★☆☆☆ ضعیف" },
    { value: "1", label: "★☆☆☆☆ خیلی ضعیف" },
  ];

  const selected = options.find(o => o.value === value)?.label ?? "همه امتیازها";

  return (
    <div className="relative" ref={ref} dir="rtl">
      <p className="text-xs text-gray-400 mb-1">: فیلتر امتیاز</p>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 bg-white hover:border-gray-300 min-w-[140px] justify-between transition-colors"
      >
        <span className={`text-gray-400 text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        <span>{selected}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden">
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

function DeleteConfirm({
  comment, onConfirm, onCancel, loading,
}: {
  comment: SellerComment;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative border border-black bg-white rounded-2xl shadow-xl w-500 max-w-xs p-6 z-10 text-center">
        <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-red-500 text-xl">✕</span>
        </div>
        <h2 className="text-sm font-bold text-gray-800 mb-1">حذف نظر</h2>
        <p className="text-xs text-gray-500 mb-5 leading-5">
          آیا از حذف نظر <strong className="text-gray-700">"{comment.title}"</strong> مطمئن هستید؟
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors">
            انصراف
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 bg-red-400 hover:bg-red-500 disabled:opacity-60 text-white py-2 rounded-xl text-sm transition-colors">
            {loading ? "..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionMenu({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleToggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOpenUp(window.innerHeight - rect.bottom < 90);
    }
    setOpen(v => !v);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={handleToggle}
        className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded text-base font-bold tracking-widest leading-none">
        •••
      </button>
      {open && (
        <div className={`absolute right-0 z-50 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[100px] py-1 ${openUp ? "bottom-7" : "top-7"}`}>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <span>✕</span> حذف
          </button>
        </div>
      )}
    </div>
  );
}

function Pagination({ current, total, onChange, disabled }: {
  current: number; total: number; onChange: (p: number) => void; disabled: boolean;
}) {
  if (total <= 1) return null;
  const pages = total <= 7 ? Array.from({ length: total }, (_, i) => i + 1) : [1,2,3,4,5];
  return (
    <div className="flex items-center gap-1 flex-wrap" dir="rtl">
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)} disabled={disabled}
          className={`w-7 h-7 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
            p === current ? "bg-green-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}>
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 7 && (
        <>
          <span className="text-gray-400 text-sm px-1">...</span>
          <button onClick={() => onChange(total)} disabled={disabled}
            className={`w-7 h-7 rounded border text-sm font-medium transition-colors disabled:opacity-50 ${
              current === total ? "bg-green-500 text-white border-green-500" : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

function CommentCard({ comment, onDelete }: { comment: SellerComment; onDelete: () => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Avatar user={comment.user} />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {comment.user.firstName} {comment.user.lastName}
            </p>
            <p className="text-xs text-gray-400">{formatDate(comment.created_at)}</p>
          </div>
        </div>
        <ActionMenu onDelete={onDelete} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800 mb-1">{comment.title}</p>
        <p className="text-xs text-gray-500 leading-5">{comment.caption}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <StarRating rating={comment.rating} />
        <span className="text-xs text-gray-400 bg-gray-50 rounded-lg px-2.5 py-1">
          🏠 {comment.house.title}
        </span>
      </div>
    </div>
  );
}


function CommentRow({ comment, onDelete }: { comment: SellerComment; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors align-top">
      <td className="py-4 px-4 w-10">
        <ActionMenu onDelete={onDelete} />
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          <Avatar user={comment.user} />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {comment.user.firstName} {comment.user.lastName}
            </p>
            <p className="text-xs text-gray-400">{formatDate(comment.created_at)}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 max-w-[280px]">
        <p className="text-sm font-medium text-gray-800 mb-0.5">{comment.title}</p>
        <p className={`text-xs text-gray-500 leading-5 ${expanded ? "" : "line-clamp-2"}`}>
          {comment.caption}
        </p>
        {comment.caption.length > 100 && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-xs text-green-500 hover:text-green-600 mt-0.5"
          >
            {expanded ? "کمتر ▲" : "بیشتر ▼"}
          </button>
        )}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{comment.house.title}</div>
        <div className="text-xs text-gray-400 mt-0.5">{comment.house.address}</div>
      </td>
      <td className="py-4 px-4">
        <StarRating rating={comment.rating} />
      </td>
    </tr>
  );
}

function StatsBar({ comments }: { comments: SellerComment[] }) {
  const avg = comments.length
    ? (comments.reduce((s, c) => s + Number(c.rating), 0) / comments.length).toFixed(1)
    : "0";
  const counts = [5,4,3,2,1].map(r => ({
    r, count: comments.filter(c => Number(c.rating) === r).length,
  }));

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 py-4 bg-gray-50 border-b border-gray-100">
      <div className="text-center">
        <p className="text-2xl font-extrabold text-gray-800">{toPersianDigits(avg)}</p>
        <div className="flex items-center justify-center gap-0.5 mt-0.5">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`text-sm ${i <= Math.round(Number(avg)) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{toPersianDigits(comments.length)} نظر</p>
      </div>
      <div className="flex-1 min-w-[160px] space-y-1.5">
        {counts.map(({ r, count }) => {
          const pct = comments.length ? Math.round((count / comments.length) * 100) : 0;
          return (
            <div key={r} className="flex items-center gap-2 text-xs">
              <span className="text-yellow-400 w-3">{"★".repeat(r)}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-yellow-400 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-gray-400 w-4 text-left">{toPersianDigits(count)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


const PAGE_SIZE = 10;

interface Props {
  sellerId: number;
  token: string;
  initialData: SellerCommentsResponse;
}

export default function SellerCommentsPage({ sellerId, token, initialData }: Props) {
  const [comments, setComments]           = useState<SellerComment[]>(initialData.comments);
  const [totalCount, setTotalCount]       = useState(initialData.totalCount);
  const [totalPages, setTotalPages]       = useState(initialData.totalPages);
  const [page, setPage]                   = useState(1);
  const [ratingFilter, setRatingFilter]   = useState("");
  const [isFetching, startTransition]     = useTransition();
  const [deleteTarget, setDeleteTarget]   = useState<SellerComment | null>(null);
  const [isDeleting, setIsDeleting]       = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  const getApi = useCallback(
    () => SellerCommentsAPI(new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)),
    [token]
  );

  const fetchPage = useCallback((p: number, rating: string = ratingFilter) => {
    startTransition(async () => {
      setError(null);
      const res = await handleAsyncAction(
        getApi().getComments(sellerId, { page: p, limit: PAGE_SIZE, rating })
      );
      if (res.success) {
        setComments(res.data.comments);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
        setPage(p);
      } else {
        setError(res.message ?? "خطا در دریافت نظرات");
      }
    });
  }, [sellerId, ratingFilter, getApi]);

  const handleRatingChange = useCallback((rating: string) => {
    setRatingFilter(rating);
    fetchPage(1, rating);
  }, [fetchPage]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await handleAsyncAction(getApi().deleteComment(deleteTarget.id));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (res.success) fetchPage(page, ratingFilter);
  }, [deleteTarget, page, ratingFilter, getApi, fetchPage]);

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-5" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-dashed border-gray-200 flex-wrap">
          <div>
            <h1 className="text-sm font-bold text-gray-800">مدیریت نظرات</h1>
            {totalCount > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">{toPersianDigits(totalCount)} نظر ثبت شده</p>
            )}
          </div>
          <RatingFilter value={ratingFilter} onChange={handleRatingChange} />
        </div>

        {comments.length > 0 && !isFetching && <StatsBar comments={comments} />}

        {isFetching && (
          <div className="py-14 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400 mt-2">در حال بارگذاری...</p>
          </div>
        )}

        {!isFetching && error && (
          <div className="py-10 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => fetchPage(page)} className="mt-2 text-xs text-green-500 hover:underline">تلاش مجدد</button>
          </div>
        )}

        {!isFetching && !error && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 w-10" />
                    {["کاربر", "نظر", "اقامتگاه", "امتیاز"].map(h => (
                      <th key={h} className="py-3 px-4 text-right text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-14 text-center text-sm text-gray-400">
                        نظری یافت نشد
                      </td>
                    </tr>
                  ) : comments.map(c => (
                    <CommentRow key={c.id} comment={c} onDelete={() => setDeleteTarget(c)} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden p-4 space-y-3">
              {comments.length === 0
                ? <div className="py-10 text-center text-sm text-gray-400">نظری یافت نشد</div>
                : comments.map(c => (
                    <CommentCard key={c.id} comment={c} onDelete={() => setDeleteTarget(c)} />
                  ))
              }
            </div>

            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-gray-100">
                <Pagination
                  current={page}
                  total={totalPages}
                  onChange={p => fetchPage(p, ratingFilter)}
                  disabled={isFetching}
                />
              </div>
            )}
          </>
        )}
      </div>
      {deleteTarget && (
        <DeleteConfirm
          comment={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={isDeleting}
        />
      )}
    </div>
  );
}