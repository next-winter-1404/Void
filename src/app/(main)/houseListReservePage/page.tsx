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
  search?:string
};

interface filterParams {
  searchParams:HouseSearchParams
}

import type { houseCardProps } from "@/types/houseCard-type/houseCard-Type";


export default async function houseList_reservePage ({searchParams}:filterParams) {

   const resolvedSearchParams = await searchParams;

  const { propertyType, location, sort, order,maxPrice,search } = resolvedSearchParams;

   const query = {
    propertyType,
    location,
    sort:sort ? sort : "last_updated",
    order:order ? order : "DESC",
    maxPrice ,
    limit:8,
    search
  };
  
  

  const houseData = await handleAsyncAction(api.house.ReservationHouseList(query));
   const houses = houseData?.data?.houses;

   const houseLocation = await handleAsyncAction(api.house.houseLocation());

   const houseL = houseLocation?.data?.data;

   type House = {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
  image: string;
};

   const houseDetailLcation = [
       {id:1,oldPrice:2000000,name:"ویلا مرصاد",price:1000000,lat:35.6892,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"},
       {id:2,oldPrice:2000000,name:"ویلا تقی",address:"تهران،زعفرانیه",price:1000000,lat:35.6991,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"},
       {id:3,oldPrice:2000000,name:"ویلا نقی",address:"تهران،زعفرانیه",price:1000000,lat:35.6,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"}
   ]
  //  console.log("hhhhhooh",houseL);
    return(
         <div  className="w-full h-full flex flex-row">

             {/*map*/}
           <div className="w-[50%] max-xl:hidden">
            
              <NeshanMap houses={houseDetailLcation}/>
               
            </div>

          <div  className=" w-[50%] max-xl:w-[100%]  h-full flex flex-col gap-2">
             {/*searchBox & filter*/}
             <div dir="rtl" className=" w-full h-[50px] flex flex-row  justify-start gap-2 px-4">
               <FilterModal/>
               <SearchModal/>
             </div>

             {/*houseList*/}
             <div dir="ltr"  className=" w-full mx-auto">
                <ReservationHouseList houseData={houses}/>
             </div>


          </div>


           
          
         </div>
    )
}