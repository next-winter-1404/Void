'use client'

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState,useEffect} from "react"
import SubmitBt from "@/components/common/SubmitBt";

export default function searchModal(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query,setQuery] = useState("");
  
    
    const handleSubmit = (e: React.FormEvent)=> {
      e.preventDefault();
      router.push(`/RentAndMortgage?location=${query}`)
    }
   

    return (
        <form onSubmit={handleSubmit} className="h-full w-full flex flex-row gap-2 items-center">

              <input 
              type="search" 
              placeholder="مکان مورد نظر وارد کنید..."
              style={{
              backgroundImage:`url('/ico/common/search-ico.png')`
              }}
              className=" shadow-md outline pr-10 p-2  outline-[gray]/20  text-black  rounded-[16px] w-full h-full
               bg-no-repeat bg-[position:98%_55%]  " 
              value={query}
              onChange={(e)=> {setQuery(e.target.value)}}
              />
              
              <div className="w-[150px]">  
            <SubmitBt subLabel="بریم بگردیم" />
            </div>
              
        </form>
    )
}
