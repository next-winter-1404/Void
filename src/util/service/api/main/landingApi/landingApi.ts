import { ApiClient } from "@/util/service/api/apiClient";
import { HousesApiType } from "@/types/HouseCard/HouseApiType";

export const LandingApi = (client: ApiClient) =>({
    getHouse:(data:HousesApiType)=> client.get('/api/houses'),

    getComments:()=>client.get(`/api/comments?page=1&limit=10&sort=created_at&order=DESC`),

    category:()=>client.get(`/api/categories?page=1`),
    locations:()=>client.get(`/api/locations?page=1&order=ASC`),
    
})