'use client'
import {useEffect, useState} from "react"

export interface dropDownItems {
    id:number,
    name:string,
    query:string,
    query2?:string,
    created_at?:string,
    updated_at?:string
}

interface dropDownMenuProps {
    label:string,
    setShowDropDown:React.Dispatch<React.SetStateAction<boolean>>,
    showDropDown:boolean,
    dropDownItems:dropDownItems[],
    handleChange:(name:string)=>void,
    filters:string | ""
}

export default function DropDownMenu ({label,setShowDropDown,showDropDown,dropDownItems,handleChange,filters}:dropDownMenuProps) {

    return(
        <>
          <div className="rounded-[5px] p-[2px]  w-full ">
       <label className="text-[14px] font-medium  block mb-3 pr-2">
         {label}
       </label>
       
       <div className="relative">
         <div
         className="border border-gray-300 rounded-[16px] p-3  text-sm text-gray-700 cursor-pointer flex justify-between items-center hover:bg-gray-50"
           onClick={() => setShowDropDown(!showDropDown)}
           
         >
           <span>{filters || 'انتخاب کنید'}</span>
           <span className="text-xs">▼</span>
         </div>
         
         {showDropDown && (
           <ul className="absolute top-full h-[110px] overflow-y-auto left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg z-50 border border-gray-200">
             {dropDownItems.map((item) => (
               <li key={item.id}>
                 <label
                   className={`block px-4 py-2 text-sm cursor-pointer hover:bg-teal-500 hover:text-white ${
                     filters === item.name ? '!bg-orange-500 !text-white' : ''
                   }`}
                   onClick={() => {
                     handleChange(item.name);
                     setShowDropDown(false);
                   }}
                 >
                   {item.name}
                 </label>
               </li>
             ))}
           </ul>
         )}
         
       </div>
     </div>



        </>
    )
}