"use client";

import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-primary/5">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Wrench className="h-4 w-4" />
              <span>Trusted Home Services</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Find Trusted
              <span className="block text-primary">Professionals</span>
              For Your Home
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              From plumbing and electrical work to cleaning and painting,
              FixItNow connects you with skilled and trusted professionals near
              you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-card-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                Browse Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Verified Professionals
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Secure Booking
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-2 shadow-xl shadow-black/5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
                  <Search className="h-5 w-5 text-muted-foreground" />

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground">
                      What do you need?
                    </span>

                    <input
                      type="text"
                      placeholder="Plumbing, cleaning..."
                      className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
                  <MapPin className="h-5 w-5 text-muted-foreground" />

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground">
                      Location
                    </span>

                    <input
                      type="text"
                      placeholder="Your location"
                      className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative flex min-h-120 items-center justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-primary/10 sm:h-96 sm:w-96" />
              <div className="absolute h-60 w-60 rounded-full border border-primary/20 sm:h-80 sm:w-80" />
              <div className="relative z-10 w-70 rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/10 sm:w-[320px]">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Wrench className="h-8 w-8 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      Professional Service
                    </h3>

                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-card-foreground">
                        4.9
                      </span>
                      <span className="text-sm text-muted-foreground">
                        (120+)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Service
                    </span>

                    <span className="text-sm font-semibold text-foreground">
                      Plumbing
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Starting from
                    </span>

                    <span className="font-bold text-primary">BDT 3,070</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Book Now
                </button>
              </div>

              <div className="absolute left-0 top-20 z-20 rounded-2xl border border-border bg-card p-4 shadow-xl sm:left-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Trusted by</p>

                    <p className="text-sm font-bold text-card-foreground">
                      10,000+ Customers
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 right-0 z-20 rounded-2xl border border-border bg-card p-4 shadow-xl sm:right-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Professionals
                    </p>

                    <p className="text-sm font-bold text-card-foreground">
                      Verified & Skilled
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute right-10 top-5 grid grid-cols-4 gap-2 opacity-50">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Popular services
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Plumbing",
                "Electrical",
                "Cleaning",
                "Painting",
                "AC Repair",
              ].map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
