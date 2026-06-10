import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { HousesApiType } from '@/types/HouseCard/HouseApiType'

import bed from '@/assets/Images/components/HouseCard/bed.png'
import locations from '@/assets/Images/components/HouseCard/location.png'
import parkings from '@/assets/Images/components/HouseCard/parking.png'
import bath from '@/assets/Images/components/HouseCard/bath.png'
import placeholder from '@/assets/Images/components/HouseCard/placeholder.png'
type Props = {
  house: HousesApiType
}

const HouseCards: FC<Props> = ({ house }) => {

  return (
    <Link href={`/detailPage/${house.id}`}>

      <div className=" bg-white rounded-3xl border border-zinc-300  hover:shadow-lg transition overflow-hidden cursor-pointer p-3 ">

        <Image
          src={house.photos || placeholder}
          alt="wad"
          width={400}
          height={250}
          className="w-full h-52 object-cover rounded-2xl"
        />

        <div className="p-4 space-y-4 text-right">

          <h3 className="font-bold text-xl">
            {house.title}
          </h3>

          <div className="text-sm text-gray-500 flex items-center gap-2">

            <Image
              src={locations}
              alt='location'
              width={20}
              height={20}
            />

            <span>
              {house.address}
            </span>

          </div>

          <div className="flex flex-wrap gap-4 text-sm border-t border-zinc-300 pt-3">

            <div className='flex items-center gap-2'>

              <Image
                src={bed}
                alt='bed'
                width={20}
                height={20}
              />

              <span>
                {house.room} خواب
              </span>

            </div>

            <div className='flex items-center gap-2'>

              <Image
                src={bath}
                alt='bath'
                width={20}
                height={20}
              />

              <span>
                {house.bathrooms} حمام
              </span>

            </div>

            <div className='flex items-center gap-2'>

              <Image
                src={parkings}
                alt='parking'
                width={20}
                height={20}
              />

              <span>
                {house.parking} پارکینگ
              </span>

            </div>

          </div>

          <div className="pt-2 flex items-center gap-4 flex-wrap">

            {house.discounted_price ? (
              <>

                <span className="relative inline-block text-zinc-400 text-lg">

                  {house.price}

                  <span className="mr-1 text-sm">
                    تومان
                  </span>

                  <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-red-500 -rotate-6" />

                </span>

                <div className="font-bold text-2xl text-black">

                  {house.discounted_price}

                  <span className="text-sm font-normal mr-1">
                    تومان
                  </span>

                </div>

              </>
            ) : (

              <div className="font-bold text-2xl text-black">

                {house.price}

                <span className="text-sm font-normal mr-1">
                  تومان
                </span>

              </div>

            )}

          </div>

        </div>

      </div>

    </Link>
  )
}

export default HouseCards
