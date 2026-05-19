
import { ApiClient } from "./apiClient";
import { AuthAPI } from "./auth/auth_api";
import { HouseAPI } from "./main/houseApi/house_api";
import { HouseDetailAPI } from "./main/detailPageApi/houseDetail-api";
import { HouseMortgateRentListAPI } from "./main/RentAndMortgageApi/houseApi";
import { getToken } from "./token";



const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);

export const api = {
   
  auth: AuthAPI(client),
  house:HouseAPI(client),
  houseDetail:HouseDetailAPI(client),
  houseListmortRent:HouseMortgateRentListAPI(client),
};
