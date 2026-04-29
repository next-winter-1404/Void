'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import Input from "@/components/common/inputFeild/input";
import FormError from "@/components/common/inputFeild/formError";

import {redirect} from "next/navigation";
import { useState,useActionState } from "react";

//util/service
import { registerApplyHandler } from "@/util/service/authAction/action";
//util/service(type)
import type { exportResultF } from "@/util/service/authAction/action";


export default function step1 () {

   const result:exportResultF = {success:true,result:""};
    const [state,formAction,pending] = useActionState(registerApplyHandler,result);
    
    console.log(state)

   
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full ">

            <label htmlFor="phoneNumber" className=" w-full font-medium ">شماره تماس</label>
             <input
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{10,11,30,33}"
              maxLength={11}
              dir="rtl"
              required
              placeholder="شماره تماس خود را وارد کنید" 
              className="border mb-2 border-[gray]/40 w-full py-3 outline-none rounded-[16px]  text-start pr-12 bg-[url('/ico/auth/phone-ico.png')] bg-no-repeat bg-[position:98%_55%]"
             />
             
             <FormError errors={state?.errors?.phoneNumber} />

             <Input name="password" type="password" id="pass" 
             placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
              label="رمز عبور" errors={state?.errors?.password}
              />

             <Input 
               name="passwordRepeat" type="password" id="pass"
               placeHolder="رمز عبور خود را دوباره وارد کنید" icon="passRepeat" 
               label=" تکرار رمز عبور" errors={state?.errors?.passwordRepeat}  />
             
             
            
          <SubmitButton subLabel="ثبت نام"  />

        </form>
           
        </>
    )
}