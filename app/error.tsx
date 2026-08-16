"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5">
          <AlertTriangle
            className="size-6 text-destructive"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Something went wrong
        </p>

        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          We hit an unexpected problem.
        </h1>

        <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
          Something didn&apos;t work as expected. Please try again, and if the
          problem continues, come back a little later.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <RefreshCw
              className="size-4 transition-transform duration-500 group-hover:rotate-180"
              aria-hidden="true"
            />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <Home className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Go back
        </button>

        <div className="mt-14 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          <span>Don&apos;t worry, your data is safe</span>
          <span className="h-px w-8 bg-border" />
        </div>
      </div>
    </main>
  );
}
