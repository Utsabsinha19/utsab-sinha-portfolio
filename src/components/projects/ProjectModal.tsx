"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-stretch justify-center p-0 md:p-6"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[100dvh] md:max-h-[90vh] overflow-y-auto md:rounded-3xl border border-[var(--border)] bg-[var(--surface)] md:my-auto shadow-2xl"
          >
            <div
              className="relative h-48 md:h-64 overflow-hidden"
              style={{ background: project.gradient }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 grid-lines opacity-40" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <div className="eyebrow text-white/80 mb-2">
                  {project.number} · {project.category}
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.02]">
                  {project.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-10 space-y-10">
              <p className="text-lg md:text-xl text-[var(--ink-2)] leading-relaxed max-w-3xl">
                {project.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                <Block title="Problem" accent={project.accent}>
                  {project.problem}
                </Block>
                <Block title="Solution" accent={project.accent}>
                  {project.solution}
                </Block>
              </div>

              <div>
                <h4 className="eyebrow mb-5" style={{ color: project.accent }}>
                  Architecture
                </h4>
                <div className="relative rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max">
                    {project.architecture.map((a, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`px-4 py-3 rounded-lg text-xs font-mono tracking-wider uppercase border ${
                            a.accent
                              ? "text-white border-transparent shadow-xs"
                              : "text-[var(--ink-2)] border-[var(--border)] bg-[var(--surface)]"
                          }`}
                          style={
                            a.accent
                              ? {
                                  background: project.accent,
                                  boxShadow: `0 0 20px -5px ${project.accent}`,
                                }
                              : {}
                          }
                        >
                          {a.label}
                        </div>
                        {i < project.architecture.length - 1 && (
                          <span className="text-[var(--ink-3)]">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="eyebrow mb-5" style={{ color: project.accent }}>
                  Key Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4"
                    >
                      <div
                        className="text-2xl md:text-3xl font-semibold"
                        style={{ color: project.accent }}
                      >
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-[var(--ink-3)] uppercase tracking-wider">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="eyebrow mb-5" style={{ color: project.accent }}>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hairline" />

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Code2 size={15} /> View on GitHub
                </a>
                {project.demo && project.demo !== "#" ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Live Demo <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-ghost opacity-50 cursor-not-allowed"
                    title="Demo not yet available"
                  >
                    Live Demo <ExternalLink size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="eyebrow mb-3" style={{ color: accent }}>
        {title}
      </h4>
      <p className="text-[var(--ink-2)] leading-relaxed">{children}</p>
    </div>
  );
}
