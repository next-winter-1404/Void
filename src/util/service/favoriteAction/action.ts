"use server"

import { Api } from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync"

interface FavoriteState {
    isFavorite: boolean
    success?: boolean
    status?: number
}

export async function toggleFavorite(prevState:any, formData: FormData): Promise<any> {

    const houseId = Number(formData.get("houseId"));
    const isFavorite = formData.get("isFavorite") === "true";
    const user_id = Number(formData.get("user_id"));
    const favoriteId = Number(formData.get("favoriteId"));
    const data = {
        house_id:houseId,
        user_id:user_id
    }

    const api = await Api();

    if (!favoriteId || favoriteId == null) {
        
        const res = await handleAsyncAction(api.houseDetail.addFavorite(data));

        return res
    } else {
       
        const res = await handleAsyncAction(api.houseDetail.removeFavorite(favoriteId));

        return res
    }
}