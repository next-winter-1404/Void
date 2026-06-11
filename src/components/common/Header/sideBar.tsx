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
import SideBarButton from '@/components/dashboard/DashboardComps/SideBarButton'
import Burgar from "@/assets/ico/burgar/icons8-hamburger-menu-50.gif"
import ButtonProfile from '../../auth/buttonProfile'


import { redirect } from "next/navigation"
import {useActionState, useState,useEffect} from "react";
import logout_handler from "@/util/service/authAction/logoutAction";
import toast_errorHandling from "@/util/hooks/errorHandling"
interface props {
    isLoggin:boolean
    userInfo : any
}

const Dashsidebar = ({isLoggin,userInfo}:props) => {
    const result={success:false}
    const [state,formAction,pending] = useActionState(logout_handler,result);

  const[open,setOpen] = useState<boolean>(false);
    console.log(open);

    const [set,setT] = useState<boolean>(false);

    const logoutNotif =()=>{
          toast_errorHandling(Number(200),"از حساب خود خارج شدید😒")
          setTimeout(()=>window.location.reload(),2000)
          
        } 

  return (
    <>
      
       <button onClick={()=>setOpen(true)} className={` ${open ? "hidden" : ""} bg-[white] rounded-[16px]  p-2
         min-lg:hidden w-[50px] h-[50px]  shadow-md flex items-center justify-center`}>
           <Image className="rounded-[16px] w-[80%] h-[80%]" alt="menu" src={Burgar}/>
         </button>

    <div className={`flex flex-col  gap-5 p-5 bg-[white]  transition-all duration-300 ease-in-out right-[0] top-[0]  z-[100] 
         transition-[1s] duration-[280ms]  absolute  w-[200px] h-screen ${open ? "" : "hidden"} `}>
        <header className='flex flex-col justify-between'>
            
             <button className='' onClick={()=>setOpen(false)}><Image src={logout} alt='log out' width={24} height={24} /></button>
           {isLoggin &&<div className='flex flex-col items-right'>
              <div className="flex flex-row-reverse items-center  gap-3 p-4">
                   <div onClick={()=>setT(!set)} className="w-8 h-8 rounded-full">
                     <Image alt="wa" width={50} height={50} src={"/ico/avatar.png"}/>
                   </div>
             
                   <div className="flex-1 text-right">
                     <p className="font-semibold text-[15px]">
                       {userInfo?.name}
                     </p>
             
                   </div>
                   
                      
                 </div>

                  <form action={formAction} className={` flex flex-col items-right ${set ?"" : "hidden"} transition-all duration-300 ease-in-out`}>
                  <li className="border-t border-[#E9E9E9]">
                  <button
                    type="submit"
                    onClick={logoutNotif}
                    className="w-full flex flex-row-reverse items-center justify-between px-3 py-1 hover:translate-x-[-10px] transition-all duration-300 ease-in-out"
                  >
                    <span className="text-[18px]">
                      خروج
                    </span>
                    <span className="text-[24px]">
                      ↩
                    </span>
                  </button>
                </li>
             </form>
      
        </div>}  
            
        </header>
        
        <div className='flex flex-col gap-5' dir='ltr'>
          {!isLoggin && <SideBarButton href="/login" className='flex flex-row justify-end  items-center'>
                 ثبت نام و ورود
                <Image src={Desk} alt='H' width={20} height={20} />
            </SideBarButton>}
            
            {isLoggin &&<SideBarButton href="/dashboard" className='flex flex-row justify-end  items-center'>
                داشبورد 
                <Image src={Desk} alt='H' width={20} height={20} />
            </SideBarButton>}
            
            <SideBarButton href="/dashboard" className='flex flex-row justify-end  items-center'>
                 خانه
                <Image src={Home} alt='H' width={20} height={20} />
            </SideBarButton>

             <SideBarButton href="/dashboard" className='flex flex-row justify-end  items-center'>
                 درباره ما
                <Image src={Chat} alt='H' width={20} height={20} />
            </SideBarButton>

            <SideBarButton href="/dashboard" className='flex flex-row justify-end  items-center'>
                 مقالات
                <Image src={Bell} alt='H' width={20} height={20} />
            </SideBarButton>
        </div>

    </div>

    </>
  )
}

export default Dashsidebar

