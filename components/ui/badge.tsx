"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "violet" | "lime" | "coral";
};

const toneClasses = {
  cyan: "border-[rgba(94,231,247,0.28)] bg-[rgba(94,231,247,0.06)] text-[var(--primary)]",
  violet:
    "border-[rgba(154,124,255,0.3)] bg-[rgba(154,124,255,0.06)] text-[var(--violet)]",
  lime: "border-[rgba(184,243,90,0.3)] bg-[rgba(184,243,90,0.06)] text-[var(--lime)]",
  coral:
    "border-[rgba(255,139,123,0.3)] bg-[rgba(255,139,123,0.06)] text-[var(--coral)]",
};

export function Badge({ children, className, tone = "cyan" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-2 border px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
    >
      <i
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"
      />
      <span>{children}</span>
    </span>
  );
}
