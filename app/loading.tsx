"use client";

import { Wrench } from "lucide-react";
import { useEffect, useState } from "react";

const stages = [
  "Preparing your workspace",
  "Loading your services",
  "Almost ready",
];

export function GlobalLoading() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStage((current) => (current + 1) % stages.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main
      className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <span
            className="absolute inset-0 animate-ping rounded-2xl border border-primary/20"
            aria-hidden="true"
          />

          <div className="relative flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Wrench
              className="size-5 text-primary"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="mt-5 text-lg font-semibold tracking-tight">FixItNow</h1>

        <div className="mt-2 flex h-5 items-center justify-center text-sm text-muted-foreground">
          <span key={stage} className="animate-in fade-in duration-300">
            {stages[stage]}
          </span>

          <span className="ml-0.5 w-5 text-left" aria-hidden="true">
            ...
          </span>
        </div>

        <div
          className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-muted"
          aria-hidden="true"
        >
          <div className="h-full w-1/2 animate-[loading_1.8s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>

          <span>Loading</span>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }

          50% {
            transform: translateX(80%);
          }

          100% {
            transform: translateX(240%);
          }
        }
      `}</style>
    </main>
  );
}

export default GlobalLoading;
