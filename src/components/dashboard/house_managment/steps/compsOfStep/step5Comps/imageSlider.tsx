"use client";

import { useState, useEffect, useCallback } from "react";

interface ImageSliderProps {
  images: File[] ;
  interval?: number; 
  className?: string;
}

export default function ImageSlider({
  images,
  interval = 5000,
  className = "",
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const previews: string[] = images.map((img) =>
    img instanceof File ? URL.createObjectURL(img) : img
  );

  useEffect(() => {
    const urls = images
      .filter((img): img is File => img instanceof File)
      .map((f) => URL.createObjectURL(f));
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [images]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [paused, images.length, interval, current]);

  const goTo = useCallback((i: number) => setCurrent(i), []);


  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-2xl select-none ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${current * 100}%)` }}
      >
        {previews.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`تصویر ${i + 1}`}
            className="w-full h-full object-cover shrink-0"
            style={{ minWidth: "100%" }}
            draggable={false}
          />
        ))}
      </div>


      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`رفتن به تصویر ${i + 1}`}
              className={`rounded-full transition-all duration-300
                ${i === current
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && !paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10 overflow-hidden">
          <div
            key={current}
            className="h-full bg-green-400 w-0"
            style={{ animation: `sliderProgress ${interval}ms linear forwards` }}
          />
        </div>
      )}

    </div>
  );
}