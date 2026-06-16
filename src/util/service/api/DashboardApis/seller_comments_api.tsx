import { ApiClient } from "@/util/service/api/apiClient";

export interface CommentUser {
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

export interface CommentHouse {
  id: number;
  title: string;
  address: string;
}

export interface SellerComment {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: CommentUser;
  house: CommentHouse;
}

export interface SellerCommentsResponse {
  comments: SellerComment[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface GetSellerCommentsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  rating?: string;
}

export function SellerCommentsAPI(client: ApiClient) {
  return {
    getComments: (sellerId: number, params: GetSellerCommentsParams = {}) => {
      const { page = 1, limit = 10, sort = "created_at", order = "DESC", rating } = params;
      const ratingParam = rating ? `&rating=${rating}` : "";
      return client.get<SellerCommentsResponse>(
        `/api/comments/seller/${sellerId}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${ratingParam}`
      );
    },

    deleteComment: (commentId: number) =>
      client.delete(`/api/comments/${commentId}`),
  };
}