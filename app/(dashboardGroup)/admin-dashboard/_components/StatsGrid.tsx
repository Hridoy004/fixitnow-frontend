import { CalendarCheck, UserRound, Users, Wallet } from "lucide-react";
import { getDashboardStats } from "../../_actions/adminDashboardActions";
import { StatCard } from "./StatCard";

export async function StatsGrid() {
  const { success, message, data } = await getDashboardStats();

  if (!success) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
        {message}
      </div>
    );
  }

  const stats = [
    {
      label: "Total Bookings",
      value: data.totalBookings.toLocaleString(),
      icon: CalendarCheck,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Revenue",
      value: `৳${data.totalRevenue.toLocaleString()}`,
      icon: Wallet,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Total Technicians",
      value: data.totalTechnicians.toLocaleString(),
      icon: UserRound,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
