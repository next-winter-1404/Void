import React, { Dispatch, FC } from 'react'
import {useState} from "react";
interface ButtonProps{
    // href: string;
    label: string;
    className?: string
    setShowFilter:React.Dispatch<React.SetStateAction<boolean>>,
    showFilter:boolean
}
const Button1:FC<ButtonProps> = ({label,className,setShowFilter,showFilter}) => {

    
  return (
    <button
     onClick={()=>setShowFilter(!showFilter)}
      className={`
        relative whitespace-nowrap
        inline-block px-4 py-2 rounded-[16px]
        bg-gradient-to-r from-[#8CFF45] to-[#8CFF45]
        
        text-[17px] font-medium
        shadow-lg shadow-blue-500/30
        hover:shadow-blue-500/50
        hover:scale-105
        active:scale-95
        transition-all duration-300
        ${className || ""}
      `}
    >
      {label}
    </button>
  )
}

export default Button1