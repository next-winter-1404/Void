'use client'

//components
import SubmitButton from "@/components/common/SubmitBt";
import VerifyInput from "@/components/auth/verifyInput"

import { redirect, useRouter,useSearchParams } from "next/navigation";
import {FormEvent,useState,useActionState, useEffect} from "react"

//util/helper
import { updateQueryParams } from "@/util/helper/updateQueryParams";

//util/service
import {registerVerifyHandler} from "@/util/service/authAction/action"
//util/service(type)
import type { exportResultF } from "@/util/service/authAction/action";

export default function step1 () {
  
       const router = useRouter();
      const searchParams = useSearchParams();

      const[code,setCode] = useState<string>("");
      
     const result:exportResultF = {success:true,result:"",errors:{verifyCode:""}};
     const [state,formAction,pending] = useActionState(registerVerifyHandler,result);
       
    
      // console.log(state);
  
    //   if(state.success){
         
    //   const nextUrl = updateQueryParams(
    //       searchParams,      
    //       { step: "3" }      
    //     );
    
    //     router.push(nextUrl);
    //  }
   
     

     
    
    return(
       <>

        <form action={formAction} className="flex flex-wrap w-full gap-5">
            
            <input name="verifyCode" type="text" value={code} onChange={(e)=>e.target.value} className="absolute hidden"/>

            <div className="flex justify-center w-full ">
              <VerifyInput length={5} onComplete={setCode} />
            </div>
                        
          <SubmitButton subLabel="ارسال کد تایید"  />

        </form>
           
        </>
    )
}