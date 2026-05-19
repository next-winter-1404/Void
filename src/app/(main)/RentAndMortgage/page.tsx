
import React from 'react'
import HouseCards from '@/components/common/Cards/HouseCards';
import { handleAsyncAction } from '@/util/service/api/handleAsync';
import FilterButton from '@/components/RentAndMortagageComps/FilterButton';

import SortButtons from '@/components/RentAndMortagageComps/SortButtons';
import { Api } from '@/util/service/api';

const RentAndMortgage = async () => {

  const query = {
    sort: "price",
    order: "DESC",
    page: 1,
    limit: 10
  }

  const api = await Api();

  const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));

  // console.log(JSON.stringify(housesRes, null, 2));

  const houses = housesRes?.data?.houses || [];

  return (
    <main dir='rtl' className='flex flex-col gap-10'>

      <h2 className='font-bold text-2xl md:text-3xl'>
        رهن و اجاره آپارتمان
      </h2>

      <div className='flex flex-row gap-5 border-b border-zinc-300 p-5'>

            <input
              type="text"
              placeholder='جستجو کنید...'
              className='border border-zinc-300 text-xl outline-none focus:ring-0 rounded-xl px-4 py-2'
            />

            <FilterButton />
            <SortButtons />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {houses.map((house:any) => (
          <HouseCards
            key={house.id}
            house={house}
          />
        ))}

      </div>

    </main>
  );
};
export default RentAndMortgage;