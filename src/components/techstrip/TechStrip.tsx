"use client";

import { techStrip } from "@/lib/data";

export default function TechStrip() {
  const list = [...techStrip, ...techStrip];
  return (
    <section className="relative py-10 border-y border-[var(--border)] bg-[var(--bg-secondary)]/60 overflow-hidden backdrop-blur-xs">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />
      <div className="relative flex gap-10 animate-scroll-x animate-scroll-x-paused whitespace-nowrap">
        {list.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-[12px] md:text-[13px] font-mono tracking-[0.22em] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  i % 5 === 0
                    ? "#06B6D4"
                    : i % 5 === 1
                    ? "#3B82F6"
                    : i % 5 === 2
                    ? "#8B5CF6"
                    : i % 5 === 3
                    ? "#D946EF"
                    : "#10B981",
              }}
            />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
