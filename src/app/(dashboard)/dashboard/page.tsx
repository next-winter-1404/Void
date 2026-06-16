import StatCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/StatCard";
import BookingTable from "@/components/dashboard/DashboardComps/DashboardHomeParts/BookingTable";
import ProfileStatusCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ProfileStatusCard";
import ReservationChartCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ReservationChartCard";
import { getToken, getUserInfo, getUserRole } from "@/util/service/api/token";
import { toPersianFormat } from "@/util/helper/persianFormat";
import { cache } from "react";
import { Suspense } from "react";
import Loading from "@/app/loading";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

const getCachedToken = cache(async () => getToken());

async function getDashboardSummary() {
  const role = await getUserRole();
  const url = role === "admin" ? "/api/admin/dashboard" : "/api/dashboard/summary";
  try {
    const token = await getCachedToken();
    const res = await fetch(`${BASE}${url}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("getDashboardSummary failed:", e);
    return null;
  }
}

async function getRecentBookings(): Promise<any> {
  try {
    const token = await getCachedToken();
    const res = await fetch(`${BASE}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    return res.json();
  } catch (e) {
    console.error("getRecentBookings failed:", e);
    return {};
  }
}

async function getProfilePercent() {
  try {
    const token = await getCachedToken();
    const user = await getUserInfo();
    const id = user?.id;
    if (!id) return null;

    const res = await fetch(`${BASE}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("getProfilePercent failed:", e);
    return null;
  }
}

async function DashboardContent() {
  const role = await getUserRole();
  const isAdmin = role === "admin";

  const [summary, bookings, profilePercent] = await Promise.all([
    getDashboardSummary(),
    getRecentBookings(),
    getProfilePercent(),
  ]);

  const stats = isAdmin
    ? [
        { id: 1, title: "کل کاربران",     value: toPersianFormat(summary?.totalUsers)    ?? "—" },
        { id: 2, title: "کل خانه‌ها",     value: toPersianFormat(summary?.totalHouses)   ?? "—" },
        { id: 3, title: "کل رزروها",      value: toPersianFormat(summary?.totalBookings)  ?? "—" },
        { id: 4, title: "میانگین امتیاز", value: toPersianFormat(summary?.averageRating)                  ?? "—" },
      ]
    : [
        { id: 1, title: "کل املاک ها",        value: toPersianFormat(summary?.houses)                      ?? "—" },
        { id: 2, title: "رزرو های فعال",       value: toPersianFormat(summary?.bookings?.conformedBookings) ?? "—" },
        { id: 3, title: "رزرو های در انتظار", value: toPersianFormat(summary?.bookings?.pendingBookings)   ?? "—" },
        { id: 4, title: "بازدید های امروز",    value: toPersianFormat(summary?.bookings?.bookingCount)      ?? "—" },
      ];

  const statusMap: Record<string, string> = {
    confirmed: "تایید شده",
    pending:   "در انتظار",
    cancelled: "لغو شده",
    completed: "تایید شده",
  };

  const mappedBookings = (bookings?.data as any[] ?? []).map((b: any) => ({
    id:        b?.id,
    hotelName: b?.house?.title ?? "—",
    date:      b?.createdAt ? new Date(b.createdAt).toLocaleDateString("fa-IR") : "—",
    price:     b?.totalPrice ? `${Number(b.totalPrice).toLocaleString("fa-IR")} تومان` : "—",
    status:    statusMap[b?.status] ?? "—",
  }));

  return (
    <div className="flex flex-col w-full gap-5 p-4">

     
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </div>

     
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <ReservationChartCard summary={summary} isAdmin={isAdmin} />
        </div>
        <div className="flex-1">
          <ProfileStatusCard Percentage={profilePercent?.additionalPercentage ?? 40} />
        </div>
      </div>

      {role !== "admin" &&  <BookingTable role={"buyer"} data={mappedBookings} />}
     

    </div>
  );
}

export default function DashboardBuyer() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  );
}