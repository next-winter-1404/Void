
import LoginHandler from "@/components/auth/loginContainer/LoginHandler";

import PIZA from "@/assets/ico/PIZA.png";
import Image from "next/image";
import Link from "next/link";

import AuthPageHeader from "@/components/auth/authPageHeader";

interface searchItemsProps {
    searchParams:Promise<{
        page:string,
        step:"1" | "2" | "3"
    }>
}

export default async function  Login({searchParams}:searchItemsProps) {
  
   const {step} = await searchParams;
   
   let currentStep = null;
   let email = "mosayebi@gmail.com"

   let text = "برای ثبت نام در آلفا میتوانید با اکانت گوگل خود و یا با ارسال کد تایید به ایمیل خود اقدام کنید";

   
       
    return (
               
        <div className=" w-[50%] max-md:w-[full] border  max-xl:w-full h-screen  flex flex-col items-center justify-center ">

         <div className="flex flex-col items-center gap-5 w-[430px] max-md:w-[80%] ">


           <AuthPageHeader head="ورود به پیزا" />

           {currentStep}

             <LoginHandler/>
             
           </div>
        </div>
      

    )
}