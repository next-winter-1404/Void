'use client'

import { useState } from 'react';
import FilterModal from './FilterModal';
import { dropDownItems } from "../houseListReserve/filter/dropDownMenu";

interface FilterButtonProps {
  locations?: dropDownItems[];
}

export default function FilterButton({ locations = [] }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white  -mt-6 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 whitespace-nowrap"
      >
         فیلتر ها
      </button>

      <FilterModal 
        locations={locations}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
