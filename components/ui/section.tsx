"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-24 sm:py-32 lg:py-40", className)}>
      <div className="space-y-10">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl space-y-4">
            {eyebrow ? (
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-lg leading-8 text-[var(--muted)]">
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
