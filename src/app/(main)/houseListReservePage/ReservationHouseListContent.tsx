import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { Api } from "@/util/service/api";
import NeshanMap from "@/components/houseListReserve/map/neshanMap";
import ReservationHouseList from "@/components/houseListReserve/reservationHouseList/ReservationHouseList";
import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";
import { Suspense } from "react";
import Loading from "@/app/loading";

type House = {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  lat: number;
  lng: number;
  image: string;
};

interface Props {
  searchParams: Promise<{
    transactionType?: string;
    location?: string;
    sort?: string;
    order?: string;
    maxPrice?: string;
    search?: string;
    houseid?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function ReservationHouseListContent({ searchParams }: Props) {
  
  const { location, sort, order, maxPrice, search, houseid, page } = await searchParams;

  const query = {
    transactionType: "reservation",
    location,
    sort: sort ?? "last_updated",
    order: order ?? "DESC",
    maxPrice,
    limit: 4,
    page,
    search,
  };

  const api = await Api();

  
  const [houseData, houseLocation] = await Promise.all([
    handleAsyncAction(api.house.ReservationHouseList(query)),
    handleAsyncAction(api.house.houseLocation()),
  ]);

  const housess = houseData?.data?.houses || [];
  const totall: number = houseData?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totall / 3);
  const houses = housess.filter((el: any) => el.transaction_type === "reservation");

  const houseLoc = houseLocation?.data?.data || [];

  const mergedData: House[] = houses.map((hs: any, index: number) => ({
    id: hs.id,
    title: hs.title ?? "بدون عنوان",
    address: hs.address ?? "نامشخص",
    price: hs.price,
    oldPrice: hs.discounted_price,
    image: "https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg",
    lat: Number(houseLoc[index % houseLoc.length]?.lat),
    lng: Number(houseLoc[index % houseLoc.length]?.lng),
  }));

  
  const theHouseLoc = houseid
    ? (await handleAsyncAction(api.house.theHouseLocation(Number(houseid))))?.data
    : null;

  return (
    <>
      
      <div className="w-[50%]  max-xl:hidden">
        <NeshanMap
          houses={mergedData}
          loc={{ latLoc: Number(houseLoc?.[0]?.lat), lngLoc: Number(houseLoc?.[0]?.lng) }}
        />
      </div>

      
      <div className="w-[50%] max-xl:w-full flex flex-col gap-2">
        <div dir="rtl" className="w-full h-[50px] hidden xl:flex flex-row justify-start gap-2 px-4">
          <FilterModal />
          <SearchModal />
        </div>
      
     
        <div dir="ltr" className="w-full mx-auto">
          <ReservationHouseList
            page={Number(page)}
            totalcount={totall}
            totall={totalPages}
            houses={mergedData}
            loc={{ latLoc: Number(theHouseLoc?.lat), lngLoc: Number(theHouseLoc?.lng) }}
            houseData={houses}
          />
         
        </div>
        
      </div>
    </>
  );
}