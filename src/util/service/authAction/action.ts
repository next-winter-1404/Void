"use server"

import { redirect } from "next/navigation";

// zod 
import {zodSchuma} from "@/util/hooks/zodValidation";
import type { ErrorType } from "@/util/hooks/zodValidation";

export interface exportResultF {
   success:boolean,
   result?: string | null
   errors?: ErrorType
     
}

export async function loginHandler(prevState:any ,formData:FormData):Promise<any>{
  
 const data = {

   email : formData.get("email"),
   password : formData.get("password")

 }

 const result = zodSchuma.safeParse(data)
    
  if(!result.success){
    return {success:false,errors:result.error.flatten().fieldErrors,}
  }

  
    
  
  // console.log("email:",email,"password",password);

  return {success:true,result:"شما وارد حساب شدید"}
    

}

export async function registerVerifyHandler(prevState:exportResultF ,formData:FormData):Promise<exportResultF>{
 
  
   const email =formData.get("email")
   const verifyCode = formData.get("verifyCode")
   
   console.log(email);

   if(email) {
     redirect(`/register?step=RverifyCode&email=${formData.get("email")}`)
    }
    else{redirect(`/register?step=register/final`)};
  
  
  //  return{success:true,result:"کد تایید به ایمیل شما ارسال شد"}
  
}

export async function registerApplyHandler(prevState:exportResultF ,formData:FormData):Promise<any>{
   
    const data ={
     phoneNumber : formData.get("phoneNumber"),
     password : formData.get("password"),
     passwordRepeat : formData.get("passwordRepeat")
    }

   const result = zodSchuma.safeParse(data)
   
   
 

     if(!result.success){
       console.log("www")
       return {success:false,errors:result.error.flatten().fieldErrors,}
      
     }else{
           redirect("/login")
     }


  //  return {success:true, result:"ثبت نام با موفقیت انجام شد"}
   
}



export async function  forgetPassHandler (prevState:any,formData:FormData):Promise<any>{

  const email =formData.get("email")
   const verifyCode = formData.get("verifyCode")
   
   console.log(email);

   if(email) {
     redirect(`/forgetPassword?step=FverifyCode&email=${formData.get("email")}`)
    }
    else{redirect(`/forgetPassword?step=resetPass`)};
  
   
}

export async function resetPassHandler(prevState:exportResultF ,formData:FormData):Promise<any>{
   
    const data ={
     password : formData.get("password"),
     passwordRepeat : formData.get("passwordRepeat")
    }

   const result = zodSchuma.safeParse(data)
   
  if(!result.success){
    return {success:false,errors:result.error.flatten().fieldErrors,}
  }
  
   return {success:true, result:"تغییر رمز عبور ما موفقیت انجام شد"}
   
   
}
