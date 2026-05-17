import React from 'react'
import Button1 from '../../common/buttons/Button1'
import HouseCards from '../../common/Cards/HouseCards'
import { HouseCard } from '@/types/HouseCard/HouseCard'
import placeholder from '@/assets/Images/components/HouseCard/placeholder.png'
import {api} from "@/util/service/api"
import { handleAsyncAction } from '@/util/service/api/handleAsync'
import { HousesApiType } from '@/types/HouseCard/HouseApiType'
// const mockHouses: HouseCard[] = [
//   {
//     id: "1",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: false,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: true,
//     parking: 1,
//     showYard: true,
//     yard: "حیاط دار"
//   },
//   {
//     id: "2",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: false,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: true,
//     parking: 1,
//     showYard: true,
//     yard: "حیاط دار"
//   },
//   {
//     id: "3",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: false,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: true,
//     parking: 1,
//     showYard: true,
//     yard: "حیاط دار"
//   },
// ]
const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse({
    
    // transactionType: "rental",
    sort: "price",
    order: "DESC",
    page: 1,
    limit: 3
  }));

  console.log(JSON.stringify(housesRes, null, 2));

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

        <Button1 href="" label="مشاهده همه" />

      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {houses.map((house:any) => (
          <HouseCards
            key={house.id}
             house={house}
          />
        ))}

      </div>

    </div>
  )
}

export default HotSales
