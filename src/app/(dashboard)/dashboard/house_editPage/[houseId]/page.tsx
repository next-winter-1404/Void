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

import {Api} from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { redirect } from "next/navigation";

export default async function  EditHousePage(props: { params: Promise<{ houseId: string,step : string}>}) {
 
  const param = await props.params;
  const step = param.step;
  const currentStep = (step ?? "basic-info") as StepName
  const title =  "ویرایش آگهی مورد نظر"
  
    const Idprops = await props.params;
    const id = Idprops.houseId;

  const api = await Api();
  const houseDetail = await handleAsyncAction(api.HouseManageApi.houseDetail((Number(id))));
  const house = houseDetail?.data;

  //  console.log(house);

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
          <HouseForm mode="edit" houseId={id} initialData={house}/>
      </div>
        
      
    </div>
  );
}