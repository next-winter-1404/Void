import React from 'react'
import LocationCard from '../../common/Cards/LocationCard'
import { locationInfo } from '@/app/types/LocationCard/LocationCardtype'
import savadkooh from '@/app/assets/Images/components/LocationCard/savadkooh.png'
import sari from '@/app/assets/Images/components/LocationCard/sari.png'

import tehran from '@/app/assets/Images/components/LocationCard/tehran.png'


const mockLocation:locationInfo[] = [
    {
    id: "1",
    title: "سوادکوه",
    image: savadkooh,
    count: 50,
},
{
    id: "2",
    title: "تهران",
    image: tehran,
    count: 50,
},
{
    id: "3",
    title: "ساری",
    image: sari,
    count: 50,
},
{
    id: "4",
    title: "سوادکوه",
    image: savadkooh,
    count: 50,
},
{
    id: "5",
    title: "تهران",
    image: tehran,
    count: 50,
},
{
    id: "6",
    title: "ساری",
    image: sari,
    count: 50,
},
];

const BestLocation = () => {
  return (
    <div className='w-full'>
        <div>
            <p className='font-bold text-2xl md:text-3xl '>اجاره ویلا در</p>
            <p className='font-bold text-2xl md:text-3xl '>محبوب‌ترین مقاصد این ماه</p>
        </div>
        <div className='flex flex-row justify-between flex-wrap gap-5'>
            
          {mockLocation.map((locationInfo, index) => (
   <div  className={index >= 3 ? "hidden md:block" : ""} key={locationInfo.id}> <LocationCard   {...locationInfo}  /></div>
  ))}
        </div>
    </div>
  )
}

export default BestLocation