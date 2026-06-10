import {ApiClient} from "../apiClient";

import type {AccumulatedData} from "@/types/dashboard/houseManagmentType/type";

export const HouseManageApi = (client:ApiClient) => ({
   
   houseListSeller: (filters: Record<string, any>) => {
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
  const url = queryString ? `/api/houses/seller/user?${queryString}` : "/api/houses/seller/user";
   console.log(url);
  return client.get(url);
  },
    
    
    // houseListSeller:()=> client.get(`/api/houses/seller/user`),

    houseDetail:(id:number)=>{
     return client.get(`/api/houses/${id}`)
     },
     
   AddHouse:(data:AccumulatedData)=> client.post(`/api/houses`,data),
   EditHouse:(id:number,data:AccumulatedData)=> client.put(`/api/houses/${id}`,data),
   uploadPhotoHouse:(id:number,data:File[] | undefined)=>client.post(`/api/houses/upload/photos/${id}`,data),
   removeHouse:(id:number)=> client.delete(`/api/houses/${id}`),


})