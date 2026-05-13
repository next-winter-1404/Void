export function toPersianFormat(str: string | number): string {

  const formatted = Number(str)
    .toLocaleString("en-US") 
    .replace(/,/g, "٬"); 

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return formatted.replace(/[0-9]/g, (d) => persianDigits[+d]);
}