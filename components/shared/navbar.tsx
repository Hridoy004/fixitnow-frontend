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
import { logout } from "@/service/logout";
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
import { toast } from "sonner";
import { Button } from "../ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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

  const role = user.data?.profile?.role;

  const handleUserMenuAction = async (action: string) => {
    switch (action) {
      case "dashboard": {
        if (role === "CUSTOMER") {
          router.push("/dashboard");
        } else if (role === "TECHNICIAN") {
          router.push("/technician-dashboard");
        } else if (role === "ADMIN") {
          router.push("/admin-dashboard");
        }

        break;
      }

      case "profile": {
        if (role === "CUSTOMER") {
          router.push("/profile");
        } else if (role === "TECHNICIAN") {
          router.push("/technician/profile");
        } else if (role === "ADMIN") {
          router.push("/admin/profile");
        }

        break;
      }

      case "bookings": {
        if (role === "CUSTOMER") {
          router.push("/dashboard/bookings");
        } else if (role === "TECHNICIAN") {
          router.push("/technician-dashboard/bookings");
        }

        break;
      }

      case "settings": {
        router.push("/settings");
        break;
      }

      case "logout": {
        try {
          await logout();

          toast.success("Logged out successfully!");

          router.push("/login");
          router.refresh();
        } catch {
          toast.error("Failed to log out. Please try again.");
        }

        break;
      }

      default:
        break;
    }
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
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

          {/* Desktop Navigation */}
          <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          {user.success ? (
            <DropdownMenu>
              {/* User Trigger */}
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open user menu"
                  className="
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-primary
                    shadow-sm
                    outline-none
                    transition-all
                    duration-200
                    hover:border-primary/30
                    hover:bg-primary/5
                    hover:shadow-md
                    focus-visible:ring-2
                    focus-visible:ring-primary/30
                  "
                >
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              {/* Dropdown */}
              <DropdownMenuContent align="end" sideOffset={8} className="w-64">
                {/* User Information */}
                <DropdownMenuLabel className="px-3 py-3 font-normal">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.data?.profile?.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.data?.profile?.email}
                    </p>

                    <div className="pt-1">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {role}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                <div className="space-y-0.5">
                  {userMenuItems.map((item) => {
                    // Admin does not have customer/technician bookings.
                    if (item.action === "bookings" && role === "ADMIN") {
                      return null;
                    }

                    const Icon = item.icon;

                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />

                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </div>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleUserMenuAction("logout")}
                >
                  <LogOut
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={2}
                  />

                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Authentication Buttons */
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button className="cursor-pointer shadow-sm">Login</Button>
              </Link>

              <Link href="/register" className="hidden sm:block">
                <Button
                  variant="outline"
                  className="
                    cursor-pointer
                    border-slate-200
                    bg-white
                    text-slate-700
                    shadow-sm
                    transition-all
                    hover:border-primary/30
                    hover:bg-primary/5
                    hover:text-primary
                  "
                >
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
