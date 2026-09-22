"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if pointer is fine and user doesn't prefer reduced motion
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduced.matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest(
        "a, button, [role=button], [data-cursor], input, textarea, select, .cursor-pointer"
      ) as HTMLElement | null;

      if (el) {
        setInteractive(true);
        const custom = el.getAttribute("data-cursor");
        if (custom) {
          setLabel(custom);
        } else {
          const tag = el.tagName.toLowerCase();
          if (tag === "a" || tag === "button" || el.getAttribute("role") === "button") {
            setLabel("OPEN");
          } else {
            setLabel("");
          }
        }
      } else {
        setInteractive(false);
        setLabel("");
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Smooth lerp loop for the outer ring follower
    const render = () => {
      const speed = 0.18;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{
          opacity: visible ? 0.9 : 0,
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring hidden md:flex ${interactive ? "active" : ""}`}
        style={{
          opacity: visible ? 1 : 0,
        }}
      >
        {interactive && label ? label : null}
      </div>
    </>
  );
}
