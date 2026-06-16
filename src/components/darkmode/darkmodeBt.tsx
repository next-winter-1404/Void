"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative
        flex
        items-center
        w-[90px]
        h-[40px]
        rounded-full
        border-3 border-zinc-300
        p-1
        transition-all
      "
    >
      <div
        className={`
          absolute
          w-[32px]
          h-[32px]
          rounded-full
          bg-[#586CFF]
          transition-all
          duration-300
          flex
          items-center
          justify-center
          ${isDark ? "translate-x-[48px]" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <Moon size={18} className="text-black" />
        ) : (
          <Sun size={18} className="text-black" />
        )}
      </div>

      <div className="flex w-full justify-between px-2">
        <Sun size={18} />
        <Moon size={18} />
      </div>
    </button>
  );
}