'use client'
import { ReactNode, useState, useEffect, useRef } from 'react'
import { Pagination } from './Pagination'

export type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
  className?: string
}

export type ActionItem = {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}

function ActionMenu({ actions }: { actions: ActionItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="text-zinc-400 hover:text-zinc-600 px-2 py-1 rounded text-lg leading-none"
      >
        •••
      </button>
      {open && (
        <div className="absolute left-0 top-8 z-50 bg-white rounded-xl shadow-lg border border-zinc-100 py-1 min-w-[90px]" dir="rtl">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={() => { a.onClick(); setOpen(false) }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-zinc-50 ${
                a.variant === 'danger' ? 'text-red-500' : 'text-zinc-700'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type DataTableProps<T> = {
  title: string
  columns: Column<T>[]
  data: T[]
  searchPlaceholder?: string
  showSearch?: boolean
  showFilter?: boolean
  showAddButton?: boolean
  addButtonLabel?: string
  onAddClick?: () => void
  getActions?: (row: T) => ActionItem[]
  showBackButton?: boolean
  onBackClick?: () => void
  totalPages?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  loading?: boolean
}

export function DataTable<T extends { id?: string | number }>({
  title,
  columns,
  data,
  searchPlaceholder = 'جستجو...',
  showFilter = true,
  showAddButton = false,
  addButtonLabel = 'افزودن',
  onAddClick,
  getActions,
  showSearch,
  showBackButton = false,
  onBackClick,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  loading = false,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(currentPage)

  const handlePageChange = (p: number) => {
    setPage(p)
    onPageChange?.(p)
  }

  const pages = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [1, 2, 3, 4, 5, '...', totalPages]

  return (
    <div className="relative w-full bg-white p-5 rounded-2xl" dir="rtl">

      
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap border-b border-zinc-200 pb-5 border-dashed">
        <h2 className="text-base font-bold text-zinc-800 whitespace-nowrap">{title}</h2><div className="flex items-center gap-3 flex-1 justify-end flex-wrap">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700"
            >
              <span>◀</span>
              <span>مشاهده همه</span>
            </button>
          ) : (
            <>
              {showSearch && (
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-500 outline-none w-48 sm:w-64 bg-white"
                  dir="rtl"
                />
              )}
              {showFilter && (
                <button className="bg-[#8BDB3E] hover:bg-[#7cc936] text-black text-sm px-5 py-2 rounded-xl transition-colors">
                  فیلتر ها
                </button>
              )}
            </>
          )}
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-100">
              {getActions && <th className="py-3 px-4 w-10" />}
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={`py-3 px-4 text-right font-semibold text-zinc-700 whitespace-nowrap ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (getActions ? 1 : 0)} className="text-center py-8 text-zinc-400">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (getActions ? 1 : 0)} className="text-center py-8 text-zinc-400">
                  داده‌ای یافت نشد
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id ?? i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                  {getActions && (
                    <td className="py-3 px-4">
                      <ActionMenu actions={getActions(row)} />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={String(col.key)}
                      className={`py-3 px-4 text-zinc-700 whitespace-nowrap ${col.className ?? ''}`}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap" dir="ltr">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => typeof p === 'number' && handlePageChange(p)}
              disabled={p === '...'}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${p === page
                  ? 'bg-lime-500 text-white'
                  : p === '...'
                    ? 'bg-transparent text-zinc-400 cursor-default'
                    : 'bg-zinc-300 border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
            >
              {p}
            </button>
          ))}
        </div>

        {showAddButton && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-1 bg-[#8BDB3E] hover:bg-[#7cc936] text-black px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <span className="text-lg">⊕</span>
            {addButtonLabel}
          </button>
        )}
      </div>
    </div>
  )
}
