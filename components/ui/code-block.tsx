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
        "overflow-hidden border border-[var(--border-bright)] bg-[linear-gradient(145deg,rgba(11,18,32,0.94),rgba(5,8,18,0.96))] shadow-[0_28px_80px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[rgba(5,8,18,0.48)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--coral)] shadow-[0_0_8px_rgba(255,139,123,0.45)]"
          />
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--violet)] shadow-[0_0_8px_rgba(154,124,255,0.45)]"
          />
          <span
            aria-hidden="true"
            className="mr-2 h-2 w-2 rounded-full bg-[var(--lime)] shadow-[0_0_8px_rgba(184,243,90,0.45)]"
          />
          <span className="font-semibold text-[var(--foreground)]">
            {title}
          </span>
          <span aria-hidden="true">::</span>
          <span>{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-8 items-center gap-1 border border-[var(--border)] px-2 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[rgba(94,231,247,0.06)]"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="min-h-[420px] overflow-x-auto p-5 text-sm leading-7 text-[var(--muted-bright)] sm:p-7">
        <code>{children}</code>
      </pre>
    </div>
  );
}
