"use client"

import Image from "next/image"

import Comma from "@/assets/ico/auth/comma-ico.png"
import Avatar from "@/assets/ico/avatar.png"

//arrow
import ArrowLeft1 from "@/assets/ico/arrow/left1.png"
import ArrowLeft2 from "@/assets/ico/arrow/left2.png"

import ArrowRight1 from "@/assets/ico/arrow/right1.png"
import ArrowRight2 from "@/assets/ico/arrow/right2.png"

import "@/assets/style/paraghraph.css"

import Circle_Timer from "@/components/common/timer/timer"
import {useState} from "react"

interface commentBoxProps {
    nextSlide:()=>void
}


export default function comment_Box({nextSlide}:commentBoxProps){

    const [toggle,setToggle] = useState<boolean>(false);

    return(
        <>
        <div className="w-[95%] h-[200px] rounded-[16px] bg-[white] shadow-md shadow-gray-50  
              flex flex-col items-center absolute bottom-[20px] right-[20px] justify-end px-2 gap-1">

               <span className="absolute right-[10px] top-[10px]">
                <Image alt="comma" src={Comma}/>
                </span>

                <p  className="w-full h-[95px] tex-[13px] p-1">
                  یکی دیگر از جاهای دیدنی گلستان که گردشگران را به سمت خودش می‌کشاند، جنگل النگدره گلستان با تمام دار و درخت و امکاناتش است. بهتر است همین ابتدا بگوییم که ماجرای جنگل النگدره هم شبیه داستان جنگل رنگو است؛ یعنی اینجا هم در اصل پارک جنگلی النگدره است اما به خاطر تراکم درخت‌ها و سرسبزی، دیگر بخش جنگلی آن به بخش پارکش غلبه کرده است.
                </p>
                <div className="w-full h-[50px] mb-2 
                 flex flex-row justify-between items-center  ">

                    <div className=" w-[200px] h-[90%]
                    flex flex-row ">

                        <div className="w-[30%] h-full">
                        <Image alt="avatar" src={Avatar} className="rounded-full"/>
                        </div>

                        <div className="  text-[12px]  w-[70%] flex flex-wrap">
                           <span className="w-full font-medium h-[50%]">مرصاد مسیبی</span> 
                           <span className="w-full h-[50%]">12 مرداد 1404</span> 
                        </div>
                    </div>

                    <div className=" w-[250px] h-[90%] ml-2 flex flex-row items-center justify-end gap-2">

                        <div className=" h-full flex flex-row justify-evenly items-center gap-2">
                          <button onClick={()=>setToggle(false)}><Image  alt="" src={toggle ? ArrowRight1 : ArrowRight2}/></button>
                          <button onClick={()=>setToggle(true)}><Image  alt="" src={toggle ? ArrowLeft2 : ArrowLeft1}/></button>
                        </div> 

                       <Circle_Timer duration={20} onCycleEnd={nextSlide}/>
                       

                    </div>
                </div>

             </div>

        </>
    )
}