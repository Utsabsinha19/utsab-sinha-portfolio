"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { aiStack, type StackCategory } from "@/lib/data";
import { Check, Sparkles } from "lucide-react";

export default function AIStack() {
  const [active, setActive] = useState<StackCategory>(aiStack[0]);

  // Motion values for smooth transitions
  const activeOpacity = useMotionValue(0);
  const hoverProgress = useMotionValue(0);

  return (
    <section
      id="stack"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'var(--bg-section)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 68, 0, 0.10), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 02 · SYSTEMS
            </span>
          </div>
          <h2 className="fluid-heading-section font-semibold tracking-[-0.03em] text-[var(--ink)]">
            THE <span className="text-primary-gradient">AI STACK</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--ink-2)] max-w-xl">
            From raw data to deployable intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 relative aspect-square max-w-[680px] mx-auto w-full">
            {/* Connecting lines with animated dashes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
            >
              {aiStack.map((_, i) => {
                const angle = (i / aiStack.length) * Math.PI * 2 - Math.PI / 2;
                const cx = 200;
                const cy = 200;
                const r = 165;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                // Animated dash offset based on active category
                const dashOffset = active.id === aiStack[i].id ? -20 : 0;
                return (
                  <line
                    key={i}
                    x1={200}
                    y1={200}
                    x2={x}
                    y2={y}
                    stroke={active.id === aiStack[i].id ? active.accent : "var(--border-subtle)"}
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    style={{ strokeDashoffset: dashOffset, transition: "stroke-dashoffset 0.4s ease" }}
                  />
                );
              })}
              <circle cx="200" cy="200" r="165" stroke="var(--border-subtle)" />
              <circle cx="200" cy="200" r="110" stroke="var(--border-subtle)" />
            </svg>

            {/* Center node with enhanced glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center border border-[var(--border)] bg-[var(--surface-elevated)] backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${active.accent}33, transparent 70%)`,
                }}
              />
              <Sparkles size={20} style={{ color: active.accent }} />
              <div className="relative mt-2 text-[12px] font-mono text-[var(--ink-2)] uppercase tracking-wider">
                UTSAB
              </div>
              <div className="relative text-[10px] font-mono text-[var(--ink-3)] uppercase tracking-widest">
                AI ENGINEERING
              </div>
            </div>

            {/* Perimeter nodes with hover lift and glow */}
            {aiStack.map((cat, i) => {
              const angle = (i / aiStack.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 50;
              const cy = 50;
              const r = 41.25;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              const isActive = active.id === cat.id;

              // Hover progress for this specific node
              const nodeHover = useMotionValue(0);

              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  data-cursor="SELECT"
                >
                  <div
                    className={`relative px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] transition-all duration-300 group-hover:border-[var(--border-accent)] group-hover:bg-[var(--surface)] ${
                      isActive
                        ? "text-white border-transparent shadow-md"
                        : ""
                    }`}
                    style={
                      isActive
                        ? {
                            background: cat.accent,
                            boxShadow: `0 0 35px -8px ${cat.accent}`,
                          }
                        : {}
                    }
                    onMouseEnter={() => nodeHover.set(1)}
                    onMouseLeave={() => nodeHover.set(0)}
                  >
                    <Check size={14} style={{ color: cat.accent }} />
                    <span className="text-[13px] text-[var(--ink-2)]">{cat.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Enhanced info panel with staggered animation */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl glass-card p-6 md:p-8 backdrop-blur-md"
              >
                <div
                  className="eyebrow mb-3"
                  style={{ color: active.accent }}
                >
                  {active.short}
                </div>
                <h3 className="fluid-heading-section font-semibold tracking-[-0.02em] mb-6 text-[var(--ink)]">
                  {active.label}
                </h3>
                <div className="hairline mb-6" />
                <div className="grid grid-cols-2 gap-3">
                  {active.technologies.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]"
                    >
                      <Check size={14} style={{ color: active.accent }} />
                      <span className="text-[13px] text-[var(--ink-2)]">{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}