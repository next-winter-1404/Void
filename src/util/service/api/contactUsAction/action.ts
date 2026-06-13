"use server"

import { Api } from ".."
import { handleAsyncAction } from "../handleAsync"


export  async function contactUS (prevState:any,formData:FormData):Promise<any>{

    const message = formData.get("message") as string;

    const data ={
        title:message,
        message:message
    }

    const api = await Api();
    const response = await handleAsyncAction(api.contactUs.contactUs(data));

    return response;
}