'use client'
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt"
import Link from "next/link"

import VerifyInput from "@/components/auth/verifyInput"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState} from "react"
import { updateQueryParams } from "@/util/helper/updateQueryParams";

export default function step1 () {
  
    const router = useRouter();
      const searchParams = useSearchParams();
    
      const stepHandler = (e: FormEvent) => {
        e.preventDefault();
    
        const nextUrl = updateQueryParams(
          searchParams,      
          { step: "3" }      
        );
    
        router.push(nextUrl);
      };


      const handleComplete = (code: string) => {
        console.log(code);
      };
    
    return(
       <>

        <form onSubmit={stepHandler} className="flex flex-wrap w-full gap-5">
            
            <div className="flex justify-center w-full ">
              <VerifyInput length={5} onComplete={handleComplete} />
            </div>
                        
          <SubmitButton subLabel="ارسال کد تایید"  />

        </form>
           
        </>
    )
}