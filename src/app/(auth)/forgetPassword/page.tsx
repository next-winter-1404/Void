

import VerifyEmail from "@/components/auth/forgetPassContainer/verifyEmail";
import VerifyCode from "@/components/auth/forgetPassContainer/verifyCode";
import ResetPass from "@/components/auth/forgetPassContainer/resetPass";


// import AuthPageHeader from "@/components/auth/authPageHeader";
import PIZA from "@/assets/ico/PIZA.png"
import Image from "next/image"

interface searchItemsProps {
    searchParams:Promise<{
        page:string,
        step:"FverifyEmail" | "FverifyCode" | "resetPass"
        email:string
    }>
}

export default async function  Login({searchParams}:searchItemsProps) {
  
   const {step,email} = await searchParams;
   
   let currentStep = null;
   
   console.log(step);

   switch(step) {
    case "FverifyEmail" : currentStep = <VerifyEmail/> ; break
    case "FverifyCode" : currentStep = <VerifyCode/>; break
    case "resetPass" : currentStep = <ResetPass/> ;break
     default : currentStep = <VerifyEmail/> ;break
   }
       
    return (
               
       
         <div className="flex flex-col items-center gap-5 w-[430px] max-md:w-[80%] ">


            <header className="my-2 w-full">
             <h1 className=" py-3"><Image alt="logo" src={PIZA} /></h1>
             <h1 className="font-bold/700 text-[36px] mb-5">تغییر رمز عبور</h1>
        
             <p className=" text-[14px] font-medium text-[#767676]">
                 برای تغییر رمز عبور خود ایمیل حساب خود را وارد کنید
              </p>
              
           </header>

           {currentStep}

           </div>
       

    )
}