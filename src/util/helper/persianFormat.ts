export function toPersian1(str: string | number) {
  return str.toString().replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export function toPersianFormat(str: string | number): string {

  const formatted = Number(str)
    .toLocaleString("en-US") 
    .replace(/,/g, "٬"); 

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return formatted.replace(/[0-9]/g, (d) => persianDigits[+d]);
}

export function isoToPersianDate(isoDate:string) {
  const date = new Date(isoDate)

  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
