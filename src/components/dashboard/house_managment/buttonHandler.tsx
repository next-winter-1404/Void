'use client'
import {redirect} from "next/navigation"
import Image from "next/image"
import Arrdash from "@/assets/Dashboard/arrowdash.png"

export default function  buttonHandler () {


    return (
        <>
          
       <button type="button" onClick={()=>redirect("/dashboard/house_managment")} className="flex items-center gap-2 text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
        <span  className='text-xs'>مشاهده همه</span>
        <div className='flex items-center'>
           <Image src={Arrdash} alt="arrow"  />
        </div>
      </button>
    
        
        </>
    )
}