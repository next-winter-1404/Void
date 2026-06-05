"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CalendarPlus,
  Heart,
  CreditCard,
  Bell,
  Wallet,
  X,
  Menu,
} from "lucide-react";

interface NavItem {
  href: string;
  labelFa: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/dashboard",     labelFa: "داشبورد",        icon: <LayoutDashboard size={18} /> },
  { href: "/profile",       labelFa: "اطلاعات کاربری", icon: <User size={18} /> },
  { href: "/reservations",  labelFa: "مدیریت رزروها",  icon: <CalendarPlus size={18} /> },
  { href: "/favorites",     labelFa: "علاقه‌مندی‌ها",  icon: <Heart size={18} /> },
  { href: "/payments",      labelFa: "پرداخت‌ها",      icon: <CreditCard size={18} /> },
  { href: "/notifications", labelFa: "اعلان‌ها",       icon: <Bell size={18} /> },
];

// ─── Shared nav tree ────────────────────────────────────────────────────────
interface SidebarContentProps {
  pathname: string;
  onClose?: () => void;
}

function SidebarContent({ pathname, onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full direction-rtl" dir="rtl">
      {/* Logo */}
      <div className="text-[28px] font-bold text-[#1a1a2e] text-center px-4 py-6 border-b border-[#e8e6f0] tracking-tight">
        دلتا
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150",
                "font-[Vazirmatn,Tahoma,sans-serif]",
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-semibold"
                  : "text-gray-500 hover:bg-[#f0eefb] hover:text-[#3C3489]",
              ].join(" ")}
            >
              <span className="shrink-0 text-current">{item.icon}</span>
              {item.labelFa}
            </Link>
          );
        })}
      </nav>

      {/* Wallet */}
      <div className="mx-3 mb-4 px-3 py-3 border-2 border-dashed border-[#c8c4e8] rounded-xl">
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-[#3C3489] shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#3C3489] font-[Vazirmatn,Tahoma,sans-serif]">
              کیف پول
            </p>
            <p className="text-[11px] text-gray-400 font-[Vazirmatn,Tahoma,sans-serif]">
              عدم موجودی
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Sidebar component ──────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop sidebar (md and up) ── */}
      <aside className="hidden md:flex w-[220px] h-screen sticky top-0 shrink-0 flex-col bg-white border-l border-[#e8e6f0] overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── Hamburger button (mobile only) ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="باز کردن منو"
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu size={20} className="text-gray-700" />
      </button>

      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={[
          "md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-250",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Drawer panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="منو"
        className={[
          "md:hidden fixed top-0 right-0 h-full w-[260px] z-50",
          "bg-white shadow-2xl overflow-y-auto",
          "transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="بستن منو"
          className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-lg bg-[#f5f4fb] hover:bg-[#e8e6f5] text-gray-500 transition-colors"
        >
          <X size={16} />
        </button>

        <SidebarContent pathname={pathname} onClose={() => setOpen(false)} />
      </aside>
    </>
  );
}