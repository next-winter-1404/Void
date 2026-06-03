"use client"
import Image from "next/image"

import MapIco from "@/assets/ico/auth/map-ico.png"
import Comma from "@/assets/ico/auth/comma-ico.png"
import Avatar from "@/assets/ico/avatar.png"

import "@/assets/style/paraghraph.css"

import Comment_Box from "./commentBox"
import {useState,useRef,useEffect} from "react"

interface slideItems {
   id:number,
   locationPicName:string,
   locationName:string
}

type sliderType = slideItems[]

export default function TestimonialSlider (){

    const slides:sliderType = [
       {id:0,locationPicName:"slide0.jpg",locationName:"جنگل گلستان"},
       {id:1,locationPicName:"slide1.jpg",locationName:"جنگل مازندارن"},
       {id:2,locationPicName:"slide2.jpg",locationName:"جنگل"},
       {id:3,locationPicName:"slide3.jpg",locationName:"کوه"},
       {id:4,locationPicName:"slide4.jpg",locationName:"آبشار"},
  ];

  const blurRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  
  const [toggle,setToggle] = useState<boolean>(false); 

  const nextSlide = () => {
     setToggle(!toggle);
    setIndex((i) => i != 400 ? i+100: 0);

  };


    return(
        <>
         <div 
          className=" w-[800px] transition-opacity duration-700 h-full flex flex-col justify-end 
            rounded-[16px]  relative overflow-hidden">

             <div id="gal" ref={blurRef} 
             style={{position:"relative", left:`${index}%` }} 
             className="w-[500%] h-full flex flex-row duration-700"
             >

               {slides.map((slde)=>(
                  <div id={String(slde.id)} key={slde.id}
                  style={{backgroundImage:`url("/image/auth/sliderPic/${slides[slde.id]?.locationPicName}")`}}
                  className="w-[20%] h-full  bg-[length:100%_100%]">

                  </div>
               ))}              
                

             </div>

              <span className="absolute right-[10px] top-[10px] text-[#FFFFFF] p-2 flex flex-row gap-2">
             <Image alt="map" src={MapIco}/>{slides[index/100]?.locationName}
             </span>

          
             <Comment_Box nextSlide={nextSlide}/>
             
         </div>
        </>
    )
}