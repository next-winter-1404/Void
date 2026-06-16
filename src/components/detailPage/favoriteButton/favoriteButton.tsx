"use client"

import { useState } from "react"
import toast_errorHandling from "@/util/hooks/errorHandling"
import { getToken } from "@/util/service/api/token";

interface FavoriteButtonProps {
    houseId: number,
    className?: string,
    favoriteId?: number,
    user_id: number,
    token:string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FavoriteButton({ houseId, className, favoriteId, user_id,token }: FavoriteButtonProps) {

    const [currentFavoriteId, setCurrentFavoriteId] = useState<number | null>(favoriteId ?? null);
    const [pending, setPending] = useState<boolean>(false);

    const isFavorite = !!currentFavoriteId;

    const handleClick = async () => {
        if (pending) return;
        setPending(true);

       
        try {
             
            if (!currentFavoriteId || currentFavoriteId == null) {
                const response = await fetch(`${BASE_URL}/api/favorites`, {
                    method: "POST",
                    
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        house_id: houseId,
                        user_id: user_id,
                    }),
                });

                const res = await response.json();
                console.log(res);

                if (response.ok) {
                    toast_errorHandling(200, "خانه به لیست موردعلاقه شما اضافه شد");
                    setCurrentFavoriteId(res?.data?.id ?? res?.id ?? null);
                } else {
                    toast_errorHandling(Number(response.status));
                }

            } else {

                
                const response = await fetch(`${BASE_URL}/api/favorites/${currentFavoriteId}`, {
                    method: "DELETE",
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                   
                });

                const res = await response.json().catch(() => null);
                console.log(res);

                if (response.ok) {
                    toast_errorHandling(200, "خانه از لیست موردعلاقه شما حذف شد");
                    setCurrentFavoriteId(null);
                } else {
                    toast_errorHandling(Number(response.status));
                }
            }

        } catch (error) {
            console.log(error);
            toast_errorHandling(500);
        } finally {
            setPending(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={pending}
            aria-label={isFavorite ? "حذف از علاقه مندی ها" : "افزودن به علاقه مندی ها"}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md shadow-[gray]/20 transition-all active:scale-90 disabled:opacity-60 ${className ?? ""}`}
        >
            <HeartIcon filled={isFavorite} />
        </button>
    )
}

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={filled ? "#FF4D67" : "none"}
            stroke={filled ? "#FF4D67" : "#9CA3AF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    )
}