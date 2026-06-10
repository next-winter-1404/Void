'use client'

import { DataTable, Column } from '@/components/DashboardComps/ReUsableTable/ui/DataTable'
import { StatusBadge } from '@/components/DashboardComps/ReUsableTable/ui/StatusBadge'
import { Pagination } from '@/components/DashboardComps/ReUsableTable/ui/Pagination'

type Reservation = {
  id: number
  propertyName: string
  passengerInfo: string
  reserveDate: string
  amount: string
  reserveStatus: 'تایید شده' | 'لغو شده' | 'در انتظار'
  paymentStatus: 'تایید شده' | 'لغو شده'
}
const reservationsData: Reservation[] = [
  {
    id: 1,
    propertyName: 'ویلا دریایی شمال',
    passengerInfo: 'علی محمدی',
    reserveDate: '1405/03/15',
    amount: '۲,۵۰۰,۰۰۰ تومان',
    reserveStatus: 'تایید شده',
    paymentStatus: 'تایید شده',
  },
  {
    id: 2,
    propertyName: 'آپارتمان تهران',
    passengerInfo: 'سارا احمدی',
    reserveDate: '1405/03/18',
    amount: '۱,۲۰۰,۰۰۰ تومان',
    reserveStatus: 'در انتظار',
    paymentStatus: 'لغو شده',
  },
]

const reservationColumns: Column<Reservation>[] = [
  { key: 'propertyName', header: 'نام ملک' },
  { key: 'passengerInfo', header: 'اطلاعات مسافر' },
  { key: 'reserveDate',   header: 'تاریخ رزرو' },
  { key: 'amount',        header: 'مبلغ' },
  {
    key: 'reserveStatus',
    header: 'وضعیت رزرو',
    render: row => <StatusBadge status={row.reserveStatus} />,
  },
  {
    key: 'paymentStatus',
    header: 'وضعیت پرداخت',
    render: row => <StatusBadge status={row.paymentStatus} />,
  },
]

export default function ReservationListPage() {
  return (
    <DataTable
      title="لیست رزرو های مشتریان"
      columns={reservationColumns}
      data={reservationsData}
      searchPlaceholder="نام مسافر مورد نظر ...."
      getActions={row => [
        { label: 'ثبت رزرو', icon: '✓', onClick: () => {} },
        { label: 'جزئیات',   icon: '☰', onClick: () => {} },
        { label: 'حذف',      icon: '✕', onClick: () => {}, className: 'text-red-500' },
      ]}totalPages={6}
      
    />
  )
}