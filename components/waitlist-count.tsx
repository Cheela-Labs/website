"use client";

import { useEffect, useState } from "react";

export function WaitlistCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist/count");
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setCount(typeof data.count === "number" ? data.count : null);
        }
      } catch {
        // Ignore count failures so the primary CTA remains available.
      }
    }

    fetchCount();
    const id = setInterval(fetchCount, 30000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className="border border-[var(--border)] bg-[rgba(11,18,32,0.72)] p-5"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        <i
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[var(--violet)] shadow-[0_0_8px_var(--violet)]"
        />
        EARLY_ACCESS_QUEUE
      </div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)]">
          {count === null ? "—" : count.toLocaleString()}
        </div>
        <div className="pb-1 text-[0.6rem] uppercase tracking-[0.08em] text-[var(--muted)]">
          builders queued
        </div>
      </div>
    </div>
  );
}

export default WaitlistCount;
