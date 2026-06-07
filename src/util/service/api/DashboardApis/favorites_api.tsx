
'use server'

import { Api } from "../index";
import { handleAsyncAction } from "../handleAsync";

export async function getFavorites(user_id: string) {
  const api = await Api();
  return handleAsyncAction(
    api.client.get(`/api/favorites/user/${user_id}?page=1&limit=10&sort=createdAt&order=DESC`)
  );
}
