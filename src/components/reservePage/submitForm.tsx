'use client'

import InputField from "@/components/common/inputFeild/input";
import SubmitBt from "@/components/common/SubmitBt";
import InputDate from "@/components/common/inputFeild/inputDate";
import Price from "@/components/common/PriceComponent/Price";
import { useActionState, useEffect,useState } from "react";

import type {dropDownItems} from "./dropDownMenu";

import {submit_info} from "@/util/service/reserveAction/action";
import toast_errorHandling from "@/util/hooks/errorHandling";
import DropDownMenu from "./dropDownMenu";
import { QueryMapper } from "@/util/helper/queryMapper";

interface Props {
     houseId:number,
     checkInDate:string,
     checkOutDate:string
}

export default function SubmitUser_Form ({houseId,checkInDate,checkOutDate}:Props){

     const result = {success:false,};
    const [state,formAction,pending] = useActionState(submit_info,result);
   
    // useEffect(()=>{
    //   console.log(" response",state)
    //    if(state?.status) toast_errorHandling(Number(state.status));
    //  },[state])
    


        const [showCategory, setShowCategory] = useState<boolean>(false);
       
        
        const category:dropDownItems[] = [
            {id:1,name:"مرد",query:"male"},
            {id:2,name:"زن",query:"female"},        
        ]
    
    
         const [filters, setFilters] = useState({
                gender: "",query:""
            });

            // console.log(filters);

            const handleCategoryChange = (name:string) => {
                const newItems = filters.gender === name ? '' : name;
                 const gen = QueryMapper.map(name,"gender",category);
                setFilters({ ...filters, gender: newItems,query:gen.gender });
           
            };
    


    return(
        <>
          <form action={formAction} className="w-full flex flex-wrap gap-5 mt-5">
           
           <div className='flex flex-wrap w-[400px]  gap-2'>
                <h1 className='w-full text-start font-bold text-[15px]'> مشخصات مسافر</h1>
              </div>

              <div className="flex flex-row max-lg:flex-wrap gap-10 justify-between w-full ">

             <input type="hidden" name="gender" id="gender" value={filters.gender}/>
             <input type="hidden" name="houseId" id="houseId" value={houseId}/>
             <input type="hidden" name="checkInDate" id="checkInDate" value={checkInDate}/>
             <input type="hidden" name="checkOutDate" id="checkOutDate" value={checkOutDate}/>
             
            <InputField name="firstName" label="" type="text" id="firstName"
            placeHolder="نام "  />

            <InputField name="lastName" label="" type="text" id="lastName"
            placeHolder=" نام خانوادگی"  />

           <InputField name="nationalId" label="" type="text" id="nationalId"
            placeHolder="کد ملی"  />

           </div>   


           <div className="flex flex-row max-lg:flex-wrap items-center  gap-10 justify-between w-full ">
            <div className="w-[50%]">
             <InputDate name="birthDate" label="تاریخ تولد"/>
             </div>

              <DropDownMenu 
                label="جنسیت"
                 dropDownItems={category} 
                 setShowDropDown={setShowCategory} 
                 showDropDown={showCategory} 
                 handleChange={handleCategoryChange}
                 filters={filters.gender}
                 />
            </div>   

             <div className='flex flex-wrap w-[400px]  gap-2'>
                <h1 className='w-full text-start font-bold text-[15px]'> ارسال بلیط به دیگران</h1>
              </div>

             <div className="flex flex-row max-lg:flex-wrap gap-10 justify-between w-full ">

            <InputField name="sharedEmail" label="" type="text" id="sharedEmail"
            placeHolder="ایمیل"  />

           <InputField name="sharedMobile" label="" type="text" id="sharedMobile"
            placeHolder="شماره تماس"  />

           </div>   


             
             <SubmitBt subLabel="تایید و ادامه فرایند" />
         </form>       
        </>
    )
}