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
const LandingPage = () => {
  return (
    <div dir='rtl' className='flex flex-col gap-20'>
      {/* <PropertySearchTabs /> */}
      <HeroSection />
      <DiscountedHouses />
      <CategoryHouses />
      <HotSales />
      <Rotbebartart />
      <BestLocation />
      <UserComments />
      
    </div>
  )
}

export default LandingPage