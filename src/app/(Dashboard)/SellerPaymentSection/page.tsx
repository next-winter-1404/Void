'use client'
import pin2 from '@/assets/Images/Dashboard/pin2.png'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DataTable, Column } from '@/components/DashboardComps/ReUsableTable/ui/DataTable'
import { getSellerPayments, SellerPayment, PaymentStatus, SortField, SortOrder } from '@/util/service/api/DashboardApis/seller_payments_api'

const LIMIT = 10

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])
}

const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  completed: { label: 'تایید شده',  dot: 'bg-green-500',  bg: 'bg-green-100',  text: 'text-green-700' },
  pending:   { label: 'در انتظار',  dot: 'bg-yellow-400', bg: 'bg-yellow-50',  text: 'text-yellow-700' },
  failed:    { label: 'تایید نشده', dot: 'bg-red-400',    bg: 'bg-red-100',    text: 'text-red-600' },
  refunded:  { label: 'لغو شده',    dot: 'bg-red-400',    bg: 'bg-red-100',    text: 'text-red-600' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start justify-between gap-2">
      <div className="flex flex-col gap-1 text-right flex-1 min-w-0">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-sm sm:text-base font-bold text-gray-800 truncate">{value} تومان</span>
      </div>
      <Image src={pin2} alt="" width={28} height={28} className="shrink-0 mt-0.5 opacity-80" />
    </div>
  )
}

const statsCards = [
  { label: 'درآمد جاری',         value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'درآمد ماه قبل',      value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'درآمد کل',           value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'موجودی قابل پرداخت', value: '۱۱۵،۰۰۰،۰۰۰' },
]
export default function FinancialManagementPage() {
  const router = useRouter()
  const [data, setData]             = useState<SellerPayment[]>([])
  const [loading, setLoading]       = useState(true)
  const [page, setPage]             = useState(1)             
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | ''>('')  
  const [typeFilter, setTypeFilter]     = useState('')
  const [sort]                          = useState<SortField>('createdAt')
  const [order]                         = useState<SortOrder>('DESC')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getSellerPayments({
        page,
        limit: LIMIT,
        sort,
        order,
        ...(statusFilter && { status: statusFilter }),
      })
      setData(res.payments ?? [])
      setTotalCount(res.totalCount ?? 0)
      setTotalPages(Math.max(1, Math.ceil((res.totalCount ?? 0) / LIMIT)))
    } finally {
      setLoading(false)
    }
  }, [page, sort, order, statusFilter])
  useEffect(() => { fetchData() }, [fetchData])

  const columns: Column<SellerPayment>[] = [
    {
      key: 'createdAt',
      header: 'تاریخ',
      render: row => <span className="text-xs text-gray-500">{formatDate(row.createdAt)}</span>,
    },
    {
      key: 'bookingId',
      header: 'شماره پیگیری',
      render: row => <span className="text-gray-700">{String(row.bookingId)}</span>,
    },
    {
      key: 'amount',
      header: 'مبلغ',
      render: row => <span className="font-medium text-gray-800">{formatAmount(row.amount)}</span>,
    },
    {
      key: 'status',
      header: 'وضعیت پرداخت',
      render: row => <StatusBadge status={row.status} />,
    },
    {
      key: 'description',
      header: 'نوع تراکنش',
      render: row => <span className="text-gray-600">{row.description}</span>,
    },
    {
      key: 'actions',
      header: '',
      render: row => (
        <button
          onClick={() => router.push(`/SellerPaymentSection/receipt/${row.id}`)}
          className="text-blue-500 hover:text-blue-600 hover:underline text-xs whitespace-nowrap transition-colors"
        >
          مشاهده رسید
        </button>
      ),
    },
  ]

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-5" dir="rtl">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {statsCards.map(card => (
          <StatsCard key={card.label} label={card.label} value={card.value} />
        ))}
      </div>


      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap border-b border-dashed border-gray-200 pb-4">
          <span className="text-sm font-semibold text-gray-700">
            لیست تراکنش های مشتریان
            {totalCount > 0 && (
              <span className="text-gray-400 font-normal mr-1">({toPersianDigits(totalCount)})</span>
            )}
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value as any); setPage(1) }}
                className="appearance-none border border-gray-200 rounded-xl pl-7 pr-3 py-1.5 text-sm text-gray-600 outline-none focus:border-green-400 bg-white cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="">وضعیت پرداخت</option>
                <option value="completed">تایید شده</option>
                <option value="pending">در انتظار</option>
                <option value="failed">تایید نشده</option>
              </select>
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>

            <div className="relative">
              <select
                value={typeFilter}
                onChange={e => { setTypeFilter(e.target.value); setPage(1) }}
                className="appearance-none border border-gray-200 rounded-xl pl-7 pr-3 py-1.5 text-sm text-gray-600 outline-none focus:border-green-400 bg-white cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="">نوع تراکنش</option>
                <option value="رزرو">رزرو</option>
                <option value="شارژ کیف پول">شارژ کیف پول</option>
              </select>
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>
          </div>
        </div>

        
        <DataTable
          title=""
          columns={columns}
          data={data}
          showFilter={false}
          showSearch={false}
          showAddButton={false}
          loading={loading}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)} 
        />
      </div>
    </div>
  )
}