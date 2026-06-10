"use client"

import dynamic from 'next/dynamic'

const  PriceRange = dynamic(() => import("./priceRange"), { ssr: false })

import {useState,useEffect} from "react"
import FilterButton from "@/components/common/buttonDash"
import DropDownMenu from "./dropDownMenu"
// import PriceRange from "./priceRange"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {dropDownItems} from "./dropDownMenu";

import { QueryMapper } from "@/util/helper/queryMapper"

import { useCallback } from "react"

export default function filterModal() {
    
    const [showFilter,setShowFilter] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const [showCategory, setShowCategory] = useState<boolean>(false);
    const [showLocation, setShowLocation] = useState<boolean>(false);
    const [showSort, setShowSort] = useState<boolean>(false);

    const [value, setValue] = useState<number[]>([0, 10000000000]);
   
    
    const category:dropDownItems[] = [
        {id:1,name:"ویلایی",query:"villa"},
        {id:2,name:"آپارتمانی",query:"apartment"},        
    ]

    const Location:dropDownItems[] = [
        {id:1,name:"تهران",query:"تهران"},
        {id:2,name:"مازندران",query:"مازندران"},
        {id:3,name:"ساری",query:"ساری"}
    ]

    const Sorting:dropDownItems[] = [
        {id:1,name:"گران ترین",query:"price",query2:"DESC"},
        {id:2,name:"ارزان ترین",query:"price",query2:"ASC"},
    ]

     const [filters, setFilters] = useState({
            category: "",
            location:"",
            sort:"",
            priceRange:[0,10000000000]
        });

    // console.log(filters);       
    useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());

    const cat = QueryMapper.map(filters.category, "transaction_type", category);
    const prc = String(filters.priceRange[1]);
    const prm = String(filters.priceRange[0]);

    cat.transaction_type ? params.set("transaction_type",cat.transaction_type) : params.delete("transaction_type");
     prc ? params.set("maxPrice",prc) :  params.delete("maxPrice");
     prm ? params.set("minPrice",prm) :  params.delete("minPrice");
     prc == "10000000000" && params.delete("maxPrice");
     prm == "0" && params.delete("minPrice")
    router.push(`${pathname}?${params.toString()}`);
  }, [filters]); 


       
        const handleCategoryChange = (name:string) => {
            const newItems = filters.category === name ? '' : name;
            setFilters({ ...filters, category: newItems });
        };

         const handleLocationChange = (name:string) => {
            const newItems = filters.location === name ? '' : name;
            setFilters({ ...filters, location: newItems });
        };

        const handleSortChange = (name:string) => {
            const newItems = filters.sort === name ? '' : name;
            setFilters({ ...filters, sort: newItems });
        };
        // console.log(value);
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
    
    //   console.log("price",filters.priceRange[1])

    return (
        <>   
        <FilterButton showFilter={showFilter} setShowFilter={setShowFilter} label=" فیلتر ها"/>

         <div className={`w-[280px] max-xl:w-[230px]  absolute top-[150px] z-[10] rounded-[16px]
          ${showFilter ? "block":"hidden"}`}>
        <div className="shadow-md shadow-purple-200 w-full bg-white rounded-[20px] py-[10px] flex flex-col items-center gap-1">

                
          <DropDownMenu 
          label="دسته بندی"
           dropDownItems={category} 
           setShowDropDown={setShowCategory} 
           showDropDown={showCategory} 
           handleChange={handleCategoryChange}
           filters={filters.category}
           />
          
            

            <PriceRange value={value} setValue={setValue} handleValueChange={handleValueChange}/>

          
           
        

        </div>

	</div>
	</>

    )
}
