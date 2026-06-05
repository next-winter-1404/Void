'use client'
import HouseCard from "@/components/common/Cards/samehouseCard/houseCard";
<<<<<<< HEAD
import type { houseCardProps } from '@/types/houseCard-type/houseCard-type';
=======
import type { houseCardProps } from '@/types/houseCardType/houseCard-Type';
>>>>>>> mersad

interface HouseDataProps {
     houseData:houseCardProps[]
}

const sameHouseList = ({houseData}:HouseDataProps) => {

  const houses = Array.isArray(houseData) ? houseData : [];
  
  return (
    <div className='flex flex-col gap-10'>
        <header className='flex flex-row justify-between gap-5'>
            <h2 className='md:text-3xl text-2xl font-bold'>آگهی های مشابه</h2>
           
        </header>
        <div className='flex  max-md:flex-col flex-row justify-evenly  gap-5 '>
          {houses.map((prop) =>(
            <HouseCard
<<<<<<< HEAD
              className={"max-md:w-[100%]"}
              key={prop.id} {...prop}
=======
              // className={"max-md:w-[100%]"}
              key={prop?.id} {...prop}
>>>>>>> mersad
             />
          ))}
        </div>
    </div>
  )
}

export default sameHouseList