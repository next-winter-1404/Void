export function toPersianFormat(str: string | number) {
  return str.toString().replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}