"use client";

import dynamic from "next/dynamic";

import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";

const MapComponent = dynamic(
  () =>
    import("@neshan-maps-platform/mapbox-gl-react").then(
      (mod) => mod.MapComponent
    ),
  { 
    ssr: false,
    loading: () => <div style={{ height: "650px", background: "#eee" }}>در حال بارگذاری نقشه...</div> 
  }
);

export default function NeshanMap() {
  const mapKey = process.env.NEXT_PUBLIC_NESHAN_API_KEY;

  if (!mapKey) {
    return (
      <div style={{ color: "red", padding: "20px", border: "1px solid red" }}>
           خطا در نمایش نقشه
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "650px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative", 
        border: "1px solid #ddd"
      }}
    >
      <MapComponent
        options={{
          mapKey: mapKey,
          center: [51.3890, 35.6892],
          zoom: 12,
          mapType: "neshanVector"
        }}
    
        style={{ width: "100%", height: "100%" }} 
      />
    </div>
  );
}
