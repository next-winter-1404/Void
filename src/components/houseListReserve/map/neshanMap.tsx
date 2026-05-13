"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import "@/assets/style/neshanStyle.css";

import { toPersianFormat } from "@/util/helper/persianFormat";

type House = {
  id?: string | number;
  name?:string,
  address?:string,
  image?:string
  oldPrice?:number,
  price?:number
  lat?: number;
  lng?: number;
  location?: {
    lat?: number;
    lng?: number;
  };
};

type Props = {
  houses?: House[];
};

const NeshanMapComponent = dynamic(
  () =>
    import("@neshan-maps-platform/mapbox-gl-react").then(
      (mod) => mod.MapComponent
    ),
  { ssr: false }
);

export default function NeshanMap({ houses = [] }: Props) {

  const validHouses = useMemo(() => {
    return houses.filter((house) => {
      const lat = house.location?.lat ?? house.lat;
      const lng = house.location?.lng ?? house.lng;
      return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        !Number.isNaN(lat) &&
        !Number.isNaN(lng)
      );
    });
  }, [houses]);

  const apiKey = process.env.NEXT_PUBLIC_NESHAN_API_KEY;

  if (!apiKey) {
    return (
      <div
        style={{
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        NEXT_PUBLIC_NESHAN_API_KEY is missing.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 500, position: "relative" }}>
      <NeshanMapComponent
        options={{
          mapKey: apiKey,
          mapType: "neshanVector",
          center: [51.389, 35.6892],
          zoom: 12,
        }}
        mapSetter={(map: any) => {
  import("@neshan-maps-platform/mapbox-gl").then((lib) => {
    const nmp = lib.default;

    validHouses.forEach((house) => {
      const lat = house.location?.lat ?? house.lat;
      const lng = house.location?.lng ?? house.lng;
      if (!lat || !lng) return;

      const {
        name = "بدون عنوان",
        address = "آدرس ثبت نشده",
        price = 0,
        oldPrice = null,
        image = "",
      } = house;

      const popupHTML = `
        <div style="
          direction: rtl;
          background: #4f46e5;
          color: white;
          padding: 5px 6px;
          border-radius: 16px;
          font-family: system-ui;
          min-width: 250px;
          max-width: 260px;
          position: relative;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        ">
        
          <div style="display: flex; align-items: center;">
    
          <img src="${image}" style="width:35px; height:35px; border-radius:50%; object-fit:cover;" />

           <div>
            <div style="display:flex;justify-content:between">
            <span style="font-size: 15px ;font-weight: 700;width:140px;overflow:hidden">${name}</span>
             <a href="/house/${house.id}" style="
              font-size: 14px;
              color: #c7d2fe;
              text-decoration: none;
              width:50px
            ">بیشتر ></a>
            </div>

             <div style="margin: 6px 0 10px; font-size: 13px; color: #e0e7ff;">
               ${address}
             </div>

          </div>

          </div>

          <div style="display: flex; gap: 6px; align-items: baseline;">
            ${
              oldPrice
                ? `<span style="color:#fca5a5; text-decoration: line-through; font-size: 13px;">
                    ${toPersianFormat(oldPrice)} تومان
                   </span>`
                : ""
            }
            <span style="font-weight:700; font-size: 16px;">
              /${toPersianFormat(price)} تومان
            </span>
          </div>

          <div style="margin-top: 10px; text-align: left;">
           
          </div>

        </div>
      `;

     const el = document.createElement("div");
      el.style.width = "45px";
      el.style.height = "45px";
      el.style.backgroundImage = `url(${image})`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.style.borderRadius = "50%";
      el.style.border = "3px solid white";
      el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
      el.style.cursor = "pointer";

      const marker = new nmp.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([lng, lat])
        .addTo(map);

      const popup = new nmp.Popup({ offset: 25 }).setHTML(popupHTML);

      marker.setPopup(popup);
    });
  });
}}

        style={{ width: "100%", height: "650px",borderRadius:"16px" }}
      />
    </div>
  );
}
