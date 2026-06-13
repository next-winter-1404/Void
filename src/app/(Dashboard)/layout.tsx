import React from 'react'
import Dashsidebar from '@/components/DashboardComps/Dashsidebar'
import DashHeader from '@/components/DashboardComps/DashHeader'
import { getUserRole } from '@/util/service/api/token'

export default async function DashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const role = await getUserRole()

  return (
    <div className='flex bg-zinc-200 gap-10 h-screen' dir='rtl'>
      <Dashsidebar role={role} />
      <main dir="rtl" className="flex-1 flex flex-col p-6 overflow-y-auto gap-5">
        <DashHeader />
        {children}
      </main>
    </div>
  )
}