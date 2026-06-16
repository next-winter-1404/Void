
import Image from 'next/image';
import HomeImg from "@/assets/Images/detailPage/Home-ico.png";
import HomeRentInfo from './HomerentInfo';
import { toPersianFormat } from '@/util/helper/persianFormat';
import type { houseDetailProps } from '@/types/houseDetailType/houseDetail-type';
import { getUserInfo } from '@/util/service/api/token';
import { getToken } from '@/util/service/api/token';
import NeshanMap from '../map/neshanMap';
import {Api} from "@/util/service/api"
import { handleAsyncAction } from '@/util/service/api/handleAsync';


export default async function DescribeHome ({houseDetail}:houseDetailProps){

  const api = await Api();

   //thehouseLcoation

   const theHouseLocation = await handleAsyncAction(api.houseDetail.houseLocation(houseDetail?.id));
    
   const theHouse_Location = theHouseLocation?.data
   
   const user = await getUserInfo();
     const token = await getToken() as string;
     const userId = user?.id;

  //  console.log("price",Number(houseDetail.price));
   
  let buildingType = null;

   switch(houseDetail.tags){
      case "apartment":buildingType="آپارتمان";break
      case "villa":buildingType="ویلا";break
      case "house":buildingType="ساختمان";break
       default : buildingType="هتل";
   }
   
  //  console.log("lat",theHouse_Location?.lat)
  //  console.log("lng",theHouse_Location?.lng)

  // console.log("houseDetail",houseDetail);

  const sellerInfo = await handleAsyncAction(api.auth.theUserInfo(houseDetail?.id));
  const sellerInfos = sellerInfo?.data?.data;
  console.log("sellerInfo",sellerInfos);

   const houseDetailLcation = [
       {id:1,oldPrice:houseDetail.discounted_price,name:houseDetail?.title
        ,price:houseDetail?.price,lat:Number(theHouse_Location?.location.lat),lng:Number(theHouse_Location?.location.lng),address:houseDetail?.address,
        image:"https://hesamghasemi.com/wp-content/uploads/2025/01/%D9%86%D9%85%D8%A7-%D9%88%DB%8C%D9%84%D8%A7-%D8%B3%D8%A7%D8%AF%D9%872_.jpg"},

   ]
   
    return (
         <>
           <div  className=" w-full flex flex-wrap gap-10 ">
        
             <p className=''>
               {houseDetail?.caption}
             </p>
             
              <div className='flex flex-wrap w-[400px]  gap-2'>
                               
              <h1 className='w-full text-start font-bold text-[15px]'> امکانات هتل</h1>
              <div className='w-full flex flex-row max-lg:flex-wrap items-center justify-start gap-2 font-medium text-[14px] whitespace-nowrap' >
                  {houseDetail?.rooms ? <span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>تعداد اتاق  {toPersianFormat(houseDetail.rooms)}</span>
                  :<span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>اتاق ندارد</span> }
                  {houseDetail?.bathrooms ? <span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>تعداد حمام{toPersianFormat(houseDetail.bathrooms)}</span>
                  :<span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>حمام ندارد</span>}
                  {houseDetail?.parking ? <span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>تعداد پارکینگ{toPersianFormat(houseDetail.parking)}</span>
                  :<span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>پارکینگ ندارد</span> }
                  {houseDetail?.capacity && <span className='outline outline-[#E9E9E9] rounded-[20px] px-4 py-2'>ظرفیت {toPersianFormat(houseDetail.capacity)}</span>}                  
              </div>
              </div>

              <h1 className='w-full text-start font-bold text-[15px]'> موقیعت مکانی</h1>
              <div className=' w-full'>
                <NeshanMap houses={houseDetailLcation}/>
              </div>

             <p className=''>
               لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، 
                و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                 کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان
                 را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                 ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
                 در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها،
                 و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، 
                و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. 
             </p>


             <HomeRentInfo token={token} user_id={userId} houseId={houseDetail?.id} favoriteId={houseDetail?.favoriteId} phoneNumber={sellerInfos?.phoneNumber ?? "شماره در دسترس نیست"} sellerName={houseDetail?.sellerName ? houseDetail?.sellerName : ""} last_updated={houseDetail?.last_updated ? houseDetail?.last_updated : ""}
             mortagatePrice={Number(houseDetail?.price)} rentPrice={Number(houseDetail?.price)}/>


          
           </div>
         </>
    )

}