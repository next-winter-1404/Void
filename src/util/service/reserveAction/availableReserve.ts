"use server"

import { action_result } from "@/types/action_Result";
import { Api } from "../api";
import { handleAsyncAction } from "../api/handleAsync";
import { redirect } from "next/navigation";

export default async function availability_House(prevState:action_result,formData:FormData):Promise<action_result>{

    //reserveDate input
     const checkInDate = formData.get("checkIn")?.slice(0,10) as string
     const checkOutDate = formData.get("checkOut")?.slice(0,10) as string

    const id = Number(formData.get("houseId")); 

    const api = await Api();

    const response = await handleAsyncAction(api.houseDetail.HouseAvailability(id,checkInDate,checkOutDate));
    
    if(response?.success){
        redirect(`/reserving/${id}`);
    }
    
    return response;


}