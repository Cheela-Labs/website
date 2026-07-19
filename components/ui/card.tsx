"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  label?: string;
} & HTMLAttributes<HTMLElement>;

export function Card({ children, className, label, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={cn(
        "relative border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-150 hover:border-[var(--foreground)] sm:p-8",
        label && "pt-10 sm:pt-11",
        className,
      )}
    >
      {label ? (
        <div className="absolute left-4 top-0 border-x border-b border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
          <span aria-hidden="true" className="mr-1 text-[var(--muted)]">
            {"//"}
          </span>
          {label}
        </div>
      ) : null}
      {children}
    </article>
  );
}
