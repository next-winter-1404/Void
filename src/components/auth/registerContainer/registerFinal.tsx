'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import Input from "@/components/common/inputFeild/input";
import FormError from "@/components/common/inputFeild/formError";

import {redirect,useSearchParams} from "next/navigation";
import { useState,useActionState,useEffect } from "react";

//util/service
import { register_completion} from "@/util/service/authAction/action";

import { actionResult } from "@/util/service/authAction/actionResult";


export default function register_complention () {

    const searchParams = useSearchParams();
    
          const userId = searchParams.get("userId");
           if(!userId) return;

 
    const [state,formAction,pending] = useActionState(register_completion,actionResult);
    
        useEffect(()=>{
          console.log(state);
       },[state]) 
       
      if(state.success){
        redirect("/login");
      }
   
   
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full ">

             <input type="hidden" name="userId"  value={userId}/>

            <label htmlFor="phoneNumber" className=" w-full font-medium ">شماره تماس</label>
             <input
              name="phoneNumber"
              type="tel"
              dir="rtl"
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