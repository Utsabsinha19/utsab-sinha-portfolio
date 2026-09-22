"use client";

import { useEffect, useState, useRef } from "react";
import { animate } from "animejs";
import { Sparkles, Terminal } from "lucide-react";

export default function InitialLoader() {
  const [complete, setComplete] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING TENSOR CORE...");
  const counterRef = useRef<HTMLSpanElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if previously loaded in this session to avoid annoying returning users
    const hasLoaded = sessionStorage.getItem("portfolio_loader_seen");
    if (hasLoaded) {
      setComplete(true);
      return;
    }

    // Number counter animation using Anime.js v4
    const counterObj = { value: 0 };
    animate(counterObj, {
      value: 100,
      duration: 1800,
      ease: "inOutQuad",
      onUpdate: () => {
        const val = Math.round(counterObj.value);
        if (counterRef.current) {
          counterRef.current.textContent = `${val}%`;
        }
        if (val > 30 && val <= 70) {
          setStatusText("LOADING CONVOLUTION KERNELS...");
        } else if (val > 70) {
          setStatusText("UTSAB SINHA // AI CORE READY");
        }
      },
    });

    // SVG Geometry animation
    if (polygonRef.current) {
      animate(polygonRef.current, {
        strokeDashoffset: [400, 0],
        ease: "inOutSine",
        duration: 1600,
      });
    }

    if (circleRef.current) {
      animate(circleRef.current, {
        scale: [0.8, 1.15, 1],
        opacity: [0.3, 0.9, 0.6],
        ease: "inOutSine",
        duration: 1400,
      });
    }

    // Exit transition
    const timer = setTimeout(() => {
      if (containerRef.current) {
        animate(containerRef.current, {
          translateY: "-100%",
          opacity: [1, 0],
          duration: 750,
          ease: "inOutExpo",
          onComplete: () => {
            setComplete(true);
            sessionStorage.setItem("portfolio_loader_seen", "true");
          },
        });
      } else {
        setComplete(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#07080a] text-white select-none pointer-events-auto"
      style={{ isolation: "isolate" }}
    >
      {/* Golden/Amber Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#f59e0b]/20 to-[#f97316]/20 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Cyber Polygon SVG */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-45">
            <polygon
              ref={polygonRef}
              points="50,5 95,50 50,95 5,50"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="360"
              style={{ filter: "drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))" }}
            />
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="18"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={22} className="text-[#fbbf24] animate-pulse" />
          </div>
        </div>

        {/* Counter and Status */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-baseline gap-1 font-mono text-3xl font-bold tracking-tight bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
            <span ref={counterRef}>0%</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[11px] font-mono text-[#fde68a] tracking-wider">
            <Terminal size={12} className="text-[#f59e0b]" />
            <span>{statusText}</span>
          </div>
        </div>

        {/* Progress bar hairline */}
        <div className="w-56 h-0.5 rounded-full bg-white/10 overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] animate-pulse"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
