import PIZA from "../../../../../public/auth/PIZA.png";
import Image from "next/image";
import Link from "next/link";

interface stepProps {
    step:string
}


export default function authHeader ({step}:stepProps) {

let title = "ثبت نام در پیزا";

    return (
         <header className="my-2 border w-full">
             <h1 className=" py-2"><Image alt="logo" src={PIZA} /></h1>
             <h1 className="font-bold/700 text-[36px] mb-2">ثبت نام در پیزا</h1>
            
             <p className=" text-[14px] font-medium text-[#767676]">
                {/* {text} */}
                <br/>
                {step === "2" &&
                <Link href="/" className="underline text-[blue]">برای تغییر جیمیل</Link>
                }
                 
              </p>
              
           </header>
    )
}