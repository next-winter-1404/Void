import TitleCaption from "./titleCaptionComp";
import type { stepProps } from "./titleCaptionComp"
import Image from "next/image"

import Avatar from "@/assets/ico/avatar.png";
import AvatarUpload from "@/components/dashboard/user_info/avatarUploader";

import { uploadAvatarAction} from "@/util/service/profileAction/action";

import {Api} from "@/util/service/api"
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import {getUserInfo} from "@/util/service/api/token"

export default async function profileAvatar ({title,caption}:stepProps) {

    const api = await Api();

     const user = await getUserInfo();
    
    const userInfo = await handleAsyncAction(api.profile.userInfo(user?.id));
  // console.log(userInfo)
  
    return(
        <div  className="w-[60%] max-lg:w-full h-full flex flex-row max-lg:flex-wrap items-center justify-between ">
          

          <div className="flex flex-col items-top min-lg:h-[200px] w-[300px]">
             <TitleCaption title={title} caption={caption}/>
          </div>
        
        <div className="mx-auto">
         <AvatarUpload
          initialAvatar={userInfo?.data?.user.profilePicture}
          uploadAction={uploadAvatarAction}
        />
        </div>
        </div>
    )
}