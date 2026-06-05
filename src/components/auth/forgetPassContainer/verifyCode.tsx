'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import VerifyInput from "@/components/auth/verifyInput"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState,useActionState, useEffect} from "react"

//util/helper
import { updateQueryParams } from "@/util/helper/updateQueryParams";

//util/service
import {forgetPass_Verify} from "@/util/service/authAction/action"
//util/service(type)
import { actionResult } from "@/util/service/authAction/actionResult";
import { keyof } from "zod";

import toast_errorHandling from "@/util/hooks/errorHandling";

export default function verifyCode() {
  const searchParams = useSearchParams();
  
        const email = searchParams.get("email");
         if(!email) return;
        
      const[code,setCode] = useState<string>("");
        
       const [state,formAction,pending] = useActionState(forgetPass_Verify,actionResult);
         
      useEffect(()=>{
               console.log(" response",state)
<<<<<<< HEAD
                if(state?.status) toast_errorHandling(Number(state.status));
=======
                if(state?.status) toast_errorHandling(Number(state.status),"کد تایید شد😊");
>>>>>>> mersad
          },[state]) 
      
  
       if(state.success){
         redirect(`/forgetPassword?step=resetPass&email=${email}`)
       }
       
    
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full ">
            
             <input type="hidden" name="email"  value={email}/>
             <input type="hidden" name="verifyCode"  value={code}/>

            <div className="flex justify-center w-full ">
              <VerifyInput length={6} onComplete={setCode} />
            </div>
                        
          <SubmitButton subLabel="تایید کد"  />

        </form>
           
        </>
    )
}