
import DescriptionHome from "@/components/detailPage/describeHomeReserve/descriptionHome";
import DescribeHomeRent from "@/components/detailPage/describeHomeRent/descriptionHomeRent";
import Gallery from "@/components/detailPage/gallery";
import SameHomeSection from "@/components/detailPage/sameHomeSection/sameHome";
import ReserveForm from "@/components/detailPage/reserveForm/reserveForm";
import CommentBox from "@/components/detailPage/comment/commentBox";

import Image from "next/image";

import MapIco2 from "@/assets/ico/detailPage/Map2-ico.png"

import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { api } from "@/util/service/api";

interface SearchProps {
  params: {
    houseId: string;
  };
}
export  default async function DetailPage(props: { params: Promise<{ houseId: string }> }){

    const images = [
    '/image/detailPage/gallery/gallery-Img1.png',
    '/image/detailPage/gallery/gallery-Img2.png',
    '/image/detailPage/gallery/gallery-Img3.png',
    '/image/detailPage/gallery/gallery-Img4.png',
    '/image/detailPage/gallery/gallery-Img5.png',
    '/image/detailPage/gallery/gallery-Img6.png',
    '/image/detailPage/gallery/gallery-Img7.png',
    
  ];
  const resolved = await props.params;
  const houseID = Number(resolved.houseId);
  
   //housedetail
   const theHouse = await handleAsyncAction(api.houseDetail.houseDetail(houseID));
   const theHouseDetail = theHouse.data
   console.log("housessss",theHouse?.data);


   const transactionType = theHouse?.data?.transaction_type
   let descriptionHomeType = null;

   switch(transactionType){
     case "reservation":descriptionHomeType =<DescriptionHome   houseDetail={theHouseDetail}/>;break
     case "rental":descriptionHomeType = <DescribeHomeRent   houseDetail={theHouseDetail}/>;break
     case "mortgage" : descriptionHomeType = <DescribeHomeRent  houseDetail={theHouseDetail}/>;break
     case "direct purchase" : descriptionHomeType  = <DescribeHomeRent  houseDetail={theHouseDetail}/>;break
     default : descriptionHomeType =<DescriptionHome  houseDetail={theHouseDetail}/>
   }
    
   //sameHouse
    // const houseTag = theHouse?.data?.tags;
    const query = {
     limit : 3, 
     housetransactionType : theHouse?.data?.transactionType,
     houselocation : theHouse?.data?.location
    }

    const sameHouse = await handleAsyncAction(api.houseDetail.sameHouse(query));
    const sameHouseData = sameHouse?.data?.houses
    console.log("sameHouse",sameHouse);

   //thehouseComment
   const theHouseComment = await handleAsyncAction(api.houseDetail.houseComments(houseID));
  //  console.log("houseComment",theHouseComment)
 
    return(
        <>
          <div className="w-full  flex flex-col">

          {/*headerContent */}
          <div className="w-full h-[10%]">
            <h1 className="font-bold text-[25px]">{theHouseDetail?.title}</h1>
             <span className=" p-2 flex flex-row gap-2 text-[#595959]">
             <Image alt="map" src={MapIco2}/>{theHouseDetail?.address}
             </span>
            </div>


          {/*homeDetailContent*/}

          <div className=" w-full h-[60%]   flex flex-row">

           {/*gallery*/}
            <div dir="ltr" className=" p-3 h-full w-[45%] max-md:hidden">

             <div className="relative h-[1600px]">
               <div className="sticky top-4">
                 <Gallery images={images} />
               </div>
            </div>

            </div>

            {/*description & comment */}
            <div  className=" p-2 h-full w-[55%] max-md:w-full">
              {descriptionHomeType}

               {transactionType === "reservation" &&
                <ReserveForm price={theHouseDetail?.price} discounted_price={theHouseDetail?.discounted_price}/>
                }

               <CommentBox comments={theHouseComment?.data?.comments}/>
              
            </div>
             

          </div>

         
         {/*sameHomeSection*/}
          <div className=" w-full h-[30%] py-5">
            
            <SameHomeSection houseData={ sameHouseData}/>

          </div>

          </div>
        </>
    )
}