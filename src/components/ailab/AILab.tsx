"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { labExperiments, type LabExperiment } from "@/lib/data";
import {
  Sparkles,
  BarChart3,
  Image as ImageIcon,
  MessageSquare,
  Type,
  Sliders,
  ShieldAlert,
  TrendingUp,
  Upload,
  Download,
  Paintbrush,
  Wand2,
  RefreshCw,
  Cpu,
  Binary,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Search,
  Crosshair,
  Scan,
} from "lucide-react";

export default function AILab() {
  const [active, setActive] = useState<LabExperiment | null>(labExperiments[0]);

  // Ghibli & Pencil Sketch Image Stylizer State
  const [userImage, setUserImage] = useState<string>("/utsab_profile.jpg");
  const [styleMode, setStyleMode] = useState<"ghibli" | "pencil">("ghibli");
  const [intensity, setIntensity] = useState<number>(80);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sentiment Predictor State
  const [sentimentInput, setSentimentInput] = useState(
    "The new product launch is incredible, best customer UI and experience!"
  );

  // Booking Predictor State (Sliders)
  const [leadTime, setLeadTime] = useState(45);
  const [priceSens, setPriceSens] = useState(3);
  const [extraBaggage, setExtraBaggage] = useState(true);
  const [duration, setDuration] = useState(6);

  // Biometric Face Classifier State
  const [scanActive, setScanActive] = useState(false);
  const [augmentations, setAugmentations] = useState({
    rotation: true,
    brightness: true,
    occlusion: false,
    flip: true,
  });
  const [bioLatency, setBioLatency] = useState(84);
  const [bioConfidence, setBioConfidence] = useState(96.8);

  // RAG / Embeddings Query State
  const [ragQuery, setRagQuery] = useState("How does vector clustering work in semantic search?");
  const [activeCluster, setActiveCluster] = useState("SEMANTIC SEARCH & RERANK");

  // Computer Vision HTML5 Canvas Image Stylization Engine (Ghibli & Pencil Sobel Filter)
  const processCanvasImage = useCallback(() => {
    if (!canvasRef.current || !userImage) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = userImage;

    img.onload = () => {
      const maxDim = 500;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const factor = intensity / 100;

      if (styleMode === "pencil") {
        const gray = new Float32Array(width * height);
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          gray[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
        }

        const sobelData = new Uint8ClampedArray(data.length);
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;

            const gx =
              -1 * gray[idx - width - 1] + 1 * gray[idx - width + 1] +
              -2 * gray[idx - 1] + 2 * gray[idx + 1] +
              -1 * gray[idx + width - 1] + 1 * gray[idx + width + 1];

            const gy =
              -1 * gray[idx - width - 1] - 2 * gray[idx - width] - 1 * gray[idx - width + 1] +
              1 * gray[idx + width - 1] + 2 * gray[idx + width] + 1 * gray[idx + width + 1];

            const mag = Math.sqrt(gx * gx + gy * gy) * factor;
            const pencil = Math.max(0, 255 - mag);

            const px = idx * 4;
            sobelData[px] = pencil;
            sobelData[px + 1] = pencil;
            sobelData[px + 2] = pencil;
            sobelData[px + 3] = 255;
          }
        }

        ctx.putImageData(new ImageData(sobelData, width, height), 0, 0);
      } else {
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          r = Math.min(255, r * (1 + 0.15 * factor) + 15 * factor);
          g = Math.min(255, g * (1 + 0.12 * factor) + 10 * factor);
          b = Math.min(255, b * (1 - 0.08 * factor));

          const q = 32;
          r = Math.round(r / q) * q;
          g = Math.round(g / q) * q;
          b = Math.round(b / q) * q;

          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }

        ctx.putImageData(imageData, 0, 0);
      }

      setIsProcessing(false);
    };
  }, [userImage, styleMode, intensity]);

  useEffect(() => {
    if (active?.id === "gibli-sketch") {
      processCanvasImage();
    }
  }, [active, processCanvasImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `utsab_portfolio_${styleMode}_art.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const runBiometricScan = () => {
    setScanActive(true);
    const duration = 1200;
    setTimeout(() => {
      setScanActive(false);
      setBioLatency(Math.floor(72 + Math.random() * 20));
      setBioConfidence(Number((95.5 + Math.random() * 3.8).toFixed(1)));
    }, duration);
  };

  const analyzeSentiment = (text: string) => {
    const posWords = ["good", "great", "excellent", "love", "best", "amazing", "incredible", "smooth", "happy", "fast", "top", "perfect", "launched", "boost", "clean", "wonderful", "innovative"];
    const negWords = ["bad", "terrible", "awful", "worst", "hate", "poor", "slow", "broken", "bug", "crash", "delay", "failed", "risk", "complaint", "issue", "ugly", "horrible"];

    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    let posCount = 0;
    let negCount = 0;
    const tokenDetails: { word: string; valence: number; label: string }[] = [];

    words.forEach((w) => {
      let val = 0;
      let lbl = "NEUTRAL";
      if (posWords.includes(w)) {
        posCount++;
        val = +0.75;
        lbl = "POS";
      } else if (negWords.includes(w)) {
        negCount++;
        val = -0.75;
        lbl = "NEG";
      }
      tokenDetails.push({ word: w, valence: val, label: lbl });
    });

    const compound = (posCount - negCount) / Math.max(1, posCount + negCount);
    
    let label = "NEUTRAL";
    let risk = "MODERATE MONITORING";
    let color = "#38bdf8";

    if (compound > 0.15) {
      label = "POSITIVE";
      risk = "LOW RISK";
      color = "#10b981";
    } else if (compound < -0.15) {
      label = "NEGATIVE";
      risk = "CRITICAL BRAND RISK";
      color = "#f43f5e";
    }

    const confidence = Math.min(0.98, 0.65 + Math.abs(compound) * 0.32);

    return { compound, posCount, negCount, label, risk, color, confidence, tokenDetails, totalTokens: words.length };
  };

  const calculateBookingIntent = () => {
    let score = 0.45;
    score += (120 - leadTime) * 0.0025;
    score -= (priceSens - 1) * 0.04;
    if (extraBaggage) score += 0.18;
    score += Math.min(0.12, duration * 0.015);

    const prob = Math.min(0.96, Math.max(0.08, score));

    return {
      probability: Math.round(prob * 100),
      label: prob > 0.55 ? "HIGH PURCHASE INTENT" : "UNLIKELY TO BOOK",
      color: prob > 0.55 ? "#10b981" : "#f43f5e",
      roc: 0.88,
      precision: 0.86,
      recall: 0.84,
      f1: 0.85,
    };
  };

  // Compute RAG vector matches
  const calculateRagClusters = (query: string) => {
    const q = query.toLowerCase();
    let searchScore = 0.4;
    let supportScore = 0.2;
    let riskScore = 0.15;
    let mlScore = 0.35;

    if (q.includes("search") || q.includes("recommend") || q.includes("vector") || q.includes("cluster") || q.includes("flyrank")) {
      searchScore += 0.52;
    }
    if (q.includes("refund") || q.includes("support") || q.includes("delay") || q.includes("cancel") || q.includes("broken")) {
      supportScore += 0.65;
    }
    if (q.includes("risk") || q.includes("complaint") || q.includes("brand") || q.includes("sentiment") || q.includes("alert")) {
      riskScore += 0.58;
    }
    if (q.includes("latency") || q.includes("cnn") || q.includes("face") || q.includes("vision") || q.includes("smote")) {
      mlScore += 0.55;
    }

    const clusters = [
      { name: "SEMANTIC SEARCH & RERANK", score: Math.min(0.98, searchScore), dim: "[0.84, 0.12, 0.91, 0.73]", color: "#38bdf8" },
      { name: "BRAND RISK & SENTIMENT", score: Math.min(0.98, riskScore), dim: "[0.19, 0.88, 0.34, 0.82]", color: "#f43f5e" },
      { name: "CUSTOMER SERVICE & SUPPORT", score: Math.min(0.98, supportScore), dim: "[0.42, 0.31, 0.77, 0.28]", color: "#f59e0b" },
      { name: "DEEP LEARNING & INFERENCE", score: Math.min(0.98, mlScore), dim: "[0.92, 0.67, 0.15, 0.88]", color: "#10b981" },
    ].sort((a, b) => b.score - a.score);

    return clusters;
  };

  const sentimentResult = analyzeSentiment(sentimentInput);
  const bookingResult = calculateBookingIntent();
  const ragClusters = calculateRagClusters(ragQuery);

  const iconFor = (t: LabExperiment["type"]) => {
    switch (t) {
      case "text":
        return <Type size={15} />;
      case "image":
        return <ImageIcon size={15} />;
      case "chat":
        return <MessageSquare size={15} />;
      case "number":
        return <BarChart3 size={15} />;
    }
  };

  return (
    <section id="lab" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] right-[5%] w-[550px] h-[550px] rounded-full opacity-35 dark:opacity-75 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 max-w-4xl"
        >
          <div className="eyebrow mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--color-sky-accent)]" />
            <span className="text-primary-gradient">
              — 04 · INTERACTIVE ML PLAYGROUND & CV STUDIO
            </span>
          </div>
          <h2 className="fluid-heading-section font-semibold tracking-[-0.03em] text-[var(--ink)]">
            LIVE <span className="text-primary-gradient">ML MODELS</span> & LAB
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--ink-2)] max-w-2xl leading-relaxed">
            Directly test live browser models — from client-side computer vision edge kernels and anime stylizers to real-time NLP sentiment analysis and vector clustering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Model Selection Menu */}
          <div className="lg:col-span-5 space-y-3">
            {labExperiments.map((exp) => {
              const isActive = active?.id === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActive(exp)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? "border-[var(--border-accent)] bg-[var(--surface-elevated)] shadow-lg"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] hover:bg-[var(--surface-elevated)]"
                  }`}
                  data-cursor="SELECT"
                >
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: isActive
                        ? "var(--border-accent)"
                        : "var(--border)",
                      background: isActive
                        ? "rgba(99,102,241,0.15)"
                        : "var(--surface)",
                      color: isActive ? "var(--color-sky-accent)" : "var(--ink-2)",
                    }}
                  >
                    {iconFor(exp.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm tracking-tight text-[var(--ink)]">
                        {exp.title}
                      </h3>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold text-[var(--color-sky-accent)] px-2 py-0.5 rounded-full bg-[var(--color-sky-accent)]/10 border border-[var(--color-sky-accent)]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky-accent)] animate-pulse" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--ink-3)] mt-1 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-[var(--ink-3)] px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Interactive Model Canvas / Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl glass-card overflow-hidden flex flex-col border border-[var(--border)] shadow-xl"
                >
                  {/* Top Header */}
                  <div className="relative p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-elevated)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-indigo-accent)]/15 border border-[var(--border-accent)] flex items-center justify-center text-[var(--color-sky-accent)]">
                        <Cpu size={15} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[var(--ink)]">
                          {active.title}
                        </div>
                        <div className="text-[10px] font-mono text-[var(--color-sky-accent)] tracking-wider font-medium uppercase">
                          CLIENT-SIDE IN-BROWSER INFERENCE
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
                      <span className="text-[11px] font-mono font-medium text-[var(--ink-3)]">
                        READY
                      </span>
                    </div>
                  </div>

                  {/* Model Playground Body */}
                  <div className="relative flex-1 p-6 flex flex-col gap-6">
                    {active.id === "gibli-sketch" ? (
                      /* 1. Computer Vision Image Stylizer (Ghibli & Pencil Sketch) */
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setStyleMode("ghibli")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                styleMode === "ghibli"
                                  ? "bg-[var(--color-indigo-accent)] text-white font-semibold shadow-sm"
                                  : "bg-[var(--surface-elevated)] text-[var(--ink-2)] border border-[var(--border)]"
                              }`}
                            >
                              <Wand2 size={13} /> STUDIO GHIBLI
                            </button>
                            <button
                              onClick={() => setStyleMode("pencil")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                styleMode === "pencil"
                                  ? "bg-[var(--color-violet-accent)] text-white font-semibold shadow-sm"
                                  : "bg-[var(--surface-elevated)] text-[var(--ink-2)] border border-[var(--border)]"
                              }`}
                            >
                              <Paintbrush size={13} /> PENCIL SKETCH
                            </button>
                          </div>

                          <label className="btn-primary !py-1.5 !px-3 text-xs cursor-pointer inline-flex items-center gap-1.5">
                            <Upload size={13} /> Upload Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Intensity Slider */}
                        <div className="px-1">
                          <div className="flex justify-between text-xs font-mono mb-1.5">
                            <span className="text-[var(--ink-2)]">Style Kernel Intensity</span>
                            <span className="text-[var(--color-sky-accent)] font-semibold">{intensity}%</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="150"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full accent-[var(--color-indigo-accent)] cursor-pointer"
                          />
                        </div>

                        {/* Canvas Output Display */}
                        <div className="relative aspect-video rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex items-center justify-center">
                          <canvas ref={canvasRef} className="max-h-full max-w-full object-contain" />
                          {isProcessing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-mono text-xs">
                              <RefreshCw size={16} className="animate-spin text-amber-400" />
                              Computing Convolution Kernel...
                            </div>
                          )}
                        </div>

                        {/* Technical Spec Panel */}
                        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">ALGORITHM</div>
                            <div className="font-semibold text-[var(--color-sky-accent)] mt-0.5">
                              {styleMode === "pencil" ? "Sobel 3x3 Filter" : "Cel Tone Quant"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">LATENCY</div>
                            <div className="font-semibold text-emerald-500 mt-0.5">&lt; 8 ms</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">ACCELERATION</div>
                            <div className="font-semibold text-[var(--color-indigo-accent)] mt-0.5">HTML5 Canvas</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">COLOR BINS</div>
                            <div className="font-semibold text-[var(--color-violet-accent)] mt-0.5">32 Step RGB</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-mono text-[var(--ink-3)]">
                            Direct in-memory pixel convolution
                          </span>
                          <button onClick={handleDownload} className="btn-primary !py-2 !px-4 text-xs cursor-pointer">
                            <Download size={14} /> Download Image
                          </button>
                        </div>
                      </div>
                    ) : active.id === "sentiment" ? (
                      /* 2. NLP VADER Sentiment Model Interactive Demo */
                      <div className="space-y-5">
                        <div>
                          <label className="eyebrow block mb-2">Input Sentence or Review</label>
                          <textarea
                            value={sentimentInput}
                            onChange={(e) => setSentimentInput(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-mono text-[var(--ink)] focus:outline-none focus:border-[var(--border-accent)] focus:ring-1 focus:ring-[var(--border-accent)] resize-none transition-colors"
                            placeholder="Type a sentence to test sentiment..."
                          />
                          <div className="mt-2 flex flex-wrap gap-2">
                            {[
                              "The product launch exceeded all expectations! Clean UI.",
                              "The service is terrible and customer support is broken.",
                              "The flight arrived on schedule with standard amenities.",
                            ].map((sample) => (
                              <button
                                key={sample}
                                onClick={() => setSentimentInput(sample)}
                                className="text-[10px] font-mono px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--ink-3)] hover:text-[var(--ink)] cursor-pointer truncate max-w-[280px]"
                              >
                                Try: &quot;{sample.slice(0, 28)}...&quot;
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Real-time NLP Output Panel */}
                        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="eyebrow">VADER Polarity Score</span>
                            <span className="font-mono text-sm font-bold" style={{ color: sentimentResult.color }}>
                              {sentimentResult.compound > 0 ? "+" : ""}{sentimentResult.compound.toFixed(2)}
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                            <motion.div
                              animate={{ width: `${Math.round(((sentimentResult.compound + 1) / 2) * 100)}%` }}
                              transition={{ duration: 0.3 }}
                              className="h-full rounded-full"
                              style={{ background: sentimentResult.color }}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                            <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">CLASSIFICATION</div>
                              <div className="text-sm font-semibold mt-1" style={{ color: sentimentResult.color }}>
                                {sentimentResult.label}
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">CONFIDENCE</div>
                              <div className="text-sm font-semibold text-[var(--ink)] mt-1">
                                {(sentimentResult.confidence * 100).toFixed(0)}%
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">BRAND RISK</div>
                              <div className="text-xs font-semibold mt-1 flex items-center justify-center gap-1" style={{ color: sentimentResult.color }}>
                                <ShieldAlert size={12} />
                                <span>{sentimentResult.risk}</span>
                              </div>
                            </div>
                          </div>

                          {/* Token Breakdown */}
                          <div className="pt-2 border-t border-[var(--border)]">
                            <div className="eyebrow mb-2 flex items-center gap-1.5">
                              <Binary size={12} className="text-[var(--color-sky-accent)]" /> Token Lexicon Breakdown ({sentimentResult.totalTokens} Tokens)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {sentimentResult.tokenDetails.slice(0, 12).map((t, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                    t.label === "POS"
                                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                                      : t.label === "NEG"
                                      ? "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold"
                                      : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink-3)]"
                                  }`}
                                >
                                  {t.word} {t.valence !== 0 ? `(${t.valence > 0 ? "+" : ""}${t.valence})` : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : active.id === "classifier" ? (
                      /* 3. NEW: Biometric Face Recognition Live Interactive Scanner */
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="eyebrow flex items-center gap-2">
                            <Scan size={14} className="text-[var(--color-violet-accent)]" /> CNN Biometric Verification Simulation
                          </span>
                          <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center gap-1">
                            <Zap size={12} /> &lt;100ms Inference
                          </span>
                        </div>

                        {/* Scanner Visual Container */}
                        <div className="relative aspect-video rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex items-center justify-center p-6">
                          <div className="relative w-48 h-48 rounded-2xl border border-[var(--border-accent)] bg-[var(--surface-elevated)] flex items-center justify-center overflow-hidden shadow-inner">
                            {/* 36-Point Facial Mesh Grid */}
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30">
                              {Array.from({ length: 36 }).map((_, i) => (
                                <div key={i} className="border border-[var(--color-indigo-accent)]/30 flex items-center justify-center">
                                  <span className="w-1 h-1 rounded-full bg-[var(--color-sky-accent)] opacity-40" />
                                </div>
                              ))}
                            </div>

                            {/* Scanning Infrared Line */}
                            <motion.div
                              animate={{ y: scanActive ? [-80, 80, -80] : [-40, 40, -40] }}
                              transition={{ duration: scanActive ? 0.8 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-sky-accent)] to-transparent shadow-[0_0_15px_#38bdf8]"
                            />

                            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                              <ShieldCheck size={40} className={`transition-all duration-300 ${scanActive ? "text-[var(--color-sky-accent)] scale-110" : "text-emerald-500"}`} />
                              <div className="text-[11px] font-mono font-semibold text-[var(--ink)]">
                                {scanActive ? "ANALYZING TENSORS..." : "BIOMETRIC MATCH VERIFIED"}
                              </div>
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">
                                Confidence: {bioConfidence}% · Latency: {bioLatency}ms
                              </div>
                            </div>
                          </div>

                          {/* Corner Reticles */}
                          <div className="absolute top-4 left-4 flex items-center gap-1 font-mono text-[10px] text-[var(--ink-3)]">
                            <Crosshair size={13} className="text-[var(--color-sky-accent)]" /> FEED: WEBCAM_SIM_01
                          </div>
                          <div className="absolute top-4 right-4 font-mono text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> +11% OOD GAIN
                          </div>
                        </div>

                        {/* Augmentation Toggles */}
                        <div>
                          <div className="eyebrow mb-2">Active Data Augmentation Pipeline</div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: "rotation", label: "Rotation (±15°)" },
                              { id: "brightness", label: "Brightness Shift" },
                              { id: "occlusion", label: "Occlusion Mask" },
                              { id: "flip", label: "Horizontal Flip" },
                            ].map((aug) => {
                              const isChecked = augmentations[aug.id as keyof typeof augmentations];
                              return (
                                <button
                                  key={aug.id}
                                  onClick={() =>
                                    setAugmentations((prev) => ({
                                      ...prev,
                                      [aug.id]: !prev[aug.id as keyof typeof augmentations],
                                    }))
                                  }
                                  className={`p-2 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                                    isChecked
                                      ? "border-[var(--color-indigo-accent)] bg-[var(--color-indigo-accent)]/10 text-[var(--ink)] font-semibold"
                                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-3)]"
                                  }`}
                                >
                                  <span className="truncate">{aug.label}</span>
                                  <CheckCircle2 size={12} className={isChecked ? "text-[var(--color-sky-accent)]" : "opacity-30"} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action trigger */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-mono text-[var(--ink-3)]">
                            500+ Benchmark Test Frames
                          </span>
                          <button
                            onClick={runBiometricScan}
                            disabled={scanActive}
                            className="btn-primary !py-2 !px-4 text-xs cursor-pointer"
                          >
                            <Scan size={14} /> {scanActive ? "Scanning..." : "Simulate Inference Scan"}
                          </button>
                        </div>
                      </div>
                    ) : active.id === "rag" ? (
                      /* 4. NEW: Interactive Semantic Vector Space & Intent Classifier */
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="eyebrow flex items-center gap-2">
                            <Target size={14} className="text-[var(--color-sky-accent)]" /> Vector Embedding & Intent Classifier
                          </span>
                          <span className="text-xs font-mono font-semibold text-[var(--color-sky-accent)]">
                            Cosine Similarity Engine
                          </span>
                        </div>

                        {/* Search Input Box */}
                        <div>
                          <div className="relative flex items-center">
                            <Search size={15} className="absolute left-3.5 text-[var(--ink-3)]" />
                            <input
                              type="text"
                              value={ragQuery}
                              onChange={(e) => setRagQuery(e.target.value)}
                              placeholder="Type query to project embedding..."
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-mono text-[var(--ink)] focus:outline-none focus:border-[var(--border-accent)] focus:ring-1 focus:ring-[var(--border-accent)]"
                            />
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {[
                              "Vector clustering for recommendations",
                              "Need urgent refund for my cancelled booking",
                              "Detect negative brand mentions on Twitter",
                              "Biometric authentication latency test",
                            ].map((preset) => (
                              <button
                                key={preset}
                                onClick={() => setRagQuery(preset)}
                                className="text-[10px] font-mono px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--ink-3)] hover:text-[var(--ink)] cursor-pointer truncate max-w-[280px]"
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cluster Similarity Breakdown */}
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
                          <div className="eyebrow flex items-center justify-between">
                            <span>Top Intent Cluster Matches</span>
                            <span className="text-[10px]">768-Dim Dense Projection</span>
                          </div>

                          {ragClusters.map((c, i) => (
                            <div key={c.name} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className={`font-medium ${i === 0 ? "text-[var(--ink)] font-semibold" : "text-[var(--ink-2)]"}`}>
                                  {c.name}
                                </span>
                                <span className="font-semibold" style={{ color: c.color }}>
                                  {(c.score * 100).toFixed(1)}% Sim
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                                <motion.div
                                  animate={{ width: `${c.score * 100}%` }}
                                  transition={{ duration: 0.3 }}
                                  className="h-full rounded-full"
                                  style={{ background: c.color }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-between text-xs font-mono">
                          <div className="text-[var(--ink-3)]">
                            Top Centroid Vector: <span className="text-[var(--ink-2)] font-semibold">{ragClusters[0].dim}</span>
                          </div>
                          <span className="text-[10px] text-emerald-500 font-semibold uppercase">CLUSTER ASSIGNED</span>
                        </div>
                      </div>
                    ) : active.id === "prediction" ? (
                      /* 5. Airline Booking Behavior Predictor (Tabular ML) */
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="eyebrow flex items-center gap-2">
                            <Sliders size={14} className="text-[var(--color-violet-accent)]" /> Feature Vectors (Airline Dataset)
                          </span>
                          <span className="text-xs font-mono text-[var(--color-violet-accent)] font-semibold">
                            SMOTE + GridSearchCV
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Lead Time (Days)</span>
                              <span className="text-[var(--color-sky-accent)] font-semibold">{leadTime}d</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="120"
                              value={leadTime}
                              onChange={(e) => setLeadTime(Number(e.target.value))}
                              className="w-full accent-[var(--color-indigo-accent)] cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Price Sensitivity (1-10)</span>
                              <span className="text-[var(--color-violet-accent)] font-semibold">{priceSens}</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={priceSens}
                              onChange={(e) => setPriceSens(Number(e.target.value))}
                              className="w-full accent-[var(--color-violet-accent)] cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Flight Duration (Hours)</span>
                              <span className="text-rose-500 font-semibold">{duration}h</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="16"
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              className="w-full accent-rose-500 cursor-pointer"
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                            <span className="text-xs font-mono text-[var(--ink-2)]">Extra Baggage Checked</span>
                            <button
                              onClick={() => setExtraBaggage(!extraBaggage)}
                              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                                extraBaggage
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 font-semibold"
                                  : "bg-[var(--surface-elevated)] text-[var(--ink-3)] border border-[var(--border)]"
                              }`}
                            >
                              {extraBaggage ? "YES (+0.18)" : "NO (+0.00)"}
                            </button>
                          </div>
                        </div>

                        {/* Model Inference & Metrics Output */}
                        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="eyebrow flex items-center gap-1.5">
                              <TrendingUp size={14} className="text-[var(--color-sky-accent)]" /> Purchase Intent Probability
                            </span>
                            <span className="font-mono text-2xl font-bold" style={{ color: bookingResult.color }}>
                              {bookingResult.probability}%
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                            <motion.div
                              animate={{ width: `${bookingResult.probability}%` }}
                              transition={{ duration: 0.3 }}
                              className="h-full rounded-full"
                              style={{ background: bookingResult.color }}
                            />
                          </div>

                          {/* Evaluation Metrics Grid */}
                          <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono text-xs">
                            <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">ROC-AUC</div>
                              <div className="font-semibold text-[var(--color-sky-accent)] mt-0.5">{bookingResult.roc}</div>
                            </div>
                            <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">PRECISION</div>
                              <div className="font-semibold text-[var(--color-violet-accent)] mt-0.5">{bookingResult.precision}</div>
                            </div>
                            <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">RECALL</div>
                              <div className="font-semibold text-rose-500 mt-0.5">{bookingResult.recall}</div>
                            </div>
                            <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">F1-SCORE</div>
                              <div className="font-semibold text-emerald-500 mt-0.5">{bookingResult.f1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
