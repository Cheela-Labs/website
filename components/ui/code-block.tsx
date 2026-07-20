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
        "overflow-hidden border border-[#3d3c38] bg-[#11110f] text-[#eeeae1]",
        className,
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-[#3d3c38] bg-[#181816] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#8c8a82]">
          <span aria-hidden="true" className="h-2 w-2 bg-[#ff5c35]" />
          <span aria-hidden="true" className="h-2 w-2 bg-[#87a7ff]" />
          <span aria-hidden="true" className="mr-2 h-2 w-2 bg-[#bed78d]" />
          <span className="font-semibold text-[#eeeae1]">{title}</span>
          <span aria-hidden="true">::</span>
          <span>{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-8 items-center gap-1 border border-[#3d3c38] px-2 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#ff795a] transition-colors hover:border-[#eeeae1] hover:text-[#eeeae1]"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="min-h-[420px] overflow-x-auto p-5 text-sm leading-7 text-[#c5c1b8] sm:p-7">
        <code>{children}</code>
      </pre>
    </div>
  );
}
