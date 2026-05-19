"use server"

import { redirect } from "next/navigation";

// zod 
import {
  loginZod,
  verifyCodeZod,
  verifyEmailZod,
  resetPassZod,
  finalRegisterZod} from "@/util/hooks/zodValidation";


import type { action_result } from "@/types/action_Result";

interface apiRes {
  status:number,
  message:string,
  errors:[],
  name:string,
  details:object
}


import { Api } from "../api";
import { handleAsyncAction } from "../api/handleAsync";

import { ApiClient } from "../api/apiClient";
import { setToken } from "../api/token";



export async function login_Handler(prevState:action_result ,formData:FormData):Promise<action_result>{
  
const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginZod.safeParse(data);
  if (!result.success) {
   
    return {
      errors:result.error.flatten().fieldErrors,
    };
  }

  const api = await Api();

  const response = await handleAsyncAction(api.auth.login(data));
  
   if (response.data?.accessToken) {
   await setToken(response.data.accessToken);
  console.log("token set in cookies!");
  }

  return response

}


/////////// register

export async function register_Request(prevState:action_result ,formData:FormData):Promise<action_result>{
 
  const data = {
    email : formData.get("email") as string,

  }
   
   const result = verifyEmailZod.safeParse(data);
  if (!result.success) {
    return {
      errors:result.error.flatten().fieldErrors,
    };
  }

  const api = await Api();

     return await handleAsyncAction(api.auth.register(data));

}

export async function register_Verify(prevState:action_result ,formData:FormData):Promise<action_result>{
 
  const tmpUserId = formData.get("tempUserId") ; // need to create input`s

  const data = {
    tempUserId : Number(tmpUserId),
    verificationCode :formData.get("verifyCode") as string
    
  }

  const api = await Api();
  
  return await handleAsyncAction(api.auth.verifyEmail(data));

  

}



export async function register_completion(prevState:any ,formData:FormData):Promise<any>{
   
    const userId = formData.get("userId");
    
    const data ={
     userId : Number(userId),
     phoneNumber : formData.get("phoneNumber") as string,
     password : formData.get("password") as string,
     passwordRepeat : formData.get("passwordRepeat") as string
    }

   const result = finalRegisterZod.safeParse(data)
   
     if(!result.success){
       return {success:false,errors:result.error.flatten().fieldErrors,}
      
     }

     const api = await Api();

     return await handleAsyncAction(api.auth.complete_registration(data));
    
}


//////// forgetpassword

export async function  forgetPass_Request (prevState:any,formData:FormData):Promise<any>{

  const data = {
    email : formData.get("email") as string
  }
   
   const result = verifyEmailZod.safeParse(data);
  if (!result.success) {
    return {
      errors:result.error.flatten().fieldErrors,
    };
  }
     
  const api = await Api();

   return await handleAsyncAction(api.auth.forgotPasswordRequest(data));

  
   
}

export async function forgetPass_Verify(prevState:any ,formData:FormData):Promise<any>{
   
    const data = {
     email:formData.get("email") as string, 
     code:formData.get("verifyCode") as string
  }
  
    const api = await Api();

  return await handleAsyncAction(api.auth.forgetPasswordVerify(data));
  
   
}

export async function forgetPass_ResetPass(prevState:any ,formData:FormData):Promise<any>{
   
    const data ={
     email:formData.get("email") as string, 
     password : String(formData.get("password")),
     passwordRepeat : String(formData.get("passwordRepeat"))
    }
    
    console.log(data);

   const result = resetPassZod.safeParse(data)
   
     if(!result.success){
       return {success:false,errors:result.error.flatten().fieldErrors,}
      
     }

     const api = await Api();

  return await handleAsyncAction(api.auth.resetPassword(data));

   
   
}
