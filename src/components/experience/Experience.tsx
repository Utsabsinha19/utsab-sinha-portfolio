"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import { ChevronDown, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Experience() {
  const [open, setOpen] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="relative py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 06 · CHRONOLOGICAL TIMELINE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[0.95] text-[var(--ink)]">
            PROFESSIONAL <span className="text-primary-gradient">JOURNEY</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--ink-2)]">
            Synchronized timeline of industry internships, AI/ML features, and leadership.
          </p>
        </motion.div>

        <div className="relative mt-8">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500 opacity-40" />

          {/* Top PRESENT Badge */}
          <div className="relative mb-12 flex justify-start md:justify-center items-center">
            <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 bg-[var(--surface-elevated)] backdrop-blur-md shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse-dot" />
              <span className="text-xs font-mono tracking-widest text-cyan-500 font-semibold uppercase">
                PRESENT · July 2026
              </span>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              const isOpen = open === item.id;

              return (
                <div key={item.id} className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Illuminated Central Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className="w-8 h-8 rounded-full border-2 bg-[var(--surface)] flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-125"
                      style={{
                        borderColor: item.accent,
                        boxShadow: `0 0 15px ${item.accent}80`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: item.accent }}
                      />
                    </div>
                  </div>

                  {/* Card Content - Dual Sided */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      isEven
                        ? "md:col-start-1 md:pr-10"
                        : "md:col-start-2 md:pl-10"
                    }`}
                  >
                    <Tilt3DCard maxTilt={6} glowColor={`${item.accent}20`}>
                      <div
                        className={`rounded-2xl glass-card overflow-hidden transition-all duration-300 ${
                          isOpen ? "border-[var(--border-accent)] shadow-xl" : ""
                        }`}
                      >
                        <button
                          onClick={() => setOpen(isOpen ? null : item.id)}
                          className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-[var(--surface-elevated)] transition cursor-pointer"
                          data-cursor="OPEN"
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className="p-2.5 rounded-xl border flex-shrink-0 mt-0.5"
                              style={{
                                background: `${item.accent}15`,
                                borderColor: `${item.accent}40`,
                                color: item.accent,
                              }}
                            >
                              <Briefcase size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--ink-3)] uppercase tracking-widest">
                                <span
                                  className="px-2 py-0.5 rounded border text-[10px]"
                                  style={{
                                    borderColor: `${item.accent}40`,
                                    color: item.accent,
                                    background: `${item.accent}10`,
                                  }}
                                >
                                  {item.year}
                                </span>
                                <span>{item.period}</span>
                              </div>
                              <h3 className="mt-1.5 text-lg md:text-xl font-semibold tracking-tight text-[var(--ink)]">
                                {item.title}
                              </h3>
                              <div className="text-[var(--ink-2)] text-sm font-medium mt-0.5">
                                {item.org}
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`flex-shrink-0 mt-1 text-[var(--ink-3)] transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-cyan-500" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 md:px-6 pb-6 text-sm text-[var(--ink-2)] leading-relaxed border-t border-[var(--border)] pt-4">
                                <p className="mb-3">{item.description}</p>
                                <div className="flex items-center gap-2 text-xs font-mono text-cyan-500">
                                  <CheckCircle2 size={13} />
                                  <span>Verified Professional Milestone</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Tilt3DCard>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom START Marker */}
          <div className="relative mt-16 flex justify-start md:justify-center items-center">
            <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] backdrop-blur-md shadow-md">
              <Sparkles size={14} className="text-violet-500" />
              <span className="text-xs font-mono tracking-widest text-[var(--ink-3)] uppercase">
                FOUNDATION · 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
