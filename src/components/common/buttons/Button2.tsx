import React, { FC } from 'react'

 interface Button2Props{
    label:string;
    className?:string
    
 }
const Button2:FC<Button2Props> = ({label,className}) => {
  return (
    <button className={`inline-block px-4 py-2 rounded-3xl focus:bg-gradient-to-r from-[#5A6FF0] to-[#4E6AF3] bg-white  focus:text-white text-black text-md font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 ${className || ""}`}
      >
      {label}
      
    </button>
  )
}

export default Button2