'use client'
import InputField from "@/components/common/inputFeild/input";
import { useActionState, useEffect } from "react";
import { step3Action } from "@/util/service/addAndEditHouseAction/action";
import type { BaseStepProps } from "@/types/dashboard/houseManagmentType/type";

import FormDropDown from "./compsOfStep/formDropDown";
import FormTagDropdown from "./compsOfStep/formTagDropDown";
import FormTextarea from "./compsOfStep/textArea";
import SubmitBt from "@/components/common/SubmitBt";

export default function Step1BasicInfo({ accumulatedData, onStepDone, onBack }:BaseStepProps) {
   
   
   const [state,formAction,pending] = useActionState(step3Action,null)
  
   useEffect(()=>{
     console.log(state);
     if(state?.data == null) return;
     if(state?.ok) onStepDone(state?.data);
    //  console.log("accum",accumulatedData);
   },[state])

   

   return(
    <>
    <form action={formAction} className="w-full flex min-lg:flex-wrap max-lg:flex-col gap-5 mt-5">
                   
        
         <div className="flex flex-col w-[48%] max-lg:w-full gap-2 justify-between ">

          <input type="hidden" name="_prev" value={JSON.stringify(accumulatedData)}/>

          <InputField InputValueDefault={accumulatedData?.rooms ? String(accumulatedData?.rooms) : ""} name="rooms" label="تعداد اتاق" type="text"
          placeHolder="اتاق" errors={state?.errors?.rooms}  />
          
          <InputField InputValueDefault={accumulatedData?.parking ? String(accumulatedData?.parking) : ""} name="parking" label="تعداد پارکینگ" type="text"
          placeHolder="پارکینگ" errors={state?.errors?.parking}  />
        
         </div>   

         <div className="flex flex-col w-[48%] max-lg:w-full gap-2 justify-between ">

          <InputField name="bathrooms" InputValueDefault={accumulatedData?.bathrooms ? String(accumulatedData?.bathrooms) : ""} label="تعداد حمام" type="text" 
          placeHolder="حمام" errors={state?.errors?.bathrooms}  />

  
          <FormDropDown
           name="yard_type"
           label="نوع حیاط"
           items={[
             { id: 1, name: "حیاط شخصی",  query: "private yard"  },
             { id: 2, name: "حیاط مشترک",  query: "Shared yard"  },
             { id: 3, name: "حیاط پشتی",  query: "Backyard"  },
             { id: 4, name: "بدون حیاط",  query: "No yard"  },
           ]}
           defaultValue={accumulatedData?.yard_type}
           error={state?.errors?.yard_type}
          />
          
         </div>   

          <FormTagDropdown
           name="tags"
           label="برچسب ها"
           items={[
             { id: 1, name: "لوکس", query: "luxury" },
             { id: 2, name: "مدرن", query: "modern" },
             { id: 3, name: "کلاسیک", query: "classic" },
             { id: 4, name: "نوساز", query: "newly_built" },
             { id: 5, name: "بازسازی شده", query: "renovated" },
             { id: 6, name: "هوشمند", query: "smart_home" },
             { id: 7, name: "مبله", query: "furnished" },
             { id: 8, name: "دلباز", query: "spacious" },
             { id: 9, name: "نورگیر", query: "bright" },
             { id: 10, name: "منظره عالی", query: "great_view" },
             { id: 11, name: "حیاط دار", query: "yard" },
             { id: 12, name: "باغچه", query: "garden" },
             { id: 13, name: "تراس بزرگ", query: "large_terrace" },
             { id: 14, name: "استخر", query: "pool" },
             { id: 15, name: "جکوزی", query: "jacuzzi" },
             { id: 16, name: "روف گاردن", query: "roof_garden" },
             { id: 17, name: "باربیکیو", query: "barbecue" },
             { id: 18, name: "نزدیک پارک", query: "near_park" },
             { id: 19, name: "آرام", query: "quiet_area" },
             { id: 20, name: "مناسب خانواده", query: "family_friendly" },
           ]}
           defaultValue={accumulatedData?.tags ?? []}
           error={state?.errors?.propertyType}
           placeholder="انتخاب"
          />
          
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