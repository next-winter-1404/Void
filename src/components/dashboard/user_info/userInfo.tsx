"use client"
import SubmitBt from "@/components/common/SubmitBt"
import TitleCaption, { stepProps } from "./titleCaptionComp"

import Input from "@/components/common/inputFeild/input";

import {updateProfileAction} from "@/util/service/profileAction/action";
import { useActionState,useEffect, useState } from "react";

import toast_errorHandling from "@/util/hooks/errorHandling"

interface props extends stepProps {
   inputValue?:{
     email:string,
     phone:string,
     address:string
   }
}

export default function userInfo ({title,caption,inputValue}:props) {

  const [email,setEmail] = useState({
     email:inputValue?.email,
     phone:inputValue?.phone,
     address:""
  })

  // console.log(email)

  const [resetKey,setResetKey] = useState(0);

  const [state,formAction,pending] = useActionState(updateProfileAction,null)

  useEffect(()=>{
    console.log(state);
    if(state?.status) toast_errorHandling(Number(state.status),"اطلاعات کاربری با موفقیت تغییر کرد");
  },[state])

  function handleCancel() {
    setResetKey(k => k + 1);
  }

    return(
       <form key={resetKey} action={formAction}
      className="w-full lg:w-[80%] mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
      dir="rtl"
    >
      
      <div className="w-full lg:w-[40%] flex flex-col gap-4
                      order-1">
    
        <TitleCaption title={title} caption={caption} />
 
      
        <div className="flex flex-row items-center gap-5
           order-3 lg:order-none">
          <button onClick={handleCancel} type="button" className={` py-3 w-full bg-[#FF5555] rounded-[16px] text-[white] font-medium text-center`}>
           انصراف
         </button>
          <SubmitBt btColor="green" subLabel="اعمال تغییرات" />
        </div>
      </div>
 
      <div className="w-full lg:w-[55%] flex flex-col gap-3
                      order-2">
        
        <Input
          name="email"
          id="email"
          type="email"
          placeHolder="example@gmail.com"
          label="ایمیل:"
          InputValueDefault={email?.email}
          errors={state?.errors?.email}
        />
        <Input
          name="phone"
          id="phone"
          type="text"
          placeHolder="09112223333"
          label="شماره همراه:"
          InputValueDefault={email?.phone}
          errors={state?.errors?.phone}
        />

        <Input
          name="address"
          id="address"
          type="text"
          placeHolder="مازندران،ساری،،،،"
          label="آدرس:"
          InputValueDefault={email?.address}
          errors={state?.errors?.address}
        />
      </div>
 
    </form>
    )
}