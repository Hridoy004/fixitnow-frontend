import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard } from "lucide-react";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "technician-dashboard",
    icon: LayoutDashboard,
  },
  //   {
  //     label: "My Posts",
  //     href: "/author-dashboard/my-posts",
  //     icon: FileText,
  //   },
];
