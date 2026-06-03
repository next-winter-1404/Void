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
