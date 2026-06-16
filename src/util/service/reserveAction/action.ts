'use server'
import {Api} from "@/util/service/api"
import type {ReserveBody,TravelerType} from "@/types/reserveType/reserve-type"
import { handleAsyncAction } from "../api/handleAsync"
import { action_result } from "@/types/action_Result"
import { object, success } from "zod"
import { getForm, removeForm, setForm } from "@/util/hooks/cookieStorage"
import { redirect } from "next/navigation"


export async function submit_info(prevState:any,formData:FormData):Promise<any>{
    
     //reserveDate input
     const checkInDate = formData.get("checkInDate") as string
     const checkOutDate = formData.get("checkOutDate") as string
    const reservedDates:string[] = [checkInDate.slice(0,10),checkOutDate.slice(0,10)];
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const nationalId = formData.get("nationalId") as string;
    const birthDate = formData.get("birthDate") as string;
    const gender = formData.get("gender") as "male" | "female";
    const sharedEmail = formData.get("sharedEmail") as string;
    const sharedMobile = formData.get("sharedMobile") as string;


    //
     const personCount = Number(formData.get("PersonCount"))
     const discountCode = formData.get("discountCode") as string

    const houseId = Number(formData.get("houseId")); 
    
    //traveler detail (user detail)
    const traveler_details:TravelerType[] = [
        {
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        birthDate:birthDate,
        nationalId:nationalId
        }
    ]

    //traveler email phoneNumber
//     const sharedEmail = "mosayebimersad21@gmail.com"
//     const sharedMobile = "09111111"

    const data:ReserveBody = {
         houseId:houseId,
         reservedDates:reservedDates,
         traveler_details,
         sharedEmail:sharedEmail,
         sharedMobile:sharedMobile
    }
    
     await setForm(data);

     redirect("/reserving/purchasing")
    
}


export  async function Reserve_Handler (prevState:any,formData:FormData):Promise<any>{
   
    const data = await getForm();
    
    console.log("data:",data);
    const api = await Api();
   const response = await handleAsyncAction(api.houseDetail.ReserveHouseHandler(data));

   if(response.success){redirect('/dashboard') }
   if(response.status === "pending"){return {success:true,data:{}}}

   return response;
}
