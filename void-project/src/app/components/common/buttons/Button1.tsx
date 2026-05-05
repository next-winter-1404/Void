import React, { FC } from 'react'
import Link from 'next/link';
interface ButtonProps{
    href: string;
    label: string;
    className?: string;
}
const Button1:FC<ButtonProps> = ({href,label,className}) => {
  return (
    <Link
      href={href}
      className={`
        inline-block px-4 py-2 rounded-3xl
        bg-gradient-to-r from-[#5A6FF0] to-[#4E6AF3]
        text-white
        text-lg font-semibold
        shadow-lg shadow-blue-500/30
        hover:shadow-blue-500/50
        hover:scale-105
        active:scale-95
        transition-all duration-300
        ${className || ""}
      `}
    >
      {label}
    </Link>
  )
}

export default Button1