import React from 'react'
import Image from 'next/image'
import hero from '@/app/assets/Images/components/hero/hero.png'
import Button1 from '../../common/buttons/Button1'
const HeroSection = () => {
  return (
    <div className='flex flex-row justify-between gap-5'>
        <div className=' flex flex-col gap-6 text-right'>
            <h1 className=' font-bold text-3xl md:text-5xl leading-tight text-slate-900'>
                راحت ترین راه برای پیدا کردن خونه مورد علاقت!
            </h1>
            <p className='text-slate-500 text-base md:text-lg leading-relaxed max-w-md'>رزور ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن فقط در پیزا</p>
            <div className='w-fit'><Button1 href='' label='رهن و اجاره ملک'/></div>
        </div>
        <div className='rounded-[32px] overflow-hidden w-full max-w-md h-[360px] md:h-[420px] flex items-end'>
        <Image src={hero} alt='cool' height={500} width={400} className='w-full h-auto object-contain md:block hidden'></Image>
        </div>
    </div>
  )
}

export default HeroSection