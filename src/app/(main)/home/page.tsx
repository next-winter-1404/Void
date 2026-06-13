import React from 'react'
// import HeaderComponent from '../../components/common/Header/Header'
// import FooterComponent from '@/components/common/Footer/Footer'
import Rotbebartart from '@/components/landing/rotbebartar/rotbebartart'
import HotSales from '@/components/landing/hotsales/HotSales'
import BestLocation from '@/components/landing/BestLocation/BestLocation'
import CategoryHouses from '@/components/landing/categoryhouses/CategoryHouses'
import HeroSection from '@/components/landing/HeroSection/HeroSection'
import UserComments from '@/components/landing/UserComments/UserComments'
import DiscountedHouses from '@/components/landing/discountedHouses/DiscountedHouses'
import PropertySearchTabs from '@/components/landing/fixedBar/FixedBard'
import { Api } from '@/util/service/api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'
const  LandingPage =async() => {


  const api = await Api();
  const comments = await handleAsyncAction(api.landing.getComments());
  const comment = comments?.data?.comments 

  return (
    <div dir='rtl' className='flex flex-col gap-20'>
      {/* <PropertySearchTabs /> */}
      <HeroSection />
      <DiscountedHouses />
      <CategoryHouses />
      <HotSales />
      <Rotbebartart />
      <BestLocation />
      <UserComments comment={comment} />
      
    </div>
  )
}

export default LandingPage