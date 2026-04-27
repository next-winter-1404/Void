'use client'
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt"
import Link from "next/link"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState} from "react"
import { updateQueryParams } from "@/util/helper/updateQueryParams";

import Input from "@/components/auth/input"



export default function step1 () {

 

  const [email,setEmail] = useState<string>("");

    const router = useRouter();
  const searchParams = useSearchParams();

  const stepHandler = (e: FormEvent) => {
    e.preventDefault();

    const stepUrl = updateQueryParams(
      searchParams,      
      { step: "2" , email:email }      
    );

    router.push(stepUrl);
    
  };

  
 
    return(
       <>

      <GoogleBt title="ثبت نام در پیزا با گوگل"/>
       
       <div className="flex items-center w-full ">
         <div className="flex-1 h-px bg-gray-300"></div>
         <span className="px-3 text-gray-400">یا</span>
         <div className="flex-1 h-px bg-gray-300"></div>
       </div>

        <form onSubmit={stepHandler}   className="flex flex-wrap gap-5 ">

          <Input setEmail={setEmail} email={email}  type="email" name="email" placeHolder="ایمیل خود را وارد کنید:"
             label="ایمیل" icon="email"/>

       
          <SubmitButton subLabel="ارسال کد تایید"   />

           <div className="flex flex-row m-auto">
            <p>حساب کاربری دارید؟</p>
           <Link href="/login" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> ورود به حساب</Link>
          </div> 
     
        </form>
           
        </>
    )
}