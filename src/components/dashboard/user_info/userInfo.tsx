
import SubmitBt from "@/components/common/SubmitBt"
import TitleCaption, { stepProps } from "./titleCaptionComp"

import Input from "@/components/common/inputFeild/input";

export default function userInfo ({title,caption}:stepProps) {

    return(
        <form className="w-[80%] flex flex-row justify-between mt-2 ">

           <div className="flex flex-col gap-5">
            
            <TitleCaption title={title} caption={caption} />
            <div className="flex flex-row items-center gap-5">
            <SubmitBt subLabel="انصراف"/>
            <SubmitBt subLabel="اعمال تغییرات"/>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-[50%]">
             <Input name="firstName" id="firtName" type="text" placeHolder="مرصاد" 
               label="نام:"/>

              <Input name="lastName" id="lastName" type="text" placeHolder="مسیبی" 
               label="نام و نام خانوادگی"/> 

               <Input name="email" id="email" type="email" placeHolder="example@gmail.com" 
               label="جیمیل:"/>

                <Input name="phoneNumber" id="phoneNumber" type="text" placeHolder="09112223333" 
               label="شماره همراه:"/>
          </div>

          
        </form>
    )
}