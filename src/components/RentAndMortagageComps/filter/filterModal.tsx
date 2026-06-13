"use client"

import {useState,useEffect,useCallback} from "react"
import DropDownMenu from "./dropDownMenu"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {dropDownItems} from "./dropDownMenu";
import FilterButton from "@/components/common/button"

import { useTheme } from "next-themes";

import { QueryMapper } from "@/util/helper/queryMapper"
import PriceRange from "./priceRange";

export default function rentAndMortgageFilter() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [showLocation, setShowLocation] = useState<boolean>(false);
    const [showPropertyType, setShowPropertyType] = useState<boolean>(false);
    const [showDealType, setShowDealType] = useState<boolean>(false);
    const [showContractType, setShowContractType] = useState<boolean>(false);
    const [showFilter,setShowFilter] = useState(false);

    const [value, setValue] = useState<number[]>([0, 10000000000]);
   

    const Location:dropDownItems[] = [
        {id:1,name:"تهران",query:"تهران"},
        {id:2,name:"مازندران",query:"مازندران"},
        {id:3,name:"ساری",query:"ساری"}
    ]

    const propertyType:dropDownItems[] = [
        {id:1,name:"ویلایی",query:"villa"},
        {id:2,name:"آپارتمانی",query:"apartment"},
    ]

    const dealType:dropDownItems[] = [
        {id:1,name:"اجاره",query:"rent"},
        {id:2,name:"رهن",query:"mortgage"},
        {id:3,name:"خرید",query:"direct_purchase"},
    ]

    const contractType:dropDownItems[] = [
        {id:1,name:"اجاره",query:"rent"},
        {id:2,name:"رهن",query:"mortgage"},
        {id:3,name:"خرید",query:"direct_purchase"}
    ]

    const [filters, setFilters] = useState({
        location:"",
        propertyType:"",
        dealType:"",
        transactionType:"",
        priceRange:[0,10000000000]
    });

    const [minRent, setMinRent] = useState<string>("");
    const [maxRent, setMaxRent] = useState<string>("");
    const [minArea, setMinArea] = useState<string>("");
    const [maxArea, setMaxArea] = useState<string>("");


    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        const loc = QueryMapper.map(filters.location, "location", Location);
        const prop = QueryMapper.map(filters.propertyType, "propertyType", propertyType);
        // const deal = QueryMapper.map(filters.dealType, "transactionType", dealType);
        const contract = QueryMapper.map(filters.transactionType, "transactionType", contractType);
        const prc = String(filters.priceRange[1]);
        const prm = String(filters.priceRange[0]);

        loc.location ? params.set("location",loc.location) : params.delete("location");
        prop.propertyType ? params.set("propertyType",prop.propertyType) : params.delete("propertyType");
        // deal.transactionType ? params.set("transactionType",deal.transactionType) : params.delete("transactionType");
        contract.transactionType ? params.set("transactionType",contract.transactionType) : params.delete("transactionType");
         prc ? params.set("maxPrice",prc) :  params.delete("maxPrice");
         prc == "10000000000" && params.delete("maxPrice");
         prm ? params.set("minPrice",prm) :  params.delete("minPrice");
         prm == "0" && params.delete("minPrice");

        router.push(`${pathname}?${params.toString()}`);
    }, [filters]);


    const handleLocationChange = (name:string) => {
        const newItems = filters.location === name ? '' : name;
        setFilters({ ...filters, location: newItems });
    };

    const handlePropertyTypeChange = (name:string) => {
        const newItems = filters.propertyType === name ? '' : name;
        setFilters({ ...filters, propertyType: newItems });
    };

    const handleDealTypeChange = (name:string) => {
        const newItems = filters.dealType === name ? '' : name;
        setFilters({ ...filters, dealType: newItems });
    };

    const handleContractTypeChange = (name:string) => {
        const newItems = filters.transactionType === name ? '' : name;
        setFilters({ ...filters, transactionType: newItems });
    };

    const handleValueChange = useCallback((event:Event,newValue: number[]) => {
          setValue(newValue);
        }, []);
               
        useEffect(() => {
        const timer = setTimeout(() => {
          setFilters(prev => ({
            ...prev,
            priceRange: value
          }));
        }, 500);
      
        return () => clearTimeout(timer);
      }, [value]);


    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            minRent ? params.set("minRent",minRent) : params.delete("minRent");
            maxRent ? params.set("maxRent",maxRent) : params.delete("maxRent");
            minArea ? params.set("minArea",minArea) : params.delete("minArea");
            maxArea ? params.set("maxArea",maxArea) : params.delete("maxArea");

            router.push(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [minRent,maxRent,minArea,maxArea]);

    const {theme} = useTheme();

    return (
        <>

         <FilterButton showFilter={showFilter} setShowFilter={setShowFilter} label=" فیلتر ها"/>

            <div className={` ${showFilter ? "block":"hidden"} w-[80%] max-lg:w-[60%] rounded-[20px] shadow-lg border-[gray]/20 border p-5 max-lg:p-2 absolute top-[250px] z-[10]
              rounded-[16px] ${theme === "dark" ? "bg-[#444444]" : theme === "light" ? "bg-white" : "bg-[#444444]"} flex flex-col gap-6`}>

                <div className="flex flex-row max-lg:flex-wrap items-start justify-between w-full gap-4">

                    <DropDownMenu
                        label="محل مورد نظر"
                        dropDownItems={Location}
                        setShowDropDown={setShowLocation}
                        showDropDown={showLocation}
                        handleChange={handleLocationChange}
                        filters={filters.location}
                    />

                    <DropDownMenu
                        label="نوع ملک"
                        dropDownItems={propertyType}
                        setShowDropDown={setShowPropertyType}
                        showDropDown={showPropertyType}
                        handleChange={handlePropertyTypeChange}
                        filters={filters.propertyType}
                    />

                    {/* <DropDownMenu
                        label="نوع معامله"
                        dropDownItems={dealType}
                        setShowDropDown={setShowDealType}
                        showDropDown={showDealType}
                        handleChange={handleDealTypeChange}
                        filters={filters.dealType}
                    /> */}

                    <DropDownMenu
                        label="نوع معامله"
                        dropDownItems={contractType}
                        setShowDropDown={setShowContractType}
                        showDropDown={showContractType}
                        handleChange={handleContractTypeChange}
                        filters={filters.transactionType}
                    />

                </div>

                <div className="flex flex-row max-lg:flex-wrap items-end justify-between w-full gap-4">

                    {/* <div className="rounded-[5px] p-[3px] w-[95%] pr-2">
                        <label className="text-[14px] font-medium block mb-3 pr-2">
                            حداقل اجاره
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={minRent}
                            style={{ MozAppearance: "textfield" } as React.CSSProperties}
                            onChange={(e)=> setMinRent(e.target.value)}
                            placeholder="وارد کنید"
                            className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded-lg p-2 text-sm w-full outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="rounded-[5px] p-[3px] w-[95%] pr-2">
                        <label className="text-[14px] font-medium block mb-3 pr-2">
                            حداکثر اجاره
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={maxRent}
                            style={{ MozAppearance: "textfield" } as React.CSSProperties}
                            onChange={(e)=> setMaxRent(e.target.value)}
                            placeholder="وارد کنید"
                            className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded-lg p-2 text-sm w-full outline-none placeholder:text-gray-400"
                        />
                    </div> */}

                    <PriceRange value={value} setValue={setValue} handleValueChange={handleValueChange}/>

                    <div className="rounded-[5px] p-[3px] w-[95%] pr-2">
                        <label className="text-[14px] font-medium block mb-3 pr-2">
                            حداقل متراژ
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={minArea}
                            style={{ MozAppearance: "textfield" } as React.CSSProperties}
                            onChange={(e)=> setMinArea(e.target.value)}
                            placeholder="وارد کنید"
                            className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded-lg p-2 text-sm w-full outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="rounded-[5px] p-[3px] w-[95%] pr-2">
                        <label className="text-[14px] font-medium block mb-3 pr-2">
                            حداکثر متراژ
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={maxArea}
                            style={{ MozAppearance: "textfield" } as React.CSSProperties}
                            onChange={(e)=> setMaxArea(e.target.value)}
                            placeholder="وارد کنید"
                            className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded-lg p-2 text-sm w-full outline-none placeholder:text-gray-400"
                        />
                    </div>

                </div>

            </div>
        </>
    )
}