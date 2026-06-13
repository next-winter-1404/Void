'use client'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import arrowdash from '@/assets/Images/Dashboard/arrowdash.png'
import moon from '@/assets/Images/Dashboard/moon.png'
import Sun from '@/assets/Images/Dashboard/Sun.png'
import Bell2 from '@/assets/Images/Dashboard/Bell2.png'
import { ApiClient } from '@/util/service/api/apiClient'
import { NotificationsAPI, Notification } from '@/util/service/api/DashboardApis/notifications_api'

function getClientToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

interface JWTPayload {
  id?: number
  userId?: number
  sub?: number | string
  name?: string
  fullName?: string
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: string
  userRole?: string
  type?: string
}

function parseToken(token: string): JWTPayload | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonString = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    return JSON.parse(jsonString)
  } catch {
    return null
  }
}
const pageTitles: { [key: string]: string } = {
  '/dashboard': 'داشبورد',
  '/dashboard/user_info': 'اطلاعات کاربری',
  '/dashboard/house_managment': 'مدیریت املاک',
  '/customersreservationlist': 'مدیریت رزرو ها',
  '/sellerpayмentsection': 'مدیریت مالی',
  '/sellercomments': 'مدیریت نظرات',
  '/favorites': 'علاقه‌مندی‌ها',
  '/buyerpayment': 'پرداخت ها',
  '/notifactions4u': 'اعلان ها',
}

const roleLabel: { [key: string]: string } = {
  seller: 'فروشنده',
  buyer: 'خریدار',
}

interface UserInfo { name: string; role: string; userId: number | null }

export default function DashHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname.toLowerCase()] ?? 'داشبورد'

  const [user, setUser]                   = useState<UserInfo | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [dropdownOpen, setDropdownOpen]   = useState(false)
  const [loadingNotifs, setLoadingNotifs] = useState(false)
  const dropdownRef                       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const token = getClientToken()
    if (!token) return
    const decoded = parseToken(token)
    if (!decoded) return

    const userId = decoded.id ?? decoded.userId ?? (Number(decoded.sub) || null)

    const name =
      decoded.name ??
      (decoded.firstName && decoded.lastName
        ? `${decoded.firstName} ${decoded.lastName}`
        : null) ??
      decoded.fullName ??
      decoded.username ??
      decoded.phone ??
      'کاربر'

    const role = decoded.role ?? decoded.userRole ?? decoded.type ?? ''
    setUser({ name, role, userId: userId ?? null })
  }, [])

  const fetchNotifications = useCallback(async (userId: number, token: string) => {
    setLoadingNotifs(true)
    try {
      const client = new ApiClient(process.env.NEXT_PUBLIC_BASE_URL!, token)
      const res = await NotificationsAPI(client).getNotifications(userId, 1, 10, 'همه')
      setNotifications(res.data ?? [])
    } catch {
      setNotifications([])
    } finally {
      setLoadingNotifs(false)
    }
  }, [])

  useEffect(() => {
    if (!user?.userId) return
    const token = getClientToken()
    if (!token) return
    fetchNotifications(user.userId, token)
  }, [user?.userId, fetchNotifications])

  const unreadCount = notifications.filter(n => !n.isRead).length

  async function handleMarkAsRead(id: number) {
    const token = getClientToken()
    if (!token) return
    try {
      const client = new ApiClient(process.env.NEXT_PUBLIC_BASE_URL!, token)
      await NotificationsAPI(client).markAsRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    } catch {}
  }

  return (
    <header className="flex items-center justify-between p-3 md:p-4 bg-white border border-gray-200 rounded-2xl shadow-sm w-full">

      <div className="flex items-center gap-2 font-bold text-base md:text-lg">
        <span className="hidden sm:inline">{title}</span>
        <span className="sm:hidden text-sm">{title}</span>
        <span className="text-gray-400">
          <Image src={arrowdash} alt='>>>' width={16} height={16} />
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4" dir='ltr'>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-semibold leading-tight">
              {user?.name ?? '---'}
            </p>
            <p className="text-[11px] md:text-xs text-gray-400">
              {roleLabel[user?.role ?? ''] ?? user?.role ?? '---'}
            </p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg flex-shrink-0" />
        </div>

        <div className="h-6 md:h-8 w-px bg-gray-300" />

        <div className="relative" ref={dropdownRef}>
          <button
            className="p-1.5 md:p-2 text-gray-600 relative"
            onClick={() => setDropdownOpen(p => !p)}
            aria-label="اعلان‌ها"
          >
            <Image src={Bell2} alt='notifications' width={20} height={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {dropdownOpen && (
            <div
              className="absolute left-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden"
              dir='rtl'
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400">
                  {unreadCount} خوانده نشده
                </span>
                <span className="text-sm font-bold">اعلان‌ها</span>
              </div>

              <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {loadingNotifs ? (
                  <li className="p-4 text-center text-sm text-gray-400">در حال بارگذاری...</li>
                ) : notifications.length === 0 ? (
                  <li className="p-4 text-center text-sm text-gray-400">اعلانی وجود ندارد</li>
                ) : (
                  notifications.map(n => (
                    <li
                      key={n.id}
                      onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                      className={`flex flex-col gap-1 px-4 py-3 transition-colors
                        ${!n.isRead
                          ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer'
                          : 'bg-white cursor-default opacity-70'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-gray-400">
                          {new Date(n.createdAt).toLocaleDateString('fa-IR', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {!n.isRead && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-gray-800">{n.title}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-right pr-3.5">{n.message}</p>
                    </li>
                  ))
                )}
              </ul>

              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <a href="/notifactions4u" className="text-xs text-blue-500 hover:underline">
                    مشاهده همه اعلان‌ها
                  </a>
                </div>
              )}
            </div>
          )}
        </div>


        <div className="flex items-center bg-gray-100 p-1 rounded-full w-16 md:w-20 justify-between">
          <span className="bg-green-400 p-1 rounded-full text-white">
            <Image src={Sun} alt='light mode' width={14} height={14} />
          </span>
          <span className="p-1">
            <Image src={moon} alt='dark mode' width={14} height={14} />
          </span>
        </div>

      </div>
    </header>
  )
}