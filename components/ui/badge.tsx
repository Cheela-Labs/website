"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "violet" | "lime" | "coral";
};

const toneClasses = {
  cyan: "border-[var(--blue)] bg-transparent text-[var(--blue)]",
  violet: "border-[var(--violet)] bg-transparent text-[var(--violet)]",
  lime: "border-[var(--lime)] bg-transparent text-[var(--lime)]",
  coral: "border-[var(--coral)] bg-transparent text-[var(--coral)]",
};

export function Badge({ children, className, tone = "cyan" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-2 border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
    >
      <i aria-hidden="true" className="h-1.5 w-1.5 bg-current" />
      <span>{children}</span>
    </span>
  );
}
