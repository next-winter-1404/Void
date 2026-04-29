import Image from "next/image"

import MapIco from "@/assets/ico/auth/map-ico.png"
import Comma from "@/assets/ico/auth/comma-ico.png"
import Avatar from "@/assets/ico/avatar.png"

import "@/assets/style/paraghraph.css"

export default function TestimonialSlider (){

    return(
        <>
         <div 
          style={{backgroundImage : `url('https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2019/10/rangoo-2.jpg')`}}
          className=" w-[800px] h-full flex flex-col justify-end p-[20px]  rounded-[16px] bg-[gray]/40 relative bg-[length:100%_100%]">

           <span className="absolute right-[10px] top-[10px] text-[#FFFFFF] p-2 flex flex-row gap-2">
             <Image alt="map" src={MapIco}/>جنگل گلستان
             </span>

             <div className="w-[full] h-[200px] rounded-[16px] bg-[white] relative
              flex flex-col items-center justify-end px-2 gap-1">

               <span className="absolute right-[10px] top-[10px]">
                <Image alt="comma" src={Comma}/>
                </span>

                <p  className="w-full h-[99px] tex-[13px]  p-1">
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

                    <div className="border w-[200px] h-[90%]">
                       

                    </div>
                </div>

             </div>
         </div>
        </>
    )
}