import React from 'react';
import Image from 'next/image';
import arrdash from '@/assets/Images/Dashboard/dashhome/arrdash.png'

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

export default function BookingTable({ role, data }: BookingTableProps) {
  const title = role === 'buyer' ? 'رزرو های اخیر' : 'رزرو های اخیر مشتریان';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 w-full" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div className='flex gap-2 items-center'>
            
            <h2 className="font-bold text-lg text-zinc-800">{title}</h2>
        </div>
        <button className="flex items-center gap-2 text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          <span className='text-xs'>مشاهده همه</span>
          <div className='flex items-center'>
             <Image src={arrdash} alt="arrow"  />
             
          </div>
        </button>
      </div>

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
            <tr key={item.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors group">
              <td className="p-4 flex items-center gap-4">
                <div className="w-16 h-12 bg-zinc-200 rounded-lg shrink-0"></div>
                <span className="font-medium text-zinc-800">{item.hotelName}</span>
              </td>
              <td className="p-4 text-zinc-600 text-sm">{item.date}</td>
              <td className="p-4 text-zinc-800 font-semibold">{item.price}</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-center text-zinc-400 cursor-pointer group-hover:text-zinc-800">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
