"use client";

import { useEffect, useState, useCallback } from "react";
import { getSellerComments } from "@/util/service/api/DashboardApis/comments_actions";
import type { Comment, CommentsResponse } from "@/util/service/api/DashboardApis/comments_api";
import { Star, MessageSquare, MapPin, Home, ChevronLeft, ChevronRight } from "lucide-react";

const ratingColors: Record<number, string> = {
  5: "bg-green-100 text-green-700",
  4: "bg-lime-100 text-lime-700",
  3: "bg-yellow-100 text-yellow-700",
  2: "bg-orange-100 text-orange-700",
  1: "bg-red-100 text-red-700",
};

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= value ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

function Avatar({ user }: { user: Comment["user"] }) {
  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;
  return user.profilePicture ? (
    <img src={user.profilePicture} alt={user.firstName} className="w-10 h-10 rounded-full object-cover" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold select-none">
      {initials}
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  const rating = parseInt(comment.rating);
  const ratingClass = ratingColors[rating] ?? "bg-gray-100 text-gray-600";
  const date = new Date(comment.created_at).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar user={comment.user} />
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate" style={{ fontFamily: "Vazirmatn, sans-serif" }}>
              {comment.user.firstName} {comment.user.lastName}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
        </div>
        <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${ratingClass}`}>
          <Star size={11} className="fill-current" /> {comment.rating}
        </span>
      </div>
      <StarRating value={rating} />
      <div>
        <h3 className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: "Vazirmatn, sans-serif" }}>{comment.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3" style={{ fontFamily: "Vazirmatn, sans-serif" }}>{comment.caption}</p>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
        <Home size={13} className="text-green-500 shrink-0" />
        <span className="text-xs text-gray-500 truncate" style={{ fontFamily: "Vazirmatn, sans-serif" }}>{comment.house.title}</span>
        <span className="text-gray-300 text-xs">·</span>
        <MapPin size={12} className="text-gray-400 shrink-0" />
        <span className="text-xs text-gray-400 truncate" style={{ fontFamily: "Vazirmatn, sans-serif" }}>{comment.house.address}</span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-2 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded w-24" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-full" />
        <div className="h-2 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}

interface Props {
  sellerId: string | number;
}

export default function SellerCommentsSection({ sellerId }: Props) {
  const [data, setData] = useState<CommentsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  ;

  const fetchComments = useCallback(async (p: number) => {
  if (!sellerId) {
    setLoading(false); 
    return;
  }
  setLoading(true);
  setError(null);
  try {
    const res = await getSellerComments(sellerId, p);
    setData(res);
  } catch (e: any) {
    setError(e.message ?? "خطا در دریافت نظرات");
  } finally {
    setLoading(false);
  }
}, [sellerId])

  useEffect(() => { fetchComments(page); }, [fetchComments, page]);

  const totalPages = data?.totalPages ?? 1;

  return (
    <section dir="rtl" className="w-full" style={{ fontFamily: "Vazirmatn, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 rounded-full bg-green-500" />
          <h2 className="text-lg font-bold text-gray-800">نظرات مشتریان</h2>
          {data && (
            <span className="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-0.5 rounded-full">
              {data.totalCount}
            </span>
          )}
        </div>
        <MessageSquare size={20} className="text-gray-300" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
      )}<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : data?.comments.length === 0
          ? <div className="col-span-full text-center py-16 text-gray-400 text-sm">هنوز نظری ثبت نشده است.</div>
          : data?.comments.map((c) => <CommentCard key={c.id} comment={c} />)
        }
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-xl border border-gray-200 hover:border-green-400 disabled:opacity-30 transition">
            <ChevronRight size={16} />
          </button>
          <span className="text-sm text-gray-500">صفحه <span className="font-bold text-gray-800">{page}</span> از {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-xl border border-gray-200 hover:border-green-400 disabled:opacity-30 transition">
            <ChevronLeft size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
