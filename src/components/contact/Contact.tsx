"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Globe, Code2, Send, Phone, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please write at least 10 characters";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitted("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted("idle"), 4000);
  };

  const contactLinks = [
    {
      label: "EMAIL",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail size={16} />,
      accent: "cyan",
      badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-500",
    },
    {
      label: "PHONE",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      icon: <Phone size={16} />,
      accent: "emerald",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/utsab-sinha",
      href: profile.linkedin,
      icon: <Globe size={16} />,
      accent: "blue",
      badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-500",
    },
    {
      label: "GITHUB",
      value: "github.com/Utsabsinha19",
      href: profile.github,
      icon: <Code2 size={16} />,
      accent: "violet",
      badgeColor: "bg-violet-500/10 border-violet-500/30 text-violet-500",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full opacity-50 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.12), rgba(139,92,246,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="eyebrow mb-4">
            <span className="text-primary-gradient font-semibold">
              — 08 · CONTACT & COLLABORATION
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.035em] leading-[0.95] text-[var(--ink)]"
          >
            LET&apos;S BUILD
            <br />
            <span className="text-primary-gradient">SOMETHING</span>
            <br />
            INTELLIGENT.
          </motion.h2>
          <p className="mt-6 text-base md:text-lg text-[var(--ink-2)] max-w-xl mx-auto leading-relaxed">
            Open to AI/ML opportunities, internships, research collaborations, and engineering ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-4">
            {contactLinks.map((link) => (
              <Tilt3DCard key={link.label} maxTilt={4} glowColor="rgba(34,211,238,0.12)">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between w-full p-4 md:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--border-accent)] transition-all shadow-xs"
                  data-cursor="OPEN"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${link.badgeColor}`}>
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-[var(--ink-3)] uppercase tracking-widest">
                        {link.label}
                      </div>
                      <div className="text-sm font-medium mt-0.5 text-[var(--ink)] truncate">
                        {link.value}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[var(--ink-3)] group-hover:text-[var(--ink)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition flex-shrink-0 ml-2"
                  />
                </a>
              </Tilt3DCard>
            ))}

            {/* Location Card */}
            <div className="p-4 md:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[var(--ink-3)] uppercase tracking-widest">
                  LOCATION
                </div>
                <div className="text-sm font-medium mt-0.5 text-[var(--ink)]">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Tilt3DCard maxTilt={3} glowColor="rgba(139,92,246,0.15)">
              <form
                onSubmit={submit}
                className="rounded-2xl glass-card p-6 md:p-8"
                noValidate
              >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
                  <Sparkles size={16} className="text-cyan-500" />
                  <span className="text-xs font-mono text-[var(--ink-3)] uppercase tracking-widest">
                    Direct Message Channel
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Your name"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="Your email address"
                  />
                </div>

                <div className="mt-4">
                  <label className="eyebrow block mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className={`w-full rounded-xl bg-[var(--surface)] border p-4 text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--border-accent)] focus:ring-1 focus:ring-[var(--border-accent)] resize-none transition-colors ${
                      errors.message ? "border-red-500/50" : "border-[var(--border)]"
                    }`}
                    placeholder="Tell me about your project, team, or opportunity..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[11px] font-mono text-[var(--ink-3)]">
                    Direct contact: {profile.email}
                  </p>
                  <button type="submit" className="btn-primary cursor-pointer">
                    Send Message <Send size={14} />
                  </button>
                </div>

                {submitted === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-600 dark:text-emerald-300"
                  >
                    Thank you! Message captured successfully.
                  </motion.div>
                )}
              </form>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl bg-[var(--surface)] border px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--border-accent)] focus:ring-1 focus:ring-[var(--border-accent)] transition-colors ${
          error ? "border-red-500/50" : "border-[var(--border)]"
        }`}
        placeholder={placeholder || label}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
