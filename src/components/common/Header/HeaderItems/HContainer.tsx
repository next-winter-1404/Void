import React, { FC, ReactNode } from 'react'

interface IProps{
    children: ReactNode;
}
const HContainer:FC<IProps> = ({children}) => {
  return (
<<<<<<< HEAD
    <div className='gap-5 px-16 py-6 fixed top-0 right-0 left-0 bg-transparent flex items-center justify-between z-50 backdrop-blur rounded' dir='ltr'>
=======
    <div className='gap-5 px-16 py-[10px] fixed top-0 right-0 left-0 bg-transparent flex flex-row items-center justify-between z-50 backdrop-blur rounded' dir='ltr'>
>>>>>>> mersad
        {children}
    </div>
  )
}

export default HContainer