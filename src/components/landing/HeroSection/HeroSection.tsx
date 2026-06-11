import React from 'react'
import Image from 'next/image'
import hero from '@/assets/Images/components/hero/hero.png'
import Button1 from '../../common/buttons/Button1'

import SuperSearch from "@/components/landing/superSearch/superSearch";
import SearchLoc from "@/components/landing/superSearch/searchLoc"

const HeroSection = () => {



  return (
    <div className='flex flex-row justify-between gap-5 relative'>
        <div className='absolute bottom-30 w-full h-[100px] left:auto max-lg:hidden'>
          <SuperSearch/>
        </div>

       
        <div className=' flex flex-col gap-6 w-[49%] max-lg:w-full text-right'>
            <h1 className=' font-bold text-3xl md:text-5xl leading-tight text-slate-900'>
                راحت ترین راه برای پیدا کردن خونه مورد علاقت!
            </h1>
            <p className='text-slate-500 text-base md:text-lg leading-relaxed max-w-[420px]'>رزور ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن فقط در پیزا</p>
            <div className='w-fit max-lg:hidden'><Button1 href='/RentAndMortgage' label='رهن و اجاره ملک'/></div>
             <div className='w-full h-[50px] left-[10%] min-lg:hidden'>
              <SearchLoc/>
            </div>
        </div>
        <div className='rounded-[32px] overflow-hidden w-full max-w-md max-lg:hidden h-[580px] flex items-end'>
        <Image src={hero} alt='cool' height={500} width={400} className='w-full h-auto object-contain md:block hidden'></Image>
        </div>
    </div>
  )
}
2
export default HeroSection