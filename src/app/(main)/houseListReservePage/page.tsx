import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";
import NeshanMap from "@/components/houseListReserve/map/neshanMap";
import ReservationHouseList from "@/components/houseListReserve/reservationHouseList/ReservationHouseList";
import ReservationHouseListContent from "./ReservationHouseListContent";
import { Suspense } from "react";
import Loading from "@/app/loading";

interface HouseSearchParams {
  transactionType?: string;
  location?: string;
  sort?: string;
  order?: string;
  maxPrice?: string;
  search?: string;
  houseid?: string;
  page?: string;
  limit?: string;
}

interface FilterParams {
  searchParams: Promise<HouseSearchParams>;
}

export default async function HouseListReservePage({ searchParams }: FilterParams) {
  return (
    <div className="w-full flex flex-row max-xl:flex-col">

      {/* filters — renders instantly */}
      <div dir="rtl" className="w-full h-[50px] flex flex-row justify-start gap-2 px-4 xl:hidden">
        <FilterModal />
        <SearchModal />
      </div>
 
      <Suspense fallback={<Loading />}>
        <ReservationHouseListContent searchParams={searchParams} />
      </Suspense>

    </div>
  );
}