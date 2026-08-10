"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/data";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 03 · SELECTED WORK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
            SELECTED <span className="text-primary-gradient">SYSTEMS</span>
          </h2>
          <p className="mt-5 text-lg text-ink-2 max-w-xl">
            AI systems built around real problems.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-14">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={(proj) => setActive(proj)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
