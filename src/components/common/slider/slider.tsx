'use client'

interface sliderProps {

}


export default function Slider (){

    
    return (
        <>
        <div 
        //   style={{backgroundImage : `url('/image/auth/sliderPic/slide${index}.jpg')`}}
          className=" w-[800px] transition-opacity duration-700 h-full flex flex-col justify-end p-[20px]  rounded-[16px] bg-[gray]/40 relative bg-[length:100%_100%]">


           <span className="absolute right-[10px] top-[10px] text-[#FFFFFF] p-2 flex flex-row gap-2">
             {/* <Image alt="map" src={MapIco}/>جنگل گلستان */}
             </span>

            
             {/* <Comment_Box nextSlide={nextSlide}/> */}
             
         </div>

        </>
    )

}