'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable, Column } from '@/components/DashboardComps/ReUsableTable/ui/DataTable'
import { StatusBadge } from '@/components/DashboardComps/ReUsableTable/ui/StatusBadge'
// import { ActionMenu } from '@/components/DashboardComps/ReUsableTable/ui/ActionMenu'
import { getSellerPayments, SellerPayment, PaymentStatus, SortField, SortOrder } from '@/util/service/api/DashboardApis/seller_payments_api'

const LIMIT = 10

const statusMap: Record<PaymentStatus, string> = {
  pending: 'در انتظار',
  completed: 'تایید شده',
  failed: 'لغو شده',
  refunded: 'لغو شده',
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('fa-IR') + ' تومان'
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fa-IR')
}

const statsCards = [
  { label: 'درآمد جاری', value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'درآمد ماه قبل', value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'درآمد کل', value: '۱۱۵،۰۰۰،۰۰۰' },
  { label: 'موجودی قابل پرداخت', value: '۱۱۵،۰۰۰،۰۰۰' },
]

export default function FinancialManagementPage() {
  const router = useRouter()
  const [data, setData] = useState<SellerPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | ''>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [sort, setSort] = useState<SortField>('createdAt')
  const [order, setOrder] = useState<SortOrder>('DESC')

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
      render: row => formatDate(row.createdAt),
    },
    {
      key: 'bookingId',
      header: 'شماره پیگیری',
      render: row => String(row.bookingId),
    },
    {
      key: 'amount',
      header: 'مبلغ',
      render: row => formatAmount(row.amount),
    },
    {
      key: 'status',
      header: 'وضعیت پرداخت',
      render: row => (
        <StatusBadge status={statusMap[row.status] as any} />
      ),
    },
    {
      key: 'description',
      header: 'نوع تراکنش',
      render: row => row.description,
    },
    {
      key: 'actions',
      header: '',
      render: row => (
        <button
          onClick={() => router.push(`/SellerPaymentSection/receipt/${row.id}`)}
          className="text-blue-500 hover:underline text-xs whitespace-nowrap"
        >
          مشاهده رسید
        </button>
      ),
    },
  ]

  return (
    <div className="p-4 font-[Vazirmatn,sans-serif]" dir="rtl">
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statsCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-1">
            <span className="text-xs text-gray-500">{card.label}</span>
            <span className="text-base font-bold text-gray-800">{card.value} تومان</span>
          </div>
        ))}
      </div>

      <div className='bg-white rounded-2xl p-5'>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-sm text-gray-600">لیست تراکنش های مشتریان</span>
        <div className="flex items-center gap-2 mr-auto ">
          
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as any); setPage(1) }}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-green-400"
          >
            <option value="">وضعیت پرداخت</option>
            <option value="completed">تایید شده</option>
            <option value="pending">در انتظار</option>
            <option value="failed">لغو شده</option></select>
          
          <select
            value={typeFilter}
            onChange={e => { setTypeFilter(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-green-400"
          >
            <option value="">نوع تراکنش</option>
            <option value="رزرو">رزرو</option>
            <option value="شارژ کیف پول">شارژ کیف پول</option>
          </select>
        </div>
      </div>

      
      {loading ? (
        <div className="text-center py-10 text-gray-400">در حال بارگذاری...</div>
      ) : (
        <DataTable
          title=""
          columns={columns}
          data={data}
          showFilter={false}
          showAddButton={false}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          showSearch={false}
        />
      )}
      </div>
    </div>
  )
}
