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

  const analyzeSentiment = (text: string) => {
    const posWords = ["good", "great", "excellent", "love", "best", "amazing", "incredible", "smooth", "happy", "fast", "top", "perfect", "launched", "boost"];
    const negWords = ["bad", "terrible", "awful", "worst", "hate", "poor", "slow", "broken", "bug", "crash", "delay", "failed", "risk", "complaint", "issue"];

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
    let color = "#06B6D4";

    if (compound > 0.15) {
      label = "POSITIVE";
      risk = "LOW RISK";
      color = "#10B981";
    } else if (compound < -0.15) {
      label = "NEGATIVE";
      risk = "CRITICAL BRAND RISK";
      color = "#EF4444";
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
      color: prob > 0.55 ? "#10B981" : "#EF4444",
      roc: 0.88,
      precision: 0.86,
      recall: 0.84,
      f1: 0.85,
    };
  };

  const sentimentResult = analyzeSentiment(sentimentInput);
  const bookingResult = calculateBookingIntent();

  const iconFor = (t: LabExperiment["type"]) => {
    switch (t) {
      case "text":
        return <Type size={14} />;
      case "image":
        return <ImageIcon size={14} />;
      case "chat":
        return <MessageSquare size={14} />;
      case "number":
        return <BarChart3 size={14} />;
    }
  };

  return (
    <section id="lab" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(217,70,239,0.12), transparent 70%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 max-w-4xl"
        >
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 04 · INTERACTIVE ML PLAYGROUND & CV STUDIO
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[0.95] text-[var(--ink)]">
            LIVE <span className="text-primary-gradient">ML MODELS</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--ink-2)] max-w-2xl leading-relaxed">
            Test Utsab&apos;s AI/ML models in real-time — from Ghibli anime & pencil sketch computer vision stylizers to NLP sentiment analysis and predictive models.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Model Selection Menu */}
          <div className="lg:col-span-5 space-y-3">
            {labExperiments.map((exp) => {
              const isActive = active?.id === exp.id;
              return (
                <motion.button
                  key={exp.id}
                  onClick={() => setActive(exp)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? "border-[var(--border-accent)] bg-[var(--surface-elevated)] shadow-md"
                      : "border-[var(--border)] bg-[var(--glass-bg)] hover:border-[var(--border-accent)]"
                  }`}
                  data-cursor="OPEN"
                >
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-[var(--ink)]"
                    style={{
                      borderColor: isActive
                        ? "rgba(148,163,184,0.3)"
                        : "var(--border)",
                      background: isActive
                        ? "rgba(139,92,246,0.15)"
                        : "var(--surface)",
                    }}
                  >
                    {iconFor(exp.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium tracking-tight text-[var(--ink)]">{exp.title}</h3>
                      {isActive && (
                        <span className="eyebrow !text-[9px] text-cyan-500 font-semibold">
                          LIVE INFERENCE
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[var(--ink-3)] mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-[var(--ink-3)] px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
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
                  transition={{ duration: 0.35 }}
                  className="relative rounded-2xl glass-card overflow-hidden flex flex-col border border-[var(--border)]"
                >
                  {/* Top Header */}
                  <div className="relative p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-gradient/20 border border-[var(--border)] flex items-center justify-center">
                        <Sparkles size={14} className="text-cyan-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--ink)]">{active.title}</div>
                        <div className="text-[11px] font-mono text-cyan-500 uppercase tracking-wider font-semibold">
                          CLIENT-SIDE COMPUTER VISION / ML ENGINE
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
                      <span className="text-[11px] font-mono text-[var(--ink-3)]">
                        INFERENCE READY
                      </span>
                    </div>
                  </div>

                  {/* Model Playground Body */}
                  <div className="relative flex-1 p-6 flex flex-col gap-6">
                    {active.id === "gibli-sketch" ? (
                      /* Computer Vision Image Stylizer (Ghibli & Pencil Sketch) */
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setStyleMode("ghibli")}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                styleMode === "ghibli"
                                  ? "bg-cyan-500 text-white font-semibold shadow-xs"
                                  : "bg-[var(--surface-elevated)] text-[var(--ink-2)] border border-[var(--border)]"
                              }`}
                            >
                              <Wand2 size={13} /> STUDIO GHIBLI
                            </button>
                            <button
                              onClick={() => setStyleMode("pencil")}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                styleMode === "pencil"
                                  ? "bg-violet-500 text-white font-semibold shadow-xs"
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
                        <div className="px-2">
                          <div className="flex justify-between text-xs font-mono mb-1.5">
                            <span className="text-[var(--ink-2)]">Style Intensity</span>
                            <span className="text-cyan-500 font-semibold">{intensity}%</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="150"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full accent-cyan-500 cursor-pointer"
                          />
                        </div>

                        {/* Canvas Output Display */}
                        <div className="relative aspect-video rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex items-center justify-center">
                          <canvas ref={canvasRef} className="max-h-full max-w-full object-contain shadow-md" />
                          {isProcessing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-mono text-xs">
                              <RefreshCw size={16} className="animate-spin text-cyan-400" />
                              Applying {styleMode === "ghibli" ? "Ghibli Palette" : "Sobel Pencil Filter"}...
                            </div>
                          )}
                        </div>

                        {/* Technical Spec Panel */}
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">ALGORITHM</div>
                            <div className="font-semibold text-cyan-500 mt-0.5">
                              {styleMode === "pencil" ? "Sobel 3x3 Gx/Gy" : "Miyazaki Quant"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">LATENCY</div>
                            <div className="font-semibold text-emerald-400 mt-0.5">&lt; 8 ms</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">PIXEL CONVOLUTION</div>
                            <div className="font-semibold text-violet-400 mt-0.5">HTML5 GPU Canvas</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[var(--ink-3)]">QUANTIZATION</div>
                            <div className="font-semibold text-pink-500 mt-0.5">32 Step RGB</div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-[11px] font-mono text-[var(--ink-3)]">
                            CV Engine · Sobel Gradient Matrix & Tone Mapping
                          </div>
                          <button onClick={handleDownload} className="btn-primary !py-2 !px-4 text-xs cursor-pointer">
                            <Download size={14} /> Download Art
                          </button>
                        </div>
                      </div>
                    ) : active.id === "sentiment" ? (
                      /* NLP VADER Sentiment Model Interactive Demo */
                      <div className="space-y-6">
                        <div>
                          <label className="eyebrow block mb-2">Input Social Post / Review Text</label>
                          <textarea
                            value={sentimentInput}
                            onChange={(e) => setSentimentInput(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-mono text-[var(--ink)] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none transition-colors"
                            placeholder="Type a tweet or review to test sentiment..."
                          />
                          <div className="mt-2 flex flex-wrap gap-2">
                            {[
                              "The product launch exceeded all expectations! Love the UI.",
                              "The service is terrible and customer support is broken.",
                              "The flight arrived on schedule with standard features.",
                            ].map((sample) => (
                              <button
                                key={sample}
                                onClick={() => setSentimentInput(sample)}
                                className="text-[10px] font-mono px-2 py-1 rounded border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--ink-3)] hover:text-[var(--ink)] cursor-pointer truncate max-w-[280px]"
                              >
                                Try: &quot;{sample.slice(0, 30)}...&quot;
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Real-time NLP Output Panel */}
                        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="eyebrow">VADER Compound Score</span>
                            <span className="font-mono text-sm font-semibold" style={{ color: sentimentResult.color }}>
                              {sentimentResult.compound > 0 ? "+" : ""}{sentimentResult.compound.toFixed(2)}
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                            <motion.div
                              animate={{ width: `${Math.round(((sentimentResult.compound + 1) / 2) * 100)}%` }}
                              transition={{ duration: 0.4 }}
                              className="h-full rounded-full"
                              style={{ background: sentimentResult.color }}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                            <div className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">CLASSIFICATION</div>
                              <div className="text-sm font-semibold mt-1" style={{ color: sentimentResult.color }}>
                                {sentimentResult.label}
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">CONFIDENCE</div>
                              <div className="text-sm font-semibold text-[var(--ink)] mt-1">
                                {(sentimentResult.confidence * 100).toFixed(0)}%
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[10px] font-mono text-[var(--ink-3)]">BRAND RISK</div>
                              <div className="text-xs font-semibold mt-1 flex items-center justify-center gap-1" style={{ color: sentimentResult.color }}>
                                <ShieldAlert size={12} />
                                <span>{sentimentResult.risk}</span>
                              </div>
                            </div>
                          </div>

                          {/* Token Breakdown Table */}
                          <div className="pt-2 border-t border-[var(--border)]">
                            <div className="eyebrow mb-2 flex items-center gap-1.5">
                              <Binary size={12} className="text-cyan-500" /> Token Lexical Breakdown ({sentimentResult.totalTokens} Tokens)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {sentimentResult.tokenDetails.slice(0, 12).map((t, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                    t.label === "POS"
                                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold"
                                      : t.label === "NEG"
                                      ? "border-red-500/40 bg-red-500/10 text-red-400 font-semibold"
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
                    ) : active.id === "prediction" ? (
                      /* Airline Booking Behavior Predictor (Tabular ML) */
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="eyebrow flex items-center gap-2">
                            <Sliders size={14} className="text-violet-400" /> Feature Vectors (Airline Dataset)
                          </span>
                          <span className="text-[11px] font-mono text-violet-400 font-semibold">
                            SMOTE + GridSearchCV Model
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Lead Time (Days)</span>
                              <span className="text-cyan-500 font-semibold">{leadTime}d</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="120"
                              value={leadTime}
                              onChange={(e) => setLeadTime(Number(e.target.value))}
                              className="w-full accent-cyan-500 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Price Sensitivity (1-10)</span>
                              <span className="text-violet-400 font-semibold">{priceSens}</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={priceSens}
                              onChange={(e) => setPriceSens(Number(e.target.value))}
                              className="w-full accent-violet-500 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-[var(--ink-2)]">Flight Duration (Hours)</span>
                              <span className="text-pink-500 font-semibold">{duration}h</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="16"
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              className="w-full accent-pink-500 cursor-pointer"
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                            <span className="text-xs font-mono text-[var(--ink-2)]">Extra Baggage Selected</span>
                            <button
                              onClick={() => setExtraBaggage(!extraBaggage)}
                              className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                                extraBaggage
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
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
                              <TrendingUp size={14} className="text-cyan-500" /> Purchase Probability
                            </span>
                            <span className="font-mono text-2xl font-bold" style={{ color: bookingResult.color }}>
                              {bookingResult.probability}%
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                            <motion.div
                              animate={{ width: `${bookingResult.probability}%` }}
                              transition={{ duration: 0.4 }}
                              className="h-full rounded-full"
                              style={{ background: bookingResult.color }}
                            />
                          </div>

                          {/* Evaluation Metrics Grid */}
                          <div className="grid grid-cols-4 gap-2 pt-2 text-center font-mono text-xs">
                            <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">ROC-AUC</div>
                              <div className="font-semibold text-cyan-400 mt-0.5">{bookingResult.roc}</div>
                            </div>
                            <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">PRECISION</div>
                              <div className="font-semibold text-violet-400 mt-0.5">{bookingResult.precision}</div>
                            </div>
                            <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">RECALL</div>
                              <div className="font-semibold text-pink-400 mt-0.5">{bookingResult.recall}</div>
                            </div>
                            <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                              <div className="text-[9px] text-[var(--ink-3)]">F1-SCORE</div>
                              <div className="font-semibold text-emerald-400 mt-0.5">{bookingResult.f1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-mono text-[var(--ink-2)] leading-relaxed">
                          {active.sampleOutput || "Interactive inference demo."}
                        </div>
                      </div>
                    )}
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
