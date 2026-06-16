'use client'

import { useRouter } from 'next/navigation'
import { UserPayment } from '@/util/service/api/DashboardApis/user_payments_api'

const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string; border: string }> = {
  completed: { label: 'تایید شده',  dot: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  pending:   { label: 'در انتظار',  dot: 'bg-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  failed:    { label: 'ناموفق',     dot: 'bg-red-400',    bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200'   },
  refunded:  { label: 'مسترد شده', dot: 'bg-red-400',    bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200'   },
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
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

interface Props {
  payment: UserPayment | null
}

export default function ReceiptClient({ payment }: Props) {
  const router = useRouter()

  if (!payment) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-xl">✕</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">رسید یافت نشد</p>
          <button
            onClick={() => router.back()}
            className="text-sm text-green-500 hover:text-green-600 hover:underline transition-colors"
          >
            بازگشت
          </button>
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

        <div className={`rounded-2xl border p-5 flex items-center justify-between ${cfg.bg} ${cfg.border}`}>
          <div>
            <p className="text-xs text-gray-500 mb-2">وضعیت پرداخت</p>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 mb-1">مبلغ تراکنش</p>
            <p className="text-xl font-extrabold text-gray-800">{formatAmount(payment.amount)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            اطلاعات تراکنش
          </p>
          <InfoRow label="شناسه تراکنش"   value={toPersianDigits(payment.id)} />
          <InfoRow label="شماره رزرو"     value={toPersianDigits(payment.bookingId)} />
          <InfoRow label="مبلغ"           value={formatAmount(payment.amount)} />
          <InfoRow label="نوع تراکنش"    value={payment.description} />
          <InfoRow label="تاریخ"          value={formatDate(payment.createdAt)} />
          {payment.transactionId && (
            <InfoRow label="شناسه پرداخت" value={payment.transactionId} />
          )}
        </div>

        {payment.paymentUrl && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              لینک پرداخت
            </p>
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