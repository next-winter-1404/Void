'use client'

import { useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState,useEffect} from "react"

export default function searchModal(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query,setQuery] = useState(searchParams.get('search') || "");
  
    useEffect(()=>{
         const handleSearch = () => {
        // e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        params.set("search",query);
        router.push(`?${params.toString()}`)
        }

        handleSearch();

    },[query])
   

    return (
        <div className="h-full w-full">
              <input 
              type="search" 
              placeholder="جستجو کنید..."
              style={{
              backgroundImage:`url('/ico/common/search-ico.png')`
              }}
              className=" shadow-md outline pr-10 p-2  outline-[gray]/20   rounded-[16px] w-full h-full
               bg-no-repeat bg-[position:98%_55%]  " 
              value={query}
              onChange={(e)=> {setQuery(e.target.value)}}
              />
              
        </div>
    )
}
