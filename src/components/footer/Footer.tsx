"use client";

import { profile } from "@/lib/data";
import { Mail, Globe, Code2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold tracking-tight text-[var(--ink)]">
                UTSAB SINHA
              </div>
              <span className="eyebrow">AI / ML Engineer</span>
            </div>
            <p className="mt-4 text-sm text-[var(--ink-2)] max-w-sm leading-relaxed">
              Building intelligent systems across NLP, computer vision,
              generative AI and data intelligence.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono text-[var(--ink-3)] px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              SYSTEM STATUS · {profile.systemStatus}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Work", id: "work" },
                { label: "Systems", id: "stack" },
                { label: "AI Lab", id: "lab" },
                { label: "Process", id: "process" },
                { label: "Experience", id: "experience" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    className="text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Connect</div>
            <div className="space-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors group"
              >
                <Mail size={14} className="text-[var(--color-gold-accent)]" />
                <span className="font-mono">{profile.email}</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
              >
                <Code2 size={14} className="text-violet-500" />
                <span>GitHub</span>
                <ArrowUpRight size={12} className="text-[var(--ink-3)]" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
              >
                <Globe size={14} className="text-blue-500" />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="text-[var(--ink-3)]" />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-xs font-mono text-[var(--ink-3)]">
            © 2026 {profile.name}. Built with curiosity + code.
          </div>
          <div className="text-xs font-mono text-[var(--ink-3)]">
            Next.js · TypeScript · Three.js · Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
