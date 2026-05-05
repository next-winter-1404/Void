import React from 'react'
import Button1 from '../../common/buttons/Button1'
import HouseCards from '../../common/Cards/HouseCards'
import { HouseCard } from '@/app/types/HouseCard/HouseCard'
import khoone from '@/app/assets/Images/components/HouseCard/khoone.png'
// import bahare from '@/app/assets/Images/components/HouseCard/bahare.png'
// import Image from 'next/image'
import Timer from '../../common/timer/Timer'


const mockHouses: HouseCard[] = [
  {
    id: "1",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:true,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:false,
    parking: 1,
    showYard: false,
    yard:"حیاط دار",
    showPeople:true,
    people:5,
  },
  {
    id: "2",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:true,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:false,
    parking: 1,
    showYard: false,
    yard:"حیاط دار",
    showPeople:true,
    people:5,
  },
  {
    id: "3",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:true,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:false,
    parking: 1,
    showYard: false,
    yard:"حیاط دار",
    showPeople:true,
    people:5,
  },
]


const DiscountedHouses = () => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0  '>
            <div className='flex  items-center gap-4 font-bold text-2xl md:text-3xl'>
                <span>تخفیفات ویژه </span>
                {/* <Image src={bahare} alt='!!!' height={50} width={50}></Image> */}
                <span className='text-white -rotate-12 bg-red-500 rounded-2xl text-lg md:text-xl px-4 py-1 md:px-5 md:py-2'>بهاره</span>
                <Timer initialSeconds={7200}   />
                
            </div>
            <div className='hidden md:flex'>
                <Button1 href='' label='نمایش همه'/>
            </div>
        </div>
        <div className='md:flex md:flex-row md:justify-between grid grid-cols-1 gap-5 '>
            {mockHouses.map((HouseCard)=>
            <HouseCards key={HouseCard.id} {...HouseCard}/>)}
        </div>
        <div className='flex md:hidden justify-center mt-2'>
                <Button1 href='' label='نمایش همه'/>
        </div>
    </div>
  )
}

export default DiscountedHouses