import React from 'react'
import Button1 from '../../common/buttons/Button1'
import HouseCards from '../../common/Cards/HouseCards'
import { HouseCard } from '@/types/HouseCard/HouseCard'
import khoone from '@/assets/Images/components/HouseCard/khoone.png'
const mockHouses: HouseCard[] = [
  {
    id: "1",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:false,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:true,
    parking: 1,
    showYard: true,
    yard:"حیاط دار"
  },
  {
    id: "2",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:false,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:true,
    parking: 1,
    showYard: true,
    yard:"حیاط دار"
  },
  {
    id: "3",
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران، زعفرانیه",
    oldPrice: 15000000,
    image: khoone,
    isDicounted:false,
    discountPrice:3000000,
    discountPercent:15,
    showBeds:true,
    beds: 3,
    showBath:true,
    baths: 2,
    showParking:true,
    parking: 1,
    showYard: true,
    yard:"حیاط دار"
  },
]


const HotSales = () => {
  return (
    <div className='flex flex-col gap-10'>
        <header className='flex flex-row justify-between gap-5'>
            <h2 className='md:text-3xl text-2xl font-bold'>خرید و فروش های داغ این هفته</h2>
            {/* <Button1 href='' label='مشاهده همه'></Button1> */}
        </header>
        <div className='flex flex-col md:flex-row justify-between gap-5 '>
          {mockHouses.map((HouseCard) =>(
            <HouseCards key={HouseCard.id} {...HouseCard}/>
          ))}
        </div>
    </div>
  )
}

export default HotSales