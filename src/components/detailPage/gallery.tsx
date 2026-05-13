"use client"
import Image from "next/image";

import { useState } from "react";

type GalleryProps = {
  images: string[];
};

export default function Gallery({images}:GalleryProps) {
  const main = images[0];    
  const thumbs = images.slice(1, 3);
  const moreCount = images.length - 3;
   const allthumbs = images.slice(3,images.length);

   const [show,setShow] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-4">
    
      <div className="rounded-2xl overflow-hidden">
        <Image
          src={main}
          alt="main"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {thumbs.map((src, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={`thumb-${idx}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
            
          </div>
        ))}

        
         {show && allthumbs.map((src, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={`thumb-${idx}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
            
          </div>
        ))}

        <div className={`flex items-center justify-center h-[115px]  border rounded-xl text-gray-600`}>
          <button className="w-full h-full text-center" onClick={()=>setShow(!show)}>{`${ !show ? `+${moreCount} عکس های دیگر` : "نمایش کمتر"}`}</button>
        </div>

      </div>
    </div>
  );
}
