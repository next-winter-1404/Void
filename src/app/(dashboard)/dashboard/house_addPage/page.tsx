
import HouseForm from "@/components/dashboard/house_managment/houseForm/houseForm";
import Arrdash from "@/assets/Dashboard/arrowdash.png"
import Image from "next/image"

import Inspector from "@/components/dashboard/house_managment/inspector";
import ButtonHandler from "@/components/dashboard/house_managment/buttonHandler"
import type { StepName } from "@/types/dashboard/houseManagmentType/type"

const STEP_TITLES: Record<StepName, string> = {
  "basic-info": "مشخصات اولیه",
  "address":    "آدرس ملک",
  "amenities":  "امکانات",
  "images":     "تصاویر ملک",
  "review":     "تایید نهایی",
}

import  {redirect} from "next/navigation";

export default async function AddHousePage({searchParams,}: {searchParams: Promise<{ step?: string }>
}) {

    const { step } = await searchParams
  const currentStep = (step ?? "basic-info") as StepName
  const title =  "ساخت آگهی ملک جدید"



  return (
    <div className="bg-white  rounded-3xl pt-3 px-3 pb-3 shadow-sm border border-zinc-100 w-full" dir="rtl">
      <div className="flex justify-between flex-row mb-2  items-center ">
        <div className='flex gap-2 items-center'>
            
            <h2 className="font-bold text-lg text-zinc-800">{title}</h2>
        </div>
        
        <div className='flex flex-row gap-2 items-center '>

         <ButtonHandler/>
        </div>

      </div>

      <Inspector/>

      <div className="w-full  rounded-[16px]">
          <HouseForm mode="add"/>
      </div>
        
      
    </div>
  );
}

