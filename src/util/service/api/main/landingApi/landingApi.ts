import { ApiClient } from "@/util/service/api/apiClient";
import { HousesApiType } from "@/types/HouseCard/HouseApiType";

export const LandingApi = (client: ApiClient) =>({
    getHouse:(data:HousesApiType)=>{
        client.get('/api/houses')
    }
})