import {ApiClient, apiClient} from "@/util/service/api/apiClient";

export const HouseAPI = (client:ApiClient)=> ({
   
    houseList:()=>client.get("/api/houses?limit=10&order=DESC&sort=last_updated")
})