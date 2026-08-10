"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Line, Torus } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

const DARK_COLORS = ["#22D3EE", "#3B82F6", "#8B5CF6", "#EC4899"];
const LIGHT_COLORS = ["#3B82F6", "#06B6D4", "#6366F1", "#8B5CF6"];

function NeuralCore({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const activeColors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const { positions, colors } = useMemo(() => {
    const count = 220;
    const radius = 1.65;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorObjs = activeColors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      const c = colorObjs[i % colorObjs.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [activeColors]);

  const lines = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    const count = positions.length / 3;
    const verts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      verts.push(
        new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        )
      );
    }
    for (let i = 0; i < count; i += 2) {
      let nearest = -1;
      let best = Infinity;
      for (let j = i + 1; j < count; j++) {
        const d = verts[i].distanceToSquared(verts[j]);
        if (d < best && d < 0.85 * 0.85) {
          best = d;
          nearest = j;
        }
      }
      if (nearest >= 0) {
        segs.push([verts[i], verts[nearest]]);
      }
    }
    return segs;
  }, [positions]);

  useFrame((state, delta) => {
    // Smooth time-based continuous rotation
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      inner.current.scale.setScalar(s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.35;
      ringRef.current.rotation.x += delta * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z += delta * 0.25;
      ringRef2.current.rotation.y -= delta * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Inner Glowing Core */}
      <Sphere ref={inner} args={[0.65, 48, 48]}>
        <meshBasicMaterial
          color={isDark ? "#3B82F6" : "#2563EB"}
          transparent
          opacity={isDark ? 0.18 : 0.14}
        />
      </Sphere>

      {/* Wireframe Geodesic Sphere */}
      <Sphere args={[0.67, 32, 32]}>
        <meshBasicMaterial
          color={isDark ? "#22D3EE" : "#0284C7"}
          wireframe
          transparent
          opacity={isDark ? 0.4 : 0.3}
        />
      </Sphere>

      {/* Smooth Spinning Orbital Rings */}
      <Torus ref={ringRef} args={[2.0, 0.008, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial
          color={isDark ? "#22D3EE" : "#0284C7"}
          transparent
          opacity={isDark ? 0.6 : 0.4}
        />
      </Torus>

      <Torus ref={ringRef2} args={[2.2, 0.006, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial
          color={isDark ? "#8B5CF6" : "#7C3AED"}
          transparent
          opacity={isDark ? 0.5 : 0.35}
        />
      </Torus>

      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial
          color={isDark ? "#1E3A8A" : "#DBEAFE"}
          transparent
          opacity={isDark ? 0.06 : 0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {lines.map((seg, i) => (
        <Line
          key={i}
          points={seg}
          color={activeColors[i % activeColors.length]}
          lineWidth={isDark ? 0.6 : 0.75}
          transparent
          opacity={isDark ? 0.25 : 0.35}
        />
      ))}

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.048 : 0.058}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

function MouseParallax() {
  const { viewport } = useThree();
  useFrame(({ pointer, camera }) => {
    const x = (pointer.x * viewport.width) / 10;
    const y = (pointer.y * viewport.height) / 10;
    camera.position.x += (x - camera.position.x) * 0.05;
    camera.position.y += (y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function NeuralSphere() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={isDark ? 0.4 : 0.7} />
      <pointLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 1.2}
        color={isDark ? "#3B82F6" : "#2563EB"}
      />
      <pointLight
        position={[-5, -2, 2]}
        intensity={isDark ? 0.6 : 0.9}
        color={isDark ? "#8B5CF6" : "#7C3AED"}
      />
      <MouseParallax />
      <NeuralCore isDark={isDark} />
    </Canvas>
  );
}
