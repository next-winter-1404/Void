import React, { FC } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { categoryhouse } from '@/types/CategoryHouse/CategoryHouse'

interface props {
  title:string,
  image:StaticImageData,
  redirect:string
}

const CategoryHouseCard= ({ title, image,redirect }:props) => {

 

  return (
    <Link href={redirect ?? " "} className="relative block rounded-3xl overflow-hidden  shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.20) transition-all">
      <Image
        src={image} alt="wa" width={400} height={230} className="w-full h-44 md:h-48 object-cover "/>
      <div className="absolute inset-0 bg-linear-to-t  from-black/60 via-black/30 to-transparent"></div>
      <p className=" absolute bottom-4 right-4 text-white font-bold  text-lg md:text-3xl  px-4 py-1.5  rounded-2xl  ">
        {title}
      </p>

    </Link>
  )
}

export default CategoryHouseCard