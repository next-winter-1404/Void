import { ReserveBody } from "@/types/reserveType/reserve-type";
import {ApiClient} from "@/util/service/api/apiClient";
import { availableMemory } from "process";

export const contactApi = (client:ApiClient)=> ({
   
   contactUs:(data:{title:string,message:string})=>client.post(`/api/contact-us`,data)
  
})