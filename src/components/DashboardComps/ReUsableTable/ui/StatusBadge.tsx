
type StatusType = 
  | 'تایید شده' 
  | 'لغو شده' 
  | 'در انتظار' 
  | 'فعال' 
  | 'غیرفعال'

const statusStyles: Record<StatusType, string> = {
  'تایید شده': 'bg-green-100 text-green-700 border border-green-300',
  'لغو شده':   'bg-red-100 text-red-500 border border-red-300',
  'در انتظار': 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  'فعال':      'bg-green-100 text-green-700 border border-green-300',
  'غیرفعال':  'bg-red-100 text-red-500 border border-red-300',
}

const statusIcons: Record<StatusType, string> = {
  'تایید شده': '✓',
  'لغو شده':   '✕',
  'در انتظار': '●',
  'فعال':      '✓',
  'غیرفعال':  '✕',
}

export function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <span>{statusIcons[status]}</span>
      {status}
    </span>
  )
}