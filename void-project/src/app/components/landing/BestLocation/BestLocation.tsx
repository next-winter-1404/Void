import React from 'react'
import LocationCard from '../../common/Cards/LocationCard'
import { locationInfo } from '@/app/types/LocationCard/LocationCardtype'
import savadkooh from '@/app/assets/Images/components/LocationCard/savadkooh.png'

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
    image: savadkooh,
    count: 50,
},
{
    id: "3",
    title: "ساری",
    image: savadkooh,
    count: 50,
},
{
    id: "4",
    title: "ساری",
    image: savadkooh,
    count: 50,
},
{
    id: "5",
    title: "ساری",
    image: savadkooh,
    count: 50,
},
{
    id: "6",
    title: "ساری",
    image: savadkooh,
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
          {mockLocation.map((locationInfo) => (
    <LocationCard key={locationInfo.id} {...locationInfo} />
  ))}
        </div>
    </div>
  )
}

export default BestLocation