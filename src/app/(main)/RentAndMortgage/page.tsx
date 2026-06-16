import { Suspense } from 'react';
import Loading from '@/app/loading';
import HouseList from './houseList';
import FilterModal from "@/components/RentAndMortagageComps/filter/filterModal";
import SortButtons from '@/components/RentAndMortagageComps/SortButtons';
import SearchModal from '@/components/common/searchBox/searchModal';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const RentAndMortgage = async ({ searchParams }: PageProps) => {
 

  return (
    <main dir='rtl' className='flex flex-col gap-10'>
      <h2 className='font-bold text-2xl md:text-3xl'>
        رهن و اجاره آپارتمان
      </h2>

      <div className='flex flex-row max-lg:flex-wrap gap-5 border-b border-zinc-300 items-center'>
        <div className='w-[30%] max-lg:w-[65%]'>
          <SearchModal />
        </div>
        <FilterModal />
        <SortButtons />
      </div>

      
      <Suspense fallback={<Loading />}>
        <HouseList searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default RentAndMortgage;