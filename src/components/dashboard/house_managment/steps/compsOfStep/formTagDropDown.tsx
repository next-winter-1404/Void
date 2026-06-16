"use client";

import { useEffect, useRef, useState } from "react";

export interface DropDownItem {
  id: number;
  name: string;
  query: string;
}

interface FormTagDropdownProps {
  name: string;
  label: string;
  items: DropDownItem[];
  defaultValue?: string[];
  error?: string;
  placeholder?: string;
}

export default function FormTagDropdown({
  name,
  label,
  items,
  defaultValue = [],
  error,
  placeholder = "انتخاب کنید",
}: FormTagDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const toggleItem = (query: string) => {
    setSelected((prev) =>
      prev.includes(query)
        ? prev.filter((x) => x !== query)
        : [...prev, query]
    );
  };

  return (
    <div className="w-full px-3 " ref={wrapperRef}>
      <label className="block mb-3 pr-2 text-[14px] font-medium">
        {label}
      </label>

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(selected)}
      />

      <div className="relative">
        <div
          onClick={() => setOpen((v) => !v)}
          className={`
            min-h-[50px] cursor-pointer rounded-[16px] border bg-white p-3
            ${error ? "border-red-400" : "border-gray-300"}
          `}
        >
          <div className="flex flex-wrap gap-2">
            {selected.length === 0 ? (
              <span className="text-sm text-gray-400">
                {placeholder}
              </span>
            ) : (
              selected.map((query) => {
                const item = items.find((i) => i.query === query);

                return (
                  <button
                    key={query}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(query);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-lime-400 px-3 py-1 text-sm"
                  >
                    <span>✕</span>
                    <span>{item?.name}</span>
                  </button>
                );
              })
            )}
          </div>

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>

        {open && (
          <ul className="absolute top-full z-50 mt-1 max-h-56 w-full overflow-auto rounded-xl border bg-white shadow-lg">
            {items.map((item) => {
              const active = selected.includes(item.query);

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.query)}
                    className={`
                      w-full px-4 py-3 text-right text-sm
                      hover:bg-gray-100
                      ${
                        active
                          ? "bg-lime-100 font-medium"
                          : ""
                      }
                    `}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1 pr-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}