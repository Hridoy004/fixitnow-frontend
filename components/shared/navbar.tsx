"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { NavbarProps } from "@/lib/types";
// import { logout } from "@/service/logout";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar() {
  const router = useRouter();
  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      if (user.data.profile.role === "USER") {
        router.push("/dashboard");
      } else if (user.data.profile.role === "AUTHOR") {
        router.push("/author-dashboard");
      } else if (user.data.profile.role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }

    if (action === "logout") {
      //   await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-[#0284a7]">
              NextJs Press
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-[#0284a7] transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Dropdown */}
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-[#0284a7]/10 flex items-center justify-center ring-1 ring-[#0284a7]/20 hover:bg-[#0284a7]/15 transition-colors">
                    <User className="w-4 h-4 text-[#0284a7]" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.profile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.data?.profile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await handleUserMenuAction("logout");
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/login"}>
              <Button className="cursor-pointer rounded-full bg-[#0284a7] px-6 font-semibold text-white shadow-sm hover:bg-[#026d8a] active:bg-[#015a72]">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
