"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image"
import Sad from "../assets/404/Sad.png"
import Img404 from "../assets/404/44.png"
import rec1 from "../assets/404/rec1.png"
import rec2 from "../assets/404/rec2.png"
import rec3 from "../assets/404/rec3.png"
import rec4 from "../assets/404/rec4.png"
import rec5 from "../assets/404/rec5.png"
import rec6 from "../assets/404/rec6.png"
import rec7 from "../assets/404/rec7.png"
import rec8 from "../assets/404/rec8.png"
import square4 from "../assets/404/squre4.png"
import square6 from "../assets/404/squre6.png"

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
 
  return (
    <div className="relative flex font-medium flex-col items-center m-auto h-screen w-full">
        <Image alt="404" className="absolute left-0 top-0" src={square6}/>
        <Image alt="404" className="absolute right-0 bottom-0" src={square4}/>
         <Image alt="404" className="absolute right-70 bottom-20" src={rec1}/>
         <Image alt="404" className="absolute left-70 bottom-10" src={rec2}/>
         <Image alt="404" className="absolute left-70 bottom-11" src={rec3}/>
         <Image alt="404" className="absolute lg:left-70 left-5 top-70 lg:top-50" src={rec4}/>
         <Image alt="404" className="absolute lg:left-150 left-25 top-15" src={rec5}/>
         <Image alt="404" className="absolute lg:right-70 right-10 top-5" src={rec6}/>
         <Image alt="404" className="absolute lg:right-60 right-10 bottom-100 lg:bottom-90" src={rec7}/>
         <Image alt="404" className="absolute lg:right-70 right-20 bottom-80 lg:bottom-70" src={rec8}/>
        <div className="w-full h-[60%] lg:h-[80%] z-10 lg:w-[27%] m-auto flex flex-col items-center">
            <Image alt="404" src={Sad} className="lg:w-[80%] w-[50%] h-[200px] lg:h-[300px]"/>
            <h3 className="text-center text-[20px] font-semibold">
                یه مشکلی پیش اومده 
            </h3>
            <p className="text-gray-600 max-w-md text-center">
          . لطفاً دوباره تلاش کن. اگه مشکل ادامه داشت با پشتیبانی تماس بگیر
          </p>
            
            <button className=" lg:w-[80%] w-[70%] mt-5 rounded-[5px] h-[50px] bg-[#9B0EE1] text-white text-xl" type="submit"  onClick={reset}>تلاش مجدد</button>

        </div>

     </div>
  );
}
