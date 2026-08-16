import { ArrowLeft, Compass, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground sm:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-72 w-px -translate-x-1/2 bg-border" />
        <div className="absolute bottom-0 left-[15%] h-40 w-px rotate-[-24deg] bg-border/70" />
        <div className="absolute bottom-0 right-[15%] h-40 w-px rotate-24 bg-border/70" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <Compass
            className="size-7 text-primary"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <p className="mb-5 font-mono text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Error 404
        </p>

        <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          This page wandered off.
        </h1>
        <p className="mt-5 max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          The link may be outdated, or the page may have moved somewhere new.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return home
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <Search className="size-4" aria-hidden="true" />
            Start fresh
          </Link>
        </div>

        <div className="mt-16 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span>Nothing is broken on your end</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
