'use Client'

import SubmitButton from "../SubmitBt";
import Link from "next/link"


export default function step1 () {

    return(
       <>
        <form className="flex flex-col items-center p-5 gap-3 border">
            <label htmlFor="email" className=" w-full font-medium ">ایمیل</label>
             <input
              name="email"
              type="email"
              placeholder="ایمیل خود را وارد کنید:" 
              className="border mb-2 border-[gray]/40 p-3 px-30 outline-none rounded-[16px]  text-start pr-12 bg-[url('/auth/email-ico.png')] bg-no-repeat bg-[position:95%_55%]"
             />
       
          <SubmitButton subLabel="ارسال کد تایید"  />

           <div className="flex flex-row">
            <p>حساب کاربری داری؟</p>
           <Link href="/Login" className="cursor-pointer text-[#9B0EE1] mr-2 underline"> ورود به حساب</Link>
          </div> 
     
        </form>
           
        </>
    )
}