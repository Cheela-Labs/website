"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  title: string;
  language: string;
  copyText: string;
  children: ReactNode;
  className?: string;
};

export function CodeBlock({
  title,
  language,
  copyText,
  children,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      className={cn(
        "overflow-hidden border border-[var(--border)] bg-[var(--surface)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          <span aria-hidden="true" className="text-[var(--primary)]">
            &gt;_
          </span>
          <span className="font-semibold text-[var(--foreground)]">
            {title}
          </span>
          <span aria-hidden="true">::</span>
          <span>{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-9 items-center gap-1 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--background)]"
          aria-live="polite"
        >
          <span aria-hidden="true">[</span>
          {copied ? "Copied" : "Copy"}
          <span aria-hidden="true">]</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-[var(--foreground)] sm:p-5">
        <code>{children}</code>
      </pre>
    </div>
  );
}
