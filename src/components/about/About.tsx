"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { capabilities, education, certifications, profile } from "@/lib/data";
import { GraduationCap, Award, Users, MapPin, Sparkles, ArrowUpRight, Mail, Cpu, Layers } from "lucide-react";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

const categoryColors: Record<string, { accent: string; bg: string; border: string }> = {
  "NLP & AI": { accent: "#06B6D4", bg: "rgba(6, 182, 212, 0.1)", border: "rgba(6, 182, 212, 0.3)" },
  "Machine Learning": { accent: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.3)" },
  "Data & BI": { accent: "#10B981", bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)" },
  "Web & Databases": { accent: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.3)" },
  "Languages & Tools": { accent: "#EC4899", bg: "rgba(236, 72, 153, 0.1)", border: "rgba(236, 72, 153, 0.3)" },
};

export default function About() {
  const [selectedCat, setSelectedCat] = useState<string>(capabilities[0].category);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const currentCategory = capabilities.find((c) => c.category === selectedCat) || capabilities[0];
  const catTheme = categoryColors[selectedCat] || categoryColors["NLP & AI"];

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-40 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="eyebrow mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-500" />
            <span className="text-primary-gradient font-semibold">
              — 07 · ABOUT ME & PROFILE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[0.95] text-[var(--ink)]">
            ARCHITECTING <span className="text-primary-gradient">AI SYSTEMS.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Profile Picture Card & Key Badges */}
          <div className="lg:col-span-5 space-y-6">
            <Tilt3DCard maxTilt={6} glowColor="rgba(34, 211, 238, 0.2)">
              <div className="relative rounded-3xl glass-card p-4 md:p-6 overflow-hidden">
                {/* Profile Picture Frame */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[var(--border-accent)] bg-[var(--surface-elevated)] group shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                  <Image
                    src="/utsab_profile.jpg"
                    alt="Utsab Sinha - AI/ML Engineer"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-black/20 opacity-70" />

                  {/* Corner Accent Dots */}
                  <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8B5CF6]" />

                  {/* Availability Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-[var(--surface)]/90 border border-[var(--border)] shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                        AVAILABLE FOR INTERNSHIPS & AI ROLES
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[var(--ink-2)] mt-1 flex items-center gap-1.5">
                      <MapPin size={12} className="text-cyan-500" />
                      <span>Kolkata, WB / Jaipur, RJ</span>
                    </div>
                  </div>
                </div>

                {/* Profile Highlights below photo */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border)] pb-3">
                    <span className="text-[var(--ink-3)]">CGPA (B.Tech CSE)</span>
                    <span className="font-semibold text-cyan-500">8.29 / 10.0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border)] pb-3">
                    <span className="text-[var(--ink-3)]">SGPA (UEM Jaipur)</span>
                    <span className="font-semibold text-violet-400">8.17 / 10.0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--ink-3)]">Focus Areas</span>
                    <span className="font-semibold text-[var(--ink)]">NLP · CV · ML</span>
                  </div>
                </div>

                {/* Quick Contact & Resume Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2.5 !px-3 text-xs justify-center"
                  >
                    <ArrowUpRight size={14} /> Resume PDF
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-ghost !py-2.5 !px-3 text-xs justify-center"
                  >
                    <Mail size={14} /> Email Me
                  </a>
                </div>
              </div>
            </Tilt3DCard>

            {/* Certifications Card */}
            <div className="p-6 rounded-2xl glass-card space-y-3">
              <div className="eyebrow flex items-center gap-2 mb-2">
                <Award size={16} className="text-pink-500" /> Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {certifications.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs"
                  >
                    <div className="font-medium text-[var(--ink)] leading-snug">
                      {c.name}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--ink-3)] mt-1">
                      {c.issuer} · {c.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Education, Leadership & Clean Tech Matrix */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--ink)] mb-4">
                Utsab Sinha — <span className="text-primary-gradient">AI/ML Developer</span>
              </h3>
              <p className="text-base text-[var(--ink-2)] leading-relaxed mb-4">
                I am a Computer Science undergraduate (CGPA 8.29/10) at{" "}
                <strong className="text-[var(--ink)]">
                  University of Engineering & Management (UEM), Jaipur
                </strong>
                . I specialize in building full-stack AI/ML systems, natural language processing pipelines, computer vision biometric tools, and predictive machine learning models.
              </p>
              <p className="text-base text-[var(--ink-2)] leading-relaxed">
                Through my internships at <strong className="text-[var(--ink)]">FlyRank AI</strong>, <strong className="text-[var(--ink)]">Twidix</strong>, and <strong className="text-[var(--ink)]">Bluestock Fintech</strong>, I have engineered vector embeddings, intent classification modules, interactive consumer analytics dashboards, and automated data pipelines.
              </p>
            </div>

            {/* Education Cards */}
            <div>
              <div className="eyebrow mb-4 flex items-center gap-2">
                <GraduationCap size={16} className="text-cyan-500" /> Academic Journey
              </div>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <Tilt3DCard key={idx} maxTilt={4}>
                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                        <span>{edu.period}</span>
                        <span className="text-cyan-500 font-semibold">{edu.score}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-[var(--ink)] mt-1">
                        {edu.degree}
                      </h4>
                      <div className="text-xs text-[var(--ink-2)] mt-0.5">
                        {edu.institution} · {edu.location}
                      </div>
                    </div>
                  </Tilt3DCard>
                ))}
              </div>
            </div>

            {/* Leadership Card */}
            <div>
              <div className="eyebrow mb-4 flex items-center gap-2">
                <Users size={16} className="text-violet-500" /> Leadership & Activities
              </div>
              <Tilt3DCard maxTilt={4}>
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono text-violet-400 font-medium">
                    <span>Event Coordinator</span>
                    <span>2024 – 2025</span>
                  </div>
                  <h4 className="font-semibold text-base text-[var(--ink)] mt-1">
                    AceHack 4.0 National Hackathon — UEM Jaipur
                  </h4>
                  <p className="text-xs text-[var(--ink-2)] mt-2 leading-relaxed">
                    Led operations for a 500+ participant national hackathon across 12 colleges with a 20-person team, cutting participant wait times by 25%.
                  </p>
                </div>
              </Tilt3DCard>
            </div>

            {/* Structured Technical Capabilities Matrix */}
            <div className="rounded-2xl glass-card p-6 md:p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                <div>
                  <div className="eyebrow flex items-center gap-2">
                    <Cpu size={15} className="text-cyan-500" /> TECHNICAL MATRIX & TOOLKIT
                  </div>
                  <div className="mt-1 text-xs text-[var(--ink-3)]">
                    Structured breakdown of core competencies, models, and tools.
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--ink-3)]">
                  <Layers size={13} className="text-violet-400" />
                  <span>5 CORE DOMAINS</span>
                </div>
              </div>

              {/* Category Segmented Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {capabilities.map((cat) => {
                  const isSelected = selectedCat === cat.category;
                  const theme = categoryColors[cat.category] || categoryColors["NLP & AI"];

                  return (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setSelectedCat(cat.category);
                        setActiveSkill(null);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "font-semibold shadow-sm text-white"
                          : "text-[var(--ink-2)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)]"
                      }`}
                      style={
                        isSelected
                          ? {
                              background: theme.accent,
                              borderColor: theme.accent,
                            }
                          : {}
                      }
                    >
                      {cat.category}
                    </button>
                  );
                })}
              </div>

              {/* Selected Domain Skills Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl border bg-[var(--surface)]" style={{ borderColor: catTheme.border }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: catTheme.accent }}>
                        {currentCategory.category} SPECTRUM
                      </span>
                      <span className="text-[10px] font-mono text-[var(--ink-3)]">
                        {currentCategory.items.length} Production Technologies
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {currentCategory.items.map((item) => {
                        const isSelected = activeSkill === item;
                        return (
                          <button
                            key={item}
                            onClick={() => setActiveSkill(isSelected ? null : item)}
                            className={`p-3 rounded-lg border text-left text-xs font-mono transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 font-semibold shadow-xs"
                                : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink-2)] hover:border-[var(--border-accent)] hover:text-[var(--ink)]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{item}</span>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: catTheme.accent }} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {activeSkill && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs text-[var(--ink-2)] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono text-white font-semibold">{activeSkill}</span> — active component in Utsab Sinha&apos;s AI/ML development workflow.
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider ml-2">VERIFIED</span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
