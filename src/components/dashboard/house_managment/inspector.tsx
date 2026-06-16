"use client";

import { useSearchParams } from "next/navigation";
import {
  CircleCheck,
  MapPin,
  Settings,
  ImageIcon,
  BadgeCheck,
} from "lucide-react";
import type { StepName } from "@/types/dashboard/houseManagmentType/type";


const steps: { key: StepName; label: string; icon: React.ElementType }[] = [
  { key: "basic-info", label: "مشخصات اولیه", icon: CircleCheck },
  { key: "address",    label: "آدرس",          icon: MapPin      },
  { key: "amenities",  label: "امکانات",        icon: Settings    },
  { key: "images",     label: "تصاویر ملک",     icon: ImageIcon   },
  { key: "review",     label: "تایید نهایی",    icon: BadgeCheck  },
];

export default function Inspector() {
 
  const searchParams  = useSearchParams();
  const stepFromUrl   = searchParams.get("step") as StepName | null;
  const currentStep   = stepFromUrl ?? "basic-info";
  const currentIndex  = steps.findIndex((s) => s.key === currentStep);
  const activeIndex   = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full rounded-[24px] bg-[#D9D9D9] px-3 py-2">
      <div dir="rtl" className="flex items-center">
        {steps.map((step, index) => {
          const Icon      = step.icon;
          const completed = index < activeIndex;
          const active    = index === activeIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex items-center gap-1 whitespace-nowrap">

                <div
                  className={`
                    flex h-8 w-8 max-lg:h-6 max-lg:w-6 items-center justify-center rounded-full border-2
                    ${completed
                      ? "border-green-600 text-green-600"
                      : active
                      ? "border-black text-black"
                      : "border-gray-400 text-gray-400"}
                  `}
                >
                  <Icon size={16} />
                </div>

                <span
                  className={`
                    text-[15px] font-medium max-lg:text-[10px] max-md:text-[8px]
                    ${completed
                      ? "text-green-600"
                      : active
                      ? "text-black"
                      : "text-gray-400"}
                  `}
                >
                  {step.label}
                </span>

              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`
                    mx-3 flex-1 border-t-2 border-dashed max-lg:hidden
                    ${completed ? "border-green-600" : active ? "border-black-300": "border-gray-300"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}