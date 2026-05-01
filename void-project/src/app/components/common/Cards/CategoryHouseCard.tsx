import React, { FC } from 'react'
import Image from 'next/image'
import { categoryhouse } from '@/app/types/CategoryHouse/CategoryHouse'
import Link from 'next/link'

const CategoryHouseCard:FC<categoryhouse> = ({title,image}) => {
  return (
    <Link href={''} className='relative '>
        <Image src={image} alt='????' height={200} width={400} className=' object-cover relative border-zinc-300 border-2 rounded-4xl'></Image>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> */}
        <p className='  absolute right-3 bottom-3 text-white text-2xl font-bold w-25 bg-[rgba(82,80,80,0.5)] rounded-3xl p-2'>{title}</p>
    </Link>
  )
}

export default CategoryHouseCard