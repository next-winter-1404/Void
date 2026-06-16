'use server'

import { ApiClient } from "./apiClient";
import { AuthAPI } from "./auth/auth_api";
import { HouseAPI } from "./main/houseApi/house_api";
import { HouseDetailAPI } from "./main/detailPageApi/houseDetail-api";
import { HouseMortgateRentListAPI } from "./main/RentAndMortgageApi/houseApi";
import { profileApi } from "./dashboard/profile";
import {HouseManageApi} from "./dashboard/houseManageApi";
import {LandingApi} from "@/util/service/api/main/landingApi/landingApi"
import { contactApi } from "./main/contactUs/contactApi";
import { getToken } from "./token";
import { blogApi } from "./main/blogApi/blogApi";
import { SellerCommentsAPI } from "./DashboardApis/comments_api";
import { cache } from 'react';

export const Api = cache(async function Api() {
  const token = await getToken() as string;
  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token);

  return {
    client,
    auth: AuthAPI(client),
    house: HouseAPI(client),
    houseDetail: HouseDetailAPI(client),
    houseListmortRent: HouseMortgateRentListAPI(client),
    profile: profileApi(client),
    HouseManageApi: HouseManageApi(client),
    landing: LandingApi(client),
    blog: blogApi(client),
    contactUs: contactApi(client),
    sellerComments: SellerCommentsAPI(client),
  };
});

