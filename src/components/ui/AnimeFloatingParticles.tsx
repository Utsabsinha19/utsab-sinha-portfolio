"use client";

import { useEffect, useRef } from "react";
import { animate, random, stagger } from "animejs";

export default function AnimeFloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const dots = containerRef.current.querySelectorAll(".anime-dot");

    animate(dots, {
      translateY: () => random(-40, -120),
      translateX: () => random(-25, 25),
      scale: () => [random(0.7, 1.2), random(0.4, 0.8)],
      opacity: [
        { to: 0.7, duration: 1500 },
        { to: 0.1, duration: 1500 },
      ],
      delay: stagger(150, { start: 300 }),
      duration: () => random(3500, 6000),
      loop: true,
      alternate: true,
      ease: "inOutSine",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-60 dark:opacity-90"
      aria-hidden="true"
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="anime-dot absolute rounded-full"
          style={{
            left: `${(i * 5.6 + 4) % 96}%`,
            top: `${(i * 8.2 + 10) % 92}%`,
            width: `${(i % 3) * 2 + 3}px`,
            height: `${(i % 3) * 2 + 3}px`,
            backgroundColor: i % 2 === 0 ? "#f59e0b" : "#f97316",
            boxShadow: `0 0 10px ${i % 2 === 0 ? "#fbbf24" : "#f97316"}`,
          }}
        />
      ))}
    </div>
  );
}
