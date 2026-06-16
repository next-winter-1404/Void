'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logout_handler from '@/util/service/authAction/logoutAction'
import warning from '@/assets/Images/Dashboard/warning.png'
interface Props {
  name: string
  phone?: string
  role: string
  userId: number | null
  balance?: string
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
        enabled ? 'bg-green-400' : 'bg-gray-200'
      }`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
        enabled ? 'translate-x-4' : 'translate-x-1'
      }`} />
    </button>
  )
}

function LogoutModal({ onConfirm, onCancel, loading }: {
  onConfirm: () => void; onCancel: () => void; loading: boolean
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 z-10 text-center">
        <Image src={warning} alt="warning" width={72} height={72} className="mx-auto mb-5" />
        <h2 className="text-base font-bold text-gray-800 mb-6">آیا از خروج خود مطمعن هستید؟</h2>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onCancel} className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            انصراف
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {loading ? "..." : "خروج"}
          </button>
        </div>
      </div>
    </div>
  )
}

function NotifSettingsInline({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState({
    reserve:  true,
    payment:  false,
    discount: true,
    system:   true,
  })
  const toggle = (key: keyof typeof settings) => setSettings(p => ({ ...p, [key]: !p[key] }))
  const items: { key: keyof typeof settings; label: string }[] = [
    { key: 'reserve',  label: 'نوتیفیکیشن رزرو' },
    { key: 'payment',  label: 'نوتیفیکیشن پرداخت' },
    { key: 'discount', label: 'نوتیفیکیشن تخفیف' },
    { key: 'system',   label: 'نوتیفیکیشن سیستمی' },
  ]

  return (
    <div className="border-t border-gray-100 px-4 py-3" dir="rtl">
      <div className="flex items-center justify-between gap-5 mb-3">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-red-400 border border-red-200 rounded-full px-2.5 py-0.5 hover:bg-red-50 transition-colors"
        >
          <span>✕</span> بستن
        </button>
        <span className="text-sm font-bold text-gray-800">تنظیمات نوتیفیکیشن</span>
      </div>
      <div className="space-y-3">
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <Toggle enabled={settings[key]} onToggle={() => toggle(key)} />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SellerMenu({ name, phone, balance, onLogout }: {
  name: string; phone?: string; balance?: string; onLogout: () => void
}) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl w-72 overflow-hidden" dir="rtl">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
        <div className="w-9 h-9 bg-gray-200 rounded-lg shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
          {phone && <p className="text-xs text-gray-400 truncate">{phone}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-sm text-gray-500 whitespace-nowrap">{balance ?? '—'} تومان</span>
          <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white text-xs font-bold leading-none shrink-0">+</span>
        </div>
        <span className="text-sm text-gray-700 whitespace-nowrap mr-3">موجودی قابل پرداخت</span>
      </div>

      {/* خروج */}
      <button
        onClick={onLogout}
        className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-400 text-base">→</span>
        <span>خروج</span>
      </button>
    </div>
  )
}

function BuyerMenu({ name, phone, onLogout }: {
  name: string; phone?: string; onLogout: () => void
}) {
  const [showNotif, setShowNotif] = useState(false)

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl w-72 overflow-hidden" dir="rtl">

      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
        <div className="w-9 h-9 bg-gray-200 rounded-lg shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
          {phone && <p className="text-xs text-gray-400 truncate">{phone}</p>}
        </div>
      </div>

      <button className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
        <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white text-xs font-bold leading-none shrink-0">+</span>
        <span className="whitespace-nowrap">شارژ کردن کیف پول</span>
      </button>

      {!showNotif ? (
        <button
          onClick={() => setShowNotif(true)}
          className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <span className="text-gray-400 text-base">→</span>
          <span className="whitespace-nowrap">تنظیمات نوتیفیکیشن</span>
        </button>
      ) : (
        <NotifSettingsInline onClose={() => setShowNotif(false)} />
      )}

      <button
        onClick={onLogout}
        className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-400 text-base">→</span>
        <span className="whitespace-nowrap">خروج</span>
      </button>
    </div>
  )
}

export default function UserProfileMenu({ name, phone, role, userId, balance }: Props) {
  const router = useRouter()
  const [open, setOpen]             = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleLogoutConfirm = () => {
    startTransition(async () => {
      await logout_handler({ success: false, status: 0 })
      router.push('/login')
    })
  }

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-semibold leading-tight">{name}</p>
            <p className="text-[11px] md:text-xs text-gray-400">
              {role === 'seller' ? 'فروشنده' : role === 'buyer' ? 'خریدار' : role}
            </p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg flex-shrink-0" />
        </button>

        {open && (
          role === 'seller' ? (
            <SellerMenu
              name={name}
              phone={phone}
              balance={balance}
              onLogout={() => { setOpen(false); setShowLogout(true) }}
            />
          ) : (
            <BuyerMenu
              name={name}
              phone={phone}
              onLogout={() => { setOpen(false); setShowLogout(true) }}
            />
          )
        )}
      </div>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogout(false)}
          loading={isPending}
        />
      )}
    </>
  )
}