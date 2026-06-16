// actions.ts
"use server";

import {
  passwordChangeZod
  ,profileChangerZod
  } from "@/util/hooks/zodValidation";


import {Api} from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync";
import { getToken, getUserInfo } from "../api/token";

const url =process.env.NEXT_PUBLIC_API_URL

export async function uploadAvatarAction(_: unknown, formData: FormData): Promise<{ avatarUrl?: string; error?: string }> {
  const file = formData.get("avatar") as File;
  const token = await getToken();

  try {
    const body = new FormData();
    body.append("picture", file);

    const res = await fetch(`http://188.121.111.8:3003/api/users/upload/picture`, {
      method: "PUT",
      body,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    return data;


  } catch (error) {
    console.error(error);
    return { error: "آپلود تصویر با خطا مواجه شد" };
  }
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



