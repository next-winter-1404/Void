import React, { FC } from 'react'
import Image from 'next/image'
import { locationInfo } from '@/app/types/LocationCard/LocationCardtype'





const LocationCard:FC<locationInfo> = ({id,count,image,title}) => {
  return (
    <div className=' m-5 flex flex-col gap-5 border border-zinc-300 rounded-3xl'>
        <Image src={image} alt='?' height={200} width={400}></Image>
        <div className='flex flex-row justify-between p-5'>
            <p className='text-xl font-bold'>{title}</p>
            <p className='text-xl text-zinc-600'> ({count} مورد )</p>
        </div>
    </div>
  )
}

export default LocationCard