"use server"
import { api } from "../api"
import { handleAsyncAction } from "../api/handleAsync"

import type { action_result } from "@/types/action_Result";

export default async function comment_Handler (prevState:any,formData:FormData):Promise<action_result> {
  
   const content = formData.get("content") as string;
   const houseId = Number(formData.get("houseId"));

   console.log("content",content,"houseId",houseId);
     
   const response = await handleAsyncAction(api.houseDetail.commentHandler(content,houseId));

   return response;

}