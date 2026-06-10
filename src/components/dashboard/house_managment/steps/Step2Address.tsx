'use client'
import Input from "@/components/common/inputFeild/input";
import { useActionState,useEffect, useState } from "react";
import { step2Action } from "@/util/service/addAndEditHouseAction/action";
import type { BaseStepProps } from "@/types/dashboard/houseManagmentType/type";
import NeshanMapPicker from "./compsOfStep/neshanMapPicker";
import SubmitBt from "@/components/common/SubmitBt";


export default function Step1BasicInfo({ accumulatedData, onStepDone, onBack }:BaseStepProps) {

  const [map,setMap] = useState({lat:0,lng:0})

  const [state,formAction,pending] = useActionState(step2Action,null)
    
     useEffect(()=>{
       console.log(state);
       if(state?.data == null) return;
       if(state?.ok) onStepDone(state?.data);
      //  console.log("accum",accumulatedData);
     },[state])


 return(
     <>
     <form action={formAction} className="w-full flex min-lg:flex-wrap justify-between max-lg:flex-col gap-5 mt-5">
         <div className=" w-[35%] max-lg:w-full max-lg:order-2 ">
           
           <input type="hidden" name="_prev" value={JSON.stringify(accumulatedData)}/>
           <input type="hidden" name="lat" value={map.lat ?? ""} />
           <input type="hidden" name="lng" value={map.lng ?? ""} />

           <Input type="text" name="address" label="نشانی ملک" placeHolder="تهران،..."
            InputValueDefault={accumulatedData?.address} />

            <div className="font-semibold text-[20px] flex flex-col pr-4">
            <span> با انتخاب موقعیت مکانی ملک خود از روی نقشه </span> 
           <span> به راحتی<span className="text-[#8CFF45] font-bold text-[22px]"> موقعیت ملک</span>  راتعیین کنید.</span> 
            </div>
          </div>           
         <div className="  w-[62%] max-lg:w-full max-lg:order-1 h-[530px] ">
          <NeshanMapPicker 
            onChange={setMap}
            defaultCoords={
            accumulatedData.lat && accumulatedData.lng
            ? { lat: accumulatedData.lat, lng: accumulatedData.lng }
            : undefined
             }
            error={state?.errors?.map}
           />
         </div>
         
         <div className="w-full flex flex-row max-lg:order-3 justify-end">
             <div className="w-[30%] max-lg:w-[70%] flex flex-row items-center  gap-2">
              <button onClick={onBack} type="button" className={` py-3 w-full rounded-[16px] border-1 border-gray-300 font-medium text-center`}>
                    مرحله قبل
                  </button>
               <SubmitBt btColor="green" subLabel="مرحله بعد >"/>
             </div>
           </div>
 
        </form>
     </>
    )
}