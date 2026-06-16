'use server'

import { Api } from "../index";
import { handleAsyncAction } from "../handleAsync";

export async function getFavorites(
  user_id: string,
  params?: {
    page?: number
    limit?: number
    propertyType?: string
    location?: string
    minPrice?: string
    maxPrice?: string
  }
) {
  const api = await Api();
  const p = params ?? {};
  const query = new URLSearchParams({
    page: String(p.page ?? 1),
    limit: '10',
    sort: 'createdAt',
    order: 'DESC',
    ...(p.propertyType && { propertyType: p.propertyType }),
    ...(p.location    && { location:     p.location }),
    ...(p.minPrice    && { minPrice:      p.minPrice }),
    ...(p.maxPrice    && { maxPrice:      p.maxPrice }),
  });
  return handleAsyncAction(
    api.client.get(`/api/favorites/user/${user_id}?${query}`)
  );
}

export async function deleteFavorite(favorite_id: number) {
  const api = await Api();
  return handleAsyncAction(
    api.client.delete(`/api/favorites/${favorite_id}`)
  );
}