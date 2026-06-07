"use client"

import { redirect } from "next/navigation"
import {useActionState, useState,useEffect} from "react";
import logout_handler from "@/util/service/authAction/logoutAction";
import Link from "next/link";
interface buttonProfileProps {
    removeTok:()=>void
}


export default function buttonProfile () {

   const [show,setShow] = useState<boolean>(false); 

    const handle = () =>{
       setShow(!show);
    }

   const result={success:false}
    const [state,formAction,pending] = useActionState(logout_handler,result);

    useEffect(()=>{
        console.log(state);
    },[state])

    return(
        <>
        <button style={{backgroundImage:"url('/ico/avatar.png')"}} onClick={handle}
        className={` rounded-full w-10 h-10 bg-cover`}></button>

        <form action={formAction}>  
          <ul className={`rounded-[16px] p-3 bg-[white]  cursor-pointer outline outline-[#E9E9E9] shadow-md top-[80px] text-right z-10 left-[5%] ${show ? "fixed" : "hidden"}`}>
               <Link className="font-medium  hover:border-b " href={"/Dashboard"}>داشبورد</Link>
               
               <button type="submit"  className="font-medium  hover:border-b ">خروح از حساب</button>
          </ul>
        </form>
       </> 
    )
}