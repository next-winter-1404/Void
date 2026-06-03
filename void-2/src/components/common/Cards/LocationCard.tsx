import React, { FC } from 'react'
import Image from 'next/image'
import { locationInfo } from '@/types/LocationCard/LocationCardtype'
import Link from 'next/link'





const LocationCard:FC<locationInfo> = ({id,count,image,title}) => {
  return (
    <Link href={""}  className='flex flex-col gap-5 border border-zinc-300 rounded-3xl p-3'>
        <Image src={image} alt='?' className='w-[380px]' height={200} width={300}></Image>
        <div className='flex flex-row justify-between p-5'>
            <p className='text-2xl font-bold'>{title}</p>
            <p className='text-lg text-zinc-600'> ({count} مورد )</p>
        </div>
    </Link>
  )
}

export default LocationCard