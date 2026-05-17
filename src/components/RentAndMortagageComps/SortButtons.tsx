"use client"
import React from 'react'
import Button2 from '@/components/common/buttons/Button2'
const SortButtons = () => {
  return (
    <div><div className='flex flex-row gap-3'>
              <Button2 label='همه'/>
              <Button2 label='ارزان ترین'/>
              <Button2 label='گرانترین'/>
              <Button2 label='محبوب ترین'/>
              <Button2 label='حیاط دار'/>
              <Button2 label='پارکینگ دار'/>
              <Button2 label='عکس دار'/>
            </div></div>
  )
}

export default SortButtons