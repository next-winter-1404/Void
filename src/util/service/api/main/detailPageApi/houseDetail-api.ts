import {ApiClient, apiClient} from "@/util/service/api/apiClient";

export const HouseDetailAPI = (client:ApiClient)=> ({
   
   
  houseDetail:(id:number)=>{
     return client.get(`/api/houses/${id}`)
  },

  houseComments:(houseId:number)=>{
     return client.get(`/api/houses/${houseId}/comments`);
  },
   Comments:(houseId:number)=>{
     return client.get(`/api/comments?house_id=${houseId}&limit=4&order=ASC&sort=created_at`);
  },

  commentHandler:(content:string,houseId:number)=> {
    return client.post(`/api/houses/${houseId}/comments`,content)
  }


  
})