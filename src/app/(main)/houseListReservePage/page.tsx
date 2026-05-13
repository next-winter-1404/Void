import FilterButton from "@/components/common/button";
import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { api } from "@/util/service/api";

import NeshanMap from "@/components/houseListReserve/map/neshanMap";


import ReservationHouseList from "@/components/houseListReserve/reservationHouseList/ReservationHouseList";

interface HouseSearchParams {
  propertyType?: string;
  location?: string;
  sort?: string;
  order?: string;
  maxPrice?:string
};

interface filterParams {
  searchParams:HouseSearchParams
}

import type { houseCardProps } from "@/types/houseCard-type/houseCard-Type";

export default async function houseList_reservePage ({searchParams}:filterParams) {

   const resolvedSearchParams = await searchParams;

  const { propertyType, location, sort, order,maxPrice } = resolvedSearchParams;

   const query = {
    propertyType,
    location,
    sort:sort ? sort : "last_updated",
    order:order ? order : "DESC",
    maxPrice,
    limit:8
  };
  
  

  const houseData = await handleAsyncAction(api.house.ReservationHouseList(query));
   const houses = houseData?.data?.houses;

   const houseLocation = await handleAsyncAction(api.house.houseLocation());

   const houseL = houseLocation?.data?.data;
  //  console.log("hhhhhooh",houseL);
    return(
         <div dir="ltr"  className="w-full h-full flex flex-row">

             {/*map*/}
           <div className="border  w-[50%] max-xl:hidden  h-full rounded-[16px]  ">
            
             {houseL.map((h:any, i:any) => (
             <NeshanMap key={i} lat={Number(h.lat)} lng={Number(h.lng)} zoom={14} />
              ))}
             
               
            </div>

          <div dir="rtl" className=" w-[50%] max-xl:w-[100%]  h-full flex flex-col gap-2">
             {/*searchBox & filter*/}
             <div className=" w-full h-[50px] flex flex-row  justify-start gap-2 px-4">
               <FilterModal/>
               <SearchModal/>
             </div>

             {/*houseList*/}
             <div className=" w-full mx-auto">
                <ReservationHouseList houseData={houses}/>
             </div>


          </div>


           
          
         </div>
    )
}