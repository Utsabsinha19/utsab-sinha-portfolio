"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/data";
import { Layers } from "lucide-react";

const CATEGORIES = [
  { id: "ALL", label: "ALL SYSTEMS" },
  { id: "NLP", label: "NLP & MINING" },
  { id: "VISION", label: "COMPUTER VISION" },
  { id: "ML", label: "PREDICTIVE ML" },
  { id: "DATA", label: "DATA & APIS" },
];

export default function Projects() {
  const [activeModal, setActiveModal] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "NLP") return p.category.includes("NLP");
    if (selectedFilter === "VISION") return p.category.includes("VISION");
    if (selectedFilter === "ML") return p.category.includes("PREDICTIVE");
    if (selectedFilter === "DATA") return p.category.includes("DATA");
    return true;
  });

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="eyebrow mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky-accent)]" />
              <span className="text-primary-gradient font-semibold">
                — 03 · SELECTED ARCHITECTURES
              </span>
            </div>
            <h2 className="fluid-heading-section font-semibold tracking-[-0.03em] text-[var(--ink)]">
              FEATURED <span className="text-primary-gradient">SYSTEMS</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[var(--ink-2)] leading-relaxed">
              Production-tested systems engineered for real latency, scale, and accuracy constraints.
            </p>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "text-white font-semibold shadow-sm"
                      : "text-[var(--ink-2)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] hover:text-[var(--ink)]"
                  }`}
                  data-cursor="FILTER"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="filter-active-pill"
                      className="absolute inset-0 rounded-full bg-primary-gradient"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-8 md:space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={p}
                  index={i}
                  onOpen={(proj) => setActiveModal(proj)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
}
