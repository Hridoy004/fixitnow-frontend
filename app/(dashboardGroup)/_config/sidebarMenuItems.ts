import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { TECHNICIAN_SIDEBAR_ITEMS } from "./technicianSidebarItems";

const USER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/my-posts",
    icon: FileText,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: USER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
