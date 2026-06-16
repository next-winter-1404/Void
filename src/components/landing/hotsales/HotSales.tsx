import React from 'react'
import Button1 from '../../common/buttons/Button1'
import HouseCards from '../../common/Cards/HouseCards'
import { HouseCard } from '@/types/HouseCard/HouseCard'
import placeholder from '@/assets/Images/components/HouseCard/placeholder.png'
import {Api} from "@/util/service/api"
import { handleAsyncAction } from '@/util/service/api/handleAsync'
import { HousesApiType } from '@/types/HouseCard/HouseApiType'
import { Suspense } from 'react'
import Loading from "@/app/loading"
const query = {
    sort: "price",
    order: "DESC",
    limit: 3,
    transactionType:"rental"
}

const api = await Api();

const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));

  // console.log(JSON.stringify(housesRes, null, 2));

  const houses = housesRes?.data?.houses || [];
type Props = {
  house: HousesApiType
}

const HotSales = () => {
  console.log(houses.length)
  return (
    <div className="flex flex-col gap-10">

      <header className="flex justify-between items-center">

        <h2 className="text-2xl md:text-3xl font-bold">
          خرید و فروش های داغ این هفته
        </h2>

       <div className="hidden md:flex">
          <Button1 href="/RentAndMortgage" label="نمایش همه" />
        </div>

      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
       
       <Suspense fallback={<Loading/>}>
        {houses.map((house:any) => (
          <HouseCards
            key={house.id}
             house={house}
          />
        ))}
        </Suspense>

      </div>

       <div className="flex md:hidden justify-center mt-2">
        <Button1 href="/RentAndMortgage" label="نمایش همه" />
      </div>

    </div>
  )
}

export default HotSales
