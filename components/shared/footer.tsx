import { Wrench } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="h-5 w-5" />
              </span>

              <span>
                Fix<span className="text-primary">It</span>Now
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Reliable home services, right at your doorstep. Find trusted
              professionals for plumbing, electrical, cleaning, painting and
              more.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FaFacebookF className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition hover:text-primary"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-primary">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/technicians"
                  className="transition hover:text-primary"
                >
                  Find Technicians
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              For Customers
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/services"
                  className="transition hover:text-primary"
                >
                  Browse Services
                </Link>
              </li>

              <li>
                <Link
                  href="/bookings"
                  className="transition hover:text-primary"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link href="/reviews" className="transition hover:text-primary">
                  Reviews
                </Link>
              </li>

              <li>
                <Link href="/help" className="transition hover:text-primary">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              For Technicians
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/become-technician"
                  className="transition hover:text-primary"
                >
                  Become a Technician
                </Link>
              </li>

              <li>
                <Link
                  href="/technician/login"
                  className="transition hover:text-primary"
                >
                  Technician Login
                </Link>
              </li>

              <li>
                <Link
                  href="/technician/dashboard"
                  className="transition hover:text-primary"
                >
                  Technician Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/how-it-works"
                  className="transition hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <div className="flex gap-5 text-muted-foreground">
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
