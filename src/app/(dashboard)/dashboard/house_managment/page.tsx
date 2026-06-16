
import HouseTable from "@/components/dashboard/house_managment/house_list/houseTable";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { Api } from "@/util/service/api";

interface HouseSearchParams {
  transaction_type?: string;
  page?:string
  sort?: string;
  order?: string;
  minPrice?:string;
  maxPrice?:string
  search?:string;
  houseid?:string
};

interface filterParams {
  searchParams:HouseSearchParams
}


export default async function DashboardBuyyer({searchParams}:filterParams) {

  const resolvedSearchParams = await searchParams;
  
    const { transaction_type,sort, order,maxPrice,minPrice,page,search,houseid } = resolvedSearchParams;
  
     const query = {
      transaction_type,
      sort:sort ? sort : "last_updated",
      order:order ? order : "DESC",
      maxPrice,
      minPrice,
      page:1,
      limit:6,
      search
    };
    
    const api = await Api();
    const houseListSeller = await handleAsyncAction(api.HouseManageApi.houseListSeller(query));
    const houseSeller = houseListSeller?.data?.houses; 
    const totalHouses =  Number(houseListSeller?.data?.totalCount);


const bookings = [
  { id: 1, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 2, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 3, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 5, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 6, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
];

  return (
    <div className="flex flex-col">
        
    <HouseTable houseSeller={houseSeller} totalHouses={totalHouses} />

    </div>
  );
}