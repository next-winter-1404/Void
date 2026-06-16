import React from 'react';
import Image from 'next/image';
import saved from '@/assets/Images/Dashboard/dashhome/saved.png';
import { toPersianFormat } from '@/util/helper/persianFormat';
interface Props {
  summary?: {
    bookings?: {
      bookingCount: number;
      conformedBookings: number;
      canceledBookings: number;
      pendingBookings: number;
    };
    averageRating?: string;
    comments?: number;
  } | null;
}

export default function ReservationChartCard({ summary }: Props) {
  const bookings = summary?.bookings;

  const total = toPersianFormat(Number(bookings?.bookingCount)) || 1;
  const confirmed = toPersianFormat(Number(bookings?.conformedBookings)) ?? 0;
  const canceled = toPersianFormat(Number(bookings?.canceledBookings)) ?? 0;
  const pending = toPersianFormat(Number(bookings?.pendingBookings)) ?? 0;

  const bars = [
    { label: "تایید شده", value: confirmed, color: "bg-green-400" },
    { label: "در انتظار", value: pending, color: "bg-yellow-400" },
    { label: "لغو شده", value: canceled, color: "bg-red-400" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 w-full flex-1 min-h-[220px]" dir="ltr">
      <div className="flex justify-between items-center mb-6">
        <div className="w-4"></div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-zinc-800">نمودار رزرو های شما</h2>
          <Image src={saved} alt="bookmark" />
        </div>
      </div>

      <div className="border-t border-dashed border-zinc-200 w-full mb-6"></div>

     
      <div className="flex justify-around text-center mb-6" dir="rtl">
        <div>
          <p className="text-2xl font-bold text-zinc-800">{total}</p>
          <p className="text-xs text-zinc-400 mt-1">کل رزروها</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-500">{confirmed}</p>
          <p className="text-xs text-zinc-400 mt-1">تایید شده</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          <p className="text-xs text-zinc-400 mt-1">در انتظار</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-400">{canceled}</p>
          <p className="text-xs text-zinc-400 mt-1">لغو شده</p>
        </div>
      </div>

  
      <div className="flex items-end gap-3 h-20 px-2" dir="rtl">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-xs text-zinc-500">{bar.value}</span>
            <div
              className={`w-full rounded-t-lg ${bar.color} transition-all duration-500`}
            />
            <span className="text-[10px] text-zinc-400">{bar.label}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
}