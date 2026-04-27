'use client'
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt"
import Link from "next/link"

import {FormEvent,useState} from "react"

import Input from "@/components/auth/input"

export default function step1 () {

  const stepHandler = (e: FormEvent) => {
    e.preventDefault();

  };
 
    return(
       <>

      <GoogleBt title="ورود به حساب کاربری با گوگل"/>
       
       <div className="flex items-center w-full ">
         <div className="flex-1 h-px bg-gray-300"></div>
         <span className="px-3 text-gray-400">یا</span>
         <div className="flex-1 h-px bg-gray-300"></div>
       </div>

        <form onSubmit={stepHandler}   className="flex flex-wrap gap-5 ">

          <Input type="email" name="email" placeHolder="ایمیل خود را وارد کنید:"
             label="ایمیل" icon="email"/>

           <Input name="pass" type="password" id="pass" 
             placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
              label="رمز عبور"
              /> 
       
          <SubmitButton subLabel="ورود به حساب"   />

           <div className="flex flex-row m-auto">
            <p>حساب کاربری ندارید؟</p>
           <Link href="/register" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> ثبت نام در پیزا</Link>
          </div> 
     
        </form>
           
        </>
    )
}