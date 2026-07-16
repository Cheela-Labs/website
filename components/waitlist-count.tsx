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
        // ignore errors silently
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
    <div className="mt-6 rounded-[24px] border border-[var(--border)] bg-white/[0.02] p-4">
      <div className="text-3xl font-medium tracking-[-0.04em] text-white">
        {count === null ? "—" : count.toLocaleString()}
      </div>
      <div className="mt-2 text-sm text-[var(--muted)]">People on the waitlist</div>
    </div>
  );
}

export default WaitlistCount;
