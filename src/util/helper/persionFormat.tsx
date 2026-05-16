export function toPersianFormat(str: string | number) {
  return str.toString().replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export function isoToPersianDate(isoDate:string) {
  const date = new Date(isoDate)

  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
