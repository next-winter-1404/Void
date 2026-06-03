
import Image from "next/image"
import Img from "@/assets/Images/detailPage/Home-ico.png"
import UserInfoCom from "./userInfoCom";
import SubmitBt from "@/components/common/SubmitBt";

import { toPersianFormat,isoToPersianDate } from "@/util/helper/persianFormat";

import { getReserveDate,getForm } from "@/util/hooks/cookieStorage";

import Price from "@/components/common/PriceComponent/Price";

import {Api} from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";

interface Passenger {
  ageGroup: string;
  firstName: string;
  lastName: string;
  gender: string;
  nationalId: string;
  birthDate: string;
  services: string;
  servicePrice: string;
  price: string;
}

interface HotelInfo {
  name: string;
  rating: number;
  address: string;
  checkIn: string;
  checkOut: string;
  originalPrice: string;
  discountPercent: number;
  discountedPrice: string;
  passengers: Passenger[];
}

const hotelData: HotelInfo = {
  name: "هتل همایون فر کیش ایران",
  rating: 3.5,
  address: "گیلان، رشت، میدان آزادی، جنب چهار راه عظیمی، میدان آزادی، جنب چهار...",
  checkIn: "۱۴۰۴/۰۶/۱۶",
  checkOut: "۱۴۰۴/۰۶/۱۶",
  originalPrice: "۲۵۰,۰۰۰,۰۰۰",
  discountPercent: 5,
  discountedPrice: "۲۵۰,۰۰۰,۰۰۰",
  passengers: [
    {
      ageGroup: "بزرگسال",
      firstName: "علیرضا",
      lastName: "رضایی",
      gender: "مرد",
      nationalId: "۵۷۸۰۰۱۱۵۵۲",
      birthDate: "۱۳۷۸/۰۲/۱۸",
      services: "–",
      servicePrice: "–",
      price: "۱,۵۲۰,۰۰۰ تومان",
    },
  ],
};



function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
     
      <span className="text-xs text-stone-400 mr-1">{rating}</span>
    </div>
  );
}

function SectionHeader({ icon, title, sub }: { icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 rtl">
      <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
        {icon}
      </div>
      <div className="text-right">
        <p className="font-bold text-stone-800 text-sm">{title}</p>
        {sub && <p className="text-xs text-stone-400">{sub}</p>}
      </div>
    </div>
  );
}

function InfoRow({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-dashed border-stone-100 last:border-0 rtl">
      <span dir="rtl" className={`text-sm font-semibold ${valueClass || "text-stone-700"}`}>{value}</span>
      <span className="text-xs text-stone-400">{label}</span>
    </div>
  );
}







export default async function HotelReservePage() {
  
  const hotel = hotelData;

  const user_reserveDate = await getReserveDate();
  const user_reserveInfo = await getForm();

  // console.log("wwdw",user_reserveDate);
  console.log("wdwadd",user_reserveInfo.sharedMobile)


  const api = await Api();

  const houseData = await handleAsyncAction(api.houseDetail.houseDetail(user_reserveInfo?.houseId));

  const houseDetail = houseData?.data;

  const discount = houseDetail?.discounted_price == null ? 0 : Math.ceil(((houseDetail?.price - houseDetail?.discounted_price)/houseDetail?.price)*100)

  console.log("hhhhh",houseDetail)
  

  return (
    <div className="w-full flex flex-row max-lg:flex-wrap gap-2 min-lg:justify-evenly">
       


      <div className=" w-[50%] max-lg:w-full px-4 py-8 space-y-4">

       
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-5">
           
            <div className="flex gap-4 mb-5">
              
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-200 shrink-0 overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <Image alt="house" src={Img}  />
              </div>
              <div className="flex-1 text-right">
                <h2 className="font-extrabold text-stone-900 text-base leading-snug mb-1">{houseDetail?.title}</h2>
                <div className="flex items-start gap-1.5 mt-2">
                  
                  <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">{houseDetail?.address}</p>
                </div>
              </div>
            </div>

           
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "تاریخ ورود به هتل", value:  isoToPersianDate(user_reserveDate?.checkInDate) },
                { label: "تاریخ خروج از هتل", value: isoToPersianDate(user_reserveDate?.checkOutDate) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3 text-right border border-slate-100">
                  <p className="text-[10px] text-stone-400 mb-1">{label}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="text-sm font-bold text-stone-700">{value}</p>
                    {/* <Calendar size={13} className="text-teal-500" /> */}
                  </div>
                </div>
              ))}
            </div>

            
            <div className="flex items-center justify-between bg-teal-50/60 rounded-xl px-4 py-3 border border-teal-100">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold">قیمت</span>
                   <div className="flex flex-row w-full   items-center whitespace-nowrap  text-[20px]">
                       <Price price={houseDetail?.price} discount={discount} />
                       
                   </div>
                {/* <span className={`text-xs line-through text-stone-400 ${houseDetail?.discounted_price == null && "hidden"}`}>{houseDetail?.price} تومان</span> */}
              </div>
              {/* <div className="text-right">
                <p className="text-[12px] text-stone-400 ">قیمت با تخفیف</p>
                <p className="text-base font-extrabold text-teal-600">{houseDetail?.discounted_price == null ? toPersianFormat(houseDetail?.price) : toPersianFormat(houseDetail?.discounted_price)} تومان</p>
              </div> */}
            </div>
          </div>
        </div>

       
        <div dir="ltr" className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          
            <div className="flex items-center justify-end gap-2">
              <span className="font-extrabold text-stone-800 text-sm p-4">مشخصات مسافران</span>
            </div>
          

          
            <div  className="px-5 pb-5">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <InfoRow label="نام و نام خانوادگی" value={`${user_reserveInfo.traveler_details[0].firstName} ${user_reserveInfo?.traveler_details[0].lastName}`} />
                <InfoRow label="جنسیت" value={user_reserveInfo?.traveler_details[0].gender === "male" ? "آقا" : "خانوم"} />
                <InfoRow label="کد ملی " value={user_reserveInfo?.traveler_details[0].nationalId} valueClass="text-teal-600 font-bold" />
                <InfoRow label="تاریخ تولد" value={isoToPersianDate(user_reserveInfo?.traveler_details[0].birthDate)} />
              </div>

             
              <SubmitBt  subLabel=" ویرایش مسافران" />
            </div>
          
        </div>

        </div>

       <div className=" w-[40%] max-lg:w-full  px-4 py-8 space-y-4">
        
        <UserInfoCom price={houseDetail?.price} discountPrice={houseDetail?.discount_price}
         houseId={user_reserveInfo?.houseId} sharedEmail={user_reserveInfo?.sharedEmail}
        sharedMobile={user_reserveInfo?.sharedMobile} traveler_details={user_reserveInfo?.traveler_details} reservedDates={user_reserveInfo?.reservedDates} />

      </div>

    </div>
  );
}
