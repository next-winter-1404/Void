'use client'
import SubmitButton from "../SubmitBt";
import GoogleBt from "../googleBt"
import Link from "next/link"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState} from "react"
import { updateQueryParams } from "@/app/lib/updateQueryParams";


export default function step1 () {

    const router = useRouter();
  const searchParams = useSearchParams();

  const stepHandler = (e: FormEvent) => {
    e.preventDefault();

    const nextUrl = updateQueryParams(
      searchParams,      
      { step: "2" }      
    );

    router.push(nextUrl);
  };
 
    return(
       <>

      <GoogleBt/>
       
       <div className="flex items-center w-full ">
         <div className="flex-1 h-px bg-gray-300"></div>
         <span className="px-3 text-gray-400">یا</span>
         <div className="flex-1 h-px bg-gray-300"></div>
       </div>

        <form onSubmit={stepHandler}   className="flex flex-wrap gap-5 ">
            <label htmlFor="email" className=" w-full font-medium ">ایمیل</label>
             <input
              name="email"
              type="text"
              placeholder="ایمیل خود را وارد کنید:" 
              className="border mb-2 border-[gray]/40 w-full py-3 outline-none rounded-[16px]  text-start pr-12 bg-[url('/auth/email-ico.png')] bg-no-repeat bg-[position:98%_55%]"
             />
       
          <SubmitButton subLabel="ارسال کد تایید"   />
                <div>step1</div>
           <div className="flex flex-row m-auto">
            <p>حساب کاربری داری؟</p>
           <Link href="/Login" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> ورود به حساب</Link>
          </div> 
     
        </form>
           
        </>
    )
}