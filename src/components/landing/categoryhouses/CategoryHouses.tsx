import React from 'react'
import { categoryhouse } from '@/types/CategoryHouse/CategoryHouse'
import CategoryHouseCard from '../../common/Cards/CategoryHouseCard'
import vilaee from '@/assets/Images/components/CategoryCard/vilaee.png'
import vila from '@/assets/Images/components/CategoryCard/vila.png'
import boom from '@/assets/Images/components/CategoryCard/boom.png'
import choob from '@/assets/Images/components/CategoryCard/choob.png'
import sahel from '@/assets/Images/components/CategoryCard/sahel.png'
import apart from '@/assets/Images/components/CategoryCard/apart.png'

const mockCategory:categoryhouse[] = [
    {
        title:"ویلایی",
        image:vila
    },
        {
        title:"ساحلی",
        image:sahel
    },
        {
        title:"استخردار",
        image:vilaee
    },
        {
        title:"کلبه",
        image:choob
    },
        {
        title:"بومگردی",
        image:boom
    },
        {
        title:"آپارتمان",
        image:apart
    }
] 

const CategoryHouses = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div><p className='font-bold text-2xl md:text-3xl'>دسته بندی ها</p></div>
        <div className='grid 
          grid-cols-1
          md:grid-cols-3    
          gap-5 justify-between'>
            {mockCategory.map((categoryhouse)=>(
                <CategoryHouseCard key={categoryhouse.title} {...categoryhouse}/>
            ))}
        </div>
    </div>
  )
}

export default CategoryHouses