"use client"
import Image from 'next/image';
import arrdash from '@/assets/Images/Dashboard/dashhome/arrdash.png'

import HouseTableCard from "./houseTableCard"
import {Api} from "@/util/service/api"
import { handleAsyncAction } from '@/util/service/api/handleAsync';

import SearchModal from '@/components/common/searchBox/searchModal';
import FilterModal from './filter/filterModal';
import Pagination from '../../paginationDash/paginationPage';

import type { HouseCard } from '@/types/HouseCard/HouseCard';

import Add from "@/assets/Dashboard/add-ico.png"
import { redirect } from 'next/navigation';

interface Props {
  totalHouses:number,
  houseSeller:any
}


export default  function houseTable({totalHouses,houseSeller}:Props) {
  const title = "لیست املاک من";

  
  
  return (
    <div className="bg-white rounded-3xl pt-3 px-3 pb-3 shadow-sm border border-zinc-100 w-full" dir="rtl">
      <div className="flex justify-between items-center ">
        <div className='flex gap-2 items-center'>
            
            <h2 className="font-bold text-lg text-zinc-800">{title}</h2>
        </div>
        
        <div className='flex flex-row gap-2 items-center w-[400px] max-lg:w-[300px]'>
        <SearchModal/>
        <FilterModal/>
        </div>
      </div>

      <table className="w-full text-right border-separate border-spacing-y-3">
        <thead >
          <tr className="bg-zinc-100 text-zinc-500  text-sm max-lg:text-[10px] whitespace-nowrap">
            <th className="px-3  py-2 rounded-r-2xl font-normal">نام اقامتگاه</th>
            <th className="px-3  py-2 font-normal">تاریخ رزرو</th>
            <th className="px-3  py-2 font-normal">قیمت</th>
            <th className="px-3  py-2 font-normal">وضعیت</th>
            <th className="px-3  py-2 rounded-l-2xl font-normal text-center">...</th>
          </tr>
        </thead>
        <tbody>
          
          {houseSeller.map((item:any) => (
             <HouseTableCard 
             key={item.id}
             id={item.id}
              price={item.price}
               hotelName={item.title}
                date={item.last_updated}
                 status={"تایید شده فیک"}/>
          ))}

        </tbody>

      </table>

      <div className=' flex flex-row items-center justify-between'>
          <div>
           <button onClick={()=>redirect("/dashboard/house_addPage?step=base_info")} className={`flex flex-row items-center gap-1 w-full bg-[#8CFF45] rounded-[8px] px-2 py-1 font-medium text-center`}>
              افزودن ملک<Image alt='add' className='w-4 h-4' src={Add}/>
            </button>
         </div>
         <div>
         <Pagination totalPages={Math.ceil(totalHouses/6)}/>
         </div>
         
      </div>

    </div>
  );
}