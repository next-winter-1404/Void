'use client'

import InputField from "@/components/common/inputFeild/input";
import SubmitBt from "@/components/common/SubmitBt";
import InputDate from "@/components/common/inputFeild/inputDate";
import Price from "@/components/common/PriceComponent/Price";
import { useActionState, useEffect } from "react";


import Reserve_Handler from "@/util/service/reserveAction/action";

export default function reserveForm (){

     const result = "";
    const [state,formAction,pending] = useActionState(Reserve_Handler,result);
   
    useEffect(()=>{
       console.log(state);
    },[state])
   


    return(
        <>
          <form action={formAction} className="w-full flex flex-wrap gap-5 mt-5">
           
           <div className='flex flex-wrap w-[400px]  gap-2'>
                <h1 className='w-full text-start font-bold text-[15px]'> رزرو هتل</h1>
              </div>


           <div className="flex flex-row max-xl:flex-wrap  gap-10 justify-between w-full ">

             <InputDate name="checkIn" label="تاریخ ورود"/>

             <InputDate name="checkOut" label="تاریخ خروج"/>
            </div>   


           <div className="flex flex-row gap-10 justify-between w-full ">

            <InputField name="PersonCount" label="تعداد نفرات" type="text" id="checkInDate"
            placeHolder="وارد کنید"  />

           <InputField name="discountCode" label="کد تخفیف" type="text" id="checkInDate"
            placeHolder="وارد کنید"  />

           </div>   

            <div className="w-full flex flex-row justify-between ">
                <div className="w-[45%]">
                    <span className="text-[16px] font-bold">قیمت</span>
                    <div className="flex flex-row w-full   items-center whitespace-nowrap  text-[20px]">
                        <Price price={1500000} discount={15} />
                        
                    </div>
                </div>
                <div className="w-[30%] flex flex-row items-center justify-end gap-2 ">
                    <button style={{backgroundImage:"url('/ico/share.png')"}} className="w-10 h-10 bg-[length:100%_100%]"></button>
                    <button style={{backgroundImage:"url('/ico/link.png')"}}  className="w-10 h-10 bg-[length:100%_100%]"></button>
                </div>

            </div>
             
             <SubmitBt subLabel="همین الان رزرو کن" />
         </form>       
        </>
    )
}