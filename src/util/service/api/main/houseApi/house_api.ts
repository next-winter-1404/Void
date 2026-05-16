import {ApiClient, apiClient} from "@/util/service/api/apiClient";

export const HouseAPI = (client:ApiClient)=> ({
   
   ReservationHouseList: (filters: Record<string, any>) => {
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

  houseLocation:()=>{
     return client.get("/api/locations")
  },

  theHouseLocation:(id:number)=>{
     return client.get(`/api/locations/${id}`)
  }

  
})