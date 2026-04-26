
import Step1 from "../lib/components/signUp/step1";
import Step2 from "../lib/components/signUp/step2";
import Step3 from "../lib/components/signUp/step3";
import PIZA from "../../../../public/auth/PIZA.png";
import Image from "next/image";
import Link from "next/link";

import AuthHeader from "../lib/components/authheader";

interface searchItemsProps {
    searchParams:Promise<{
        page:string,
        step:string
    }>
}

export default async function  Login({searchParams}:searchItemsProps) {
  
   const {step} = await searchParams;
   
   let currentStep = null;
   let email = "mosayebi@gmail.com"

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

            <AuthHeader step={step}/>

           {currentStep}

           </div>
        </div>
      

    )
}