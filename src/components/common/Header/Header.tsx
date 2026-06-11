
import Link from 'next/link'
import HContainer from './HeaderItems/HContainer'
import Image from 'next/image'
import PIZA from '@/assets/Images/components/header/PIZA.png'
import Button1 from '../buttons/Button1'



import ButtonProfile from '../../auth/buttonProfile'
import { getUserInfo } from '@/util/service/api/token'

interface Props {
  token:string | null,
}

import SideBar from "@/components/common/Header/sideBar"
import BurgerBt from '@/components/dashboard/DashboardComps/burgarBt'

const  HeaderComponent =async({token}:Props) => {

   const isLoggin = token !== null;
  
   const userInfo = await getUserInfo();


  return (
    <>
    <HContainer>
        <div className='max-lg:hidden'>
          {isLoggin ? <ButtonProfile userInfo={userInfo} />
           : <Button1  href='/login' label='ثبت نام و ورود'></Button1>}
          
        </div>

        <div className='hidden gap-5 font-bold min-lg:flex'>
            <Link href="" className=' hover:underline'>درباره ما</Link>
            <Link href="" className=' hover:underline'>مقالات</Link>
            <Link href="/" className=' hover:underline'>خانه</Link>
        </div>
        <div className='w-[50px] h-[50px] flex items-center'>
        <Image src={PIZA} alt='PIZA' height={50} width={50} className='w-[50px] h-[20px]'></Image>
        </div>
       
       
       <SideBar userInfo={userInfo} isLoggin={isLoggin}/>    
    </HContainer>

    </>
  )
}

export default HeaderComponent