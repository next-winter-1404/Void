'use client'
import { ReactNode, useState, useEffect, useRef } from 'react'

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

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])
}

function Pagination({
  current, total, onChange,
}: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null

  const pages = total <= 7
    ? Array.from({ length: total }, (_, i) => i + 1)
    : [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1 flex-wrap" dir="rtl">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
            p === current
              ? 'bg-green-400 text-white shadow-sm'
              : 'bg-white border border-zinc-200 text-zinc-600 hover:border-green-300 hover:text-green-600'
          }`}
        >
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 7 && (
        <>
          <span className="text-zinc-300 text-sm px-0.5">•••</span>
          <button
            onClick={() => onChange(total)}
            className={`w-8 h-8 rounded-lg border text-sm font-medium transition-all ${
              current === total
                ? 'bg-green-400 text-white border-green-400'
                : 'border-zinc-200 text-zinc-600 hover:border-green-300 hover:text-green-600'
            }`}
          >
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  )
}
function MobileCard<T extends { id?: string | number }>({
  row,
  columns,
  getActions,
  index,
}: {
  row: T
  columns: Column<T>[]
  getActions?: (row: T) => ActionItem[]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const [titleCol, ...restCols] = columns

  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-4 shadow-sm space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold text-zinc-800">
          {titleCol.render
            ? titleCol.render(row)
            : String((row as Record<string, unknown>)[String(titleCol.key)] ?? '')}
        </div>
        {getActions && (
          <ActionMenu actions={getActions(row)} />
        )}
      </div>

      <div className="space-y-1.5">
        {restCols.map(col => {
          const val = col.render
            ? col.render(row)
            : String((row as Record<string, unknown>)[String(col.key)] ?? '')
          if (!val || val === '') return null
          return (
            <div key={String(col.key)} className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-400 text-xs shrink-0">{col.header}</span>
              <span className="text-zinc-700 text-right">{val}</span>
            </div>
          )
        })}
      </div>
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

  const handlePageChange = (p: number) => {
    onPageChange?.(p)
  }

  return (
    <div className="relative w-full bg-white rounded-2xl" dir="rtl">

      {(title || showSearch || showFilter || showBackButton || showAddButton) && (
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap border-b border-zinc-200 pb-4 border-dashed px-1">
          {title && <h2 className="text-base font-bold text-zinc-800 whitespace-nowrap">{title}</h2>}
          <div className="flex items-center gap-3 flex-1 justify-end flex-wrap">
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
                    className="border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-500 outline-none w-40 sm:w-56 bg-white focus:border-green-400 transition-colors"
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
      )}

      <div className="hidden sm:block rounded-2xl border border-zinc-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              {getActions && <th className="py-3 px-4 w-10" />}
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={`py-3 px-4 text-right font-semibold text-zinc-500 text-xs whitespace-nowrap ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (getActions ? 1 : 0)} className="py-14 text-center">
                  <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
                  <p className="text-sm text-zinc-400 mt-2">در حال بارگذاری...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (getActions ? 1 : 0)} className="text-center py-12 text-zinc-400 text-sm">
                  داده‌ای یافت نشد
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id ?? i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors">
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

      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-zinc-400 mt-2">در حال بارگذاری...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 text-sm">داده‌ای یافت نشد</div>
        ) : (
          data.map((row, i) => (
            <MobileCard key={row.id ?? i} row={row} columns={columns} getActions={getActions} index={i} />
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 flex-wrap gap-2 px-1">
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
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
      )}

      {!loading && totalPages <= 1 && showAddButton && (
        <div className="flex justify-end mt-4 px-1">
          <button
            onClick={onAddClick}
            className="flex items-center gap-1 bg-[#8BDB3E] hover:bg-[#7cc936] text-black px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <span className="text-lg">⊕</span>
            {addButtonLabel}
          </button>
        </div>
      )}
    </div>
  )
}