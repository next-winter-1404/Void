import { Api } from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import BlogCard from "@/components/blog/blogCard";
import Paginate from "@/components/RentAndMortagageComps/Pagination";
import blogImage from "@/assets/Images/blog/blog-img.jpg";

interface Props {
  searchParams: Promise<{ sort?: string; order?: string; page?: string; limit?: string }>;
}

export default async function BlogContent({ searchParams }: Props) {
  const { sort, order, page = "1" } = await searchParams;

  const query = { sort, order, page, limit: 6 };

  const api = await Api();
  const blog = await handleAsyncAction(api.blog.getBlog(query));
  const blogs = blog?.data?.data || [];
  const totalPages = Math.ceil((blog?.data?.totalCount || 0) / query.limit);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((item: any) => (
          <BlogCard
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.created_at}
            caption={item.caption}
            image={blogImage}
            time={item.estimated_reading_time}
          />
        ))}
      </div>

      <Paginate
        currentPage={Number(page)}
        totalPages={totalPages}
        totalCount={blog?.data?.totalCount || 0}
      />
    </>
  );
}