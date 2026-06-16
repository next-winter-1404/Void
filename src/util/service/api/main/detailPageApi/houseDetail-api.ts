import { ReserveBody } from "@/types/reserveType/reserve-type";
import {ApiClient} from "@/util/service/api/apiClient";
import { availableMemory } from "process";

export const HouseDetailAPI = (client:ApiClient)=> ({
   
   
  houseDetail:(id:number)=>{
     return client.get(`/api/houses/${id}`)
  },

  houseLocation:(id:number)=>{
     return client.get(`/api/locations/${id}`)
  },


  sameHouse:(filters: Record<string, any>)=>{
     const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    }
  });

    const queryString = params.toString();
  const url = queryString ? `/api/houses?${queryString}` : "/api/houses";

  return client.get(url); 
  },

  //comment
  houseComments:(houseId:number)=>{
     return client.get(`/api/houses/${houseId}/comments`);
  },

   Comments:(houseId:number)=>{
     return client.get(`/api/comments?house_id=${houseId}&limit=4&order=ASC&sort=created_at`);
  },

  commentHandler:(data:{house_id:number,title:string,caption:string,rating:number,parent_comment_id?:number | null})=> {
     
    return client.post(`/api/comments`,data)
  },

  HouseAvailability:(id:number,startDate:string,endDate:string)=>{
      return client.get(`/api/houses/${id}/availability?startDate=${startDate}&endDate=${endDate}`);
  },

  ReserveHouseHandler : (data:ReserveBody)=>{
    return client.post("/api/bookings",data)
  },

  addFavorite:(data:{house_id:number,user_id:number})=>client.post(`/api/favorites`,data),
  removeFavorite:(favoriteId:number)=>client.delete(`/api/favorites/${favoriteId}`)

  
})