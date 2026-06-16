"use client"
import { redirect } from "next/navigation"
import Link from "next/link"
interface props {
    label:string
    id:number
}

export default function button ({label,id}:props) {

    return (
        <>
        <div className="py-3 w-full rounded-[16px] bg-[#586CFF]  text-[white]  font-medium text-center">
         <Link href={`/reserving/submit_Info?houseId=${id}`}  className={` `}>
                {label}
              </Link>
          </div>    
        </>
    )
}