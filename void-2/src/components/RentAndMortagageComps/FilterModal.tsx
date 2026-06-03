// components/RentAndMortagageComps/FilterModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FilterModal = ({ isOpen, setIsOpen }: FilterModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    transactionType: searchParams.get('transactionType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
  });

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      transactionType: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
    });
    
    const params = new URLSearchParams(searchParams.toString());
    ['location', 'propertyType', 'transactionType', 'minPrice', 'maxPrice', 'minArea', 'maxArea', 'page'].forEach(key => {
      params.delete(key);
    });
    
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-[400px]"
    >
      
      <div className="space-y-3">
        
        {/* محل */}
        <div>
          <label className="block text-xs font-medium mb-1">محل مورد نظر</label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="مثال: تهران، شیراز"
            className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* نوع ملک */}
        <div>
          <label className="block text-xs font-medium mb-1">نوع ملک</label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, categories: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه</option>
            <option value="apartment">آپارتمان</option>
            <option value="villa">ویلا</option>
            <option value="land">زمین</option>
            <option value="commercial">تجاری</option>
          </select>
        </div>

        {/* نوع معامله */}
        <div>
          <label className="block text-xs font-medium mb-1">نوع معامله</label>
          <select
            value={filters.transactionType}
            onChange={(e) => setFilters({ ...filters, transactionType: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه</option>
            <option value="rent">اجاره</option>
            <option value="mortgage">رهن</option>
            <option value="sale">فروش</option>
          </select>
        </div>

        {/* قیمت */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">حداقل قیمت</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              placeholder="0"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">حداکثر قیمت</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              placeholder="نامحدود"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* متراژ */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">حداقل متراژ</label>
            <input
              type="number"
              value={filters.minArea}
              onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
              placeholder="0"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">حداکثر متراژ</label>
            <input
              type="number"
              value={filters.maxArea}
              onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
              placeholder="نامحدود"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm hover:bg-blue-700 transition-colors"
        >
          اعمال
        </button>
        <button
          onClick={handleResetFilters}
          className="flex-1 bg-gray-200 text-gray-700 rounded-md px-3 py-1.5 text-sm hover:bg-gray-300 transition-colors"
        >
          پاک کردن
        </button>
      </div>

    </div>
  );
};

export default FilterModal;
