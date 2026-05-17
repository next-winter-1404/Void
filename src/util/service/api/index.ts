import { ApiClient } from "./apiClient";
import { AuthAPI } from "./auth/auth_api";
import { HouseAPI } from "./main/houseApi/house_api";

const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);

export const api = {
  auth: AuthAPI(client),
  house:HouseAPI(client)
};
