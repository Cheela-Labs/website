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
      className="mt-6 border border-[var(--border)] bg-[var(--background)] p-4"
      aria-live="polite"
    >
      <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        WAITLIST_COUNT
      </div>
      <div className="mt-2 flex items-end gap-3">
        <div className="text-3xl font-semibold tracking-[-0.04em] text-[var(--primary)]">
          {count === null ? "—" : count.toLocaleString()}
        </div>
        <div className="pb-1 text-sm text-[var(--muted)]">
          People on the waitlist
        </div>
      </div>
    </div>
  );
}

export default WaitlistCount;
