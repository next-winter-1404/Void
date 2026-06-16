"use client"
import React, { FC, ReactNode } from 'react'
import { useScrollDirection } from "@/util/hooks/scrollDetect";
interface IProps{
    children: ReactNode;
}

const HContainer:FC<IProps> = ({children}) => {

  const {isHidden} = useScrollDirection();
  return (
    <div className={`${isHidden ? "min-lg:-translate-y-full" : "translate-y-0"}  transition-all duration-300 ease-in-out 
    gap-5 px-16 max-lg:px-5 py-[10px] fixed top-0 right-0 left-0 bg-transparent flex flex-row
     items-center justify-between  z-50 backdrop-blur rounded' dir='ltr`}>
        {children}
    </div>
  )
}

export default HContainer