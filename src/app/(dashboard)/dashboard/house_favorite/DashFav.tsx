'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getFavorites, deleteFavorite } from '@/util/service/api/DashboardApis/favorites_api';
import FavFilter, { FilterState } from '@/components/dashboard/DashboardComps/DashFav/FavFilter';

interface FavoriteItem {
  id: number;
  user_id: number;
  house: {
    title: string;
    address: string;
    price: string;
    photos?: string;
  };
}

function ActionMenu({ onReserve, onDelete }: { onReserve: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-zinc-400 hover:text-zinc-600 px-2 py-1 rounded text-lg leading-none"
      >
        •••
      </button>
      {open && (
        <div className="absolute left-0 top-8 z-50 bg-white rounded-xl shadow-lg border border-zinc-100 py-1 min-w-[90px]" dir="rtl">
          <button
            onClick={() => { onReserve(); setOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="#22c55e"/>
                <path d="M3.5 6l1.8 1.8 3-3.6" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            رزرو
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-zinc-50"
          >
            <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="#ef4444"/>
                <path d="M4 4l4 4M8 4l-4 4" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            حذف
          </button>
        </div>
      )}
    </div>
  );
}

export default function DashFav({ user_id }: { user_id: string }) {
  const [data, setData] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [filters, setFilters] = useState<FilterState>({
    location: '', propertyType: '', minPrice: '', maxPrice: '',
  });

  const fetchData = useCallback(async (p: number, f: FilterState) => {
    if (!user_id) return;
    setLoading(true);
    const result = await getFavorites(user_id, {
      page: p,
      propertyType: f.propertyType,
      location: f.location,
      minPrice: f.minPrice,
      maxPrice: f.maxPrice,
    });
    if (result.success) {
      const raw = result.data;
      setData(raw?.data || raw || []);
      if (raw?.totalPages) setTotalPages(raw.totalPages);
    }
    setLoading(false);
  }, [user_id]);

  useEffect(() => {
    fetchData(page, filters);
  }, [page, filters, fetchData]);

  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    const result = await deleteFavorite(id);
    if (result.success) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filtered = data.filter(
    (item) =>
      !search ||
      item.house?.title?.includes(search) ||
      item.house?.address?.includes(search)
  );

  const pages = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [1, 2, 3, 4, 5, '...', totalPages];

  return (
    <div className="relative w-full bg-white p-5 rounded-2xl" dir="rtl">

      
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap border-b border-zinc-200 p-5 border-dashed">
        <h2 className="text-base font-bold text-zinc-800 whitespace-nowrap">
          لیست رزرو های ذخیره شده
        </h2>
        <div className="flex items-center gap-3 flex-1 justify-end flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="نام هتل مورد نظر ..."
            className="border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-500 outline-none w-48 sm:w-64 bg-white"
            dir="rtl"
          />
          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className="bg-[#8BDB3E] hover:bg-[#7cc936] text-black text-sm px-5 py-2 rounded-xl transition-colors"
            >
              فیلتر ها
            </button>
            {showFilter && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <FavFilter
                  onClose={() => setShowFilter(false)}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-100">
              <th className="py-3 px-4 text-right font-semibold text-zinc-700">نام اقامتگاه</th>
              <th className="py-3 px-4 text-right font-semibold text-zinc-700">قیمت کل</th>
              <th className="py-3 px-4 text-right font-semibold text-zinc-700">آدرس</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-zinc-400">در حال بارگذاری...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-zinc-400">علاقه‌مندی‌ای یافت نشد</td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                  <td className="py-3 px-4 flex items-center gap-3">
                  {item.house?.photos ? (
                    <img
                      src={item.house.photos}
                      alt={item.house.title}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex-shrink-0" />
                  )}
                  <span className="font-medium text-zinc-800 truncate max-w-[120px]">
                    {item.house?.title}
                  </span>
                </td>
                  <td className="py-3 px-4 text-zinc-700 whitespace-nowrap">{item.house?.price}</td>
                  <td className="py-3 px-4 text-zinc-400 truncate max-w-[180px]">{item.house?.address}</td>
                  <td className="py-3 px-4 text-left">
                    <ActionMenu
                      onReserve={() => {}}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center gap-1 mt-4 justify-start flex-wrap" dir="ltr">
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && setPage(p)}
            disabled={p === '...'}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
              ${p === page
                ? 'bg-lime-500 text-white'
                : p === '...'
                  ? 'bg-transparent text-zinc-400 cursor-default'
                  : 'bg-zinc-300 border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
