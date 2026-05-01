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
        inline-block px-6 py-3 rounded-lg
        bg-blue-600 text-white
        hover:bg-blue-700 transition
        text-sm font-medium
        ${className || ""}
      `}
    >
      {label}
    </Link>
  )
}

export default Button1