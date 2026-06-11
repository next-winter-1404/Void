// app/.../page.tsx
import React from 'react'
import HouseCards from '@/components/common/Cards/HouseCards';
import { handleAsyncAction } from '@/util/service/api/handleAsync';
import FilterButton from '@/components/RentAndMortagageComps/FilterButton';
import SortButtons from '@/components/RentAndMortagageComps/SortButtons';
import Pagination from '@/components/RentAndMortagageComps/Pagination';
import SearchInput from '@/components/RentAndMortagageComps/SearchInput';
import { Api } from '@/util/service/api';
import SearchModal from '@/components/common/searchBox/searchModal';

// این خط مهمه - صفحه رو dynamic می‌کنه
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
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
  
  // در Next.js 15، searchParams یک Promise هست
  const params = await searchParams;
  
  // تبدیل searchParams به query object
  const query = {
    sort: params.sort || "price",
    order: params.order || "DESC",
    page: parseInt(params.page || "1"),
    limit: parseInt(params.limit || "6"),
    ...(params.transactionType && { transactionType: "reservation" }),
    // ...(params.propertyType && { propertyType: params.propertyType }),
    ...(params.location && { location: params.location }),
    ...(params.minPrice && { minPrice: params.minPrice }),
    ...(params.maxPrice && { maxPrice: params.maxPrice }),
    ...(params.minArea && { minArea: params.minArea }),
    ...(params.maxArea && { maxArea: params.maxArea }),
  };

  console.log('Query params:', query); // برای debug

  const api = await Api();
  const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));
  
  console.log('API Response:', housesRes); // برای debug

  const houses = housesRes?.data?.houses || [];
  const totalCount = housesRes?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / query.limit);

  return (
    <main dir='rtl' className='flex flex-col gap-10'>

      <h2 className='font-bold text-2xl md:text-3xl'>
        رهن و اجاره آپارتمان
      </h2>

      <div className='hidden md:flex flex-row gap-5 border-b border-zinc-300 justify-center'>
        <SearchModal />
        <FilterButton />
        <SortButtons />
      </div>

      <div className='md:hidden flex flex-row gap-5 border-b border-zinc-300 justify-baseline'>
        <FilterButton />
      </div>

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
            currentPage={query.page} 
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </>
      )}

    </main>
  );
};

export default RentAndMortgage;
