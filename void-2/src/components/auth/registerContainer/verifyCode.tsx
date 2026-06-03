'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import VerifyInput from "@/components/auth/verifyInput"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState,useActionState, useEffect} from "react";
import Link from "next/link"

//util/helper
import { updateQueryParams } from "@/util/helper/updateQueryParams";

//util/service
import {register_Verify} from "@/util/service/authAction/action";

import { actionResult } from "@/util/service/authAction/actionResult";

import toast_errorHandling from "@/util/hooks/errorHandling";

export default function verify_Code () {
      
     const searchParams = useSearchParams();

      const tempUserId = searchParams.get("tempUserId");
       if(!tempUserId) return;
      
    const[code,setCode] = useState<string>("");
      
     const [state,formAction,pending] = useActionState(register_Verify,actionResult);
       
   useEffect(()=>{
            console.log("response",state)
             if(state?.status) toast_errorHandling(Number(state.status));
       },[state])
    

     if(state.success){
       redirect(`/register?step=registerFinal&userId=${state.data.userId}`)
     }
    
    return(
       <>

        <form action={formAction} className="flex flex-col gap-5 w-full ">
            
            
            <input type="hidden" name="tempUserId"  value={tempUserId}/>
            <input type="hidden" name="verifyCode"  value={code}/>

            <div className="flex justify-center w-full ">
              <VerifyInput length={6} onComplete={setCode} />
            </div>
                        
          <SubmitButton subLabel="ارسال کد تایید"  />


        </form>
           
        </>
    )
}