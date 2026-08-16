"use client";

import { ArrowLeft, ArrowUpRight, Compass, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 -top-45 size-130 -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-border/60" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
              <Compass
                className="size-6 text-primary"
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-background bg-destructive text-[9px] font-bold text-destructive-foreground">
                !
              </span>
            </div>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Error 404
            </p>

            <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              Lost in the{" "}
              <span className="text-muted-foreground">wrong place.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              We couldn&apos;t find the page you were looking for. It may have
              been moved, deleted, or the URL might be incorrect.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              >
                <Home className="size-4" strokeWidth={1.8} aria-hidden="true" />
                Back to homepage
                <ArrowUpRight
                  className="size-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>

              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              >
                <ArrowLeft
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Go back
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="h-px w-10 bg-border" />
            <span>Nothing is wrong on your end</span>
            <span className="h-px w-10 bg-border" />
          </div>
        </div>
      </div>
    </main>
  );
}
