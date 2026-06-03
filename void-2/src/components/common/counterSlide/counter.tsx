"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import clock from "@/assets/Images/components/HouseCard/clock.png"

const toPersian = (num: number) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])

export default function PrettyTimer({ initialSeconds = 900 }) {
  const [time, setTime] = useState(initialSeconds)

  useEffect(() => {
    if (time <= 0) return
    const interval = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [time])

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  const formatted =
    `${toPersian(hours)}:` +
    `${toPersian(minutes.toString().padStart(2, "0"))}:` +
    `${toPersian(seconds.toString().padStart(2, "0"))}`

  return (
    <div
      className="
      flex items-center gap-3
      bg-red-500 text-white
      px-4 py-2
      rounded-full
      w-fit
      text-lg font-bold
    "
    >
      <Image src={clock} alt="clock" width={20} height={20} />
      <span>{formatted}</span>
    </div>
  )
}