import { ISidebarItem } from "@/lib/types";
import {
  CalendarCheck,
  FolderTree,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Categories",
    href: "/admin-dashboard/categories",
    icon: FolderTree,
  },
  {
    label: "Bookings",
    href: "/admin-dashboard/bookings",
    icon: CalendarCheck,
  },
];
