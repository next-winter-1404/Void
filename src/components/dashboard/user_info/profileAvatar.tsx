'use client'

import TitleCaption from "./titleCaptionComp";
import type { stepProps } from "./titleCaptionComp"
import Image from "next/image"

import Avatar from "@/assets/ico/avatar.png";

export default function profileAvatar ({title,caption}:stepProps) {

const Avat = Avatar;

    return(
        <div dir="ltr" className="w-[60%] h-full flex flex-row items-center justify-between ">
          <div className="w-[200px] h-[200px]  flex items-center justify-center">
           <Image width={150} height={150} className="rounded-full border" alt="profileAvatar" src={Avat} />
          </div>

          <div className="flex flex-col items-top h-[200px] w-[300px]">
             <TitleCaption title={title} caption={caption}/>
          </div>
        </div>
    )
}