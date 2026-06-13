"use client";

import { DataTable, Column } from "@/components/DashboardComps/ReUsableTable/ui/DataTable";
import { StatusBadge } from "@/components/DashboardComps/ReUsableTable/ui/StatusBadge";
import { SellerComment } from "@/util/service/api/DashboardApis/comments_api";

const columns: Column<SellerComment>[] = [
  { key: "buyer_name", header: "خریدار" },
  { key: "text", header: "نظر", className: "max-w-xs truncate" },
  {
    key: "rating",
    header: "امتیاز",
    render: (row) => (
      <span className="font-semibold text-yellow-500">
        {"★".repeat(row.rating)}{"☆".repeat(5 - row.rating)}
      </span>
    ),
  },
  {
    key: "status",
    header: "وضعیت",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "created_at",
    header: "تاریخ",
    render: (row) => new Date(row.created_at).toLocaleDateString("fa-IR"),
  },
];

export function CommentsTable({ data }: { data: SellerComment[] }) {
  return (
    <DataTable<SellerComment>
      title="نظرات مشتریان"
      columns={columns}
      data={data}
      showSearch={false}
      showFilter={false}
    />
  );
}
