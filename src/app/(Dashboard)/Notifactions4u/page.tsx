'use client'
import { useState, useEffect } from 'react'
import { DataTable, Column } from '@/components/DashboardComps/ReUsableTable/ui/DataTable'
import { ApiClient } from '@/util/service/api/apiClient'
import { NotificationsAPI, Notification } from '@/util/service/api/DashboardApis/notifications_api'
import { handleAsyncAction } from '@/util/service/api/handleAsync'

const LIMIT = 10

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function getClientToken(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('token') ?? ''
}

const columns: Column<Notification>[] = [
  {
    key: 'title',
    header: 'اعلان',
    render: (row) => (
      <span className={row.isRead ? 'text-zinc-400' : 'font-semibold text-zinc-800'}>
        {row.message}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'تاریخ',
    render: (row) => (
      <span className="text-zinc-500 text-xs">{formatDate(row.createdAt)}</span>
    ),
  },
  {
    key: 'isRead',
    header: '',
    render: (row) =>
      !row.isRead ? (
        <span className="bg-lime-400 text-black text-xs px-3 py-1 rounded-lg flex items-center gap-1 w-fit">
          ✓ علامت گذاری به عنوان خوانده شده
        </span>
      ) : null,
  },
]

const USER_ID = 397 

export default function NotificationsPage() {
  const [data, setData] = useState<Notification[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [typeFilter, setTypeFilter] = useState('همه')

  async function fetchData(p: number) {
    setLoading(true)
    const token = getClientToken()
    const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)
    const api = NotificationsAPI(client)
    const result = await handleAsyncAction(api.getNotifications(USER_ID, p, LIMIT))
    if (result.success) {
      setData(result.data.data)
      setTotalPages(Math.ceil(result.data.totalCount / LIMIT))
    }
    setLoading(false)
  }

  useEffect(() => { fetchData(page) }, [page])

  const filtered = typeFilter === 'همه' ? data : data.filter(n => n.type === typeFilter)

  return (
    <div className="p-6" dir="rtl">
      <DataTable<Notification>
        title="لیست اعلان های شما"
        columns={columns}
        data={filtered}
        loading={loading}
        showSearch={false}
        showFilter={false}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        showAddButton={false}
      />
    </div>
  )
}
