import React from 'react'
// import HeaderComponent from '../../components/common/Header/Header'
// import FooterComponent from '@/app/components/common/Footer/Footer'
import Rotbebartart from '@/app/components/landing/rotbebartar/rotbebartart'
import HotSales from '@/app/components/landing/hotsales/HotSales'
import BestLocation from '@/app/components/landing/BestLocation/BestLocation'
import CategoryHouses from '@/app/components/landing/categoryhouses/CategoryHouses'
import HeroSection from '@/app/components/landing/HeroSection/HeroSection'
import UserComments from '@/app/components/landing/UserComments/UserComments'
import DiscountedHouses from '@/app/components/landing/discountedHouses/DiscountedHouses'
const LandingPage = () => {
  return (
    <div className='flex flex-col gap-20'>
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