// components/RentAndMortagageComps/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toPersianFormat } from '@/util/helper/persianFormat';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const Pagination = ({ currentPage, totalPages, totalCount }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    params.set('limit', "3");
    
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 py-8" dir='ltr'>
      

      <div className="flex items-center gap-3">
        
        {/* دکمه قبلی */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            currentPage === 1
              ? 'border-gray-300 text-gray-300 cursor-not-allowed bg-white'
              : 'border-[#6B7FFF] text-[#6B7FFF] hover:bg-[#6B7FFF] hover:text-white cursor-pointer bg-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* شماره صفحات */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <div
              key={`ellipsis-${index}`}
              className="w-8 h-8 rounded-full border-2 border-[#6B7FFF] bg-white flex items-center justify-center text-gray-700 font-medium text-lg"
            >
              ...
            </div>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`w-8 h-8 rounded-full border-2 border-[#6B7FFF] bg-white flex items-center justify-center font-medium text-lg transition-all duration-200 ${
                currentPage === page
                  ? 'text-gray-700'
                  : 'text-gray-700 hover:bg-[#6B7FFF] hover:text-white cursor-pointer'
              }`}
            >
              {toPersianFormat(page)}
            </button>
          )
        ))}

        {/* دکمه بعدی */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            currentPage === totalPages
              ? 'border-gray-300 text-gray-300 cursor-not-allowed bg-white'
              : 'border-[#6B7FFF] text-[#6B7FFF] hover:bg-[#6B7FFF] hover:text-white cursor-pointer bg-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default Pagination;
