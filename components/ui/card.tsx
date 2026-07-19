"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function Card({ children, className, label }: CardProps) {
  return (
    <article
      className={cn(
        "relative border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--primary)] sm:p-8",
        label && "pt-9 sm:pt-10",
        className,
      )}
    >
      {label ? (
        <div className="absolute -top-[0.7rem] left-4 bg-[var(--surface)] px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
          <span aria-hidden="true">[ </span>
          {label}
          <span aria-hidden="true"> ]</span>
        </div>
      ) : null}
      {children}
    </article>
  );
}
