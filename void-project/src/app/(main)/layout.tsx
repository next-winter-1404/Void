import React, { FC, ReactNode } from 'react'

interface IProps{
    children:ReactNode;
}
const layout:FC<IProps> = ({children}) => {
  return (
    <div className='flex flex-col'>
        

            <main className='px-16 py-6'>
            {children}
            </main>
        
    </div>
  )
}

export default layout