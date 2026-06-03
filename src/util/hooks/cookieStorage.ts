import { cookies } from "next/headers";

import type {ReserveBody} from "@/types/reserveType/reserve-type"

export async function setForm (data:ReserveBody) {
 const cookieStore = await cookies();

 const Data = JSON.stringify(data);

    cookieStore.set("reserve_data",Data,{
       maxAge: 60 * 60,
       path: "/",
       sameSite: "strict",
       secure: true
    })
}

interface reserveDateProps { 
        checkInDate:string,
        checkOutDate:string
}

export async function setDate ({ReserveDate}:any) {
 const cookieStore = await cookies();

 const Data = JSON.stringify(ReserveDate);

    cookieStore.set("reserve_date",Data,{
       maxAge: 60 * 60,
       path: "/",
       sameSite: "strict",
       secure: false
    })
}

export async function getReserveDate():Promise<any> {
    const cookieStore = await cookies();

    const data = cookieStore.get("reserve_date")?.value as string ;

    return JSON.parse(data);
}



export async function getForm():Promise<ReserveBody> {
    const cookieStore = await cookies();

    const data = cookieStore.get("reserve_data")?.value as string ;

    return JSON.parse(data);
}

export async function removeForm() {
     const cookieStore = await cookies();

     cookieStore.delete("reserve_data");
     cookieStore.delete("reserve_date");
}
