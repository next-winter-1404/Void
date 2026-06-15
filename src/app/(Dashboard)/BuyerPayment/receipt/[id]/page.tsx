'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ApiClient } from '@/util/service/api/apiClient'
import { UserPaymentsAPI, UserPayment } from '@/util/service/api/DashboardApis/user_payments_api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'

const statusLabels: Record<string, string> = {
  pending:   'در انتظار',
  completed: 'تایید شده',
}

const statusConfig: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  completed: { dot: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  pending:   { dot: 'bg-red-400',    bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200'   },
  failed:    { dot: 'bg-red-400',    bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200'   },
  refunded:  { dot: 'bg-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200'},
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d])
}

function InfoRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
      <span className="text-gray-400 text-sm shrink-0">{label}</span>
      <span className="text-gray-800 text-sm font-medium text-right">{String(value ?? '—')}</span>
    </div>
  )
}

export default function UserPaymentReceiptPage() {
  const { id } = useParams()
  const router = useRouter()
  const [payment, setPayment] = useState<UserPayment | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? undefined : undefined
    const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)
    const api = UserPaymentsAPI(client)

    handleAsyncAction(api.getPayments({ limit: 100 })).then(res => {
      if (res.success) {
        const found = res.data.payments?.find((p: UserPayment) => String(p.id) === String(id))
        setPayment(found ?? null)
        if (!found) setError(true)
      } else {
        setError(true)
      }
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="inline-block w-6 h-6 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 mt-3">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (error || !payment) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-3">
          <p className="text-sm text-red-400">رسید یافت نشد</p>
          <button onClick={() => router.back()} className="text-sm text-green-500 hover:underline">بازگشت</button>
        </div>
      </div>
    )
  }

  const cfg = statusConfig[payment.status] ?? statusConfig.pending

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8" dir="rtl">
      <div className="w-full max-w-md space-y-4">

        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-gray-800">رسید پرداخت</h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span>←</span> بازگشت
          </button>
        </div>
        <div className={`rounded-2xl border p-4 flex items-center justify-between ${cfg.bg} ${cfg.border}`}>
          <div>
            <p className="text-xs text-gray-400 mb-1.5">وضعیت پرداخت</p>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {statusLabels[payment.status] ?? payment.status}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-400 mb-1">مبلغ تراکنش</p>
            <p className="text-lg font-bold text-gray-800">{formatAmount(payment.amount)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">اطلاعات تراکنش</p>
          <InfoRow label="شناسه تراکنش"  value={toPersianDigits(payment.id)} />
          <InfoRow label="شماره رزرو"    value={toPersianDigits(payment.bookingId)} />
          <InfoRow label="مبلغ"          value={formatAmount(payment.amount)} />
          <InfoRow label="نوع تراکنش"   value={payment.description} />
          <InfoRow label="تاریخ"         value={formatDate(payment.createdAt)} />
          {payment.transactionId && (
            <InfoRow label="شناسه پرداخت" value={payment.transactionId} />
          )}
        </div>

        {payment.paymentUrl && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">لینک پرداخت</p>
            <a
              href={payment.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline break-all transition-colors"
            >
              {payment.paymentUrl}
            </a>
          </div>
        )}

      </div>
    </div>
  )
}