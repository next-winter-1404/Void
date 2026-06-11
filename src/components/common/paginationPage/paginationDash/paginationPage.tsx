'use client'

import { useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { toPersianFormat } from "@/util/helper/persianFormat"


interface PaginationProps {
  totalPages: number
  defaultLimit?: number
}

type PageItem = number | "..."


function buildPages(current: number, total: number): PageItem[] {
  const maxVisible = 5


  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: PageItem[] = []

  pages.push(1)

  if (current > 3) {
    pages.push("...")
  }

  const start = Math.max(2, current - 1)
  const end   = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push("...")
  }

 
  pages.push(total)

  return pages
}



function usePagination(defaultLimit: number) {
  const router     = useRouter()
  const pathname   = usePathname()
  const searchParams = useSearchParams() 

  const page  = Number(searchParams.get("page"))  || 1
  const limit = Number(searchParams.get("limit")) || defaultLimit

  const goTo = useCallback(
    (nextPage: number) => {
      
      const params = new URLSearchParams(searchParams.toString())
      params.set("page",  String(nextPage))
      params.set("limit", String(limit))
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams, limit]
  )

  return { page, limit, goTo }
}



export default function Pagination({
  totalPages,
  defaultLimit = 3,
}: PaginationProps) {
  const { page, goTo } = usePagination(defaultLimit)

  if (totalPages <= 1) return null

  const pages = buildPages(page, totalPages)

  const btnClass = (active: boolean, disabled = false) => {
    if (disabled) return "w-6 h-6 text-center rounded  cursor-not-allowed"
    if (active)   return "w-6 h-6 text-center rounded bg-green-500 text-white"
    return "w-6 h-6 text-center rounded  hover:bg-gray-100"
  }

  return (
    <div className="w-full bg-[#D9D9D9] p-1 rounded-[8px] flex justify-center space-x-2 " dir="rtl">

      {pages.map((item, idx) =>
        item === "..." ? (
          <span
            key={`dots-${idx}`}
            className="w-6 h-6 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => goTo(item)}
            aria-label={`صفحه ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={btnClass(item === page)}
          >
            {toPersianFormat(item)}
          </button>
        )
      )}

      

    </div>
  )
}