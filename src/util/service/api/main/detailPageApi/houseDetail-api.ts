import {ApiClient, apiClient} from "@/util/service/api/apiClient";

export const HouseDetailAPI = (client:ApiClient)=> ({
   
   
  houseDetail:(id:number)=>{
     return client.get(`/api/houses/${id}`)
  }
  
})