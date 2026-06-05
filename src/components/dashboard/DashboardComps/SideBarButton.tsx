import React, { FC, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
    href: string;
    children: ReactNode;
    className?: string;
}

const SideBarButton: FC<ButtonProps> = ({ href, children, className = "" }) => {
  return (
    
    <Link href={href} className={`flex gap-2 hover:bg-zinc-200 rounded-2xl cursor-pointer w-full p-2 focus:bg-zinc-200 ${className}`}>
        {children}
    </Link>
  )
}

export default SideBarButton
