import Price from "@/components/common/PriceComponent/Price";
import Avater from "@/assets/ico/avatar.png";
import SubmitBt from '@/components/common/SubmitBt';
import { isoToPersianDate,toPersianFormat } from "@/util/helper/persianFormat";

import Image from "next/image"

interface rentInfoProps{
    mortagatePrice:number,
    rentPrice:number,
    sellerName:string 
    last_updated:string
    phoneNumber:string | number; 
}

export default function HomeRentInfo ({phoneNumber,mortagatePrice,rentPrice,sellerName,last_updated}:rentInfoProps) {


    return (
        <>
        
            <div className='w-full flex flex-wrap gap-2'>

                <h1 className=' text-[#586CFF] font-semibold w-full'>قیمت رهن‌وجاره و اطلاعات تماس</h1>

                <div className=' w-full flex flex-row justify-between items-center '>
                       <div className='w-[45%] outline outline-[#E9E9E9] rounded-[16px] p-3 flex flex-col items-start'>
                         <span className='font-bold text-[15px] text-[#586CFF] '>قیمت رهن از</span>
                         <span >{toPersianFormat(mortagatePrice)}تومان</span>
                       </div>

                       <div className='w-[45%] outline outline-[#E9E9E9] flex flex-col items-start rounded-[16px] p-3'>
                         <span className='font-bold text-[15px] text-[#586CFF] '>قیمت اجراه از</span>
                         <span>{toPersianFormat(rentPrice)}تومان</span>
                       </div>
                </div>

                <div className=' w-full flex flex-row max-xl:flex-col max-xl:items-start justify-between'>

                      <div className=" w-[200px] h-[90%]
                       flex flex-row ">

                        <div className="w-[30%] h-full ">
                        <Image alt="avatar" src={Avater} className="rounded-full"/>
                        </div>

                        <div className="  text-[12px]   w-[70%] flex flex-wrap">
                           <span className="w-full font-medium h-[50%]">{sellerName}</span> 
                           <span className="w-full h-[50%]">{isoToPersianDate(last_updated)}</span> 
                        </div>

                    </div>

                     <div className='w-[50%] max-xl:w-full flex flex-row   items-center p-2 gap-2'>
                         <button style={{backgroundImage:"url('/ico/detailPage/message-ico.png')"}} className="w-10 h-10 bg-[length:100%_100%]"></button>
                         <SubmitBt subLabel={`شماره تماس : ${phoneNumber}`} />
                        </div> 
                </div>

              </div>

         
        </>
    )
}