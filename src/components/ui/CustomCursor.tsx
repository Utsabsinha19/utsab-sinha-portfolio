"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState("VIEW");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduced.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el = t.closest(
        "a, button, [role=button], [data-cursor], input, textarea, select, label"
      ) as HTMLElement | null;
      if (el) {
        setInteractive(true);
        const l = el.getAttribute("data-cursor");
        if (l) setLabel(l);
        else {
          const tag = el.tagName.toLowerCase();
          if (tag === "a" || tag === "button") setLabel("OPEN");
          else setLabel("VIEW");
        }
      } else {
        setInteractive(false);
        setLabel("VIEW");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`,
        }}
      />
      <div
        className={`cursor-ring hidden md:flex ${interactive ? "active" : ""}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%) scale(${
            interactive ? 1 : 0.8
          })`,
          width: interactive ? 58 : 42,
          height: interactive ? 58 : 42,
        }}
      >
        {interactive ? label : ""}
      </div>
    </>
  );
}
