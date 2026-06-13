"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import {useTheme} from "next-themes"
interface SearchFilters {
  location: string;
  guests: string;
  checkIn: DateObject | null;
  checkOut: DateObject | null;
  minArea: string;
  maxArea: string;
  dealType: string;
}

function FieldWrapper({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-row max-lg:flex-col  items-center justify-center gap-2">
      <span className="text-[13px] max-lg:text-[10px] font-medium  whitespace-nowrap">
        {label}
      </span>
      {children}
    </div>
  );
}

const tabs = ["رزرو ملک", "خرید و فروش", "رهن و اجاره"];

const tabConfig: Record<string, { path: string; transactionType?: string }> = {
  "رزرو ملک": { path: "/houseListReservePage" },
  "خرید و فروش": { path: "/RentAndMortgage", transactionType: "direct_purchase" },
  "رهن و اجاره": { path: "/RentAndMortgage", transactionType: "rent" },
};

const dealTypeOptions = ["اجاره", "رهن"];

export default function SearchBar() {
  const router = useRouter();

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    guests: "",
    checkIn: null,
    checkOut: null,
    minArea: "",
    maxArea: "",
    dealType: "",
  });

  const [showLocation, setShowLocation] = useState(false);
  const [showDealType, setShowDealType] = useState(false);
  const [activeTab, setActiveTab] = useState("رزرو ملک");

  const locations = ["تهران", "مازندران", "ساری", "اصفهان", "شیراز"];

  const isReservation = activeTab === "رزرو ملک";

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);

    if (isReservation) {
    //   if (filters.guests) params.set("guests", filters.guests);
    //   if (filters.checkIn) params.set("checkIn", filters.checkIn.toDate().toISOString());
    //   if (filters.checkOut) params.set("checkOut", filters.checkOut.toDate().toISOString());
    } else {
      if (filters.minArea) params.set("minArea", filters.minArea);
      if (filters.maxArea) params.set("maxArea", filters.maxArea);
    //   if (filters.dealType) params.set("dealType", filters.dealType);
    }

    const { path, transactionType } = tabConfig[activeTab];
    if (transactionType) params.set("transactionType", transactionType);

    router.push(`${path}?${params.toString()}`);
  }, [filters, activeTab, router, isReservation]);

  const {theme} = useTheme();

  return (
    <div
      dir="rtl"
      className={`w-full h-[120px] ${theme === "dark" ? "bg-[#444444]" : theme === "light" ? "bg-white" : "bg-[#444444]"}  rounded-[15px] shadow-md border border-gray-100 flex flex-col items-center justify-end gap-2`}
    >
    
      <div className="h-[30%] w-full  pr-2 flex flex-row items-center  gap-4">
        {tabs.map((it) => (
          <button
            type="button"
            onClick={() => setActiveTab(it)}
            key={it}
            style={
              activeTab === it
                ? { borderTop: "5px solid #4F46E5" }
                : {}
            }
            className={`rounded-[6px] border-indigo-600  leading-10 `}
          >
            {it}
          </button>
        ))}
      </div>

     
      <div className="flex flex-row items-center justify-evenly w-full h-[70%] ">

      
        <FieldWrapper label="انتخاب مقصد">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocation((v) => !v)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-10 text-sm  transition min-w-[140px] justify-between"
            >
              <span>{filters.location || "انتخاب کنید"}</span>
              <span className="text-xs text-gray-400">▼</span>
            </button>

            {showLocation && (
              <ul className="absolute top-full mt-1 right-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {locations.map((loc) => (
                  <li key={loc}>
                    <button
                      type="button"
                      className={`w-full text-right px-4 py-2 text-sm hover:bg-teal-500 hover:text-white transition ${
                        filters.location === loc ? "bg-orange-500 text-white" : "text-[black]"
                      }`}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          location: prev.location === loc ? "" : loc,
                        }));
                        setShowLocation(false);
                      }}
                    >
                      {loc}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FieldWrapper>

      
        {isReservation && (
          <>
            {/* Guests */}
            <FieldWrapper label="تعداد نفرات">
              <input
                type="number"
                min={1}
                placeholder="وارد کنید"
                value={filters.guests}
                style={{ MozAppearance: "textfield" }}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, guests: e.target.value }))
                }
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-700 outline-none w-[120px] text-right placeholder:text-gray-400 transition"
              />
            </FieldWrapper>

            
            <FieldWrapper label="تاریخ ورود">
              <DatePicker
                value={filters.checkIn}
                onChange={(date) =>
                  setFilters((prev) => ({ ...prev, checkIn: date as DateObject }))
                }
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                render={(value, openCalendar) => (
                  <button
                    type="button"
                    onClick={openCalendar}
                    className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-500  hover:bg-gray-50 transition min-w-[140px]"
                  >
                    <CalendarIcon />
                    <span className={value ? "text-gray-800" : "text-gray-400"}>
                      {value || "انتخاب کنید"}
                    </span>
                  </button>
                )}
              />
            </FieldWrapper>

           
            <FieldWrapper label="تاریخ خروج">
              <DatePicker
                value={filters.checkOut}
                onChange={(date) =>
                  setFilters((prev) => ({ ...prev, checkOut: date as DateObject }))
                }
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                minDate={filters.checkIn ?? undefined}
                render={(value, openCalendar) => (
                  <button
                    type="button"
                    onClick={openCalendar}
                    className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-500 hover:bg-gray-50 transition min-w-[140px]"
                  >
                    <CalendarIcon />
                    <span className={value ? "text-gray-800" : "text-gray-400"}>
                      {value || "انتخاب کنید"}
                    </span>
                  </button>
                )}
              />
            </FieldWrapper>
          </>
        )}

       
        {!isReservation && (
          <>
           
            <FieldWrapper label="حداقل متراژ">
              <input
                type="number"
                min={0}
                placeholder="متر مربع"
                value={filters.minArea}
                style={{ MozAppearance: "textfield" }}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minArea: e.target.value }))
                }
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-700  outline-none w-[120px] text-right placeholder:text-gray-400 transition"
              />
            </FieldWrapper>

           
            <FieldWrapper label="حداکثر متراژ">
              <input
                type="number"
                min={0}
                placeholder="متر مربع"
                value={filters.maxArea}
                style={{ MozAppearance: "textfield" }}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxArea: e.target.value }))
                }
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-700  outline-none w-[120px] text-right placeholder:text-gray-400 transition"
              />
            </FieldWrapper>

            
            {activeTab === "رهن و اجاره" && (
              <FieldWrapper label="نوع معامله">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDealType((v) => !v)}
                    className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-500  hover:bg-gray-50 transition min-w-[140px] justify-between"
                  >
                    <span>{filters.dealType || "انتخاب کنید"}</span>
                    <span className="text-xs text-gray-400">▼</span>
                  </button>

                  {showDealType && (
                    <ul className="absolute top-full mt-1 right-0 w-full  border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                      {dealTypeOptions.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            className={`w-full text-right px-4 py-2 text-sm hover:bg-teal-500 hover:text-white transition ${
                              filters.dealType === opt ? "bg-orange-500 text-white" : ""
                            }`}
                            onClick={() => {
                              setFilters((prev) => ({ ...prev, dealType: opt }));
                              setShowDealType(false);
                            }}
                          >
                            {opt}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FieldWrapper>
            )}
          </>
        )}


        <button
          type="button"
          onClick={handleSearch}
          className="h-10 px-6 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold transition-all shadow-sm whitespace-nowrap"
        >
          مشاهده نتیجه
        </button>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400 shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}