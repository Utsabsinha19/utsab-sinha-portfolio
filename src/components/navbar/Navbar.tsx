"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/navbar/ThemeSwitcher";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#stack" },
  { label: "AI Lab", href: "#lab" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section tracking
      const sections = navItems
        .map((i) => {
          const el = document.querySelector(i.href) as HTMLElement | null;
          return el ? { id: i.href.slice(1), top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const y = window.scrollY + window.innerHeight / 3;
      let current = sections[0]?.id ?? "work";
      for (const s of sections) {
        if (y >= s.top) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div
            className={`relative flex items-center justify-between rounded-full px-4 md:px-6 py-2.5 md:py-3 transition-all duration-500 ${
              scrolled
                ? "bg-[var(--nav-bg)] border border-[var(--nav-border)] backdrop-blur-xl shadow-lg"
                : "bg-transparent border border-transparent"
            }`}
          >
            <button
              onClick={() => handleNav("#work")}
              className="flex items-center gap-3 group text-left"
              data-cursor="HOME"
            >
              <span className="text-[15px] font-semibold tracking-tight text-[var(--ink)]">
                UTSAB
              </span>
              <span className="hidden sm:inline-flex eyebrow text-[10px]">
                AI / ML Engineer
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="relative px-3 py-1.5 text-[13px] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
                  data-cursor="GO"
                >
                  {active === item.href.slice(1) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)]"
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <ThemeSwitcher />
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium rounded-full border border-[var(--btn-ghost-border)] bg-[var(--btn-ghost-bg)] text-[var(--btn-ghost-text)] hover:bg-[var(--btn-ghost-hover-bg)] hover:border-[var(--btn-ghost-hover-border)] transition-all"
                data-cursor="OPEN"
              >
                Resume <ArrowUpRight size={13} />
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--ink)]"
                aria-label="Toggle menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {scrolled && (
            <div
              className="mx-6 h-px mt-2 opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(139,92,246,0.5), rgba(236,72,153,0.4), transparent)",
              }}
            />
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden pt-24 px-5"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <div className="relative rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 mt-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-3">
                <span className="text-xs font-mono text-[var(--ink-3)] uppercase tracking-wider">
                  Select Theme
                </span>
                <ThemeSwitcher />
              </div>
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="text-left px-4 py-3.5 text-[15px] text-[var(--ink-2)] hover:text-[var(--ink)] border-b border-[var(--border)] last:border-0"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-full bg-primary-gradient text-white shadow-md"
                >
                  Resume <ArrowUpRight size={15} />
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
