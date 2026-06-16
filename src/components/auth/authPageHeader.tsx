"use client"
import Image from "next/image"
import Link from "next/link"

//assets
import PIZA from "@/assets/ico/PIZA.png";
import { NextURL } from "next/dist/server/web/next-url";

interface stepProps {
    step?: "RverifyEmail" | "RverifyCode" 
    |"FverifyEmail" | "FverifyCode" | "resetPass" | "registerFinal";
    head : "ثبت نام در پیزا" | "ورود به پیزا" | "تغییر رمز عبور"
    email?:string
}

import {redirect} from "next/navigation"


export default function authPageHeader ({step,head,email}:stepProps) {

    const text:string[] =
     ["برای ثبت نام در  میتوانید با اکانت گوگل خود و یا با ارسال کد تایید به ایمیل خود اقدام کنید"
     ,
     "مشخصات خواسته شده را پر کنید"
     ,
     "برای ورود به حساب کاربری  میتوانید با اکانت گوگل خود و یا با ایمیل و رمزعبور خود اقدام کنید"
     ,
     "برای تغییر رمز عبور خود ایمیل حساب خود را وارد کنید"
     ,
     "رمز عبور جدید را وارد کنید"
    ]
    
    
    return (
        <>
          <header className="my-2 w-full">
             <button onClick={()=>redirect("/home")} className=" py-3"><Image alt="logo" src={PIZA} /></button>
             <h1 className="font-bold text-[36px] mb-5">{head}</h1>
            
             

             <p className=" text-[14px] font-medium text-[#767676]">
                {  
                   step === "RverifyEmail" ? text[0] : 
                   step === "FverifyEmail" ? text[3] :
                   step === "RverifyCode" || step === "FverifyCode"  ? <span>کد تایید ارسال شده به <span className="text-[blue]">{email}</span> را وارد کنید.</span> :
                   step === "registerFinal" ? text[1] : 
                   step === "resetPass" ?   text[4] : text[2]
                }
               
                <br/>
                {step === "RverifyCode" ?
                <Link href="/register" className="underline text-[blue]">برای تغییر جیمیل</Link>
                : step === "FverifyCode" && <Link href="/forgetPassword" className="underline text-[blue]">برای تغییر جیمیل</Link>
                }
                 
              </p>
              
           </header>
        </>
    )


}