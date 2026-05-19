import React from 'react'
import Button1 from '../../common/buttons/Button1'
import HouseCards from '../../common/Cards/HouseCards'
import { HouseCard } from '@/types/HouseCard/HouseCard'
import placeholder from '@/assets/Images/components/HouseCard/placeholder.png'
import Timer from '@/components/common/counter/counter';
import { HousesApiType } from '@/types/HouseCard/HouseApiType'
import {Api} from "@/util/service/api"
import { handleAsyncAction } from '@/util/service/api/handleAsync'
// const mockHouses: HouseCard[] = [
//   {
//     id: "1",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: true,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: false,
//     parking: 1,
//     showYard: false,
//     yard: "حیاط دار",
//     showPeople: true,
//     people: 5,
//   },
//   {
//     id: "2",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: true,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: false,
//     parking: 1,
//     showYard: false,
//     yard: "حیاط دار",
//     showPeople: true,
//     people: 5,
//   },
//   {
//     id: "3",
//     title: "آپارتمان لوکس زعفرانیه",
//     location: "تهران، زعفرانیه",
//     oldPrice: 15000000,
//     image: placeholder,
//     isDicounted: true,
//     discountPrice: 3000000,
//     discountPercent: 15,
//     showBeds: true,
//     beds: 3,
//     showBath: true,
//     baths: 2,
//     showParking: false,
//     parking: 1,
//     showYard: false,
//     yard: "حیاط دار",
//     showPeople: true,
//     people: 5,
//   },
// ]

const query = {
   sort: "price",
    order: "DESC",
    page: 1,
    limit: 3
}
const api = await Api();

const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));

  // console.log(JSON.stringify(housesRes, null, 2));

  const houses = housesRes?.data?.houses || [];
type Props = {
  house: HousesApiType
}

const DiscountedHouses = () => {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="flex items-center gap-4 font-bold text-2xl md:text-3xl">

          <span>تخفیفات ویژه</span>

          <span className="text-white -rotate-12 bg-red-500 rounded-2xl text-lg md:text-xl px-4 py-1 md:px-5 md:py-2">
            بهاره
          </span>

          <Timer initialSeconds={7200} />

        </div>

        <div className="hidden md:flex">
          <Button1 href="/houseListReservePage" label="نمایش همه" />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {houses.map((house:any) => (
          <HouseCards
            key={house.id}
             house={house}
          />
        ))}

      </div>

      <div className="flex md:hidden justify-center mt-2">
        <Button1 href="/houseListReservePage" label="نمایش همه" />
      </div>

    </div>
  )
}

export default DiscountedHouses
