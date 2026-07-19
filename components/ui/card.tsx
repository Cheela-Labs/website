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
        "relative border border-[var(--border)] bg-[linear-gradient(145deg,rgba(16,26,45,0.78),rgba(8,13,25,0.9))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-bright)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.18)] sm:p-8",
        label && "pt-10 sm:pt-11",
        className,
      )}
    >
      {label ? (
        <div className="absolute left-4 top-0 border-x border-b border-[var(--border)] bg-[var(--background-soft)] px-2.5 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
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
