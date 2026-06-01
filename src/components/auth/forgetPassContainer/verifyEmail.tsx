'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt";
import Input from "@/components/common/inputFeild/input"


import Link from "next/link"
import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useActionState,useState,useEffect} from "react"

//util
import { updateQueryParams } from "@/util/helper/updateQueryParams";

//util/service
import { forgetPass_Request} from "@/util/service/authAction/action";
//util/service(type)
import { actionResult } from "@/util/service/authAction/actionResult";

import toast_errorHandling from "@/util/hooks/errorHandling";

export default function verifyEmail () {

     const [email,setEmail] = useState<string>("");
    
         
    const [state,formAction,pending] = useActionState(forgetPass_Request,actionResult);
        
      if(state.success){
        redirect(`/forgetPassword?step=FverifyCode&email=${email}&resetCode=${state.data.resetCode}`)
      }

     useEffect(()=>{
              console.log(" response",state)
               if(state?.status) toast_errorHandling(Number(state.status),"کد تایید ارسال شد📩");
         },[state])
    
    
  

    return(
       <>
        <form action={formAction}   className="flex flex-col gap-5 w-full ">

       <Input setEmail={setEmail} email={email}  type="email" name="email" placeHolder="ایمیل خود را وارد کنید:"
         label="ایمیل" icon="email" errors={state?.errors?.email} />

       
          <SubmitButton subLabel="ارسال کد تایید"   />

     
        </form>
           
        </>
    )
}