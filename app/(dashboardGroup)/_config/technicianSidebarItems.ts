import { CalendarDays, LayoutDashboard, Star, Wrench } from "lucide-react";

import { ISidebarItem } from "@/lib/types";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/technician-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Services",
    href: "/technician-dashboard/services",
    icon: Wrench,
  },
  {
    label: "Bookings",
    href: "/technician-dashboard/bookings",
    icon: CalendarDays,
  },
  {
    label: "Reviews",
    href: "/technician-dashboard/reviews",
    icon: Star,
  },
];
