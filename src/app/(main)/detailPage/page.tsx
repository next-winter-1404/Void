
import DescriptionHome from "@/components/detailPage/describeHomeReserve/descriptionHome";
// import DescribeHomeRent from "@/components/detailPage/describeHomeRent/descriptionHomeRent";
import Gallery from "@/components/detailPage/gallery";
import SameHomeSection from "@/components/detailPage/sameHomeSection/sameHome";
import ReserveForm from "@/components/detailPage/reserveForm/reserveForm";


import Image from "next/image";

import MapIco2 from "@/assets/ico/detailPage/Map2-ico.png"



export default function DetailPage(){

    const images = [
    '/images/detailPage/gallery/gallery-Img1.png',
    '/images/detailPage/gallery/gallery-Img2.png',
    '/images/detailPage/gallery/gallery-Img3.png',
    '/images/detailPage/gallery/gallery-Img4.png',
    '/images/detailPage/gallery/gallery-Img5.png',
    '/images/detailPage/gallery/gallery-Img6.png',
    '/images/detailPage/gallery/gallery-Img7.png',
    
  ];

    return(
        <>
          <div className="w-full  flex flex-col">

          {/*headerContent */}
          <div className="w-full h-[10%]">
            <h1 className="font-bold text-[25px]">هتل همایون فر کیش ایران</h1>
             <span className=" p-2 flex flex-row gap-2 text-[#595959]">
             <Image alt="map" src={MapIco2}/>تهران،زعفرانیه
             </span>
            </div>


          {/*homeDetailContent*/}

          <div className=" w-full h-[60%]  flex flex-row">

           {/*gallery*/}
            <div dir="ltr" className=" p-3 h-full w-[45%] max-md:hidden">

             <div className="relative h-[1500px]">
               <div className="sticky top-4">
                 <Gallery images={images} />
               </div>
            </div>

            </div>

            {/*description & comment */}
            <div  className=" p-2 h-full w-[55%] max-md:w-full  ">
              <DescriptionHome/>

               <ReserveForm/>

            
              
            </div>
             

          </div>

         
         {/*sameHomeSection*/}
          <div className=" w-full h-[30%] py-5">
            
            <SameHomeSection/>

          </div>

          </div>
        </>
    )
}