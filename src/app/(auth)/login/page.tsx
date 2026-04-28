
import LoginHandler from "@/components/auth/loginContainer/LoginHandler";

import PIZA from "@/assets/ico/PIZA.png";
import Image from "next/image";
import Link from "next/link";

import AuthPageHeader from "@/components/auth/authPageHeader";

export default async function  Login() {
  
       
    return (
               
        <div className=" w-[50%] max-md:w-[full] border  max-xl:w-full h-screen  flex flex-col items-center justify-center ">

         <div className="flex flex-col items-center gap-5 w-[430px] max-md:w-[80%] ">


           <AuthPageHeader head="ورود به پیزا" />

             <LoginHandler/>
             
           </div>
        </div>
      

    )
}