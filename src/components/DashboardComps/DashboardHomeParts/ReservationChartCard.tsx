import React from 'react';
import Image from 'next/image';
import saved from '@/assets/Images/Dashboard/dashhome/saved.png';

export default function ReservationChartCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 w-full flex-1 min-h-[220px]" dir="ltr">
      <div className="flex justify-between items-center mb-6">
        <div className="w-4"></div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-zinc-800">نمودار رزرو های شما</h2>
          <Image src={saved} alt="bookmark" />
        </div>
      </div>

      <div className="border-t border-dashed border-zinc-200 w-full"></div>
      
    </div>
  );
}
