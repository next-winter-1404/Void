'use client'

import InputField from "@/components/common/inputFeild/input";
import SubmitBt from "@/components/common/SubmitBt";
import InputDate from "@/components/common/inputFeild/inputDate";
import Price from "@/components/common/PriceComponent/Price";
import { useActionState, useEffect } from "react";


import availability_House from "@/util/service/reserveAction/availableReserve";
import toast_errorHandling from "@/util/hooks/errorHandling";

interface priceProps {
     houseId:number,
     price:number,
     discounted_price:number
}

export default function reserveForm ({houseId,price,discounted_price}:priceProps){

     const result = {success:false,};
    const [state,formAction,pending] = useActionState(availability_House,result);
   
    useEffect(()=>{
      console.log(" response",state)
       if(state?.status) toast_errorHandling(Number(state.status));
     },[state])
    

   
    const discount = Math.ceil(((price - discounted_price)/price)*100);


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
            <input type="hidden" name="houseId" id="houseId" value={houseId} />

           <div className="flex flex-row gap-10 justify-between w-full ">

            <InputField name="PersonCount" label="تعداد نفرات" type="text" id="checkInDate"
            placeHolder="وارد کنید"  />

           <InputField name="discountCode" label="کد تخفیف" type="text" id="checkInDate"
            placeHolder="وارد کنید"  />

           </div>   

            <div className="w-full  flex min-mdflex-row max-lg:flex-col  justify-between ">
                <div className="w-[45%]">
                    <span className="text-[16px] font-bold">قیمت</span>
                    <div className="flex flex-row w-full   items-center whitespace-nowrap  text-[20px]">
                        <Price price={price} discount={discount} />
                        
                    </div>
                </div>
                <div className="w-[30%] flex flex-row items-center justify-end max-lg:justify-start gap-2 ">
                    <button style={{backgroundImage:"url('/ico/share.png')"}} className="w-10 h-10 bg-[length:100%_100%]"></button>
                    <button style={{backgroundImage:"url('/ico/link.png')"}}  className="w-10 h-10 bg-[length:100%_100%]"></button>
                </div>

            </div>
             
             <SubmitBt subLabel="همین الان رزرو کن" />
         </form>       
        </>
    )
}