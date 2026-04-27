
import Step1 from "@/components/auth/registerContainer/step1";
import Step2 from "@/components/auth/registerContainer/step2";
import Step3 from "@/components/auth/registerContainer/step3";

import PIZA from "@/assets/ico/PIZA.png";
import Image from "next/image";
import Link from "next/link";

import AuthPageHeader from "@/components/auth/authPageHeader";

interface searchItemsProps {
    searchParams:Promise<{
        page:string,
        step:"1" | "2" | "3"
        email:string
    }>
}

export default async function  Login({searchParams}:searchItemsProps) {
  
   const {step,email} = await searchParams;
   
   let currentStep = null;
   
   let text = "برای ثبت نام در آلفا میتوانید با اکانت گوگل خود و یا با ارسال کد تایید به ایمیل خود اقدام کنید";

   switch(step) {
    case "1" : currentStep = <Step1/> ; break
    case "2" : currentStep = <Step2/>, text = `کد تایید ارسال شده به ${email} را وارد کنید `; break
    case "3" : currentStep = <Step3/>,text = "مشخصات خواسته زیر را پر کنید." ;break
     default : currentStep = <Step1/> ;break
   }
   
       
    return (
               
        <div className=" w-[50%] max-md:w-[full] border  max-xl:w-full h-screen  flex flex-col items-center justify-center ">

         <div className="flex flex-col items-center gap-5 w-[430px] max-md:w-[80%] ">


           <AuthPageHeader step={step}  head="ثبت نام در پیزا" email={email} />

           {currentStep}

           </div>
        </div>
      

    )
}