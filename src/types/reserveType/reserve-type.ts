export interface TravelerType {
    firstName:string,
    lastName:string,
    gender:"male" | "female",
    birthDate:string,
    nationalId:string
}

interface checkInOutType {
   reservedDates:["checkInDate","checkOutDate"]   
}

export interface ReserveBody {
    houseId:number,
    reservedDates:string[],
    traveler_details:TravelerType[],
    sharedEmail:string,
    sharedMobile:string
}
