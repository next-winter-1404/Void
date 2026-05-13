"use client";

import { MapComponent, MapTypes } from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";

// npm install @neshan-maps-platform/mapbox-gl-react

interface NeshanMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function NeshanMap({ lat, lng, zoom = 13 }: NeshanMapProps) {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapComponent
        options={{
          mapKey: process.env.NEXT_PUBLIC_NESHAN_API_KEY!,
          center: [lng, lat],
          zoom: zoom,
          mapType: MapTypes.neshanRasterNight,
        }}
      />
    </div>
  );
}
