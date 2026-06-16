import { Api } from "@/util/service/api";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { CommentsTable } from "./CommentsTable";

type Props = {
  searchParams: Promise<{ page?: string; seller_id?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { page, seller_id } = await searchParams;

  const api = await Api();
  const result = await handleAsyncAction(api.sellerComments.getSellerComments(seller_id ?? "me", Number(page ?? 1)));

  const comments = result.data?.data ?? [];
  const totalPages = result.data?.total_pages ?? 1;
  const currentPage = result.data?.current_page ?? 1;
  const sid = seller_id ?? "me";

  return (
    <div className="p-4">
      <CommentsTable data={comments} />

      {totalPages > 1 && (
        <ServerPagination current={currentPage} total={totalPages} seller_id={sid} />
      )}
    </div>
  );
}

function ServerPagination({
  current,
  total,
  seller_id,
}: {
  current: number;
  total: number;
  seller_id: string;
}) {
  const pages = Array.from(
    { length: Math.min(total, 5) },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center gap-1 mt-4 flex-wrap" dir="rtl">
      {pages.map((p) => (
        <a
          key={p}
          href={`?seller_id=${seller_id}&page=${p}`}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
            p === current
              ? "bg-green-400 text-white shadow-sm"
              : "bg-white border border-zinc-200 text-zinc-600 hover:border-green-300"
          }`}
        >
          {p}
        </a>
      ))}
      {total > 5 && (
        <>
          <span className="text-zinc-400 px-1">•••</span>
          <a
            href={`?seller_id=${seller_id}&page=${total}`}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${
              current === total
                ? "bg-green-400 text-white border-green-400"
                : "border-zinc-200 text-zinc-600 hover:border-green-300"
            }`}
          >
            {total}
          </a>
        </>
      )}
    </div>
  );
}
