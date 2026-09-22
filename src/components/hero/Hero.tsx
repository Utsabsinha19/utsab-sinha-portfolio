"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile } from "@/lib/data";

const NeuralSphere = lazy(() => import("./NeuralSphere"));

const orbitLabels = [
  { label: "NLP & TEXT MINING", top: "6%", left: "4%" },
  { label: "COMPUTER VISION", top: "10%", right: "4%" },
  { label: "RAG & VECTOR AI", top: "38%", left: "2%" },
  { label: "GENERATIVE AI", top: "58%", right: "2%" },
  { label: "PREDICTIVE ML", bottom: "8%", left: "6%" },
  { label: "DATA INTELLIGENCE", bottom: "12%", right: "4%" },
  { label: "BIOMETRIC CNN", top: "22%", left: "14%" },
  { label: "SMOTE BALANCING", bottom: "28%", right: "12%" },
];

function CSSFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-[70%] aspect-square rounded-full bg-primary-gradient opacity-20 blur-3xl" />
      <div className="absolute w-[55%] aspect-square rounded-full border border-amber-500/25" />
      <div className="absolute w-[75%] aspect-square rounded-full border border-orange-500/20" />
      <div className="absolute w-[95%] aspect-square rounded-full border border-yellow-500/15" />
      <div className="relative w-[45%] aspect-square rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-primary-gradient opacity-20 blur-2xl" />
        <div className="relative text-center">
          <div className="eyebrow text-[var(--ink-2)]">NEURAL CORE</div>
          <div className="mt-1 font-mono text-sm text-[var(--ink-3)]">
            AI / ML · 2026
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [webglOk, setWebglOk] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl");
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-32 md:pt-36 pb-20 overflow-hidden noise bg-app"
    >
      {/* Background Grid Lines & Lighting */}
      <div className="absolute inset-0 grid-lines opacity-[0.5]" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.16), rgba(251,191,36,0.06) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-50 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.14), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-40 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(234,179,8,0.10), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="eyebrow mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[var(--ink-3)]/30" />
              <span className="text-[var(--ink-2)] font-semibold tracking-wider">
                Utsab Sinha · AI / ML ENGINEER
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fluid-heading-hero font-semibold mb-6 text-[var(--ink)]"
            >
              I BUILD
              <br />
              <span className="text-primary-gradient">INTELLIGENT</span>
              <br />
              SYSTEMS.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base md:text-lg text-[var(--ink-2)] max-w-xl leading-relaxed mb-8"
            >
              Building end-to-end AI/ML systems — from NLP social ingestion pipelines processing 10,000+ posts per run to real-time CNN biometric authentication with sub-100ms inference latency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo("work")}
                className="btn-primary cursor-pointer"
                data-cursor="EXPLORE"
              >
                Explore My Work
                <ArrowDown size={15} />
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
                <ArrowUpRight size={15} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex items-center gap-4 text-[11px] font-mono text-[var(--ink-3)]"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                SYSTEM ONLINE
              </span>
              <span className="w-px h-3 bg-[var(--border)]" />
              <span>INFERENCE READY</span>
            </motion.div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {mounted && webglOk ? (
                <Suspense fallback={<CSSFallback />}>
                  <NeuralSphere />
                </Suspense>
              ) : (
                <CSSFallback />
              )}
            </motion.div>

            {/* Orbit labels inside relative bounds */}
            {orbitLabels.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.08 }}
                style={o as React.CSSProperties}
                className="hidden md:block absolute eyebrow text-[var(--ink-2)] text-[10px] px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md shadow-xs animate-float z-10 pointer-events-none"
              >
                {o.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
