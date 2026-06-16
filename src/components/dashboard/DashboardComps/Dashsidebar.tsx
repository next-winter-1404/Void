'use client'
import React from 'react'
import Image from 'next/image'
import Home  from '@/assets/Images/Dashboard/Home.png'
import Chat  from '@/assets/Images/Dashboard/Chat.png'
import Bell  from '@/assets/Images/Dashboard/Bell.png'
import Desk  from '@/assets/Images/Dashboard/Desk.png'
import Pich  from '@/assets/Images/Dashboard/Pich.png'
import Add   from '@/assets/Images/Dashboard/Add.png'
import User  from '@/assets/Images/Dashboard/User.png'
import Fav   from '@/assets/Images/Dashboard/Fav.png'
import logout from '@/assets/Images/Dashboard/logout.png'
import delta  from '@/assets/Images/Dashboard/delta.png'
import SideBarButton from './SideBarButton'
import { useSidebar } from './burgerButtonState/sidebarContext'
import { useTheme } from 'next-themes'
import { getUserInfo } from '@/util/hooks/localStorage'
interface DashsidebarProps {
  role: string | null   
}

const Dashsidebar = () => {
  const { open, setOpen } = useSidebar()

  const userInfo = getUserInfo();
const role = userInfo?.role;
  const isSeller = role === 'seller'

  const {theme} = useTheme();

  return (
    <>
      <main className={`flex flex-col gap-5 p-5 ${theme === "dark" ? "bg-[#444444]" : theme === "light" ? "bg-white" : "bg-[#444444]"} max-h-screen right-[0] z-[100]
          transition-[1s] duration-[280ms] h-full
          ${open ? 'max-xl:fixed w-[300px]' : 'w-[16%] max-xl:hidden'}
          rounded-2xl`}>

        <header className='flex flex-row justify-between'>
          <Image src={delta}  alt='دلتا' width={50} height={50} />
          <button className='min-xl:hidden' onClick={() => setOpen(false)}>
            <Image src={logout} alt='log out' width={24} height={24} />
          </button>
        </header>

        <div className='flex flex-col gap-5' dir='ltr'>

          
          <SideBarButton href="/dashboard" className='flex flex-row justify-end items-center'>
            داشبورد
            <Image src={Home} alt='H' width={20} height={20} />
          </SideBarButton>

          <SideBarButton href="/dashboard/user_info" className='flex flex-row justify-end items-center'>
            اطلاعات کاربری
            <Image src={User} alt='U' width={20} height={20} />
          </SideBarButton>






          {isSeller && (
            <>
              <SideBarButton href="/dashboard/house_managment" className='flex flex-row justify-end items-center'>
                مدیریت املاک
                <Image src={Pich} alt='P' width={20} height={20} />
              </SideBarButton>

              <SideBarButton href="/dashboard/reserve_managment" className='flex flex-row justify-end items-center'>
                مدیریت رزرو ها
                <Image src={Add} alt='Add' width={20} height={20} />
              </SideBarButton>

              <SideBarButton href="/dashboard/payment_managment" className='flex flex-row justify-end items-center'>
                مدیریت مالی
                <Image src={Desk} alt='Desk' width={20} height={20} />
              </SideBarButton>

              <SideBarButton href="/dashboard/comment_managment" className='flex flex-row justify-end items-center'>
                مدیریت نظرات
                <Image src={Chat} alt='Chat' width={20} height={20} />
              </SideBarButton>
            </>
          )}







          {!isSeller && (
            <>
              <SideBarButton href="/dashboard/reserve_managment" className='flex flex-row justify-end items-center'>
                مدیریت رزرو ها
                <Image src={Add} alt='Add' width={20} height={20} />
              </SideBarButton>

              <SideBarButton href="/dashboard/house_favorite" className='flex flex-row justify-end items-center'>
                علاقه‌مندی‌ها
                <Image src={Fav} alt='Fav' width={20} height={20} />
              </SideBarButton>

              <SideBarButton href="/dashboard/payment_managment" className='flex flex-row justify-end items-center'>
                پرداخت ها
                <Image src={Desk} alt='Desk' width={20} height={20} />
              </SideBarButton>
            </>
          )}

          
          <SideBarButton href="/dashboard/Notifactions" className='flex flex-row justify-end items-center'>
            اعلان ها
            <Image src={Bell} alt='Bell' width={20} height={20} />
          </SideBarButton>

        </div>

        <div className='w-full h-[100px] border rounded-[16px]'></div>
      </main>
    </>
  )
}

export default Dashsidebar