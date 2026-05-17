'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt";
import Input from "@/components/common/inputFeild/input"

import Link from "next/link"
import {FormEvent,useActionState,useEffect,useState} from "react"
import {redirect} from "next/navigation";

//util/service
import { login_Handler} from "@/util/service/authAction/action";

import { actionResult } from "@/util/service/authAction/actionResult";


export default function step1 () {

    const [state,formAction,pending] = useActionState(login_Handler,actionResult);
    
    useEffect(()=>{
        console.log(state);
    },[state])

  
    return(

       <>

      <GoogleBt title="ورود به حساب کاربری با گوگل"/>
       
       <div className="flex items-center w-full ">
         <div className="flex-1 h-px bg-gray-300"></div>
         <span className="px-3 text-gray-400">یا</span>
         <div className="flex-1 h-px bg-gray-300"></div>
       </div>

        <form action={formAction}   className="flex flex-col gap-5 w-full ">

          <Input type="text" name="email" placeHolder="ایمیل خود را وارد کنید:"
             label="ایمیل" icon="email" errors={state?.errors?.email} />

    
           <Input name="password" type="password" id="pass" 
             placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
              label="رمز عبور"
              errors={state?.errors?.password}
              /> 
       
          <SubmitButton subLabel="ورود به حساب"   />
          
          <div className="flex flex-col text-[14px] gap-2 font-medium">

            <div className="flex flex-row m-auto">
            <p>حساب کاربری ندارید؟</p>
           <Link href="/register" className="cursor-pointer text-[#9B0EE1] mr-2  underline"> ثبت نام در پیزا</Link>
          </div> 

          <div className="flex flex-row m-auto">
            <p>رمز خود را فراموش کردید؟</p>
           <Link href="/forgetPassword" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> فراموشی رمز </Link>
          </div> 

          </div>
           
     
        </form>
           
        </>
    )
}