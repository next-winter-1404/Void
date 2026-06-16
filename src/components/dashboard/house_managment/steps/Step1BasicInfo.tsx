'use client'
import InputField from "@/components/common/inputFeild/input";
import { useActionState, useEffect } from "react";
import { step1Action } from "@/util/service/addAndEditHouseAction/action";
import type { BaseStepProps } from "@/types/dashboard/houseManagmentType/type";

import FormDropDown from "./compsOfStep/formDropDown";

import FormTextarea from "./compsOfStep/textArea";
import SubmitBt from "@/components/common/SubmitBt";

export default function Step1BasicInfo({ accumulatedData, onStepDone, onBack }:BaseStepProps) {
   
   
   const [state,formAction,pending] = useActionState(step1Action,null)
  
   useEffect(()=>{
     console.log(state);
     if(state?.data == null) return;
     console.log(state);
     onStepDone(state.data);
    //  console.log("accum",accumulatedData);
   },[state])

   

   return(
    <>
    <form action={formAction} className="w-full flex min-lg:flex-wrap max-lg:flex-col gap-5 mt-5">
                   
        
         <div className="flex flex-col w-[48%] max-lg:w-full gap-2 justify-between ">

          <input type="hidden" name="_prev" value={JSON.stringify(accumulatedData)}/>

          <InputField InputValueDefault={accumulatedData?.title} name="title" label="نام ملک" type="text" id="firstName"
          placeHolder="نام ملک" errors={state?.errors?.title}  />
          

          <FormDropDown
            name="transaction_type"
            label="نوع معامله"
            items={[
              { id: 1, name: "اجاره",  query: "rental" },
              { id: 2, name: "رهن", query: "mortgage" },
              { id: 3, name: "رزرو", query: "reservation" },
              { id: 4, name: "فروش", query: "direct_purchase" },
            ]}
            defaultValue={accumulatedData?.transaction_type} 
            error={state?.errors?.transaction_type}
           />

          <FormDropDown
           name="category"
           label="نوع ملک"
           items={[
             { id: 1, name: "مسکونی", query: "house" },
             { id: 2, name: "تجاری",  query: "commercial"  },
           ]}
           defaultValue={accumulatedData?.categories ? accumulatedData?.categories[0] : ""}
           error={state?.errors?.category}
          />
          
          
         </div>   

         <div className="flex flex-col w-[48%] max-lg:w-full gap-2 justify-between ">

          <InputField name="capacity" InputValueDefault={accumulatedData?.capacity ? String(accumulatedData?.capacity) : ""} label="ظریفیت" type="text" id="firstName"
          placeHolder="تعداد نفرات" errors={state?.errors?.capacity}  />

          <InputField name="price" InputValueDefault={accumulatedData?.price ? String(accumulatedData?.price) : ""} label="قیمت" type="text" id="firstName"
          placeHolder="قیمت" errors={state?.errors?.price}  />
          

  
          <FormDropDown
           name="propertyType"
           label="زیر نوع ملک"
           items={[
             { id: 1, name: "آپارتمانی",  query: "apartment"  },
             { id: 2, name: "ویلایی",  query: "villa"  },
             { id: 3, name: "حیاط دار روباز",  query: "land"  },
           ]}
           defaultValue={accumulatedData?.categories ? accumulatedData?.categories[1] : ""}
           error={state?.errors?.propertyType}
          />
          
         </div>   

            <FormTextarea
             name="caption"
             label="توضیحات ملک:"
             defaultValue={accumulatedData?.caption}  // pre-fills in edit mode
             error={state?.errors?.caption}
           />
          
          <div className="w-full flex flex-row justify-end">
            <div className="w-[10%] max-lg:w-[30%]">
              <SubmitBt btColor="green" subLabel="مرحله بعد >"/>
            </div>
          </div>
          

       </form>
    </>
   )
}