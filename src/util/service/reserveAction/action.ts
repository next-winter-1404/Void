'use server'

interface ReserveProps {
    data:{
    checkInDate:string,
    checkOut:string,
    personCount:number,
    discountCode?:string
    }
}


export  default async function Reserve_Handler (prevState:any,formData:FormData):Promise<any>{

    const data = {
         checkInDate:formData.get("checkIn") as string,
         checkOutDate:formData.get("checkOut") as string,
         personCount:Number(formData.get("PersonCount")),
         discountCode:formData.get("discountCode") as string
    }

    return {
         data
    }
}
