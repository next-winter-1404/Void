'use client'
import SubmitBt from "@/components/common/SubmitBt";
import comment_Handler from "@/util/service/commentAction/action";
import { useParams } from "next/navigation";
import { useActionState,useEffect } from "react";

import toast_errorHandling from "@/util/hooks/errorHandling";


export default function commentForm(){
    
    const {houseId} = useParams();

    const result = {success:false}
    const[state,formAction,pending] = useActionState(comment_Handler,result);

    useEffect(()=>{
         console.log("response",state)
          if(state?.success){
             toast_errorHandling(Number(state.status),"نظر ثبت شد");
            //  setTimeout(()=>window.location.reload(),1000)
          }
          
    },[state])
     


    return(
        <>
         <form action={formAction} className="w-full flex flex-col gap-2">
             <div className="w-full"><span className="font-medium text-[#586CFF] text-[18px]">نظرات کاربران</span></div>

             <input name="houseId" id="houseId" type="hidden" value={houseId} />

             <textarea
              name="content"
              id="content"
             style={{ resize: "none" }}
               placeholder="نظر خود را درباره این هتل بنویسید..."
               className="
               focus:outline-none
                 w-full
                 h-[140px]
                 rounded-[30px]
                 border border-[#efefef]
                 
                 px-6 py-3
                 placeholder:text-[#bbbbbb]
                 text-gray-700
                 shadow-[0_0_1...."/>


               <SubmitBt subLabel="ارسال نظر" />
            </form>
        </>
    )
}