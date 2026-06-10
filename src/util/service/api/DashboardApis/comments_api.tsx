import { ApiClient } from "../apiClient";

export interface Comment {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: { firstName: string; lastName: string; profilePicture: string | null };
  house: { id: number; title: string; address: string };
}

export interface CommentsResponse {
  comments: Comment[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export function SellerCommentsAPI(client: ApiClient) {
  return {
    getSellerComments: (sellerId: string | number, page = 1) =>
      client.get<CommentsResponse>(`/api/comments/seller/${sellerId}?page=${page}`),
  };
}