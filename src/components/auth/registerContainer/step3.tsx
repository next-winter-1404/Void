'use client'
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt"
import Link from "next/link"
import {redirect} from "next/navigation";
import { useState } from "react";

import Input from "@/components/auth/input";

export default function step1 () {

    const stepHandler = ()=> {
        redirect("/");
    }

    const [show,setShow] = useState<boolean>(false);

    return(
       <>

        <form onSubmit={stepHandler} className="flex flex-wrap gap-5  ">

            <label htmlFor="phoneNumber" className=" w-full font-medium ">شماره تماس</label>
             <input
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{10,11}"
              maxLength={11}
              dir="rtl"
              required
              placeholder="شماره تماس خود را وارد کنید" 
              className="border mb-2 border-[gray]/40 w-full py-3 outline-none rounded-[16px]  text-start pr-12 bg-[url('/ico/auth/phone-ico.png')] bg-no-repeat bg-[position:98%_55%]"
             />

             <Input name="pass" type="password" id="pass" 
             placeHolder="رمز عبور خود را وارد کنید" icon="pass" 
              label="رمز عبور"
              />

             <Input 
               name="pass" type="password" id="pass"
               placeHolder="رمز عبور خود را دوباره وارد کنید" icon="passRepeat" 
               label=" تکرار رمز عبور"/>
             
             
            
          <SubmitButton subLabel="ثبت نام"  />

        </form>
           
        </>
    )
}