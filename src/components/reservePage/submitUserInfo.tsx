import HouseReserveCard from "../common/Cards/houseReserveCard/houseReserveCard"
import SubmitForm from "@/components/reservePage/submitForm";
import type { houseCardProps } from '@/types/houseCardType/houseCard-Type';
import { getReserveDate } from "@/util/hooks/cookieStorage";


export  default async function submitUser_info ({
  houseDetail
 }:any) {

    const reserveDate = await getReserveDate();
   

    return(
        <div className="w-full h-full flex flex-row  max-lg:flex-col max-lg:items-center">
             <div className="w-[40%] max-lg:w-full h-full">
               <HouseReserveCard
                     
                     key={houseDetail?.id}
                     id={houseDetail?.id}
                     title={houseDetail?.title}
                     address={houseDetail?.address}
                     photos={houseDetail?.photos}
                     rate={houseDetail?.rate}
                     discounted_price={houseDetail?.discounted_price}
                     price={houseDetail?.price}
                     tags={houseDetail?.tags}
                     last_updated={houseDetail?.last_updated}
                     capacity={houseDetail?.capacity}
                     location={houseDetail?.location}
                     categories={houseDetail?.categories}
                     bathrooms={houseDetail?.bathrooms}
                     parking={houseDetail?.parking}
                     room={houseDetail?.room}
                     yard_type={houseDetail?.yard_type}
                     num_comments={houseDetail?.num_comments}
                     discount_id={houseDetail?.discount_id}
                     transaction_type={houseDetail?.transaction_type}
                     sellerId={houseDetail?.sellerId}
                     sellerName={houseDetail?.sellerName}
                     caption={houseDetail?.caption}
                     bookings={houseDetail?.bookings}
                     favoriteId={houseDetail?.favoriteId}
                     isFavorite={houseDetail?.isFavorite}
                     checkInDate={reserveDate?.checkInDate}
                     checkOutDate={reserveDate?.checkOutDate}
                    />
             </div>
             
              <div className="w-[50%] h-[full] max-lg:w-[80%] flex flex-col items-center">
                  <SubmitForm houseId={houseDetail?.id} checkInDate={reserveDate?.checkInDate} checkOutDate={reserveDate?.checkOutDate} />
             </div>    
        </div>
    )
}