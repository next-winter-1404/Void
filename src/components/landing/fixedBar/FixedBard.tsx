'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import 'react-multi-date-picker/styles/colors/purple.css';

type TabId = 'rent' | 'buy' | 'reserve';

interface Tab {
  id: TabId;
  label: string;
}

interface Location {
  id: string;
  name: string;
}

interface SearchParams {
  locationId: string;
  numberOfPeople: string;
  checkInDate?: string;
  checkOutDate?: string;
}

const PropertySearchTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('rent');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    locationId: '',
    numberOfPeople: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const tabs: Tab[] = [
    { id: 'rent', label: 'رهن و اجاره' },
    { id: 'buy', label: 'خرید و فروش' },
    { id: 'reserve', label: 'رزرو ملک' }
  ];

  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/locations'); 
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  
  const handleSearch = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        type: activeTab,
        locationId: searchParams.locationId,
        numberOfPeople: searchParams.numberOfPeople,
      });

   
      if (activeTab === 'rent' || activeTab === 'buy') {
        if (searchParams.checkInDate) {
          params.append('checkInDate', searchParams.checkInDate);
        }
        if (searchParams.checkOutDate) {
          params.append('checkOutDate', searchParams.checkOutDate);
        }
      }

      const response = await fetch(`/api/properties/search?${params.toString()}`);
      const results = await response.json();
      
      console.log('Search results:', results);
   
      
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (activeTab === 'reserve') {
      setSearchParams(prev => ({
        ...prev,
        checkInDate: '',
        checkOutDate: ''
      }));
    }
  }, [activeTab]);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-6 z-50 max-w-7xl w-[90%] direction-rtl">

      <div className="flex gap-3 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-6 text-base font-medium transition-all duration-300 border-b-[3px] ${
              activeTab === tab.id
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-600 border-transparent hover:text-indigo-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      <div className="w-full">
        <div className="flex flex-wrap gap-4 items-end">
          
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              انتخاب مقصد
            </label>
            <select
              value={searchParams.locationId}
              onChange={(e) => setSearchParams({ ...searchParams, locationId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 transition-colors bg-white"
              disabled={loading}
            >
              <option value="">انتخاب کنید</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

       
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              تعداد نفرات
            </label>
            <input
              type="number"
              min="1"
              placeholder="وارد کنید"
              value={searchParams.numberOfPeople}
              onChange={(e) => setSearchParams({ ...searchParams, numberOfPeople: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 transition-colors"
            />
          </div>

       
          {(activeTab === 'rent' || activeTab === 'buy') && (
            <div className="flex-1 min-w-[150px] flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                تاریخ ورود
              </label>
              <div className="relative">
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={searchParams.checkInDate}
                  onChange={(date) => {
                    const dateStr = date?.format('YYYY/MM/DD') || '';
                    setSearchParams({ ...searchParams, checkInDate: dateStr });
                  }}
                  inputClass="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 transition-colors"
                  placeholder="انتخاب کنید"
                  className="purple"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                  📅
                </span>
              </div>
            </div>
          )}

       
          {(activeTab === 'rent' || activeTab === 'buy') && (
            <div className="flex-1 min-w-[150px] flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                تاریخ خروج
              </label>
              <div className="relative">
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={searchParams.checkOutDate}
                  onChange={(date) => {
                    const dateStr = date?.format('YYYY/MM/DD') || '';
                    setSearchParams({ ...searchParams, checkOutDate: dateStr });
                  }}
                  inputClass="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 transition-colors"
                  placeholder="انتخاب کنید"
                  className="purple"
                  minDate={searchParams.checkInDate}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                  📅
                </span>
              </div>
            </div>
          )}

          
          <button
            onClick={handleSearch}
            disabled={loading || !searchParams.locationId || !searchParams.numberOfPeople}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-base font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'در حال جستجو...' : 'مشاهده نتیجه'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchTabs;
