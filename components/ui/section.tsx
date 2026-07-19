"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
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
    <section
      id={id}
      className={cn(
        "border-t border-dashed border-[var(--border)] py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Container>
        <div className="space-y-10 sm:space-y-12">
          {eyebrow || title || description ? (
            <div className="max-w-4xl space-y-4">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                  <span aria-hidden="true">SYS://</span>
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  <span aria-hidden="true" className="text-[var(--muted)]">
                    =={" "}
                  </span>
                  {title}
                  <span aria-hidden="true" className="text-[var(--muted)]">
                    {" "}
                    ==
                  </span>
                </h2>
              ) : null}
              {description ? (
                <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
