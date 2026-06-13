import { isoToPersianDate } from "@/util/helper/persianFormat"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface BlogCardProps {
    id: number | string,
    title: string,
    caption: string,
    image: StaticImageData,
    date: string,
    category?: string,
    time:string
}

export default function BlogCard({ id, title, caption, image, date,category,time }: BlogCardProps) {

    return (
        <Link
            href={`/blog/blogDetail/${id}`}
            dir="rtl"
            className="group flex flex-col w-full  rounded-[20px]   overflow-hidden shadow-md shadow-[gray]/90 transition-all duration-300"
        >
          
            <div className="relative w-full h-[180px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />

                 {time && (
                    <span className="absolute top-3 right-3 bg-[#7575FE] text-white text-[12px] font-medium px-3 py-1 rounded-full">
                        {time}
                    </span>
                )}
            </div>

            
            <div className="flex flex-col gap-3 p-4">
                <h3 className="text-[16px] font-bold text-gray-800 line-clamp-2">
                    {title}
                </h3>

                <p className="text-[13px] text-gray-500 line-clamp-3 leading-6">
                    {caption}
                </p>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                    <span className="text-[12px] text-[#878787]">{isoToPersianDate(date)}</span>
                    <span className="text-[13px] font-medium text-[#7575FE] group-hover:translate-x-[-4px] transition-transform duration-300">
                        ادامه مطلب ←
                    </span>
                </div>
            </div>
        </Link>
    )
}