"use client";


import { StaticImageData } from "next/image";
import Image from "next/image"
interface InfoCardProps {
  icon: StaticImageData;
  values: any;
}

export default function InfoCard({ icon, values }: InfoCardProps) {
  const items = Array.isArray(values) ? values : [values];
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) return null;

  return (
    <div className="flex items-center gap-3 py-3 text-[20px]" dir="rtl">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
        <Image alt="ico" src={icon} className="w-5 h-5" />
      </div>
      <span className="text-sm text-zinc-700 font-medium">
        {filtered.join(" ، ")}
      </span>
    </div>
  );
}