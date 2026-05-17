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
import {register_Request} from "@/util/service/authAction/action";

import { actionResult } from "@/util/service/authAction/actionResult";


export default function verify_email () {

     const [email,setEmail] = useState<string>("");

     
     const [state,formAction,pending] = useActionState(register_Request,actionResult);
    
     if(state.success){
       redirect(`/register?step=RverifyCode&email=${email}&tempUserId=${state.data.tempUserId}&verificationCode=${state.data.verificationCode}`)
     }

     useEffect(()=>{
        console.log(state);
    },[state])
    
    return(
       <>

      <GoogleBt title="ثبت نام در پیزا با گوگل"/>
       
       <div className="flex items-center w-full ">
         <div className="flex-1 h-px bg-gray-300"></div>
         <span className="px-3 text-gray-400">یا</span>
         <div className="flex-1 h-px bg-gray-300"></div>
       </div>

        <form action={formAction}   className="flex flex-col gap-5 w-full ">

          <Input setEmail={setEmail} email={email}  type="text" name="email" placeHolder="ایمیل خود را وارد کنید:"
             label="ایمیل" icon="email" errors={state?.errors?.email} />

       
          <SubmitButton subLabel="ارسال کد تایید"   />

         <div className="flex flex-col text-[14px] gap-2 font-medium">
           <div className="flex flex-row m-auto">
            <p>حساب کاربری دارید؟</p>
           <Link href="/login" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> ورود به حساب</Link>
          </div> 
         </div>
         
        </form>
           
        </>
    )
}