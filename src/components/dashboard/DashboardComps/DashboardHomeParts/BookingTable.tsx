import React from 'react';
import Image from 'next/image';
import arrdash from '@/assets/Images/Dashboard/dashhome/arrdash.png';

interface Booking {
  id: string | number;
  hotelName: string;
  date: string;
  price: string;
  status: string;
}

interface BookingTableProps {
  role: 'buyer' | 'seller';
  data: Booking[];
}

const statusStyle: Record<string, string> = {
  "تایید شده": "bg-green-100 text-green-700",
  "در انتظار": "bg-yellow-100 text-yellow-700",
  "لغو شده": "bg-red-100 text-red-700",
};

const statusDot: Record<string, string> = {
  "تایید شده": "bg-green-500",
  "در انتظار": "bg-yellow-500",
  "لغو شده": "bg-red-500",
};

export default function BookingTable({ role, data }: BookingTableProps) {
  const title = role === 'buyer' ? 'رزرو های اخیر' : 'رزرو های اخیر مشتریان';

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-zinc-100 w-full" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg text-zinc-800">{title}</h2>
        <button className="flex items-center gap-2 text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          <span className="text-xs">مشاهده همه</span>
          <Image src={arrdash} alt="arrow" />
        </button>
      </div>

      
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-right border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-zinc-100 text-zinc-500 text-sm">
              <th className="p-4 rounded-r-2xl font-normal">نام اقامتگاه</th>
              <th className="p-4 font-normal">تاریخ رزرو</th>
              <th className="p-4 font-normal">قیمت</th>
              <th className="p-4 font-normal">وضعیت</th>
              <th className="p-4 rounded-l-2xl font-normal text-center">...</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                <td className="p-4 flex items-center gap-4">
                  <div className="w-16 h-12 bg-zinc-200 rounded-lg shrink-0"></div>
                  <span className="font-medium text-zinc-800">{item.hotelName}</span>
                </td>
                <td className="p-4 text-zinc-600 text-sm">{item.date}</td>
                <td className="p-4 text-zinc-800 font-semibold">{item.price}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${statusStyle[item.status] ?? "bg-zinc-100 text-zinc-600"}`}>
                    <span className={`w-2 h-2 rounded-full ${statusDot[item.status] ?? "bg-zinc-400"}`}></span>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center text-zinc-400 cursor-pointer group-hover:text-zinc-800">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="flex flex-col gap-3 sm:hidden">
        {data.slice(0, 5).map((item) => (
          <div key={item.id} className="border border-zinc-100 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 bg-zinc-200 rounded-lg shrink-0"></div>
              <span className="font-medium text-zinc-800">{item.hotelName}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>{item.date}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[item.status] ?? "bg-zinc-100 text-zinc-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[item.status] ?? "bg-zinc-400"}`}></span>
                {item.status}
              </span>
            </div>
            <span className="font-semibold text-zinc-800 text-sm">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}