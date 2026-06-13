import React, { FC, ReactNode } from 'react'

interface Button2Props {
    label?: string;
    className?: string;
    onClick?: () => void;
    isActive?: boolean;
    active?: boolean;
    children?: ReactNode;
}

const Button2: FC<Button2Props> = ({ label, className, onClick, active, children }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-block px-4 py-2 rounded-3xl  text-md font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300
        ${active ? "bg-gradient-to-r from-[#5A6FF0] to-[#4E6AF3] text-white" : ""}
        ${className ?? ""}`}
    >
      {children ?? label}
    </button>
  )
}

export default Button2