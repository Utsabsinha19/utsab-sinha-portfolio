"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ShieldCheck, Cpu } from "lucide-react";
import type { Project } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
  index: number;
};

export default function ProjectCard({ project, onOpen, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
      data-cursor="OPEN"
    >
      <Tilt3DCard maxTilt={6} glowColor={`${project.accent}25`}>
        <div
          onClick={() => onOpen(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(project);
            }
          }}
          className="relative w-full text-left grid md:grid-cols-12 gap-8 md:gap-12 items-center p-6 md:p-10 lg:p-14 rounded-3xl glass-card overflow-hidden cursor-pointer"
        >
          {/* Background accent glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${isEven ? "20% 30%" : "80% 70%"}, ${project.accent}18, transparent 60%)`,
            }}
          />

          <div
            className={`md:col-span-6 order-2 ${isEven ? "md:order-2" : "md:order-1"}`}
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow text-[var(--ink-3)]">{project.number}</span>
              <span className="w-8 h-px bg-[var(--border)]" />
              <span className="eyebrow" style={{ color: project.accent }}>
                {project.category}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] mb-4 text-[var(--ink)]">
              {project.title}
            </h3>
            <p
              className="text-base md:text-lg text-[var(--ink-2)] leading-relaxed mb-8 max-w-lg"
              style={{ textWrap: "balance" }}
            >
              {project.subtitle}
            </p>

            {/* Architecture */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {project.architecture.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border ${
                      a.accent
                        ? "font-semibold shadow-xs"
                        : "text-[var(--ink-3)] border-[var(--border)] bg-[var(--surface-elevated)]"
                    }`}
                    style={
                      a.accent
                        ? {
                            background: `${project.accent}18`,
                            borderColor: `${project.accent}50`,
                            color: project.accent,
                          }
                        : {}
                    }
                  >
                    {a.label}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <span className="text-[var(--ink-3)] text-[10px]">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
              {project.metrics.map((m) => {
                const isLong = m.value.length > 7;
                return (
                  <div key={m.label} className="min-w-0">
                    <div
                      className={`${
                        isLong
                          ? "text-sm sm:text-base md:text-lg font-mono font-bold tracking-tight uppercase"
                          : "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight"
                      } truncate`}
                      style={{ color: project.accent }}
                      title={m.value}
                    >
                      {m.value}
                    </div>
                    <div className="mt-1 text-[10px] md:text-[11px] font-mono text-[var(--ink-3)] uppercase tracking-wider truncate" title={m.label}>
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all hover:scale-[1.02] shadow-sm text-white cursor-pointer"
                style={{
                  background: project.gradient,
                }}
              >
                View Case Study <ArrowUpRight size={14} />
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2.5 !px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Code2 size={14} /> GitHub
              </a>
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !py-2.5 !px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Visual 3D block */}
          <div
            className={`md:col-span-6 order-1 ${isEven ? "md:order-1" : "md:order-2"}`}
            style={{ transform: "translateZ(40px)" }}
          >
            <ProjectVisual project={project} />
          </div>
        </div>
      </Tilt3DCard>
    </motion.article>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/11] w-full rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface-elevated)] shadow-inner">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.accent}25, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-40" />

      {project.id === "antar-ai" && <AntarViz accent={project.accent} />}
      {project.id === "brand-intelligence" && <BrandViz accent={project.accent} />}
      {project.id === "genauth-ai" && <GenAuthViz accent={project.accent} />}
      {project.id === "booking-prediction" && <BookingViz accent={project.accent} />}
      {project.id === "address-intelligence" && <AddressViz accent={project.accent} />}

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] text-[var(--ink-3)] tracking-widest uppercase">
        {project.id}.sys
      </div>
    </div>
  );
}

function AntarViz({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 p-3 pt-9 flex flex-col">
      <div className="relative w-full h-full rounded-xl overflow-hidden border border-violet-500/30 group/img shadow-md">
        <Image
          src="/antar_ai_dashboard.png"
          alt="Antar AI human engagement intelligence platform interface"
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.015] group-hover/img:-translate-y-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span>SIGNAL DASHBOARD · LIVE</span>
          </div>
          <span
            className="px-2.5 py-1 rounded-md text-white font-mono text-[10px] uppercase font-semibold tracking-wider"
            style={{ background: accent }}
          >
            https://antar-ai-v3.vercel.app/
          </span>
        </div>
      </div>
    </div>
  );
}

function GenAuthViz({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 p-5 pt-10 flex flex-col items-center justify-center">
      <div className="relative w-44 h-44 rounded-2xl border border-violet-500/30 bg-violet-500/5 flex items-center justify-center overflow-hidden">
        {/* 3D Facial Mesh Grid Simulation */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-violet-400/20" />
          ))}
        </div>

        {/* Biometric Scanning Line */}
        <motion.div
          animate={{ y: [-80, 80, -80] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_15px_#8B5CF6]"
        />

        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <ShieldCheck size={36} className="text-violet-400 animate-pulse" />
          <div className="text-[11px] font-mono text-white font-semibold tracking-wider">
            SUB-100ms LATENCY
          </div>
          <div className="text-[9px] font-mono text-violet-300">
            PyTorch CNN · 500+ Frames
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
        <span className="font-mono text-[10px] text-[var(--ink-2)]">
          AUTHENTICATED · +11% OOD GAIN
        </span>
      </div>
    </div>
  );
}

function BrandViz({ accent }: { accent: string }) {
  const bars = [
    { label: "Pos", value: 72, color: "#10B981" },
    { label: "Neu", value: 19, color: "#64748B" },
    { label: "Neg", value: 9, color: "#F87171" },
  ];
  return (
    <div className="absolute inset-0 p-5 pt-10 flex flex-col justify-end gap-3">
      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-3xl font-semibold" style={{ color: accent }}>
          10,000+
        </div>
        <div className="text-[10px] font-mono text-[var(--ink-3)] uppercase">
          Posts Ingested / Run
        </div>
      </div>
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="w-8 font-mono text-[10px] text-[var(--ink-3)]">{b.label}</span>
          <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${b.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: b.color }}
            />
          </div>
          <span className="w-8 text-right font-mono text-[10px] text-[var(--ink-2)]">
            {b.value}%
          </span>
        </div>
      ))}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["VADER", "TextBlob", "LDA Topics"].map((t) => (
          <div
            key={t}
            className="px-2 py-1 text-[10px] text-center font-mono text-[var(--ink-2)] rounded border border-[var(--border)] bg-[var(--surface)]"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingViz({ accent }: { accent: string }) {
  const points = [
    [0, 60],
    [15, 50],
    [30, 48],
    [45, 30],
    [60, 25],
    [75, 20],
    [90, 18],
    [105, 15],
    [120, 12],
    [140, 10],
  ];
  const path = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  return (
    <div className="absolute inset-0 p-5 pt-10 flex flex-col justify-end">
      <div className="absolute top-8 left-5 flex items-center gap-2">
        <Cpu size={16} style={{ color: accent }} />
        <span className="text-[11px] font-mono font-semibold" style={{ color: accent }}>
          ROC-AUC: 0.88
        </span>
        <span className="text-[10px] font-mono text-[var(--ink-3)]">
          (50K Records · SMOTE)
        </span>
      </div>

      <div className="absolute inset-6 top-14 flex items-center justify-center">
        <svg viewBox="0 0 150 70" className="w-full h-full">
          <defs>
            <linearGradient id="rocFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${path} L140,70 L0,70 Z`}
            fill="url(#rocFill)"
          />
          <motion.path
            d={path}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
      </div>
      <div className="relative grid grid-cols-3 gap-2 mt-2">
        {[
          { l: "DATASET", v: "50,000" },
          { l: "FEATURES", v: "15+" },
          { l: "TUNING", v: "GridSearch" },
        ].map((x) => (
          <div
            key={x.l}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-center"
          >
            <div className="text-[9px] font-mono text-[var(--ink-3)] uppercase">
              {x.l}
            </div>
            <div className="text-xs font-semibold" style={{ color: accent }}>
              {x.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressViz({ accent }: { accent: string }) {
  const levels = ["State", "District", "Subdistrict", "Village"];
  return (
    <div className="absolute inset-0 p-5 pt-10 flex flex-col justify-center gap-3 font-mono text-[11px]">
      <div className="text-[10px] text-[var(--ink-3)] uppercase tracking-widest mb-2">
        /api/v1/search
      </div>
      {levels.map((l, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.15 }}
          className="flex items-center gap-3"
        >
          <span
            className="w-16 text-[var(--ink-3)]"
            style={{ paddingLeft: i * 12 }}
          >
            {l}
          </span>
          <div className="flex-1 h-7 rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center px-3 text-[var(--ink-2)]">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: accent }} />
            <span className="truncate">
              {i === 0
                ? "West Bengal"
                : i === 1
                ? "Purba Bardhaman"
                : i === 2
                ? "Burdwan - I"
                : "Village record · 512K+"}
            </span>
          </div>
        </motion.div>
      ))}
      <div className="mt-2 flex justify-end">
        <div
          className="px-2 py-1 rounded text-[10px]"
          style={{ background: `${accent}22`, color: accent }}
        >
          200 OK
        </div>
      </div>
    </div>
  );
}
