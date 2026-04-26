'use client'
import GoogleIco from "../Image/ico/google-ico.png"
import Image from "next/image"

export default function SubmitBt () {

    return (
    <button type="submit" className=" flex flex-row gap-1 justify-center py-3 w-full border border-[gray]/40 rounded-[16px] 
     font-medium   ">
    <Image alt="google" src={GoogleIco} /> ثبت نام در پیزا با گوگل
    </button>
    )
}