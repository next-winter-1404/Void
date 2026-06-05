<<<<<<< HEAD
import React from 'react';

interface Button2Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export default function Button2({ children, onClick, active = false }: Button2Props) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out ${
        active
          ? 'bg-[#4169E1] text-white shadow-md'
          : ' text-gray-700 border border-gray-200 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}
=======
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
>>>>>>> mersad
