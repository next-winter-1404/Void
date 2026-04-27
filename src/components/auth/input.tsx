'use client'

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState} from "react"
import { updateQueryParams } from "@/util/helper/updateQueryParams";

interface InputProps {
    name: string,
    type: "password" | "text" | "email",
    id?:string,
    placeHolder:string,
    icon?:string
    label:string
    email?:string
    setEmail?:React.Dispatch<React.SetStateAction<string>> 
    
    
}

export default function passwordInput ({name,type,id,placeHolder,icon,label,email,setEmail}:InputProps) {

    const [show,setShow] = useState<boolean>(false);

    
    return (
        <div className="w-full relative">
        <label htmlFor={name} className="font-medium block mb-3">{label}</label>
        <input
           name={name}
           type={show == true ? "text" : type}
           id={id}
           value={email}
           onChange={(e)=> setEmail ? setEmail(e.target.value) : null}
           required
           placeholder={placeHolder}
           className= {`
            border mb-2 border-[gray]/40 w-full py-3 outline-none rounded-[16px]  text-start pr-12
             bg-[url('/ico/auth/${icon}-ico.png')] bg-no-repeat bg-[position:98%_55%]`}
          />

         {type === "password" && 
         <button 
           type="button"
          className={` cursor-pointer absolute left-[10px] top-[50px]  rounded-[50%] p-3 
          bg-[url('/ico/auth/${show ? "eyeOpen" : "eyeClose"}-ico.png')] transition-[1s] bg-no-repeat bg-[position:50%_50%] bg-[length:150%_150%] `} 
          onClick={()=>setShow(!show)}
          >
           
        </button>}
        </div>
    )
}