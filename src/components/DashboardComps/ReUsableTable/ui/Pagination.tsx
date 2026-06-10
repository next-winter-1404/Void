
type PaginationProps = {
  current: number
  total: number
  onChange: (page: number) => void
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-1 mt-4" dir="rtl">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-7 h-7 rounded text-sm font-medium transition-colors
            ${p === current
              ? 'bg-green-500 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
        >
          {p}
        </button>
      ))}
      <span className="text-gray-400 text-sm px-1">...</span>
      <button className="w-7 h-7 rounded border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
        ۹
      </button>
    </div>
  )
}
