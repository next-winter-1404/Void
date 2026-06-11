import React from 'react'
import LocationCard from '../../common/Cards/LocationCard'
import { locationInfo } from '@/types/LocationCard/LocationCardtype'
import savadkooh from '@/assets/Images/components/LocationCard/savadkooh.png'
import sari from '@/assets/Images/components/LocationCard/sari.png'

import tehran from '@/assets/Images/components/LocationCard/tehran.png'
import { StaticImageData } from 'next/image'
import { Api } from '@/util/service/api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'





const BestLocation =async() => {

    const api = await Api();
    const locations = await handleAsyncAction(api.landing.locations());
    const locationss = locations?.data.data;

    const mockLocation:{id:number,redirect:string,title:string,image:StaticImageData,count:number}[] = [
    {
    id:19,
    title: "سوادکوه",
    image: savadkooh,
    count: 1,
   redirect:"/RentAndMortgage?location="
},
{
    id:20,
    title: "تهران",
    image: tehran,
    count: 50,
    redirect:"/RentAndMortgage?location="
},
{
    id:21,
    title: "ساری",
    image: sari,
    count: 10,
    redirect:"/RentAndMortgage?location="
},
{
    id: 22,
    title: "سوادکوه",
    image: savadkooh,
    count: 20,
    redirect:"/RentAndMortgage?location="
},
{
    id: 23,
    title: "تهران",
    image: tehran,
    count: 20,
    redirect:"/RentAndMortgage?location="
},
{
    id:24,
    title: "ساری",
    image: sari,
    count: 21,
    redirect:"/RentAndMortgage?location="
},
];
    
    console.log(locations);
     const categoryImageData = Object.fromEntries(
      mockLocation.map((loc:any) => [loc.id, loc])
     )

     const mergedData:{id:number,redirect:string,name:string,image:StaticImageData,count:number}[] = locationss.map((hs:any) => ({
        id:hs.id,
        name:hs.areaName,
        count:categoryImageData[hs.id]?.count,
        redirect:categoryImageData[hs.id]?.redirect + hs.areaName,
        image:categoryImageData[hs.id]?.image ?? mockLocation[0].image,
      }))

    //   console.log(mergedData);
    

  return (
    <div className='w-full'>
        <div className='flex flex-col gap-2 mb-2'>
            <p className='font-bold text-2xl md:text-3xl '>اجاره ویلا در</p>
            <p className='font-bold text-2xl md:text-3xl '>محبوب‌ترین مقاصد این ماه</p>
        </div>
        <div className='flex flex-row justify-evenly flex-wrap gap-2'>
            
          {mergedData.slice(0,6).map((loc, index) => (
    <div  className={index >= 3 ? "hidden md:block" : ""} key={loc.id}> <LocationCard   {...loc}  /></div>
  ))}
        </div>
    </div>
  )
}

export default BestLocation