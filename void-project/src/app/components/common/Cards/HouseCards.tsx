import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HouseCard } from '@/app/types/HouseCard/HouseCard'
import bed from '@/app/assets/Images/components/HouseCard/bed.png'
import locations from '@/app/assets/Images/components/HouseCard/location.png'
import parkings from '@/app/assets/Images/components/HouseCard/parking.png'
import bath from '@/app/assets/Images/components/HouseCard/bath.png'

const HouseCards:FC<HouseCard> = ({id,
title,
location,
price,
image,
beds,
baths,
parking}) => {
  return (
    <Link href={`/products/${id}`}>
        <div className="
        bg-white rounded-3xl border border-zinc-300
        hover:shadow-lg transition
        overflow-hidden cursor-pointer
      ">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        <div className="p-4 space-y-3 text-right">
          <h3 className="font-bold text-md text-2xl">
            {title}
          </h3>

          <div className="text-sm text-gray-500 flex flex-row gap-2">
           <Image src={locations} alt='loc bede' height={20} width={20}></Image> {location}
          </div>

          <div className="flex justify-between text-sm border-zinc-300 border-t p-2">
            <div className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>{beds} خواب <Image src={bed} alt='bed' height={20} width={20}></Image></div>
            <div  className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>{baths} حمام<Image src={bath} alt='bebat' height={20} width={20}></Image></div>
            <div  className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>{parking} پارکینگ<Image src={parkings} alt='park' height={20} width={20}></Image> </div>
          </div>

          <div className="font-bold text-black">
            {price} تومان
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HouseCards