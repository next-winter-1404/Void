"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import "@/assets/style/neshanStyle.css";


interface Coords {
  lat: number;
  lng: number;
}

interface NeshanMapPickerProps {
  defaultCoords?: Coords;
  onChange?: (coords: Coords) => void;
  error?: string;
}


const NeshanMapComponent = dynamic(
  () =>
    import("@neshan-maps-platform/mapbox-gl-react").then(
      (mod) => mod.MapComponent
    ),
  { ssr: false }
);

const DEFAULT_CENTER = { lat: 35.6892, lng: 51.389 };

export default function NeshanMapPicker({
  defaultCoords,
  onChange,
  error,
}: NeshanMapPickerProps) {
  const mapRef     = useRef<any>(null);
  const markerRef  = useRef<any>(null);   // single draggable pin
  const coordsRef  = useRef<Coords | null>(defaultCoords ?? null);

  
  const [lat, setLat] = useState<number | null>(defaultCoords?.lat ?? null);
  const [lng, setLng] = useState<number | null>(defaultCoords?.lng ?? null);

  const apiKey = process.env.NEXT_PUBLIC_NESHAN_API_KEY;

 
  useEffect(() => {
    if (defaultCoords && mapRef.current && markerRef.current) {
      markerRef.current.setLngLat([defaultCoords.lng, defaultCoords.lat]);
      mapRef.current.flyTo({
        center: [defaultCoords.lng, defaultCoords.lat],
        zoom: 14,
      });
      setLat(defaultCoords.lat);
      setLng(defaultCoords.lng);
    }
  }, [defaultCoords]);

  if (!apiKey) {
    return (
      <div className="h-[500px] flex items-center justify-center border border-dashed border-gray-300 rounded-2xl text-gray-400">
        NEXT_PUBLIC_NESHAN_API_KEY is missing.
      </div>
    );
  }

 
  function handleMapReady(map: any) {
    mapRef.current = map;

    import("@neshan-maps-platform/mapbox-gl").then((lib) => {
      const nmp = lib.default;

      
      if (defaultCoords) {
        markerRef.current = new nmp.Marker({ draggable: true })
          .setLngLat([defaultCoords.lng, defaultCoords.lat])
          .addTo(map);

        markerRef.current.on("dragend", () => {
          const pos = markerRef.current.getLngLat();
          updateCoords(pos.lat, pos.lng);
        });
      }

     
      map.on("click", (e: any) => {
        const { lat, lng } = e.lngLat;

        if (markerRef.current) {
         
          markerRef.current.setLngLat([lng, lat]);
        } else {
        
          markerRef.current = new nmp.Marker({ draggable: true })
            .setLngLat([lng, lat])
            .addTo(map);

          markerRef.current.on("dragend", () => {
            const pos = markerRef.current.getLngLat();
            updateCoords(pos.lat, pos.lng);
          });
        }

        updateCoords(lat, lng);
      });
    });
  }

  function updateCoords(newLat: number, newLng: number) {
    setLat(newLat);
    setLng(newLng);
    coordsRef.current = { lat: newLat, lng: newLng };
    onChange?.({ lat: newLat, lng: newLng });
  }

  return (
    <div className="w-full flex flex-col gap-2">

      {/* ── Map ── same style as your NeshanMap ── */}
      <div style={{ width: "100%", height: 500, position: "relative" }}>
        <NeshanMapComponent
          options={{
            mapKey: apiKey,
            mapType: "neshanVector",
            center: [
              defaultCoords?.lng ?? DEFAULT_CENTER.lng,
              defaultCoords?.lat ?? DEFAULT_CENTER.lat,
            ],
            zoom: 12,
          }}
          mapSetter={handleMapReady}
          style={{ width: "100%", height: "500px", borderRadius: "16px" }}
        />

        
        {!lat && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-gray-600 text-xs px-4 py-2 rounded-full shadow pointer-events-none">
            روی نقشه کلیک کنید تا موقعیت ملک را تعیین کنید
          </div>
        )}
      </div>

      
      {lat && lng && (
        <div className="flex gap-3 text-xs text-gray-500 px-1" dir="ltr">
          <span>lat: {lat.toFixed(6)}</span>
          <span>lng: {lng.toFixed(6)}</span>
        </div>
      )}

     
      <input type="hidden" name="lat" value={lat ?? ""} />
      <input type="hidden" name="lng" value={lng ?? ""} />

      
      {error && (
        <p className="text-red-500 text-xs pr-1">{error}</p>
      )}

    </div>
  );
}