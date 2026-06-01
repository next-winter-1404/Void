import { Api } from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { getUserInfo } from "@/util/service/api/token";

import SubmitUserInfo from "@/components/reservePage/submitUserInfo";
import StepBar from "@/components/reservePage/stepBar";

export default async function reservePage (props: { params: Promise<{ step: string}>,searchParams:Promise<{houseId:string}> }){

  
    const resolved = await props.params;
    const Step = resolved.step;

    const {houseId} =await props.searchParams;
    const houseID = Number(houseId);
      
   
    const user = await getUserInfo();
    const userId = user?.id;

    console.log(Step);

     const api = await Api();
    const theHouse = await handleAsyncAction(api.houseDetail.houseDetail(houseID));
    // console.log(theHouse)
    const theUser = await handleAsyncAction(api.auth.theUserInfo(userId));

    let currentStep = null;

    switch (Step){
        case "submit_Info":currentStep= <SubmitUserInfo houseDetail={theHouse.data}/>;break
        case "purchasing":currentStep=null ;break
        default : "submit_Info" ;currentStep= <SubmitUserInfo houseDetail={theHouse.data}/>
    }

    return(
        <div className=" w-full h-full ">
           <div className="w-full h-[10%] px-10">
               <StepBar currentStep={Step}/>
           </div>
           <div className="w-full h-[90%] ">
             {currentStep}
           </div>
        </div>
    )
}