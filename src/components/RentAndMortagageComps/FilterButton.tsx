"use client"

import React from 'react'
import { useState } from 'react'
const FilterButton = () => {
    const [open, setOpen] = useState(false)
  return (
    <div><div className=' relative'>
              <button onClick={()=>setOpen(!open)} className='inline-block px-4 py-2 rounded-3xl bg-gradient-to-r from-[#5A6FF0] to-[#4E6AF3] text-white text-lg font-semibold  shadow-lg shadow-blue-500/30   hover:shadow-blue-500/50  hover:scale-105   active:scale-95 transition-all duration-300'>فیلتر ها</button>
            { open&&(
              <div className=" absolute mb-5 bg-white rounded-3xl md:w-max max-w-6xl p-8 flex flex-col gap-8" dir="rtl">

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">محل مورد نظر</label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none">
              <option>انتخاب کنید</option>
            </select>
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">نوع ملک</label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none">
              <option>انتخاب کنید</option>
            </select>
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">نوع معامله</label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none">
              <option>انتخاب کنید</option>
            </select>
          </div>

        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

         
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">حداقل اجاره</label>
            <input
              type="number"
              placeholder="وارد کنید"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">حداکثر اجاره</label>
            <input
              type="number"
              placeholder="وارد کنید"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* حداقل متراژ */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">حداقل متراژ</label>
            <input
              type="number"
              placeholder="وارد کنید"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm font-semibold">حداکثر متراژ</label>
            <input
              type="number"
              placeholder="وارد کنید"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
          </div>

        </div>

      </div>
            )}
            
            
            
            
            
            </div></div>
  )
}

export default FilterButton