'use client'
import HouseCard from "@/components/common/Cards/houseCard/houseCard";
import type { houseCardProps } from "@/types/HouseCardType/houseCard-Type";
import { useEffect,useState } from "react";

import PaginationPage from "@/components/common/paginationPage/paginationPage";
import NeshanMap from "../map/neshanMap";

type House = {
  id?: string | number;
  name?:string,
  address?:string,
  image?:string
  oldPrice?:number,
  price?:number
  lat?: number;
  lng?: number;
  location?: {
    lat?: number;
    lng?: number;
  };
};


interface HouseDataProps {
     houseData:houseCardProps[]
     houses?: House[];
  loc?:{
    latLoc:number,
    lngLoc:number
  }
}

export default function ResHouse_List ({houseData,loc,houses}:HouseDataProps) {

  // useEffect(()=>{
  //   console.log("house",houseData);
  // },[houseData])
    
  
  
  const [currentItems,setCurrentItems] = useState<any[]>([]);
  const [showMap,setShowMap] = useState<boolean>(false);
 
  const housess = Array.isArray(houseData) ? houseData : [];

    return(

       

        <div dir="rtl" className="w-full h-[600px] flex flex-row flex-wrap gap-3 justify-center min-xl:overflow-y-scroll relative">
         
          <button onClick={()=>setShowMap(!showMap) }
           className="px-5 py-2 text-[20px] bg-[black] text-[white] rounded-[20px] hidden max-xl:block 
             fixed right-[50px] bottom-[50px] z-[10] ">نقشه</button>

          {currentItems.length > 0 ? currentItems.map((prop)=>(
            <HouseCard
              key={prop.id}
              id={prop.id}
              title={prop.title}
              address={prop.address}
              photos={prop.photos}
              rate={prop.rate}
              discounted_price={prop.discounted_price}
              price={prop.price}
              tags={prop.tags}
              last_updated={prop.last_updated}
              capacity={prop.capacity}
              location={prop.location}
              categories={prop.categories}
              bathrooms={prop.bathrooms}
              parking={prop.parking}
              room={prop.room}
              yard_type={prop.yard_type}
              num_comments={prop.num_comments}
              discount_id={prop.discount_id}
              transaction_type={prop.transaction_type}
              sellerId={prop.sellerId}
              sellerName={prop.sellerName}
              caption={prop.caption}
              bookings={prop.bookings}
              favoriteId={prop.favoriteId}
              isFavorite={prop.isFavorite}
             />
          )):
            <div className="w-full h-[500px] text-[20px] flex flex-col items-center">
               <h1 className="font-semibold m-auto">محصولی یافت نشد</h1>
            </div> 
          }
          
          <div className={`w-[80%] bottom-[0] right-[10%]   ${showMap ? "h-[500px] fixed" : " h-[0] hidden"}`}>
             <NeshanMap houses={houses} loc={loc}/>
          </div>

          <PaginationPage productInArray={housess} itemsPerPage={10} setCurrentItems={setCurrentItems}/>
          
        </div>
    )
}