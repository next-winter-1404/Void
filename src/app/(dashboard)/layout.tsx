import React from 'react'
import Dashsidebar from '@/components/DashboardComps/Dashsidebar'
import DashHeader from '@/components/DashboardComps/DashHeader'
export default function DashLayout({children}:Readonly<{children:React.ReactNode}>){

    return(
        <div className='flex bg-zinc-200 gap-10 min-h-screen ' dir='rtl'>
          <Dashsidebar />
          <main dir="rtl" className=" flex-1 flex flex-col p-6 overflow-y-auto">
            <DashHeader />
          {children}
          </main>
        </div>
    )

}