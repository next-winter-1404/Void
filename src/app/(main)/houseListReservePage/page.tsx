
// import FilterButton from "@/components/common/button";
import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { Api } from "@/util/service/api";


import NeshanMap from "@/components/houseListReserve/map/neshanMap";



import ReservationHouseList from "@/components/houseListReserve/reservationHouseList/ReservationHouseList";

interface HouseSearchParams {
  transactionType?: string;
  location?: string;
  sort?: string;
  order?: string;
  maxPrice?:string
  search?:string;
  houseid?:string
   page:string;
   limit:string
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

  const { transactionType, location, sort, order,maxPrice,search,houseid,page,limit} = resolvedSearchParams;

   const query = {
    transactionType :"reservation",
    location,
    sort:sort ? sort : "last_updated",
    order:order ? order : "DESC",
    maxPrice ,
    limit:4,
    page,
    search
  };
  
  const api = await Api();

  //houselist
  const houseData = await handleAsyncAction(api.house.ReservationHouseList(query));
   const housess = houseData?.data?.houses || [];
   const totall:number = houseData?.data?.totalCount ;
  const  totalll = Math.ceil(totall/3);
  console.log("Totallllll",totalll);
  console.log("totalcount",totall);
  console.log(limit);
   const houses = housess.filter( (el:any) => el.transaction_type === "reservation");

   console.log("houseData",houseData);
  //  console.log(query);

   //houselocationList
   const houseLocation = await handleAsyncAction(api.house.houseLocation());
     const houseLoc = houseLocation?.data?.data || [];

    const houseDataMap = Object.fromEntries(
      houseLoc.map((loc:any) => [loc.id, loc])
    ) 


       const mergedData:House[] = houses.map((hs:any, index: number) => ({
         id: hs.id,
         title: hs.title ? hs.title : "بدون عنوان",
         address: hs.address ? hs.title : "نامشخص",
         price:hs.price,
         oldPrice:hs.discounted_price,
         image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg",
         lat: Number(houseLoc[index % houseLoc.length]?.lat),
         lng: Number(houseLoc[index % houseLoc.length]?.lng)
       }))

     

 const theHouseLoc = await handleAsyncAction(api.house.theHouseLocation(Number(houseid)));
 const theHouse_loc = theHouseLoc?.data
  
 
    return(
         <div  className="w-full flex flex-row max-xl:flex-col">

             {/*map*/}
           <div className="w-[50%] max-xl:hidden">
            
              <NeshanMap houses={mergedData} loc={{latLoc:Number(houseLoc?.lat),lngLoc:Number(houseLoc?.lng)}}/>
               
            </div>

          <div  className=" w-[50%] max-xl:w-full flex flex-col gap-2">
             {/*searchBox & filter*/}
             <div dir="rtl" className=" w-full h-[50px] flex flex-row  justify-start gap-2 px-4">
               <FilterModal/>
               <SearchModal/>
             </div>

             {/*houseList*/}
             <div dir="ltr"  className=" w-full  mx-auto">
                <ReservationHouseList page={Number(page)} totalcount={totall} totall={ totalll} houses={mergedData}  loc={{latLoc:Number(theHouse_loc?.lat),lngLoc:Number(theHouse_loc?.lng)}} houseData={houses}/>

             </div>

              

          </div>


           
          
         </div>
    )
}