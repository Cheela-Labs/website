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
        "relative border-t border-[var(--border)] py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Container>
        <div className="space-y-10 sm:space-y-12">
          {eyebrow || title || description ? (
            <div className="max-w-5xl space-y-5" data-reveal>
              {eyebrow ? (
                <p className="flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-[var(--primary)]"
                  />
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--foreground)] sm:text-4xl lg:text-6xl">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="max-w-3xl font-sans text-base leading-8 text-[var(--muted-bright)] sm:text-lg">
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
