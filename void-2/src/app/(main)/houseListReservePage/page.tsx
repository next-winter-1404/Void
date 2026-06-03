import FilterButton from "@/components/common/button";
import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { Api } from "@/util/service/api";


import NeshanMap from "@/components/houseListReserve/map/neshanMap";


import ReservationHouseList from "@/components/houseListReserve/reservationHouseList/ReservationHouseList";

interface HouseSearchParams {
  propertyType?: string;
  location?: string;
  sort?: string;
  order?: string;
  maxPrice?:string
  search?:string;
  houseid?:string
};

interface filterParams {
  searchParams:HouseSearchParams
}

 type House = {
   id: number;
   title: string;
   price: number;
   oldPrice:number,
   lat: number;
   lng: number;
   image: string;
};



export default async function houseList_reservePage ({searchParams}:filterParams) {

   const resolvedSearchParams = await searchParams;

  const { propertyType, location, sort, order,maxPrice,search,houseid } = resolvedSearchParams;

   const query = {
    propertyType,
    location,
    sort:sort ? sort : "last_updated",
    order:order ? order : "DESC",
    maxPrice ,
    limit:100,
    search
  };
  
  const api = await Api();

  //houselist
  const houseData = await handleAsyncAction(api.house.ReservationHouseList(query));
   const housess = houseData?.data?.houses || [];
   const houses = housess.filter( (el:any) => el.transaction_type === "reservation");

   //houselocationList
   const houseLocation = await handleAsyncAction(api.house.houseLocation());
     const houseLoc = houseLocation?.data?.data || [];

   const houseDataMap = Object.fromEntries(
      houseLoc.map((loc:any) => [loc.id, loc])
   )

const mergedData:House[] = houses.map((hs:any) => ({
  id: hs.id,
  title: hs.title ? hs.title : "بدون عنوان",
  address: hs.address ? hs.title : "نامشخص",
  price:hs.price,
  oldPrice:hs.discounted_price,
  image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg",
  lat: Number(houseDataMap[hs.id]?.lat),
  lng: Number(houseDataMap[hs.id]?.lng)
}))

//  console.log("mergedData",mergedData);
//  console.log("houseData",houseData);
//  console.log("location",houseLocation);

 const theHouseLoc = await handleAsyncAction(api.house.theHouseLocation(Number(houseid)));
 const theHouse_loc = theHouseLoc?.data
  
  console.log("ewe",theHouse_loc);
  

  //  const houseDetailLcation = [
  //      {id:1,oldPrice:2000000,name:"ویلا مرصاد",price:1000000,lat:35.6892,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"},
  //      {id:2,oldPrice:2000000,name:"ویلا تقی",address:"تهران،زعفرانیه",price:1000000,lat:35.6991,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"},
  //      {id:3,oldPrice:2000000,name:"ویلا نقی",address:"تهران،زعفرانیه",price:1000000,lat:35.6,lng:51.389,image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"}
  //  ]

  //  console.log("hhhhhooh",houseL);
    return(
         <div  className="w-full h-full flex flex-row">

             {/*map*/}
           <div className="w-[50%] max-xl:hidden">
            
              <NeshanMap houses={mergedData} loc={{latLoc:Number(theHouse_loc?.lat),lngLoc:Number(theHouse_loc?.lng)}}/>
               
            </div>

          <div  className=" w-[50%] max-xl:w-[100%]  h-full flex flex-col gap-2">
             {/*searchBox & filter*/}
             <div dir="rtl" className=" w-full h-[50px] flex flex-row  justify-start gap-2 px-4">
               <FilterModal/>
               <SearchModal/>
             </div>

             {/*houseList*/}
             <div dir="ltr"  className=" w-full mx-auto">
                <ReservationHouseList houses={mergedData} loc={{latLoc:Number(theHouse_loc?.lat),lngLoc:Number(theHouse_loc?.lng)}} houseData={houses}/>

             </div>

              

          </div>


           
          
         </div>
    )
}