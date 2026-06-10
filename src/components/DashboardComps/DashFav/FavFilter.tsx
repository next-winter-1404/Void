'use client';

import React, { useState } from 'react';

export interface FilterState {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
}

interface FavFilterProps {
  onClose: () => void;
  onChange: (filters: FilterState) => void;
}

export default function FavFilter({ onClose, onChange , }: FavFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  const set = (key: keyof FilterState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const updated = { ...filters, [key]: e.target.value };
      setFilters(updated);
      onChange(updated);
    };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 w-[320px]" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-zinc-800">فیلتر ها</h3>
        <button
          onClick={onClose}
          className="flex items-center gap-1 border border-red-400 text-red-500 rounded-full px-3 py-0.5 text-sm hover:bg-red-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          بستن
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">نوع ملک</label>
          <select
            value={filters.propertyType}
            onChange={set('propertyType')}
            className="border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-500 outline-none bg-white"
          >
            <option value="">همه</option>
            <option value="apartment">آپارتمان</option>
            <option value="villa">ویلا</option>
            <option value="hotel">هتل</option>
            <option value="suite">سوئیت</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">موقعیت</label>
          <select
            value={filters.location}
            onChange={set('location')}
            className="border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-500 outline-none bg-white"
          >
            <option value="">همه شهرها</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">حداقل قیمت</label>
          <input
            type="text"
            inputMode="numeric"
            value={filters.minPrice}
            onChange={set('minPrice')}
            placeholder="0"
            className="border border-zinc-200 rounded-xl px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">حداکثر قیمت</label>
          <input
            type="text"
            inputMode="numeric"
            value={filters.maxPrice}
            onChange={set('maxPrice')}
            placeholder="تومان"
            className="border border-zinc-200 rounded-xl px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
}
