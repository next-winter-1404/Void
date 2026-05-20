'use client'
import toast from "react-hot-toast"

export default function toast_errorHandling (statusError:number) {

     switch (statusError) {
      case 400:
        toast.error("درخواست نامعتبر است")
        break

      case 401:
        toast.error("لطفاً وارد حساب خود شوید")
        break

      case 403:
        toast.error("شما به این بخش دسترسی ندارید")
        break

      case 404:
        toast.error("اطلاعات پیدا نشد")
        break

      case 500:
        toast.error("خطای سرور رخ داده است")
        break

      default:
        toast.error("خطای ناشناخته‌ای رخ داده است")
    }
    
}