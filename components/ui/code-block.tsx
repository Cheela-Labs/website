"use client";

import { Check, Copy, TerminalSquare } from "lucide-react";
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
        "overflow-hidden rounded-[24px] border border-[var(--border)] bg-[#0b0b0b]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <TerminalSquare className="size-4 text-[var(--primary)]" />
          <span className="font-medium text-white">{title}</span>
          <span>·</span>
          <span>{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white transition hover:border-[rgba(228,179,40,0.28)] hover:bg-white/[0.06]"
        >
          {copied ? (
            <Check className="size-3.5 text-[var(--primary)]" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-[#e8e8e8]">
        <code>{children}</code>
      </pre>
    </div>
  );
}
