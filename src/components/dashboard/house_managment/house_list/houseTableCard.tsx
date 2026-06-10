"use client"
import { toPersianFormat, isoToPersianDate } from "@/util/helper/persianFormat"
import { useState, useRef, useEffect, Dispatch, SetStateAction, useActionState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Api } from "@/util/service/api";

import {removeAction} from "@/util/service/addAndEditHouseAction/action";
import DropdownMenu from "./dropDownHouse";
interface HouseTableCardProps {
  id: number;
  hotelName: string;
  date: string;
  price: number;
  status: string;
}



export default function HouseTableCard({ id, hotelName, date, price, status }: HouseTableCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  
  // console.log(id);
  return (
    <>
      
      <tr className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors hidden md:table-row">

        <td className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 bg-zinc-200 rounded-lg shrink-0" />
            <span className="font-medium text-zinc-800">{hotelName}</span>
          </div>
        </td>

        <td className="p-4 text-zinc-600 text-sm">{isoToPersianDate(date)}</td>

        <td className="p-4 text-zinc-800 font-semibold">
          {toPersianFormat(price)}
          <span className="text-zinc-400 font-normal text-xs mr-1">تومان</span>
        </td>

        <td className="p-4">
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {status}
          </span>
        </td>

       
        <td className="p-4 text-center">
          <div className="relative inline-block" >
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="text-zinc-400 hover:text-zinc-800 cursor-pointer px-2 text-lg leading-none transition-colors"
            >
              ···
            </button>
            {open  && <DropdownMenu id={id} open={open} setOpen={setOpen} />}
          </div>
        </td>
      </tr>

     
      <tr className="md:hidden">
        <td colSpan={5} className="px-3 py-2">
          <div className="flex flex-col gap-3 p-3 bg-white border border-zinc-100 rounded-xl" dir="rtl">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-zinc-200 rounded-lg shrink-0" />
                <span className="text-sm font-medium text-zinc-800">{hotelName}</span>
              </div>

              <div className="relative" >
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="text-zinc-400 text-lg leading-none px-1"
                >
                  ···
                </button>
                {open && <DropdownMenu id={id} open={open} setOpen={setOpen}/>}
              </div>
            </div>

        
            <div className="flex items-end justify-between border-t border-zinc-50 pt-2">
              <div>
                <p className="text-[10px] text-zinc-400 mb-0.5">قیمت</p>
                <p className="text-sm font-semibold text-zinc-800">
                  {toPersianFormat(price)}
                  <span className="text-[11px] font-normal text-zinc-400 mr-0.5">تومان</span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-zinc-400 mb-0.5">تاریخ</p>
                <p className="text-xs text-zinc-600">{isoToPersianDate(date)}</p>
              </div>

              <div>
                <p className="text-[10px] text-zinc-400 mb-0.5">وضعیت</p>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {status}
                </span>
              </div>
            </div>

          </div>
        </td>
      </tr>
    </>
  );
}