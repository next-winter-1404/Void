"use client"

import { redirect } from "next/navigation"

interface buttonProfileProps {
    removeTok:()=>void
}


export default function buttonProfile () {

    const handle = () =>{

        redirect("/dashboard")
    }

    return(
        <>
        <button style={{backgroundImage:"url('/ico/avatar.png')"}} onClick={handle}
          className={` rounded-full w-10 h-10 bg-cover`}></button>
        </>
    )
}