import { isoToPersianDate } from "@/util/helper/persianFormat"
import { Api } from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import Image from "next/image"
import blogImage from "@/assets/Images/blog/blog-img.jpg"


interface BlogDetail {
    id: number | string,
    title: string,
    content: string,
    image: string,
    date: string,
    category?: string,
}



export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {

     const api = await Api();
     const id = (await params).id;

    const blogs= await handleAsyncAction(api.blog.detailBlog(Number(id)));
    const blog = blogs?.data

    console.log(blog)

   
    return (
        <div dir="rtl" className="w-full max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6">

            <div className="relative w-full h-[320px] rounded-[20px] overflow-hidden shadow-md shadow-[gray]/30">
                <Image
                    src={blogImage}
                    alt="ww"
                    fill
                    className="object-cover"
                />

               
            </div>


            <div className="flex flex-col gap-2">
                <h1 className="text-[22px] font-bold text-gray-800">
                    {blog?.title}
                </h1>
                <span className="text-[12px] text-[#878787]">
                    {isoToPersianDate(blog?.created_at ?? "2025-10-24")}
                </span>
            </div>

            
            <div className="text-[15px] text-gray-700 leading-8 whitespace-pre-line">
                {blog?.caption}
            </div>

        </div>
    )
}