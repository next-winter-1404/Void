'use client' 
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// import { Bell } from 'lucide-react';
import arrowdash from '@/assets/Images/Dashboard/arrowdash.png'
import moon from '@/assets/Images/Dashboard/moon.png'
import Sun from '@/assets/Images/Dashboard/Sun.png'
import Bell2 from '@/assets/Images/Dashboard/Bell2.png'

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'داشبورد',
  '/profile': 'اطلاعات کاربری',
  '/properties': 'مدیریت املاک',
  '/reservations': 'مدیریت رزرو ها',
};

export default function DashHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'داشبورد'; 

  return (
    
    <header className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-2xl h-[50px] shadow-sm w-full max-xl:w-[95%] ">
      
      
      <div className="flex items-center gap-2 font-bold text-lg">
         <span>{title}</span>
         <span className="text-gray-400"><Image src={arrowdash} alt='>>>'></Image></span>
      </div>

      
      <div className="flex items-center gap-4" dir='ltr'>
        
        
        <div className="flex items-center gap-3 max-lg:hidden">
          <div className="text-right">
            <p className="text-sm font-semibold">سبحان عرب خزائلی</p>
            <p className="text-xs text-gray-400">فروشنده</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        </div>

        
        <div className="h-8 w-px bg-gray-300"></div>

        
        <button className="p-2 text-gray-600">
           <Image src={Bell2} alt='D'></Image>
        </button>

        <div className="flex items-center bg-gray-100 p-1 rounded-full w-20 justify-between">
           <span className="bg-green-400 p-1 rounded-full text-white"><Image src={Sun} alt='W'></Image></span>
           <span className="p-1"><Image src={moon} alt='m'></Image></span>
        </div>

      </div>
    </header>
  );
}
