// actions.ts
"use server";

import {
  passwordChangeZod
  ,profileChangerZod
  } from "@/util/hooks/zodValidation";

import {Api} from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync";
import { getUserInfo } from "../api/token";

export async function uploadAvatarAction(_: unknown, formData: FormData):Promise<any> {
    const api = await Api();
  const file = formData.get("avatar") as File;
  //  console.log("file",file)
  const Data = await handleAsyncAction(api.profile.profileAvatarUploader(file));

 
  console.log("Full Data:", JSON.stringify(Data));
  
    return {avatarUrl: Data}
   
 
}

export async function updateProfileAction(prevState:any, formData: FormData):Promise<any> {
    const api = await Api();
    const user = await getUserInfo();
    const id = user?.id;

    const data = {
      email:formData.get("email") as string,
      phone:formData.get("phone") as string,
      address:formData.get("address") as string,
      buyingHistory:{},
      sellingHistory:{}
    } 

    console.log("dataaa",data);

    const result = profileChangerZod.safeParse(data)
       
         if(!result.success){
           return {success:false,errors:result.error.flatten().fieldErrors,}
          
         }

    const response = await handleAsyncAction(api.profile.userinfo_Changer(id,data));
 
     return response;  
 
}

export async function updatePasswordAction(prevState:any, formData: FormData):Promise<any> {
    const api = await Api();
    
    const id = Number(formData.get("id"));

    const data = {
      currentPassword:formData.get("currentPassword") as string,
      newPassword:formData.get("newPassword") as string,
      repeatNewPassword:formData.get("repeatNewPassword") as string
    }
    
    const result = passwordChangeZod.safeParse(data)
       
         if(!result.success){
           return {success:false,errors:result.error.flatten().fieldErrors,}
          
         }

    const response = await handleAsyncAction(api.profile.userPassword_Changer(data));
 
     return response;  
 
}



