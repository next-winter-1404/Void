
import React from 'react'
import Link from 'next/link'
import HContainer from './HeaderItems/HContainer'
import Image from 'next/image'
import PIZA from '@/assets/Images/components/header/PIZA.png'
import Button1 from '../buttons/Button1'



import ButtonProfile from '../buttons/buttonProfile'

interface Props {
  token:string | null,
}


const  HeaderComponent = ({token}:Props) => {

   const isLoggin = token !== null;
  

  return (
    <HContainer>
        <div className=''>
          {isLoggin ? <ButtonProfile />
           : <Button1  href='/login' label='ثبت نام و ورود'></Button1>}
          
          
          
        </div>
        <div className='hidden gap-5 font-bold md:flex'>
            <Link href="" className=' hover:underline'>درباره ما</Link>
            <Link href="" className=' hover:underline'>مقالات</Link>
            <Link href="/" className=' hover:underline'>خانه</Link>
        </div>
        <Image src={PIZA} alt='PIZA' height={20} width={40} className=''></Image>
        
    </HContainer>
  )
}

export default HeaderComponent