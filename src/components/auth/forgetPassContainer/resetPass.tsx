'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import Input from "@/components/common/inputFeild/input";
import FormError from "@/components/common/inputFeild/formError";

import {redirect,useSearchParams} from "next/navigation";
import { useState,useActionState,useEffect } from "react";

//util/service
import { forgetPass_ResetPass } from "@/util/service/authAction/action";
//util/service(type)
import { actionResult } from "@/util/service/authAction/actionResult";

import toast_errorHandling from "@/util/hooks/errorHandling";

export default function resetPass () {

      const searchParams = useSearchParams();
      
            const email = searchParams.get("email");
             if(!email) return;
  
   
      const [state,formAction,pending] = useActionState(forgetPass_ResetPass,actionResult);
      
         useEffect(()=>{
          console.log(" response",state)
           if(state?.status) toast_errorHandling(Number(state.status));
        },[state])
         
        if(state.success){
          redirect("/login");
        }
   
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full">
            
            <input type="hidden" name="email"  value={email}/>
            
             <Input name="password" type="password" id="pass" 
             placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
              label="رمز عبور" errors={state?.errors?.password}
              />

             <Input 
               name="passwordRepeat" type="password" id="pass"
               placeHolder="رمز عبور خود را دوباره وارد کنید" icon="passRepeat" 
               label=" تکرار رمز عبور" errors={state?.errors?.passwordRepeat}  />
             
             
            
          <SubmitButton subLabel="تغییر رمز عبور"  />

        </form>
           
        </>
    )
}