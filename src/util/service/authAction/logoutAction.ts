"use server"

import { removeToken } from "../api/token";
import type { action_result } from "@/types/action_Result";
import {Api} from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync";


export default async function logout_handler(prevState:action_result):Promise<action_result>{

  // const api = await Api();

  const response =  await removeToken();

 //  await handleAsyncAction(api.auth.logout());

  
  return {
     success:true,
     status:200,
     message:"logout successfully",
     data:response
  };

}