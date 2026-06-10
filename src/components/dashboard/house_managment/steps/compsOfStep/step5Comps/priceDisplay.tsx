"use client";

import { StaticImageData } from "next/image";
import Image from "next/image"
interface PriceDisplayProps {
  price: string | number | undefined;
  currency?: string;
  icon:StaticImageData
}

export default function PriceDisplay({ price, currency = "ریال",icon }: PriceDisplayProps) {
  if (!price) return null;

  const formatted = Number(price).toLocaleString("fa-IR");

  return (
    <div className="flex items-center gap-2 justify-end mt-3" dir="rtl">
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
        <Image alt="s" src={icon} className="w-6 h-6"/>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[#8CFF45] font-bold text-xl tracking-wide">
          {formatted}
        </span>
        <span className="text-zinc-500 text-sm">{currency}</span>
      </div>
    </div>
  );
}