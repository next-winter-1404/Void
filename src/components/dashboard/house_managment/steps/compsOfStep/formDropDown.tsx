"use client";

import { useState, useRef, useEffect } from "react";

export interface DropDownItem {
  id: number;
  name: string;
  query: string;
  query2?: string;
  created_at?: string;
  updated_at?: string;
}

interface FormDropDownProps {
  name: string;
  label: string;
  items: DropDownItem[];
  defaultValue?: string;
  error?: string;
  placeholder?: string;
}

export default function FormDropDown({
  name,
  label,
  items,
  defaultValue = "",
  error,
  placeholder = "انتخاب کنید",
}: FormDropDownProps) {
  const [open, setOpen]   = useState(false);
  const [value, setValue] = useState(defaultValue);
  const wrapperRef        = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

 
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = items.find((i) => i.query === value)?.name ?? value;

  return (
    <div className="rounded-[5px]  w-full pr-2" ref={wrapperRef}>

      <label className="text-[14px] font-medium block mb-3 pr-2">
        {label}
      </label>


      <input type="hidden" name={name} value={value} />

      <div className="relative">
        
        <div
          onClick={() => setOpen((o) => !o)}
          className={`
            border rounded-[16px] p-4 text-sm cursor-pointer 
            flex justify-between items-center hover:bg-gray-50
            ${error ? "border-red-400" : "border-gray-300"}
            ${open  ? "rounded-b-none border-b-transparent" : ""}
          `}
        >
          <span className={selectedLabel ? "text-gray-700" : "text-gray-400"}>
            {selectedLabel || placeholder}
          </span>
          <span
            className={`text-xs transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>

        {open && (
          <ul className="absolute top-full left-0 w-full max-h-[140px] overflow-y-auto bg-white shadow-lg rounded-b-lg z-50 border border-gray-200 border-t-0">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"          
                  className={`
                    w-full text-right block px-4 py-2 text-sm cursor-pointer
                    hover:bg-teal-500 hover:text-white
                    ${value === item.query ? "!bg-orange-500 !text-white" : ""}
                  `}
                  onClick={() => {
                    setValue(item.query); 
                    setOpen(false);
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    
      {error && (
        <p className="text-red-500 text-xs mt-1 pr-2">{error}</p>
      )}

    </div>
  );
}