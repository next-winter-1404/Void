"use client"
import Dashsidebar from '@/components/dashboard/DashboardComps/Dashsidebar'
import DashHeader from '@/components/dashboard/DashboardComps/DashHeader'

import BurgerBt from '@/components/dashboard/DashboardComps/burgarBt'
import { SidebarProvider } from "@/components/dashboard/DashboardComps/burgerButtonState/sidebarContext";
import { getUserInfo } from '@/util/service/api/token';

import {useTheme} from "next-themes"

export default  function DashLayout({children}:Readonly<{children:React.ReactNode}>){
    
  const {theme} = useTheme();

    return(
      <SidebarProvider>
        <div  className={`flex flex-row ${theme == "dark" ? "bg-[black]" : theme == "light" ? "bg-[#ECECEC]" : "bg-[black]"}  gap-3 p-3 h-screen`} dir='rtl'>

            
           {/* <div className=' w-[16%] h-full'> */}
          <Dashsidebar />
          {/* </div> */}

          <main dir="rtl" className="w-[84%] max-xl:w-full  flex flex-col gap-2">
            <div className='flex flex-row gap-3 h-[60px]'>
            <BurgerBt/>
            <DashHeader />
            </div>

            <div className='overflow-y-auto  rounded-[16px]'>
            {children}
            </div>
            
          </main>
        </div>
        </SidebarProvider>
    )

}