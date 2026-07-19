"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]",
        className,
      )}
    >
      <span aria-hidden="true">[</span>
      <span>{children}</span>
      <span aria-hidden="true">]</span>
    </span>
  );
}
