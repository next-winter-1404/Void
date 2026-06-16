"use client";

import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { toPersianFormat } from '@/util/helper/persianFormat';

interface priceRangeProps{
    value:number[],
    setValue:React.Dispatch<React.SetStateAction<number[]>>,
    handleValueChange:(event:Event,newValue:number[])=>void
}

export default function PriceRange({value,setValue,handleValueChange}:priceRangeProps) {
 
  return (
    <Box sx={{ width: '90%', padding: '0 10px' }}>
        <div className='flex flex-col justify-start gap-2'>
        <span className='max-xl:flex max-xl:flex-col'><span className='text-[#878787] ml-1'>قیمت از</span>{toPersianFormat(value[0])}تومان</span>
        <span className='max-xl:flex max-xl:flex-col'><span className='text-[#878787] ml-1'>قیمت تا</span>{toPersianFormat(value[1])}تومان</span>
      </div>
      <Slider
        value={value}
        onChange={handleValueChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000000000}
        step={1000000}
        sx={{
          color: '#7575FE', 
          '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            backgroundColor: '#fff',
            border: '5px solid #7575FE',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: 'inherit',
            },
          },
          '& .MuiSlider-track': {
            height: 6,
          },
          '& .MuiSlider-rail': {
            height: 6,
            color: '#d1d5db',
          },
        }}
      />
      
    </Box>
  );
}
