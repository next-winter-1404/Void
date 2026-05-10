import FilterButton from "@/components/common/button";
import FilterModal from "@/components/houseListReserve/filter/filterModal";
import SearchModal from "@/components/common/searchBox/searchModal";

export default function houseList_reservePage () {


    return(
         <div dir="ltr"  className="w-full h-full flex flex-row">

             {/*map*/}
           <div className="border  w-[50%] max-xl:hidden  h-full rounded-[16px]  ">


            </div>

          <div dir="rtl" className="border w-[50%] max-xl:w-[100%]  h-full flex flex-col">
             {/*searchBox & filter*/}
             <div className=" w-full h-[7%] flex flex-row  justify-start gap-2">
               <FilterModal/>
               <SearchModal/>
             </div>

             {/*houseList*/}
             <div className="border w-full h-[93%]">
                
             </div>
          </div>


           
          
         </div>
    )
}