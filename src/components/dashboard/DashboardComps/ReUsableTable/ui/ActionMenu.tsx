'use client'
import { useState, useRef, useEffect } from 'react'

export type ActionItem = {
  label: string
  icon?: string
  onClick: () => void
  className?: string
}

export function ActionMenu({ actions }: { actions: ActionItem[] }) {
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
        className="text-gray-400 hover:text-gray-600 px-1 text-lg font-bold tracking-widest"
      >
        •••
      </button>
      {open && (
        <div className="absolute left-0 top-6 z-50 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120px] py-1">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => { action.onClick(); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-right hover:bg-gray-50 ${action.className ?? 'text-gray-700'}`}
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}