"use client"

import {useState,useEffect} from "react"
import FilterButton from "@/components/common/button"
import DropDownMenu from "./dropDownMenu"
import PriceRange from "./priceRange"

import type {dropDownItems} from "./dropDownMenu";


export default function filterModal() {
    
    const [showFilter,setShowFilter] = useState<boolean>(false);


    const [showCategory, setShowCategory] = useState<boolean>(false);
    const [showLocation, setShowLocation] = useState<boolean>(false);
    const [showSort, setShowSort] = useState<boolean>(false);

    const [value, setValue] = useState<number[]>([0, 100000000]);
   
    
    const category:dropDownItems[] = [
        {id:1,name:"ویلایی"},
        {id:2,name:"آپارتمانی"}
    ]

    const Location:dropDownItems[] = [
        {id:1,name:"تهران"},
        {id:2,name:"مازندران"}
    ]

    const Sorting:dropDownItems[] = [
        {id:1,name:"گران ترین"},
        {id:2,name:"ارزان ترین"},
        {id:3,name:"محبوب ترین"}
    ]

     const [filters, setFilters] = useState({
            category: "",
            location:"",
            sort:"",
            priceRange:[0,1000000000]
        });
       
        // useEffect(()=>{
        //    console.log("filter",filters);
        // },[filters])
       
    
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

        const handleValueChange = (event:Event,newValue:number | number[]) => {
        setValue(newValue as number[]);
        setFilters({ ...filters, priceRange: value });
    };
       
    
   

    return (
        <>   
        <FilterButton showFilter={showFilter} setShowFilter={setShowFilter} label=" فیلتر ها"/>

         <div className={`w-[280px] max-xl:w-[230px]  absolute top-[60px] max-xl:right-[100px] max-xl:top-[320px]  rounded-[16px]
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
          <DropDownMenu
           label="مقصد یا هتل شما"
            dropDownItems={Location}
             setShowDropDown={setShowLocation} 
             showDropDown={showLocation}
             handleChange={handleLocationChange}
             filters={filters.location} 
             />

              <DropDownMenu
           label="مرتب سازی"
            dropDownItems={Sorting}
             setShowDropDown={setShowSort} 
             showDropDown={showSort}
             handleChange={handleSortChange}
             filters={filters.sort} 
             />  

            <PriceRange value={value} setValue={setValue} handleValueChange={handleValueChange}/>

          
           
        

        </div>

	</div>
	</>

    )
}
