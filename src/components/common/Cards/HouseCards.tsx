import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HouseCard } from '@/types/HouseCard/HouseCard'
import bed from '@/assets/Images/components/HouseCard/bed.png'
import locations from '@/assets/Images/components/HouseCard/location.png'
import parkings from '@/assets/Images/components/HouseCard/parking.png'
import bath from '@/assets/Images/components/HouseCard/bath.png'
import hayat from '@/assets/Images/components/HouseCard/hayatdarad.png'
import persons from '@/assets/Images/components/HouseCard/persons.png'
const HouseCards:FC<HouseCard> = ({id,
title,
location,
isDicounted,
oldPrice,
discountPrice,
discountPercent,
image,
showBeds,
beds,
showBath,
baths,
showParking,
parking,
showYard,
yard,
showPeople,
people,}) => {
  return (
    <Link href={`/products/${id}`}>
        <div className="
        bg-white rounded-3xl border border-zinc-300
        hover:shadow-lg transition
        overflow-hidden cursor-pointer p-3
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
            {showBeds &&
            <div className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>
              {beds} خواب <Image src={bed} alt='bed' height={20} width={20} className='md:block hidden'></Image>
            </div>}
            {showBath &&
            <div  className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>
              {baths} حمام<Image src={bath} alt='bebat' height={20} width={20} className='md:block hidden'></Image>
            </div>}
            
            {showYard &&
            <div className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>
              {yard}  <Image src={hayat} alt='bed' height={20} width={20} className='md:block hidden'></Image>
            </div>}

            {showParking &&
            <div  className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>
              {parking} پارکینگ<Image src={parkings} alt='park' height={20} width={20} className='md:block hidden'></Image>
            </div>}
            
            {showPeople &&
            <div  className='flex flex-row gap-2 border-r p-1 border-zinc-300' dir='ltr'>
              {people} نفر<Image src={persons} alt='park' height={20} width={20} className='md:block hidden'></Image>
            </div>}
          </div>
          <div className="pt-2 flex flex-row items-end gap-5">
            {isDicounted ? (
              <>
                <span className="relative inline-block text-zinc-400 opacity-80 text-xl mb-1">
                  {oldPrice} تومان
                  <span className="absolute left-[-5%] right-[-5%] top-1/2 h-[1.5px] bg-red-500 -rotate-6" />
                </span>
                /
                <div className="font-bold text-2xl text-black">
                  {discountPrice} <span className="text-sm font-normal">تومان</span>
                </div>

              <div className=' text-white px-3 py-1 bg-red-600 rounded-4xl'>{discountPercent}%</div>
              </>
            ) : (
              <div className="font-bold text-2xl text-black">
                {oldPrice} <span className="text-sm font-normal">تومان</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HouseCards