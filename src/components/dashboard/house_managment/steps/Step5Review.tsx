'use client'
import Input from "@/components/common/inputFeild/input";
import { useActionState,useEffect } from "react";
import { submitAction } from "@/util/service/addAndEditHouseAction/action";
import type { step5Props } from "@/types/dashboard/houseManagmentType/type";
import ImageSlider from "./compsOfStep/step5Comps/imageSlider";
import InfoCard from "./compsOfStep/step5Comps/infoCard";


//ico
import Address from "@/assets/Dashboard/step5ico/address-ico.png"
import Feature from "@/assets/Dashboard/step5ico/feature-ico.png"
import YardType from "@/assets/Dashboard/step5ico/yard_type-ico.png"
import Transaction from "@/assets/Dashboard/step5ico/transaction_type.png"
import Category from "@/assets/Dashboard/step5ico/category-ico.png"
import PropertyType from "@/assets/Dashboard/step5ico/property-type.png"
import Price from "@/assets/Dashboard/step5ico/price-ico.png"

import TagList from "./compsOfStep/step5Comps/tagList";
import PriceDisplay from "./compsOfStep/step5Comps/priceDisplay";


import SubmitBt from "@/components/common/SubmitBt";
import toast_errorHandling from "@/util/hooks/errorHandling";
import { redirect } from "next/navigation";

export default function Step5Review({ accumulatedData, mode, houseId, onBack }:step5Props) {

  const [state, formAction,pending] = useActionState(submitAction, null)
  
  useEffect(()=>{
     console.log(state);
     if(state?.status){ toast_errorHandling(200,"خانه ثبت شد")
      setTimeout(()=>redirect("/dashboard"),2000)}
  },[state])
  
  return (
    <>
    <form action={formAction} 
     className="w-full flex flex-wrap max-lg:flex-col  items-center gap-4 mt-5 "
    >
      <input type="hidden" name="_data"   value={JSON.stringify(accumulatedData)} />
      <input type="hidden" name="mode"    value={mode} />
      <input type="hidden" name="houseId" value={houseId ?? ''} />
      
      <div className="w-[39%] max-lg:w-full h-[250px] max-lg:order-2  flex flex-col items-center">
        <ImageSlider images={accumulatedData?.photos || []}/>
      </div>
      <div className="w-[59%] max-lg:w-full  min-lg:h-[250px] max-lg:order-1 ">
        <div  className=" w-full">
          <h1 className=' w-full text-start font-bold text-[18px]'>{accumulatedData?.title}</h1>
          <p>
             {accumulatedData?.caption}
          </p>
          </div>
      </div>
      <div className="w-[39%] max-lg:w-full min-h-[250px] max-lg:order-3  flex flex-col items-start">
        <InfoCard icon={Address} values={accumulatedData?.address}/>
        <InfoCard icon={Feature} values={[`${accumulatedData?.bathrooms} حمام`,`${accumulatedData?.rooms} اتاق`
          ,`${accumulatedData?.capacity} ظرفیت`,`${accumulatedData?.parking} پارکینگ`
        ]}/>
        <InfoCard icon={YardType} values={accumulatedData?.yard_type}/>
        <InfoCard icon={Transaction} values={accumulatedData?.transaction_type}/>
      </div>
      <div className="w-[59%] max-lg:w-full min-h-[250px]  max-lg:order-4  flex flex-col items-start">
         <TagList label="بر چسب ها:" tags={accumulatedData?.tags?.slice(0,3)}/>
         <InfoCard icon={Category} values={accumulatedData?.categories ? accumulatedData?.categories[0] : ""}/>
         <InfoCard icon={PropertyType} values={accumulatedData?.categories ? accumulatedData?.categories[1] : ""}/>
         <PriceDisplay icon={Price} price={accumulatedData?.price} currency="تومان" />
      </div>

      <div className="w-full flex flex-row max-lg:order-3 justify-end max-lg:order-5">
           <div className="w-[30%] max-lg:w-[70%] flex flex-row items-center  gap-2">
            <button onClick={onBack} type="button" className={` py-3 w-full rounded-[16px] border-1 border-gray-300 font-medium text-center`}>
                  مرحله قبل
                </button>
             <SubmitBt btColor="green" subLabel="ثبت آگهی"/>
           </div>
         </div>
      
    </form>
    </>
  )
}