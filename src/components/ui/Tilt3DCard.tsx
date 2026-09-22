"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glowColor?: string;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 6,
  perspective = 1000,
  glowColor = "rgba(99, 102, 241, 0.18)",
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 320, damping: 28 }
  );
  const rotateYSpring = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 320, damping: 28 }
  );

  const spotlightXPercent = useTransform(mouseX, (x) => `${Math.round(x * 100)}%`);
  const spotlightYPercent = useTransform(mouseY, (y) => `${Math.round(y * 100)}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(550px circle at ${spotlightXPercent} ${spotlightYPercent}, ${glowColor}, transparent 55%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: `${perspective}px` }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {/* Real-time Dynamic 3D Spotlight Shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: hovered ? 1 : 0,
            background: spotlightBg,
          }}
        />
        <div style={{ transform: "translateZ(0px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}
