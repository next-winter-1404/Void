import {ApiClient, apiClient} from "@/util/service/api/apiClient";

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