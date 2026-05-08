import Price from "@/components/common/PriceComponent/Price";
import Avater from "@/assets/ico/avatar.png";
import SubmitBt from '@/components/common/SubmitBt';

import Image from "next/image"

export default function HomeRentInfo () {


    return (
        <>
        
            <div className='w-full flex flex-wrap gap-2 border'>

                <h1 className='border text-[#586CFF] w-full'>قیمت رهن‌وجاره و اطلاعات تماس</h1>

                <div className='border w-full flex flex-row justify-between items-center '>
                       <div className='w-[45%] border-2 rounded-[16px] p-1'>
                         <span className='font-bold text-[15px] text-[#586CFF] '>قیمت رهن از</span>
                         <span><Price price={1200000000} /></span>
                       </div>

                       <div className='w-[45%] border-2 rounded-[16px] p-1'>
                         <span className='font-bold text-[15px] text-[#586CFF] '>قیمت اجراه از</span>
                         <span><Price price={1200000000} /></span>
                       </div>
                </div>

                <div className='border w-full flex flex-row justify-between'>

                      <div className=" w-[200px] h-[90%]
                       flex flex-row ">

                        <div className="w-[30%] h-full">
                        <Image alt="avatar" src={Avater} className="rounded-full"/>
                        </div>

                        <div className="  text-[12px]  w-[70%] flex flex-wrap">
                           <span className="w-full font-medium h-[50%]">مرصاد مسیبی</span> 
                           <span className="w-full h-[50%]">12 مرداد 1404</span> 
                        </div>

                    </div>

                     <div className='w-[50%] flex flex-row items-center p-2 gap-2'>
                         <button style={{backgroundImage:"url('/ico/share.png')"}} className="w-10 h-10 bg-[length:100%_100%]"></button>
                         <SubmitBt subLabel='شماره تماس : 5642***0938' />
                        </div> 
                </div>

              </div>

         
        </>
    )
}