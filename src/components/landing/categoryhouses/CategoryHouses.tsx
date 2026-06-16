import { categoryhouse } from '@/types/CategoryHouse/CategoryHouse'
import CategoryHouseCard from '../../common/Cards/CategoryHouseCard'
import vilaee from '@/assets/Images/components/CategoryCard/vilaee.png'
import vila from '@/assets/Images/components/CategoryCard/vila.png'
import boom from '@/assets/Images/components/CategoryCard/boom.png'
import choob from '@/assets/Images/components/CategoryCard/choob.png'
import sahel from '@/assets/Images/components/CategoryCard/sahel.png'
import apart from '@/assets/Images/components/CategoryCard/apart.png'
import { StaticImageData } from 'next/image'
import { Api } from '@/util/service/api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'
import { redirect } from 'next/dist/server/api-utils'
import { Suspense } from 'react'
import Loading from '@/app/loading'
const mockCategory:{image:StaticImageData,id:number,redirect:string}[] = [
    {
        id:1,
        image:vila,
        redirect:"/RentAndMortgage?transactionType=villa"

    },
        {
            id:2,
        image:sahel,
        redirect:"/RentAndMortgage?transactionType=apartment"
    },
        {
        id:3,
        image:vilaee,
        redirect:"/RentAndMortgage?transactionType=villa"
    },
        {
            id:4,
        image:apart,
        redirect:"/RentAndMortgage?transactionType=mortgage"
    },
        {
            id:5,
        image:boom,
        redirect:"/RentAndMortgage?transactionType=rent"
    },
        {
            id:6,
        image:choob,
        redirect:"/RentAndMortgage?transactionType=direct_purchase"
    }
    
] 

const CategoryHouses =async() => {

    const api = await Api();
    const category = await handleAsyncAction(api.landing.category());
    const categories = category?.data.data

     const categoryImageData = Object.fromEntries(
      mockCategory.map((loc:any) => [loc.id, loc])
     )

    //  console.log("image",categoryImageData)

     const mergedData:{id:number,redirect:string,name:string,image:StaticImageData}[] = categories.map((hs:any) => ({
         id:hs.id,
         name:hs.name,
         redirect:categoryImageData[hs.id]?.redirect,
         image:categoryImageData[hs.id]?.image ?? mockCategory[0].image,
       }))

    //    console.log("mergae",mergedData)

  return (
    <div className='flex flex-col gap-5'>
        <div><p className='font-bold text-2xl md:text-3xl'>دسته بندی ها</p></div>
        <div className='grid 
          grid-cols-1
          md:grid-cols-3    
          gap-5 justify-between'>
            <Suspense fallback={<Loading/>}>
            {mergedData.slice(0,6).map((cat)=>(
                <CategoryHouseCard key={cat.id} title={cat.name} image={cat.image} redirect={cat.redirect}/>
            ))}
            </Suspense>
        </div>
    </div>
  )
}

export default CategoryHouses