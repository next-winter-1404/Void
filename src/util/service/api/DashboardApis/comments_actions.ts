"use server";

import { Api } from "@/util/service/api";
import { SellerCommentsAPI, type CommentsResponse } from "./comments_api";

export async function getSellerComments(
  sellerId: string | number,
  page = 1
): Promise<CommentsResponse> {
  const { client } = await Api();
  return SellerCommentsAPI(client).getSellerComments(sellerId, page);
}
