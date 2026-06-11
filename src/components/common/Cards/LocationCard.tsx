import React, { FC } from 'react'
import Image, { StaticImageData } from 'next/image'
import { locationInfo } from '@/types/LocationCard/LocationCardtype'
import Link from 'next/link'


interface props {
  id:number,
  name:string,
  redirect:string,
  image:StaticImageData,
  count:number
}


const LocationCard= ({id,name,redirect,image,count}:props) => {
  return (
    <Link key={id} href={redirect ?? ""}  className='flex flex-col gap-5 border border-zinc-300 rounded-3xl p-3'>
        <Image src={image} alt='?' className='w-[380px]' height={200} width={300}></Image>
        <div className='flex flex-row justify-between p-5'>
            <p className='text-[20px] font-bold'>{name}</p>
            <p className='text-lg text-zinc-600 whitespace-nowrap'> ({count} مورد )</p>
        </div>
    </Link>
  )
}

export default LocationCard