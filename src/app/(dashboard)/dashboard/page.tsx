import StatCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/StatCard";
import BookingTable from "@/components/dashboard/DashboardComps/DashboardHomeParts/BookingTable";
import ProfileStatusCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ProfileStatusCard";
import ReservationChartCard from "@/components/dashboard/DashboardComps/DashboardHomeParts/ReservationChartCard";
export default function DashboardBuyyer() {

  const stats = [
    { id: 1, title: 'کل املاک ها', value: '۵' },
    { id: 2, title: 'رزرو های فعال', value: '۵' },
    { id: 3, title: 'رزرو های در انتظار', value: '۵' },
    { id: 4, title: 'بازدید های امروز', value: '۵' },
  ];
const bookings = [
  { id: 1, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 2, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 3, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 5, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
  { id: 6, hotelName: 'هتل ساروان رشت', date: '۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳', price: '۱.۸۰۰.۰۰۰ تومان', status: 'تایید شده' },
];

  return (
    <div className="flex flex-col w-full gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat) => (
                <StatCard 
                key={stat.id} 
                title={stat.title} 
                value={stat.value} 
                />
            ))}
        </div>
        <div className="flex flex-row gap-5 justify-between">
            <ReservationChartCard />
            <ProfileStatusCard />
            
        </div>
                <BookingTable role="buyer" data={bookings} />


            {/* <BookingTable role="seller" data={bookings} /> */}
    </div>
  );
}