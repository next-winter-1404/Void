'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import GoogleBt from "@/components/auth/googleBt";
import Input from "@/components/common/inputFeild/input"


import Link from "next/link"
import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useActionState,useState,useEffect} from "react"

//util
import { updateQueryParams } from "@/util/helper/updateQueryParams";

//util/service
import { forgetPassHandler} from "@/util/service/authAction/action";
//util/service(type)
import type { exportResultF } from "@/util/service/authAction/action";


export default function step1 () {

     const [email,setEmail] = useState<string>("");

    //  const router = useRouter();
    // const searchParams = useSearchParams();
     
     const result:exportResultF = {success:true,result:""};
     const [state,formAction,pending] = useActionState(forgetPassHandler,result);


  console.log(state)
    
    
  

    return(
       <>
        <form action={formAction}   className="flex flex-col gap-5 w-full ">

       <Input setEmail={setEmail} email={email}  type="email" name="email" placeHolder="ایمیل خود را وارد کنید:"
         label="ایمیل" icon="email" errors={state?.errors?.email} />

       
          <SubmitButton subLabel="ارسال کد تایید"   />

     
        </form>
           
        </>
    )
}