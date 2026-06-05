import Image from "next/image"
import Link from "next/link"

//assets
import PIZA from "@/assets/ico/PIZA.png";
import { NextURL } from "next/dist/server/web/next-url";

export interface stepProps {
    title:string
    caption:string
}

export default function titleCaption ({title,caption}:stepProps) {

    return (
        <>
          <header className=" text-right">
             <h1 className="font-bold text-[20px] mb-3">{title}</h1>
             <p className=" text-[16px] font-medium text-[#767676]">
                 {caption} 
              </p>
              
           </header>
        </>
    )


}