
import type { houseCardProps } from "@/types/houseCardType/houseCard-Type"
import Link from "next/link"
import Image from "next/image"
import bed from '@/assets/Images/common/HouseCard/bed.png'
import locations from '@/assets/Images/common/HouseCard/location.png'
import parkings from '@/assets/Images/common/HouseCard/parking.png'
import bath from '@/assets/Images/common/HouseCard/bath.png'
import hayat from '@/assets/Images/common/HouseCard/hayatdarad.png'
import persons from '@/assets/Images/common/HouseCard/persons.png'
import { toPersianFormat } from "@/util/helper/persianFormat"
import { redirect } from "next/navigation"



export default function HouseCard ({
id,
title,
address,
photos,
rate,
discounted_price,
price,
tags,
last_updated,
capacity,
location,
categories,
bathrooms,
parking,
room,
yard_type,
num_comments,
discount_id,
transaction_type,
sellerId,
sellerName,
caption,
bookings,
favoriteId,
isFavorite,
}:houseCardProps) {

  const Price = Number(price);
  const DisCountPrice = Number(discounted_price);


  const discount = Math.floor(((Price-DisCountPrice)/Price)*100);

    return (
    <div>
        <div onClick={()=>redirect(`/detailPage/${id}`)}  className={`
        bg-white rounded-[16px] border border-zinc-300
        hover:shadow-lg transition
         cursor-pointer
         w-[400px] max-md:w-[100%]
        flex flex-col items-center
        p-3  
        `}
        
      >
        
        <Image
          src="/image/Home-pic.png"
          alt="ww"
          width={280}
          height={150}
          className="object-cover w-full h-[230px] max-md:h-[250px] rounded-[16px]"
        />
  

        <div className="text-right w-full flex flex-col gap-2">

          <h3 className="font-bold  text-[20px]  mt-1">
            {title}
          </h3>

          <div className="text-sm text-gray-500 flex flex-row gap-2 justify-start overflow-hidden w-full">
           <Image src={locations} className="w-5 h-5" alt='loc bede' height={20} width={20}/>{address}
          </div>

          <div className="flex flex-row items-center whitespace-nowrap justify-between max-md:text-[15px] text-sm border-zinc-300 border-t pt-1">
            {room &&
            <div className='flex flex-row items-center border-l  px-1 border-zinc-300' dir='ltr'>
              {toPersianFormat(room)} خواب <Image src={bed} alt='bed' height={20} width={20}/>
            </div>}
            {bathrooms &&
            <div  className='flex flex-row items-center  border-l px-1 border-zinc-300' dir='ltr'>
              {toPersianFormat(bathrooms)} حمام<Image src={bath} alt='bebat' height={20} width={20}/>
            </div>}
            
            {yard_type &&
            <div className='flex flex-row items-center border-l px-1  border-zinc-300' dir='ltr'>
              {toPersianFormat(yard_type)} <Image src={hayat} alt='bed' height={20} width={20}/>
            </div>}

            {parking &&
            <div  className='flex flex-row items-center border-l px-1 border-zinc-300' dir='ltr'>
              {toPersianFormat(parking)} پارکینگ<Image src={parkings} alt='park' height={20} width={20}/>
            </div>}
            
            {capacity &&
            <div  className='flex flex-row items-center border-l px-1 border-zinc-300' dir='ltr'>
              {toPersianFormat(capacity)} نفر<Image src={persons} alt='park' height={20} width={20}/>
            </div>}
          </div>

          <div dir="ltr" className="pt-1 py-2 flex flex-row items-center justify-between max-md:text-[15px] text-sm whitespace-nowrap">
            {discounted_price ? (
              <>
              <div className=' text-white text-[12px] max-md:text-[15px] px-2 py-1 bg-red-600 rounded-[16px]'>{toPersianFormat(discount)}%</div>
              <div dir="rtl" className="font-bold text-[15ox] text-black">
                  {toPersianFormat(discounted_price)} <span className="text-sm font-normal">تومان</span>
                </div>
                / 
                <span dir="rtl" className="relative inline-block text-zinc-400 opacity-80 text-[15px] max-md:text-[15px] mb-1">
                 
                  <span className="absolute left-[-5%] right-[-5%] top-1/2 h-[1.5px] bg-red-500 -rotate-6" />
                   {toPersianFormat(price)} تومان
                </span>
              
              
              </>
            ) : (
              <div className="font-bold text-[15px] w-full max-md:text-[15px]
               text-black flex flex-row justify-end gap-1 items-center">
               <span className="text-sm font-normal">تومان</span> {toPersianFormat(price)} 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}