"use client"

import Image, { StaticImageData } from "next/image"

import LOC from "@/assets/ico/aboutUs/location-ico.png"
import EMAIL from "@/assets/ico/aboutUs/email-ico.png"
import PHONE from "@/assets/ico/aboutUs/phone-ico.png"

import { useTheme } from "next-themes"
import { useActionState, useEffect } from "react"


import { contactUS } from "@/util/service/api/contactUsAction/action"
import { success } from "zod"

import toast_errorHandling from "@/util/hooks/errorHandling"

export default function ContactUs() {

    const {theme} = useTheme();

    const [state,formAction,pending] = useActionState(contactUS,{success:false});

    useEffect(()=>{
        console.log(state)
        if(state?.success) toast_errorHandling(Number(state?.status),"پیام شما به پشتیبانی ارسال شد")
    },[state])

    return (
        <form action={formAction} dir="rtl" className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-10">

            <div className="flex flex-col gap-6  rounded-[20px] shadow-md shadow-[gray]/20 p-6">

                <p className="text-[15px] leading-8 text-gray-700">
                    هر ساعت روز که باشه تیم پیشتیبانی دلتا پاسخگوی سوالات و
                    انتقادات شما هستند تا در اسرع وقت مشکلتان را حل کنیم !
                </p>

                <div className="flex flex-row max-sm:flex-col gap-4 w-full">
                    <input
                        name="email"
                        type="email"
                        placeholder="ایمیل"
                        className="border border-gray-200 rounded-[12px] p-3 text-sm w-full outline-none text-right placeholder:text-gray-400 focus:border-[#7575FE] transition"
                    />
                    <input
                        name="fullname"
                        type="text"
                        placeholder="نام و نام خانوادگی"
                        className="border border-gray-200 rounded-[12px] p-3 text-sm w-full outline-none text-right placeholder:text-gray-400 focus:border-[#7575FE] transition"
                    />
                </div>

                <textarea
                    name="message"
                    placeholder="پیام شما"
                    rows={6}
                    className="border border-gray-200 rounded-[12px] p-3 text-sm w-full outline-none text-right placeholder:text-gray-400 resize-none focus:border-[#7575FE] transition"
                />

                <button
                    type="submit"
                    className="w-full bg-[#1F3A5F] hover:bg-[#16314F] active:scale-[0.99] text-white text-sm font-semibold rounded-[12px] py-3 transition-all"
                >
                    ارسال درخواست
                </button>
            </div>

        
            <div className="flex flex-col gap-6">

                
                <div className={`relative w-full h-[240px] ${theme=== "dark" ? "bg-[gray]" : theme === "light" ? "bg-[#D7D7D7]" : "bg-[gray]"}  rounded-[20px] overflow-hidden flex items-center justify-center`}>
                    <Image
                        src="/image/call-center-img.png"
                        alt="contactUs"
                        fill
                        className="object-contain p-6"
                    />
                </div>

               
                <div className="flex flex-col gap-5  rounded-[20px] shadow-md shadow-[gray]/20 p-6">

                    <ContactRow
                        title="تلفن"
                        value="9122 901 0911"
                        icon={PHONE}
                    />

                    <Divider />

                    <ContactRow
                        title="ایمیل"
                        value="PIZA@gmail.com"
                        icon={EMAIL}
                    />

                    <Divider />

                    <ContactRow
                        title="آدرس"
                        value="مازندران،ساری،اکادمی بحر"
                        icon={LOC}
                    />

                </div>
            </div>

        </form>
    )
}



function ContactRow({ title, value, icon }: { title: string, value: string, icon:StaticImageData }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1 text-right">
                <span className="text-[14px] font-bold text-gray-800">{title}</span>
                <span className="text-[13px] text-gray-500">{value}</span>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#F1ECFF] flex items-center justify-center">
                <Image alt="wwad" src={icon} />
            </div>
        </div>
    )
}

function Divider() {
    return <div className="w-full h-px bg-gray-100" />
}
