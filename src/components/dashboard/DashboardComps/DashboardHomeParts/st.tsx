import React from 'react';
import Image from 'next/image';
import pin1 from '@/assets/Images/Dashboard/dashhome/pin1.png';
import arrhome from '@/assets/Images/Dashboard/dashhome/arrdash.png';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  link?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, link = "#" }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex flex-col gap-4 flex-1">
      <div className="flex gap-3 items-start">
        <div className="bg-zinc-100 p-2 rounded-xl shrink-0">
          <Image src={pin1} alt="pin" width={20} height={20} />
        </div>
        <div className="text-right">
          <p className="text-xl sm:text-2xl font-bold text-zinc-800">{value}</p>
          <p className="text-xs text-zinc-500 mt-1">{title}</p>
        </div>
      </div>

      <div className="border-t border-dashed border-zinc-200 w-full"></div>

      <Link className="flex justify-between items-center text-zinc-400" href={link} dir="ltr">
        <div className="flex items-center gap-1">
          <Image src={arrhome} alt="arrow" className="opacity-100" />
        </div>
        <div className="text-xs hover:text-zinc-800 transition-colors cursor-pointer">مشاهده</div>
      </Link>
    </div>
  );
};

export default StatCard;