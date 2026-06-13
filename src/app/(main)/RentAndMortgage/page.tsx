

import HouseCards from '@/components/common/Cards/HouseCards';
import { handleAsyncAction } from '@/util/service/api/handleAsync';
import FilterButton from '@/components/RentAndMortagageComps/FilterButton';
import SortButtons from '@/components/RentAndMortagageComps/SortButtons';
import Pagination from '@/components/RentAndMortagageComps/Pagination';
import SearchInput from '@/components/RentAndMortagageComps/SearchInput';
import { Api } from '@/util/service/api';
import SearchModal from '@/components/common/searchBox/searchModal';

import FilterModal from "@/components/RentAndMortagageComps/filter/filterModal";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    search?:string
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
    transactionType?: string;
    propertyType?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
  }>;
}

const RentAndMortgage = async ({ searchParams }: PageProps) => {
  
  const {sort,order,search,page,limit,transactionType,propertyType,location,minPrice,maxPrice,minArea,maxArea} = await searchParams;
  

  const query = {
    search,
    sort,
    order,
    page,
    limit:6,
    transactionType,
    propertyType,
    location,
    minPrice,
    maxPrice,
    minArea,
    maxArea
  };

  // console.log('Query params:', query); 

  const api = await Api();
  const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));
  
  // console.log('API Response:', housesRes); 

  const houses = housesRes?.data?.houses || [];
  const totalCount = housesRes?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / query.limit);

  return (
    <main dir='rtl' className='flex flex-col gap-10'>

      <h2 className='font-bold text-2xl md:text-3xl'>
        رهن و اجاره آپارتمان
      </h2>

      <div className='flex flex-row max-lg:flex-wrap gap-5 border-b  border-zinc-300 items-center '>
        <div className='w-[30%] max-lg:w-[65%]'>
        <SearchModal />
        </div>
        {/* <FilterButton /> */}
        <FilterModal/>
        <SortButtons />
      </div>

      {/* <div className='md:hidden flex flex-row gap-5 border-b border-zinc-300 justify-baseline'>
        <FilterButton />
      </div> */}

      {houses.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          هیچ ملکی یافت نشد
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house: any) => (
              <HouseCards key={house.id} house={house} />
            ))}
          </div>

          <Pagination 
            // limit={query.limit}
            currentPage={Number(page)} 
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </>
      )}

    </main>
  );
};

export default RentAndMortgage;
