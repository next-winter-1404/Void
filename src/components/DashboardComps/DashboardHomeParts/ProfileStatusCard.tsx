import React from 'react';
import Image from 'next/image';
import saved from '@/assets/Images/Dashboard/dashhome/saved.png';
import arrdash from '@/assets/Images/Dashboard/dashhome/arrdash.png';


export default function ProfileStatusCard() {
  const percentage = 40;
  const size = 100;
  const strokeWidth = 10;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 w-full flex-1" dir="ltr">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-zinc-600">
          <Image src={arrdash} alt="arrows" width={12} height={12} />
          <span className="text-sm">ویرایش</span>
        </div>
        <div className="flex items-center gap-2">
          
          <h2 className="font-bold text-zinc-800">وضعیت پروفایل شما</h2>
          <Image src={saved} alt="bookmark"  />
        </div>
      </div>

      <div className="border-t border-dashed border-zinc-200 w-full mb-6"></div>

      <div className="flex items-center gap-6 justify-between">
        <div className="relative w-[100px] h-[100px]">
          <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#E6E6E6"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#A3FF47"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold text-zinc-800">{percentage}%</span>
          <p className="text-sm text-zinc-500 leading-6 max-w-[200px]">
            برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل ۷۰٪ تکمیل شده باشد.
          </p>
          <div className="mt-6 text-xs text-zinc-400">آخرین تغییرات در ۳ دقیقه پیش</div>
        </div>
      </div>

      
    </div>
  );
}
