import React from 'react';
import Image from 'next/image';
import saved from '@/assets/Images/Dashboard/dashhome/saved.png';
import { toPersianFormat } from '@/util/helper/persianFormat';

interface UserSummary {
  bookings?: {
    bookingCount: number;
    conformedBookings: number;
    canceledBookings: number;
    pendingBookings: number;
  };
  averageRating?: string;
  comments?: number;
}


interface AdminSummary {
  totalUsers: number;
  totalHouses: number;
  totalBookings: number;
  averageRating: string;
}

interface Props {
  summary?: UserSummary | AdminSummary | null;
  isAdmin?: boolean;
}

function isAdminSummary(summary: any): summary is AdminSummary {
  return summary && "totalBookings" in summary;
}

export default function ReservationChartCard({ summary, isAdmin }: Props) {

  
  if (isAdmin || isAdminSummary(summary)) {
    const s = summary as AdminSummary;

    const stats = [
      { label: "کل کاربران",   value: toPersianFormat(s?.totalUsers    ?? 0), color: "text-blue-500" },
      { label: "کل خانه‌ها",   value: toPersianFormat(s?.totalHouses   ?? 0), color: "text-purple-500" },
      { label: "کل رزروها",    value: toPersianFormat(s?.totalBookings  ?? 0), color: "text-zinc-800" },
      { label: "میانگین امتیاز", value: toPersianFormat(s?.averageRating) ?? "0",              color: "text-yellow-500" },
    ];

    const bars = [
      { label: "کاربران",  value: s?.totalUsers   ?? 0, color: "bg-blue-400" },
      { label: "خانه‌ها",  value: s?.totalHouses  ?? 0, color: "bg-purple-400" },
      { label: "رزروها",   value: s?.totalBookings ?? 0, color: "bg-zinc-400" },
    ];

    const maxBar = Math.max(...bars.map(b => b.value), 1);

    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 w-full flex-1 min-h-[220px]" dir="ltr">
        <div className="flex justify-between items-center mb-6">
          <div className="w-4"></div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-zinc-800">خلاصه داشبورد ادمین</h2>
            <Image src={saved} alt="bookmark" />
          </div>
        </div>

        <div className="border-t border-dashed border-zinc-200 w-full mb-6"></div>

        
        <div className="flex justify-around text-center mb-6" dir="rtl">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

       
        <div className="flex items-end gap-3 h-20 px-2" dir="rtl">
          {bars.map(bar => (
            <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs text-zinc-500">{toPersianFormat(bar.value)}</span>
              <div
                className={`w-full rounded-t-lg ${bar.color} transition-all duration-500`}
                style={{ height: `${(bar.value / maxBar) * 64}px` }}
              />
              <span className="text-[10px] text-zinc-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

 
  const s = summary as UserSummary;
  const bookings = s?.bookings;

  const total     = toPersianFormat(Number(bookings?.bookingCount))      || "0";
  const confirmed = toPersianFormat(Number(bookings?.conformedBookings)) || "0";
  const canceled  = toPersianFormat(Number(bookings?.canceledBookings))  || "0";
  const pending   = toPersianFormat(Number(bookings?.pendingBookings))   || "0";

  const maxBar = Math.max(
    Number(bookings?.conformedBookings),
    Number(bookings?.canceledBookings),
    Number(bookings?.pendingBookings),
    1
  );

  const bars = [
    { label: "تایید شده", value: Number(bookings?.conformedBookings), display: confirmed, color: "bg-green-400" },
    { label: "در انتظار", value: Number(bookings?.pendingBookings),   display: pending,   color: "bg-yellow-400" },
    { label: "لغو شده",   value: Number(bookings?.canceledBookings),  display: canceled,  color: "bg-red-400" },
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
        {bars.map(bar => (
          <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-xs text-zinc-500">{bar.display}</span>
            <div
              className={`w-full rounded-t-lg ${bar.color} transition-all duration-500`}
              style={{ height: `${(bar.value / maxBar) * 64}px` }}
            />
            <span className="text-[10px] text-zinc-400">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}