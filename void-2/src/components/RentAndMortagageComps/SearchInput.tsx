// components/RentAndMortagageComps/SearchInput.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-6xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="جستجو کنید ..."
          className="w-full h-[80px] rounded-[40px] border border-gray-200 bg-white px-8 pr-20 text-right text-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#6B7FFF] transition-colors duration-200 shadow-sm"
        />
        
        {/* Search Icon Button */}
        <button
          type="submit"
          className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          {/* Search Icon SVG matching the image */}
          
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
