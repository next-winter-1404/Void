'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getSellerPayments, SellerPayment } from '@/util/service/api/DashboardApis/seller_payments_api'

const statusLabels: Record<string, string> = {
  pending: 'در انتظار',
  completed: 'تایید شده',
  failed: 'لغو شده',
  refunded: 'مسترد شده',
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fa-IR')
}

export default function ReceiptPage() {
  const { id } = useParams()
  const router = useRouter()
  const [payment, setPayment] = useState<SellerPayment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSellerPayments({ limit: 100 }).then(res => {
      const found = res.payments?.find(p => String(p.id) === String(id))
      setPayment(found ?? null)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
  if (!payment) return <div className="p-8 text-center text-red-400">رسید یافت نشد</div>

  const rows = [
    { label: 'شناسه تراکنش', value: payment.id },
    { label: 'شماره رزرو', value: payment.bookingId },
    { label: 'مبلغ', value: formatAmount(payment.amount) },
    { label: 'وضعیت', value: statusLabels[payment.status] ?? payment.status },
    { label: 'توضیحات', value: payment.description },
    { label: 'تاریخ', value: formatDate(payment.createdAt) },
    { label: 'نام اقامتگاه', value: payment.booking?.house?.title ?? '—' },
    { label: 'فروشنده', value: payment.booking?.house?.sellerName ?? '—' },
    { label: 'تاریخ رزرو', value: payment.booking?.reservedDates?.join(' تا ') ?? '—' },
    { label: 'ایمیل', value: payment.booking?.sharedEmail ?? '—' },
    { label: 'موبایل', value: payment.booking?.sharedMobile ?? '—' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-[Vazirmatn,sans-serif]" dir="rtl">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-gray-800">رسید پرداخت</h1>
          <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700">
            ← بازگشت
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {rows.map(row => (
            <div key={row.label} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-500">{row.label}</span>
              <span className="text-gray-800 font-medium">{String(row.value)}</span>
            </div>
          ))}
        </div>

        {payment.booking?.traveler_details?.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-bold text-gray-700 mb-2">اطلاعات مسافران</p>
            {payment.booking.traveler_details.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-2 space-y-1">
                <div>نام: {t.firstName} {t.lastName}</div>
                <div>کد ملی: {t.nationalId}</div>
                <div>تاریخ تولد: {t.birthDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}