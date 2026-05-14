import { ApiClient } from "./apiClient";
import { AuthAPI } from "./auth/auth_api";
import { HouseDetailAPI } from "./main/detailPageApi/houseDetail-api";

const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);

export const api = {
  auth: AuthAPI(client),
  houseDetail:HouseDetailAPI(client)
};


