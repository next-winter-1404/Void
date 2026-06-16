
import type { stepProps } from "@/components/dashboard/user_info/titleCaptionComp"

import {Api} from "@/util/service/api";

import ProfileAvatar from "@/components/dashboard/user_info/profileAvatar";
import UserInfo from "@/components/dashboard/user_info/userInfo"
import Security from "@/components/dashboard/user_info/security";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
 
import { getUserInfo } from "@/util/service/api/token";

export default async function user_info () {

     const text:stepProps[] = [
      {title:"عکس نمایه شما",caption:"میتوانید عکس نمایه خود را تغییر دهید"},
      {title:"اطلاعات فردی",caption:"میتوانید اطلاعات فردی خود را تغییر دهید"},
      {title:"امنیت",caption:"میتوانید در این بخش رمز خود را تغییر دهید"},
    ]
    const api = await Api();
     const user = await getUserInfo();
    const user_Info = await handleAsyncAction(api.profile.userInfo(user?.id));
     const userEmail = user_Info?.data?.user?.email;
     const userPhone = user_Info?.data?.user?.phoneNumber;

    return(
        <>
         <div className="  w-full  flex flex-col p-3  rounded-[16px]">
            <div className="flex flex-row w-full border-b border-[#88888842] py-2">
              <ProfileAvatar title={text[0].title} caption={text[0].caption} />
            </div>
            <div className="flex flex-row w-full border-b border-[#88888842] py-2">
              <UserInfo title={text[1].title} caption={text[1].caption} inputValue={{email:userEmail,phone:userPhone,address:""}}/>
            </div>
            <div className="flex flex-row w-full  py-2 ">
               <Security title={text[2].title} caption={text[2].caption} />
            </div>
         </div>
        </>
    )
}