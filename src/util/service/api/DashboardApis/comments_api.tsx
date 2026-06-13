import { ApiClient } from "../apiClient";

export type SellerCommentUser = {
  firstName: string;
  lastName: string;
  profilePicture: string | null;
};

export type SellerCommentHouse = {
  id: number;
  title: string;
  address: string;
};

export type SellerComment = {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: SellerCommentUser;
  house: SellerCommentHouse;
};

export type SellerCommentsResponse = {
  comments: SellerComment[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export function SellerCommentsAPI(client: ApiClient) {
  return {
    getSellerComments: (seller_id: string | number, page = 1) =>
      client.get<SellerCommentsResponse>(
        `/api/comments/seller/${seller_id}?page=${page}`
      ),
  };
}