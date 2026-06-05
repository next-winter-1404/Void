'use client'

import Image from "next/image";
import Burgar from "@/assets/ico/burgar/icons8-hamburger-menu-50.gif"

import {useState} from "react";

import { useSidebar } from "./burgerButtonState/sidebarContext";

export default function burgerBt () {
    // const [burger,setBurger] = useState<boolean>(false);

     const { setOpen } = useSidebar();

    return(
        <>
         <button onClick={()=>setOpen(true)} className="rounded-[16px] bg-[white] p-2  min-xl:hidden w-[50px] h-[50px]  shadow-md flex items-center justify-center">
           <Image className="rounded-[16px] w-[80%] h-[80%]" alt="menu" src={Burgar}/>
         </button>
        </>
    )
}