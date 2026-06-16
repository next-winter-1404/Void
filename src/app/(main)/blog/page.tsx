import { Suspense } from "react";
import Loading from "@/app/loading";
import BlogContent from "./blogContent";

interface PageProps {
  searchParams: Promise<{ sort?: string; order?: string; page?: string; limit?: string }>;
}

export default function BlogPage({ searchParams }: PageProps) {
  return (
    <main dir="rtl" className="flex flex-col gap-10">
      <Suspense fallback={<Loading />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}