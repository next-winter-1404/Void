"use client";

import { DataTable } from "@/components/DashboardComps/ReUsableTable/ui/DataTable";
import type { Payment } from "@/util/service/api/DashboardApis/payments_api";

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  verified: {
    label: "تایید شده",
    className: "bg-green-400 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1",
  },
  pending: {
    label: "تایید نشده",
    className: "bg-red-300 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1",
  },
  failed: {
    label: "تایید نشده",
    className: "bg-red-300 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1",
  },
};

const columns = [
  {
    key: "createdAt",
    label: "تاریخ",
    render: (row: Payment) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString("fa-IR")
        : "—",
  },
  {
    key: "transactionId",
    label: "شماره پیگیری",
    render: (row: Payment) => row.transactionId ?? "—",
  },
  {
    key: "amount",
    label: "مبلغ",
    render: (row: Payment) =>
      Number(row.amount).toLocaleString("fa-IR"),
  },
  {
    key: "status",
    label: "وضعیت پرداخت",
    render: (row: Payment) => {
      const s = STATUS_MAP[row.status] ?? STATUS_MAP.pending;
      return (
        <span className={s.className}>
          <span>✓</span>
          {s.label}
        </span>
      );
    },
  },
  {
    key: "description",
    label: "نوع تراکنش",
    render: (row: Payment) => row.description,
  },
  {
    key: "actions",
    label: "",
    render: (_row: Payment) => (
      <button className="text-blue-500 text-sm hover:underline">
        مشاهده رسید
      </button>
    ),
  },
];

export default function PaymentsTable({ data }: { data: Payment[] }) {
  return <DataTable columns={columns} data={data} />;
}
