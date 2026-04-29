'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import Input from "@/components/common/inputFeild/input";
import FormError from "@/components/common/inputFeild/formError";

import {redirect} from "next/navigation";
import { useState,useActionState } from "react";

//util/service
import { resetPassHandler } from "@/util/service/authAction/action";
//util/service(type)
import type { exportResultF } from "@/util/service/authAction/action";


export default function step1 () {

   const result:exportResultF = {success:true,result:""};
    const [state,formAction,pending] = useActionState(resetPassHandler ,result);
    
    console.log(state)

   
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full  ">

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