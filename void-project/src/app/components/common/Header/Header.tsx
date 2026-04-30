import React from 'react'
import Link from 'next/link'
import HContainer from './HeaderItems/HContainer'
import Image from 'next/image'
import PIZA from '../../../../../public/components/header/PIZA.png'

const HeaderComponent = () => {
  return (
    <HContainer>
        <Link href="" className=' bg-blue-600 rounded-xl p-1.5 text-white font-bold top-1'>ثبت نام و ورود</Link>
        <div className='flex gap-5 font-bold'>
            <Link href="" className=' hover:underline'>درباره ما</Link>
            <Link href="" className=' hover:underline'>مقالات</Link>
            <Link href="" className=' hover:underline'>خانه</Link>
        </div>
        <Image src={PIZA} alt='PIZA' height={20} width={40} className=''></Image>
        
    </HContainer>
  )
}

export default HeaderComponent