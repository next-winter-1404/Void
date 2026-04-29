
import VerifyEmail from "@/components/auth/registerContainer/verifyEmail";
import VerifyCode from "@/components/auth/registerContainer/verifyCode";
import RegisterFinal from "@/components/auth/registerContainer/registerFinal";


import AuthPageHeader from "@/components/auth/authPageHeader";

interface searchItemsProps {
    searchParams:Promise<{
        page:string,
        step:"RverifyEmail" | "RverifyCode" | "register/final"
        email:string
    }>
}

export default async function  Login({searchParams}:searchItemsProps) {
  
   const {step,email} = await searchParams;
   
   let currentStep = null;
   
   switch(step) {
    case "RverifyEmail" : currentStep = <VerifyEmail/> ; break
    case "RverifyCode" : currentStep = <VerifyCode/>; break
    case "register/final" : currentStep = <RegisterFinal/> ;break
     default : currentStep = <VerifyEmail/> ;break
   }
   
       
    return (
         <>      
         <div className="flex flex-col items-center gap-5 w-[430px] max-md:w-[80%] ">


           <AuthPageHeader step={step}  head="ثبت نام در پیزا" email={email} />

           {currentStep}

           </div>

        </>
      

    )
}