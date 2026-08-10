"use client";

import { useTheme, type Theme } from "@/components/theme/ThemeProvider";
import { Sun, Moon, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-9 w-[132px] rounded-full bg-white/10 ${className}`} />
    );
  }

  const options: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: "light", label: "LIGHT", icon: <Sun size={13} /> },
    { id: "system", label: "SYSTEM", icon: <Laptop size={13} /> },
    { id: "dark", label: "DARK", icon: <Moon size={13} /> },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Select color theme"
      className={`inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] backdrop-blur-md shadow-sm ${className}`}
    >
      {options.map((opt) => {
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(opt.id)}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors duration-200 min-h-[32px] md:min-h-[28px] focus:outline-none ${
              isActive
                ? "text-[var(--ink)] font-semibold"
                : "text-[var(--ink-3)] hover:text-[var(--ink-2)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="theme-active-pill"
                className="absolute inset-0 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] shadow-xs"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {opt.icon}
              <span className="hidden sm:inline">{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
