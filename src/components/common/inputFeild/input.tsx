'use client'

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState} from "react"

//components/common
import FormError from "./formError";


//type
import type { InputProps } from "@/types/input-type";




export default function passwordInput ({name,type,id,placeHolder,icon,label,errors,email,setEmail}:InputProps) {

    const [show,setShow] = useState<boolean>(false);

    
    return (
        <div className=" relative">
        <label htmlFor={name} className="font-medium block mb-3">{label}</label>
        <input
           name={name}
           type={show == true ? "text" : type}
           id={id}
           value={email}
           onChange={(e)=> setEmail ? setEmail(e.target.value) : null}
           required
           style={{
            backgroundImage:`url('/ico/auth/${icon}-ico.png')`
           }}
           placeholder={placeHolder}
           className= {`
            border mb-2 border-[gray]/40 w-full py-3 outline-none rounded-[16px]  text-start pr-12
             bg-no-repeat bg-[position:98%_55%]`}
          />
        
         <FormError errors={errors} />
         
          
         {type === "password" && 
         <button 
           style={{
             backgroundImage : `url('/ico/auth/${show ? "eyeOpen" : "eyeClose"}-ico.png')`
           }}
           type="button"
          className={` cursor-pointer absolute left-[10px] top-[50px]  rounded-[50%] p-3 
           transition-[1s] bg-no-repeat bg-[position:50%_50%] bg-[length:150%_150%] `} 
          onClick={()=>setShow(!show)}
          >
           
        </button>}
        </div>
    )
}