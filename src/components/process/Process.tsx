"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        processSteps.length - 1,
        Math.floor(progress * processSteps.length + 0.3)
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 05 · METHODOLOGY
            </span>
          </div>
          <h2 className="fluid-heading-section font-semibold tracking-[-0.03em] text-[var(--ink)]">
            HOW I BUILD{" "}
            <span className="text-primary-gradient">AI</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--ink-2)] max-w-xl">
            A deliberate loop from problem to deployed intelligence.
          </p>
        </motion.div>

        <div className="hidden md:grid grid-cols-7 gap-4 lg:gap-6">
          {processSteps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <div key={s.id} className="flex flex-col items-center text-center">
                <div
                  className={`relative w-full aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "border-[var(--border-accent)] bg-[var(--surface-elevated)] scale-100 shadow-lg"
                      : isDone
                      ? "border-amber-500/30 bg-amber-500/10"
                      : "border-[var(--border)] bg-[var(--surface)] scale-95"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow:
                            "0 0 40px -10px rgba(245,158,11,0.35)",
                        }
                      : {}
                  }
                >
                  <div
                    className={`text-3xl lg:text-4xl font-semibold tracking-tight ${
                      isActive
                        ? "text-primary-gradient"
                        : isDone
                        ? "text-[var(--color-gold-accent)] font-medium"
                        : "text-[var(--ink-3)]"
                    }`}
                  >
                    {s.id}
                  </div>
                  <div className="mt-3 text-[11px] font-mono tracking-widest text-[var(--ink-2)] uppercase">
                    {s.title}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="process-dot"
                      className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-orange-accent)] shadow-[0_0_8px_#F97316]"
                    />
                  )}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-full h-px mt-4 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
                )}
                <p
                  className={`mt-3 text-[11px] font-mono text-[var(--ink-3)] ${
                    isActive ? "text-[var(--ink-2)]" : ""
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical list */}
        <div className="md:hidden space-y-4">
          {processSteps.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.id}
                className={`relative flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                  isActive
                    ? "border-[var(--border-accent)] bg-[var(--surface-elevated)] shadow-md"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    isActive
                      ? "bg-primary-gradient text-white"
                      : "bg-[var(--surface-elevated)] text-[var(--ink-3)] border border-[var(--border)]"
                  }`}
                >
                  {s.id}
                </div>
                <div>
                  <div className="font-medium tracking-tight text-[var(--ink)]">{s.title}</div>
                  <div className="text-[13px] text-[var(--ink-3)] mt-1">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
