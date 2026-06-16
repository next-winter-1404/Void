'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClient } from '@/util/service/api/apiClient'
import { UserPaymentsAPI, UserPayment } from '@/util/service/api/DashboardApis/user_payments_api'
import { SellerCommentsAPI } from '@/util/service/api/DashboardApis/seller_comments_api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'

function getClientToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : undefined
}

function getUserIdFromToken(): number | null {
  const token = getClientToken()
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id ?? payload.userId ?? null
  } catch { return null }
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d])
}
function TransactionsPanel({ onClose }: { onClose: () => void }) {
  const [payments, setPayments] = useState<UserPayment[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const token = getClientToken()
    const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)
    handleAsyncAction(UserPaymentsAPI(client).getPayments({ limit: 5 }))
      .then(res => { if (res.success) setPayments(res.data.payments ?? []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="absolute top-0 left-[calc(100%+8px)] bg-white rounded-2xl shadow-2xl border border-gray-100 z-10 overflow-hidden"
      style={{ width: '380px' }}
      dir="rtl"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-red-400 border border-red-200 rounded-full px-2.5 py-1 hover:bg-red-50 transition-colors"
        >
          <span>✕</span> بستن
        </button>
        <h2 className="text-sm font-bold text-gray-800">لیست تراکنش های شما</h2>
      </div>

      {loading ? (
        <div className="py-8 text-center">
          <div className="inline-block w-4 h-4 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
        </div>
      ) : payments.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-400">تراکنشی یافت نشد</div>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-2.5 px-4 text-right font-semibold text-gray-500">تاریخ</th>
              <th className="py-2.5 px-4 text-right font-semibold text-gray-500">شماره پیگیری</th>
              <th className="py-2.5 px-4 text-right font-semibold text-gray-500">مبلغ</th>
              <th className="py-2.5 px-4" />
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={p.id ?? i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-2.5 px-4 text-gray-500 whitespace-nowrap">{formatDate(p.createdAt)}</td>
                <td className="py-2.5 px-4 text-gray-700">{toPersianDigits(p.bookingId)}</td>
                <td className="py-2.5 px-4 font-medium text-gray-800 whitespace-nowrap">{formatAmount(p.amount)}</td>
                <td className="py-2.5 px-4">
                  <a href={`/BuyerPayment/receipt/${p.id}`}
                    className="text-blue-400 hover:underline whitespace-nowrap">
                    مشاهده رسید
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
function WalletPopup({ onClose }: { onClose: () => void }) {
  const [showTransactions, setShowTransactions] = useState(false)

  return (
    <div dir="rtl">
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-52">
          <button
            onClick={() => {}}
            className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-800 font-medium hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold leading-none">+</span>
            <span>شارژ کردن کیف پول</span>
          </button>

          <button
            onClick={() => setShowTransactions(v => !v)}
            className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-100 ${
              showTransactions ? 'text-green-600 bg-green-50' : 'text-gray-800'
            }`}
          >
            <span className="text-gray-400 text-base">→</span>
            <span>لیست تراکنش ها</span>
          </button>

          <button
            onClick={() => {}}
            className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-gray-800 font-medium hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-400 text-base">→</span>
            <span>برداشت وجه</span>
          </button>
        </div>
        {showTransactions && (
          <TransactionsPanel onClose={() => setShowTransactions(false)} />
        )}
      </div>
    </div>
  )
}
export function BuyerWalletWidget() {
  const [showWallet, setShowWallet] = useState(false)
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowWallet(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleOpen = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPopupStyle({
        position: 'fixed',
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
        zIndex: 300,
      })
    }
    setShowWallet(v => !v)
  }

  return (
    <div className="relative cursor-pointer" ref={ref}>
      <button
        onClick={handleOpen}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-gray-300 hover:bg-gray-50/50 transition-all"
        dir="rtl"
      >
        <div className="flex items-center gap-2 justify-center">
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <rect x="1" y="1" width="26" height="20" rx="3" fill="#1f2937"/>
            <rect x="1" y="7" width="26" height="5" fill="#374151"/>
            <rect x="3" y="15" width="8" height="2" rx="1" fill="#6b7280"/>
          </svg>
          <span className="text-base font-bold text-gray-800">کیف پول</span>
        </div>
        <span className="text-xs text-gray-400">عدم موجودی</span>
      </button>

      {showWallet && (
        <div style={popupStyle} dir="rtl">
          <WalletPopup onClose={() => setShowWallet(false)} />
        </div>
      )}
    </div>
  )
}

export function SellerCommentsWidget() {
  const router = useRouter()
  const [commentCount, setCommentCount] = useState<number | null>(null)

  useEffect(() => {
    const token  = getClientToken()
    const userId = getUserIdFromToken()
    if (!userId) return
    const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)
    handleAsyncAction(SellerCommentsAPI(client).getComments(userId, { limit: 1 }))
      .then(res => { if (res.success) setCommentCount(res.data.totalCount ?? 0) })
  }, [])

  return (
    <button
      onClick={() => router.push('/dashboard/SellerComments')}
      className="cursor-pointer w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-gray-300 hover:bg-gray-50/50 transition-all"
      dir="rtl"
    >
      <div className="flex items-center gap-2 justify-center">
        <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <rect x="0" y="0" width="16" height="8" rx="2" fill="white"/>
            <rect x="2" y="2" width="12" height="1.5" rx="0.75" fill="#1f2937"/>
            <rect x="2" y="5" width="8" height="1.5" rx="0.75" fill="#1f2937"/>
          </svg>
        </div>
        <span className="text-base font-bold text-gray-800">نظرات جدید</span>
      </div>
      <span className="text-xs text-gray-400">
        {commentCount !== null ? `${toPersianDigits(commentCount)} نظر` : '...'}
      </span>
    </button>
  )
}