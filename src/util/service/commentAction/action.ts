"use server"
import {Api} from "../api"
import { handleAsyncAction } from "../api/handleAsync";


export default async function comment_Handler (prevState:any,formData:FormData):Promise<any> {
  
   const data ={
      house_id: Number(formData.get("houseId")),
      title:formData.get("content") as string,
      caption:formData.get("content") as string,
      rating:5,
      parent_comment_id:null
   }

   const api = await Api();
   
   const response = await handleAsyncAction(api.houseDetail.commentHandler(data));

   return response;

}