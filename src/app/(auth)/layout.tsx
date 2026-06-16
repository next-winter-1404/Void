"use client"
import TestimonialSlider from "@/components/auth/sliderContainer/TestimonialSlider"
import DarkMode from "@/components/darkmode/darkmodeBt"
import {  redirect } from 'next/navigation'
import Image from "next/image"
import HOME from "@/assets/homeDash-ico.png"

export default function authLayout({children}:Readonly<{children:React.ReactNode}>){

    return(
        
        <main dir="rtl" className="flex flex-row relative">
           
            <div dir="ltr" className="absolute flex items-center gap-2 top-[13%] min-xl:right-[30%] max-xl:left-[10%]">
            <DarkMode/>
            <button onClick={() => redirect("/home")} className='rounded-full p-2 bg-[gray]/20  w-11 h-11'>
            <Image alt='home' src={HOME} />
          </button>
            </div>

        <div className=" w-[43%] max-xl:w-full h-screen flex flex-col items-center justify-center ">
            {children}
         </div>

         <div className=" w-[57%] p-3  max-xl:hidden  h-screen  flex flex-col items-end justify-center ">
            <TestimonialSlider/>
         </div>


        </main>
    )

}