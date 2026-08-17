"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/lib/types";
// import { logout } from "@/service/logout";
import {
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// Main navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// User menu items
const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    action: "dashboard",
  },
  {
    label: "Profile",
    icon: User,
    action: "profile",
  },
  {
    label: "My Bookings",
    icon: CalendarCheck,
    action: "bookings",
  },
  {
    label: "Settings",
    icon: Settings,
    action: "settings",
  },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    const role = user.data?.profile?.role;

    // Dashboard
    if (action === "dashboard") {
      if (role === "CUSTOMER") {
        router.push("/dashboard");
      } else if (role === "TECHNICIAN") {
        router.push("/technician-dashboard");
      } else if (role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }

    // Profile
    if (action === "profile") {
      if (role === "CUSTOMER") {
        router.push("/profile");
      } else if (role === "TECHNICIAN") {
        router.push("/technician/profile");
      } else if (role === "ADMIN") {
        router.push("/admin/profile");
      }

      return;
    }

    // Bookings
    if (action === "bookings") {
      if (role === "CUSTOMER") {
        router.push("/dashboard/bookings");
      } else if (role === "TECHNICIAN") {
        router.push("/technician-dashboard/bookings");
      }

      return;
    }

    // Settings
    if (action === "settings") {
      router.push("/settings");
      return;
    }

    // Logout
    // if (action === "logout") {
    //   await logout();

    //   toast.success("Logged out successfully!");

    //   router.push("/login");
    //   router.refresh();

    //   return;
    // }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>

              <span className="text-xl font-bold text-primary sm:text-2xl">
                FixItNow
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary/10 outline-none transition-colors hover:bg-primary/20"
                >
                  <User className="h-5 w-5 text-primary" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">
                {/* User Info */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">
                      {user.data?.profile?.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data?.profile?.email}
                    </p>

                    <p className="mt-1 text-xs font-medium text-primary">
                      {user.data?.profile?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                {userMenuItems.map((item) => {
                  // Don't show bookings for admin
                  if (
                    item.action === "bookings" &&
                    user.data?.profile?.role === "ADMIN"
                  ) {
                    return null;
                  }

                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>

              <Link href="/register" className="hidden sm:block">
                <Button variant="outline" className="cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
