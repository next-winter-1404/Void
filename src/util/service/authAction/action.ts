"use server"

import { redirect } from "next/navigation";

// yup (fail)
// import {login, registerStep2, registerStep3} from "@/util/hooks/yupValidation";

export interface exportResultF {
   success:boolean,
   result?: string | null
   errors?:{
      email?:string | null,
      phoneNumber?:string | null,
      verifyCode?:string | null,
      password?:string | null,
      passwordRepeat?:string | null
    }
}

export async function loginHandler(prevState:exportResultF ,formData:FormData):Promise<exportResultF>{
  
 
   const email = formData.get("email")
   const password = formData.get("password")
  

  
    
  
  // console.log("email:",email,"password",password);

  return {success:true,result:"شما وارد حساب شدید"}
    

}

export async function registerVerifyHandler(prevState:exportResultF ,formData:FormData):Promise<exportResultF>{
 
  
   const email =formData.get("email")
   const verifyCode = formData.get("verifyCode")
   
   console.log(email);

   if(email) {
     redirect(`/register?step=2&email=${formData.get("email")}`)
    }
    else{redirect(`/register?step=3`)};
  
  
  //  return{success:true,result:"کد تایید به ایمیل شما ارسال شد"}
  
}

export async function registerApplyHandler(prevState:exportResultF ,formData:FormData):Promise<exportResultF>{
   
    const data ={
     phoneNumber : formData.get("phoneNumber"),
     password : formData.get("password"),
     passwordRepeat : formData.get("passwordRepeat")
    }

   if (data.password != data.passwordRepeat) return {success:false,errors:{passwordRepeat:"رمز عبور همخوانی ندارد"}}
     
   console.log("phone",data.phoneNumber,"password",data.password,"passswordRepeat",data.passwordRepeat);

  
   return {success:true, result:"ثبت نام با موفقیت انجام شد"}
   
   

}