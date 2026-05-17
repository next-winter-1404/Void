'use client'
import HouseCard from "@/components/common/Cards/houseCard/houseCard";
import type { houseCardProps } from "@/types/houseCard-type/houseCard-Type";
import { useEffect,useState } from "react";

import PaginationPage from "@/components/common/paginationPage/paginationPage";




interface HouseDataProps {
     houseData:houseCardProps[]
}

export default function ResHouse_List ({houseData}:HouseDataProps) {

  // useEffect(()=>{
  //   console.log("house",houseData);
  // },[houseData])
    
  
  
  const [currentItems,setCurrentItems] = useState<any[]>([]);
 
  const houses = Array.isArray(houseData) ? houseData : [];

    return(
        <div dir="rtl" className="w-full h-[600px] flex flex-row flex-wrap gap-3 justify-center overflow-y-scroll">
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

          <PaginationPage productInArray={houses} itemsPerPage={10} setCurrentItems={setCurrentItems}/>
          
        </div>
    )
}