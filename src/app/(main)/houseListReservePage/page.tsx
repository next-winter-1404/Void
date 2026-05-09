import FilterButton from "@/components/common/button";
import FilterModal from "@/components/houseListReserve/filter/filterModal"

export default function houseList_reservePage () {


    return(
         <div dir="ltr"  className="w-full h-full flex flex-row max-xl:flex-wrap relative ">

             {/*map*/}
           <div className="border  w-[50%] max-xl:w-[100%]  h-full max-xl:h-[50%] rounded-[16px]  ">


            </div>

          <div dir="rtl" className="border w-[50%] max-xl:w-[100%] max-xl:h-[50%] h-full flex flex-col">
             {/*searchBox & filter*/}
             <div className="border w-full h-[7%] flex flex-row items-center justify-start">
               <FilterModal/>
             </div>

             {/*houseList*/}
             <div className="border w-full h-[93%]">
                
             </div>
          </div>


           
          
         </div>
    )
}