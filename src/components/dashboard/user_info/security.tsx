"use client"
import SubmitBt from "@/components/common/SubmitBt"
import TitleCaption, { stepProps } from "./titleCaptionComp"

import Input from "@/components/common/inputFeild/input";

import {updatePasswordAction} from "@/util/service/profileAction/action";
import { useActionState,useEffect,useState } from "react";


import toast_errorHandling from "@/util/hooks/errorHandling"

export default function security ({title,caption}:stepProps) {

  const [resetKey,setResetKey] = useState(0);

  const [state,formAction,pending] = useActionState(updatePasswordAction,null)
  
    useEffect(()=>{
      console.log(state);
      if(state?.status) toast_errorHandling(Number(state.status),"رمز عبور با موفقیت تغییر کرد");
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
                <Input name="currentPassword" type="password" id="pass" 
                 placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
                  label="رمز عبور فعلی" errors={state?.errors?.currentPassword}
                  />                
                
                <Input name="newPassword" type="password" id="pass" 
                 placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
                  label="رمز عبور جدید" errors={state?.errors?.newPassword}
                  />
    
                 <Input 
                   name="repeatNewPassword" type="password" id="pass"
                   placeHolder="رمز عبور خود را دوباره وارد کنید" icon="passRepeat" 
                   label=" تکرار رمز عبور جدید" errors={state?.errors?.repeatNewPassword}  />
                             
              </div>
         
            </form>
    )
}