import { Api } from '@/util/service/api';
import { handleAsyncAction } from '@/util/service/api/handleAsync';
import HouseCards from '@/components/common/Cards/HouseCards';
import Pagination from '@/components/RentAndMortagageComps/Pagination';

interface Props {
  searchParams:Promise<{ [key: string]: string | undefined }>;
}

export default async function HouseList({ searchParams }: Props) {
    const params = await searchParams;
  const query = {
    search: params.search,
    sort: params.sort,
    order: params.order,
    page: params.page,
    limit: 6,
    transactionType: params.transactionType,
    propertyType: params.propertyType,
    location: params.location,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    minArea: params.minArea,
    maxArea: params.maxArea,
  };

  const api = await Api();
  const housesRes = await handleAsyncAction(api.houseListmortRent.mortgateRentHouse(query));

  const houses = housesRes?.data?.houses || [];
  const totalCount = housesRes?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / query.limit);

  if (houses.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        هیچ ملکی یافت نشد
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house: any) => (
          <HouseCards key={house.id} house={house} />
        ))}
      </div>

      <Pagination
        currentPage={Number(params.page)}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}