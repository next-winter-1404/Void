import Image from "next/image"
import Link from "next/link"

//assets
import PIZA from "@/assets/ico/PIZA.png";

interface stepProps {
    step?: "1" | "2" | "3" ;
    head : "ثبت نام در پیزا" | "ورود به پیزا"
    email?:string
}

export default function authPageHeader ({step,head,email}:stepProps) {

    const text:string[] =
     ["برای ثبت نام در آلفا میتوانید با اکانت گوگل خود و یا با ارسال کد تایید به ایمیل خود اقدام کنید"
     ,
     "مشخصات خواسته شده را پر کنید"
     ,
     "برای ورود به حساب کاربری آلفا میتوانید با اکانت گوگل خود و یا با ایمیل و رمزعبور خود اقدام کنید"
    ]
    
 
    return (
        <>
          <header className="my-2 w-full">
             <h1 className=" py-3"><Image alt="logo" src={PIZA} /></h1>
             <h1 className="font-bold/700 text-[36px] mb-5">{head}</h1>
            
             <p className=" text-[14px] font-medium text-[#767676]">
                {
                   step === "1" ? text[0] : 
                   step === "2" ? <span>کد تایید ارسال شده به <span className="text-[blue]">{email}</span> را وارد کنید.</span> :
                   step === "3" ? text[1] : text[2]
                }
               
                <br/>
                {step === "2" &&
                <Link href="/" className="underline text-[blue]">برای تغییر جیمیل</Link>
                }
                 
              </p>
              
           </header>
        </>
    )


}