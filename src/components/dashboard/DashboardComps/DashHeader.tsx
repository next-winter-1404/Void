'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import arrowdash from '@/assets/Images/Dashboard/arrowdash.png'
import Bell2 from '@/assets/Images/Dashboard/Bell2.png'
import { Notification } from '@/util/service/api/DashboardApis/notifications_api'
import UserProfileMenu from './UserProfileMenu'
import DarkMode from "@/components/darkmode/darkmodeBt"
import HOME from "@/assets/homeDash-ico.png"
import { useTheme } from 'next-themes'

function getClientToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

interface JWTPayload {
  id?: number; userId?: number; sub?: number | string
  name?: string; fullName?: string; username?: string
  firstName?: string; lastName?: string; phone?: string
  role?: string; userRole?: string; type?: string
}

function parseToken(token: string): JWTPayload | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonString = decodeURIComponent(
      atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
    )
    return JSON.parse(jsonString)
  } catch { return null }
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'داشبورد',
  '/dashboard/user_info': 'اطلاعات کاربری',
  '/dashboard/house_managment': 'مدیریت املاک',
  '/dashboard/reserve_managment': 'مدیریت رزرو ها',
  '/dashboard/sellerpayment_managment': 'مدیریت مالی',
  '/dashboard/comment_managment': 'مدیریت نظرات',
  '/dashboard/house_favorite': 'علاقه‌مندی‌ها',
  '/dashboard/buyerpayment_managment': 'پرداخت ها',
  '/dashboard/notifactions': 'اعلان ها',
}

interface UserInfo { name: string; role: string; phone?: string; userId: number | null }

export default function DashHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const title = pageTitles[pathname.toLowerCase()] ?? 'داشبورد'

  const [user, setUser]                   = useState<UserInfo | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [dropdownOpen, setDropdownOpen]   = useState(false)
  const [loadingNotifs, setLoadingNotifs] = useState(false)
  const hasFetched                        = useRef(false)
  const dropdownRef                       = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

 
  useEffect(() => {
    const token = getClientToken()
    if (!token) return
    const decoded = parseToken(token)
    if (!decoded) return

    const userId = decoded.id ?? decoded.userId ?? (Number(decoded.sub) || null)
    const name =
      decoded.name ??
      (decoded.firstName && decoded.lastName ? `${decoded.firstName} ${decoded.lastName}` : null) ??
      decoded.fullName ?? decoded.username ?? decoded.phone ?? 'کاربر'
    const role = decoded.role ?? decoded.userRole ?? decoded.type ?? ''
    const phone = decoded.phone

    setUser({ name, role, phone, userId: userId ?? null })
  }, [])


  const fetchNotifications = useCallback(async (userId: number, token: string) => {

    
    if (hasFetched.current) return 
    setLoadingNotifs(true)

   
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${userId}?page=1&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      setNotifications(data?.data ?? [])
      hasFetched.current = true 
    } catch {
      setNotifications([])
    } finally {
      setLoadingNotifs(false)
    }
  }, [])

 
  async function handleDropdownToggle() {
    const next = !dropdownOpen
    setDropdownOpen(next)
    if (next && user?.userId && !hasFetched.current) {
      const token = getClientToken()
      if (token) await fetchNotifications(user.userId, token)
    }
  }

  async function handleMarkAsRead(id: number) {
    const token = getClientToken()
    if (!token) return
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
      }
    } catch {}
  }

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.isRead).length,
    [notifications]
  )
   const { theme } = useTheme()

   const [mounted, setMounted] = useState(false);
  
  
    useEffect(() => setMounted(true), []);
  
    const bgColor = mounted
      ? theme === "dark" ?'bg-[#444444]' : 'bg-white'
      : "bg-[#ECECEC]"; 



    
  return (
    <header className={`flex items-center justify-between p-3 md:p-4 ${bgColor} border border-gray-200 rounded-2xl shadow-sm w-full`}>

      <div className="flex items-center gap-2 font-bold text-base md:text-lg">
        <span className="hidden sm:inline">{title}</span>
        <span className="sm:hidden text-sm">{title}</span>
        <span className="text-gray-400">
          <Image src={arrowdash} alt='>>>' width={30} height={30} />
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4" dir='ltr'>

        {user && (
          <UserProfileMenu
            name={user.name}
            phone={user.phone}
            role={user.role}
            userId={user.userId}
          />
        )}

        <div className="h-6 md:h-8 w-px bg-gray-300" />

        <div className="relative" ref={dropdownRef}>
          <button
            className="p-1.5 md:p-2 text-gray-600 relative"
            onClick={handleDropdownToggle} 
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
            <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden" dir='rtl'>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-bold">اعلان‌ها</span>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {loadingNotifs ? (
                  <li className="p-4 text-center text-sm text-gray-400">در حال بارگذاری...</li>
                ) : notifications.length === 0 ? (
                  <li className="p-4 text-center text-sm text-gray-400">اعلانی وجود ندارد</li>
                ) : notifications.map(n => (
                  <li
                    key={n.id}
                    onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                    className={`flex flex-col gap-1 px-4 py-3 transition-colors ${
                      !n.isRead ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer' : 'bg-white cursor-default opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-gray-400">
                        {new Date(n.createdAt).toLocaleDateString('fa-IR', {
                          year: 'numeric', month: 'long', day: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                        <span className="text-sm font-semibold text-gray-800">{n.title}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-right pr-3.5">{n.message}</p>
                  </li>
                ))}
              </ul>
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <a href="/dashboard/Notifactions" className="text-xs text-blue-500 hover:underline">مشاهده همه اعلان‌ها</a>
                </div>
              )}
            </div>
          )}
        </div>

       
        <button onClick={() => router.push("/home")} className='rounded-full w-8 h-8'>
          <Image alt='home' src={HOME} />
        </button>

        <DarkMode />
      </div>
    </header>
  )
}