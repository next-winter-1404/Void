"use server"
import type { action_result } from "@/types/action_Result";
import toast_errorHandling from "@/util/hooks/errorHandling";
import { redirect } from "next/navigation";

export async function handleAsyncAction<T = any>(
  actionPromise: Promise<T>
): Promise<action_result> {
  try {

    const response = await actionPromise;
    
    const status = (response as any)?.status || 200;

    return {
      success: status >= 200 && status < 300,
      status: status,
      data: response, 
    };
    
    
   

  } catch (error: any) {
      if(error?.status === 401) redirect("/login");
    return {
      success: false,
      status: error.status || 500,
      message: error.message || "unkhown error",
      errors: error,
    };


  }
}