import StatCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/StatCard";
import BookingTable from "@/components/dashboard/DashboardComps/DashboardHomeParts/BookingTable";
import ProfileStatusCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ProfileStatusCard";
import ReservationChartCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ReservationChartCard";
import { getToken } from "@/util/service/api/token";
import { getUserInfo } from "@/util/service/api/token";
import { toPersianFormat } from "@/util/helper/persianFormat";
async function getDashboardSummary() {
  const token = await getToken();
  const res = await fetch("http://188.121.111.8:3003/api/dashboard/summary", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

async function getRecentBookings() {
  const token = await getToken();
  const res = await fetch("http://188.121.111.8:3003/api/bookings", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
   console.log(data);
  return Array.isArray(data) ? data : data.bookings ?? [];
}

async function getProfilePercent() {
    const token = await getToken();
    const user = await getUserInfo();
    const id = user.id 
    
    const res = await fetch(`http://188.121.111.8:3003/api/users/${id}`, {
      method:"GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) console.log(res);
    const data = await res.json();
   
    return data;
  }

export default async function DashboardBuyer() {
  const [summary, bookings,profilePercent] = await Promise.all([
    getDashboardSummary(),
    getRecentBookings(),
    getProfilePercent(),
  ]);

 
  const stats = [
    { id: 1, title: "کل املاک ها", value: toPersianFormat(summary?.houses) ?? "—" },
    { id: 2, title: "رزرو های فعال", value: toPersianFormat(summary?.bookings?.conformedBookings) ?? "—" },
    { id: 3, title: "رزرو های در انتظار", value: toPersianFormat(summary?.bookings?.pendingBookings) ?? "—" },
    { id: 4, title: "بازدید های امروز", value: toPersianFormat(summary?.bookings?.bookingCount) ?? "—" },
  ];

  const mappedBookings = bookings.map((b: any) => ({
    id: b.data.id,
    hotelName: b.data.house?.title ?? b.hotelName ?? "—",
    date: b.data.dcreatedAt ? new Date(b.createdAt).toLocaleDateString("fa-IR") : b.date ?? "—",
    price: b.data.totalPrice ? `${Number(b.totalPrice).toLocaleString("fa-IR")} تومان` : b.price ?? "—",
    status: b.data.status ?? "—",
  }));

  console.log(mappedBookings);
  return (
    <div className="flex flex-col w-full gap-5 p-4">
     
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </div>

     
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <ReservationChartCard summary={summary} />
        </div>
        <div className="flex-1">
          <ProfileStatusCard Percentage = {profilePercent?.additionalPercentage ?? 40} />
        </div>
      </div>

      <BookingTable role="buyer" data={mappedBookings ?? [{}]} />
    </div>
  );
}