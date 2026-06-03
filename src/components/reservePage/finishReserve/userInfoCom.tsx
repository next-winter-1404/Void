"use client"

import {useState} from "react";
import type {ReserveBody} from "@/types/reserveType/reserve-type"

import SubmitBt from "@/components/common/SubmitBt";

import Price from "@/components/common/PriceComponent/Price";

interface props extends ReserveBody{
    price:number,
    discountPrice:number |null
}


export default function userInfoCom ({price,discountPrice,houseId,sharedEmail,sharedMobile,traveler_details,reservedDates}:props) {

    const [discountCode, setDiscountCode] = useState("");
  const [discountOpen, setDiscountOpen] = useState(true);
 

   const discount = discountPrice == null ? 0 : Math.ceil(((price -discountPrice)/price)*100)

    return (
        <>

       
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-5 text-right"
          >
            
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-800 text-sm">اطلاع رسانی سفر</span>
              
            </div>
          </button>
          <div className="px-5 pb-5 space-y-1">
           
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <span className="text-sm text-stone-500 font-mono">{sharedEmail}</span>
              <span className="text-xs text-stone-400">ایمیل</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <span className="text-sm text-stone-600 font-mono dir-ltr" dir="ltr">{sharedMobile}</span>
              <span className="text-xs text-stone-400">شماره تماس</span>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <button
            onClick={() => setDiscountOpen((v) => !v)}
            className="w-full flex items-center justify-between p-5 text-right"
          >
            
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-800 text-sm">کد تخفیف</span>
             
            </div>
          </button>

          {discountOpen && (
            <div className="px-5 pb-5 space-y-3">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف"
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
              />
              <SubmitBt subLabel="اعمال کد تخفیف" />
            </div>
          )}
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
           <span className="text-[16px] font-bold">قیمت</span>
                              <div className="flex flex-row w-full   items-center whitespace-nowrap  text-[20px]">
                                  <Price price={price} discount={discount} />
                                  </div>
                                  
          </div>

          <SubmitBt subLabel="پرداخت" />

          <button className="w-full border-2 border-slate-200 text-stone-600 font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.98] transition-all">
            
            مرحله قبل
          </button>
        </div>

        </>
    )
}