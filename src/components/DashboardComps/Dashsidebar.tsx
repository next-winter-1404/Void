'use client'
import React from 'react'
import Image from 'next/image'
import Home from '@/assets/Images/Dashboard/Home.png'
import Chat from '@/assets/Images/Dashboard/Chat.png'
import Bell from '@/assets/Images/Dashboard/Bell.png'
import Desk from '@/assets/Images/Dashboard/Desk.png'
import Pich from '@/assets/Images/Dashboard/Pich.png'
import Add from '@/assets/Images/Dashboard/Add.png'
import User from '@/assets/Images/Dashboard/User.png'
import Fav from '@/assets/Images/Dashboard/Fav.png'
import logout from '@/assets/Images/Dashboard/logout.png'
import delta from '@/assets/Images/Dashboard/delta.png'
import SideBarButton from './SideBarButton'

const Dashsidebar = () => {
  return (
    <main className=' flex-col gap-5 p-5 bg-white m-5 rounded-2xl md:flex hidden'>
        <header className='flex flex-row justify-between'>
            <Image src={delta} alt='دلتا' width={50} height={50} />
            <button><Image src={logout} alt='log out' width={24} height={24} /></button>
        </header>
        
        <div className='flex flex-col gap-5' dir='ltr'>
            
            <SideBarButton href="/Dashboard" className='flex flex-row justify-between items-center'>
                داشبورد 
                <Image src={Home} alt='H' width={20} height={20} />
            </SideBarButton>
            
            <SideBarButton href="/profile" className='flex flex-row justify-between items-center'>
                اطلاعات کاربری 
                <Image src={User} alt='U' width={20} height={20} />
            </SideBarButton>
            
            <SideBarButton href="/properties" className='flex flex-row justify-between items-center'>
                مدیریت املاک
                <Image src={Pich} alt='P' width={20} height={20} />
            </SideBarButton>

            <SideBarButton href="/CustomersReservationList" className='flex flex-row justify-between items-center'>
                مدیریت رزرو ها
                <Image src={Add} alt='Add' width={20} height={20} />
            </SideBarButton>

            <SideBarButton href="/SellerPaymentSection" className='flex flex-row justify-between items-center'>
                مدیریت  مالی
                <Image src={Desk} alt='Add' width={20} height={20} />
            </SideBarButton>

            <SideBarButton href="/SellerComments" className='flex flex-row justify-between items-center'>
                مدیریت  نظرات
                <Image src={Chat} alt='Add' width={20} height={20} />
            </SideBarButton>


            <SideBarButton href="/DashFav" className='flex flex-row justify-between items-center'>
                       علاقه مندی ها
                <Image src={Fav} alt='/3' width={20} height={20} />
            </SideBarButton>


            <SideBarButton href="/reservations" className='flex flex-row justify-between items-center'>
                        پرداخت ها
                <Image src={Desk} alt='Add' width={20} height={20} />
            </SideBarButton>

            <SideBarButton href="/Notifactions4u" className='flex flex-row justify-between items-center'>
                اعلان ها
                <Image src={Bell} alt='Add' width={20} height={20} />
            </SideBarButton>
            
            
        </div>
    </main>
  )
}

export default Dashsidebar
