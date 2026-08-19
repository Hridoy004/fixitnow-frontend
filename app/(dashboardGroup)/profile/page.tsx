import {
  CalendarCheck,
  Lock,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>

        <section className="rounded-xl border border-border bg-card">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                SH
              </div>

              <div>
                <h2 className="text-lg font-semibold">Shahjahan Hridoy</h2>

                <p className="text-sm text-muted-foreground">
                  hridoy@example.com
                </p>

                <span className="mt-2 inline-flex rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                  Customer
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<CalendarCheck className="h-4 w-4" />}
            label="Bookings"
            value="12"
          />

          <StatCard
            icon={<Star className="h-4 w-4" />}
            label="Reviews"
            value="8"
          />

          <StatCard
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Account"
            value="Verified"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h3 className="font-semibold">Personal Information</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your basic account information.
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <InfoItem
                icon={<User className="h-4 w-4" />}
                label="Full Name"
                value="Shahjahan Hridoy"
              />

              <InfoItem
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value="hridoy@example.com"
              />

              <InfoItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value="+880 1XXXXXXXXX"
              />

              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value="Habiganj, Bangladesh"
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card">
            <div className="border-b border-border p-5">
              <h3 className="font-semibold">Account</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your account.
              </p>
            </div>

            <div className="p-3">
              <SettingItem
                href="/profile/change-password"
                icon={<Lock className="h-4 w-4" />}
                label="Change Password"
              />

              <SettingItem
                href="/settings"
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          {icon}
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function SettingItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </Link>
  );
}
