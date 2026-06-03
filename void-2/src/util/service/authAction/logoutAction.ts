"use server"

import { removeToken } from "../api/token";
import type { action_result } from "@/types/action_Result";
import {Api} from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync";


export default async function logout_handler(prevState:action_result):Promise<action_result>{

  await removeToken();
  
  const api = await Api();
  const response = await handleAsyncAction(api.auth.logout());

  return response;

}