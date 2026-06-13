"use client"

import { redirect } from "next/navigation"
import {useActionState, useState,useEffect} from "react";
import logout_handler from "@/util/service/authAction/logoutAction";
import toast_errorHandling from "@/util/hooks/errorHandling"
import Image from "next/image"
import Link from "next/link"

import { useScrollDirection } from "@/util/hooks/scrollDetect";

interface buttonProfileProps {
    removeTok:()=>void
}

interface props {
  userInfo:any
}

import { useTheme } from "next-themes";


export default function buttonProfile ({userInfo}:props) {

  console.log(userInfo);

   const [show,setShow] = useState<boolean>(false); 

    const handle = () =>{
       setShow(!show);
    }

   const result={success:false}
    const [state,formAction,pending] = useActionState(logout_handler,result);

    useEffect(()=>{
        console.log(state);
            
    },[state])
    
    const logoutNotif =()=>{
      toast_errorHandling(Number(200),"از حساب خود خارج شدید😒")
    } 

    const {theme} = useTheme();

      const {isHidden} = useScrollDirection();
      useEffect(()=>{
         if(isHidden){
          setShow(false);
       }
      },[isHidden])
      

    return(
        <>
        <button style={{backgroundImage:"url('/ico/avatar.png')"}} onClick={handle}
        className={` rounded-full w-10 h-10 bg-cover`}></button>

       <form action={formAction} >
  <div
    className={`
      ${show ? "fixed" : "hidden"}
      top-[80px] left-[5%] z-10
      w-[200px]
      rounded-[24px]
      ${theme === "dark" ? "bg-[#444444]" : theme === "light" ? "bg-white" : "bg-[#444444]"} 
      shadow-md
      outline outline-[#E9E9E9]
      overflow-hidden
      p-2
    `}
  >
    {/* Header */}
    <div className="flex flex-row-reverse items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full">
        <Image alt="wa" width={50} height={50} src={"/ico/avatar.png"}/>
      </div>

      <div className="flex-1 text-right">
        <p className="font-semibold text-[15px]">
          {userInfo?.name}
        </p>

      </div>
    </div>

  
    <ul className="text-right">
     

      <li className="border-t border-[#E9E9E9]">
        <button
          type="button"
          onClick={()=>redirect(`/dashboard`)}
          className="w-full flex flex-row-reverse items-center justify-between px-3 py-2 hover:translate-x-[-10px] transition-all duration-300 ease-in-out"
        >
          <span className="text-[18px]">
            داشبورد
          </span>

          <span className="text-[24px]">
            ↩
          </span>
        </button>
      </li>

      <li className="border-t border-[#E9E9E9]">
        <button
          type="submit"
          onClick={logoutNotif}
          className="w-full flex flex-row-reverse items-center justify-between px-3 py-1 hover:translate-x-[-10px] transition-all duration-300 ease-in-out"
        >
          <span className="text-[18px]">
            خروج
          </span>

          <span className="text-[24px]">
            ↩
          </span>
        </button>
      </li>
    </ul>
  </div>
</form>
       </> 
    )
}