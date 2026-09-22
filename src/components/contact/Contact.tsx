"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Globe,
  Code2,
  Send,
  Phone,
  MapPin,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { profile } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";
import { sendContactMessage } from "@/app/actions/contact";

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState<FormState>("idle");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitted("submitting");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("honeypot", "");

    const result = await sendContactMessage(submitted, formData);

    if ("errors" in result && result.errors) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      if (result.errors.name?.[0]) fieldErrors.name = result.errors.name[0];
      if (result.errors.email?.[0]) fieldErrors.email = result.errors.email[0];
      if (result.errors.message?.[0]) fieldErrors.message = result.errors.message[0];
      setErrors(fieldErrors);
      setSubmitted("error");
      return;
    }

    if (result.success) {
      setForm({ name: "", email: "", message: "" });
      setSubmitted("success");
      const timer = setTimeout(() => setSubmitted("idle"), 5000);
      return () => clearTimeout(timer);
    }

    setSubmitted("error");
  };

  const contactLinks = [
    {
      id: "email",
      label: "EMAIL",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail size={16} />,
      badgeColor: "bg-sky-500/10 border-sky-500/30 text-sky-500",
      canCopy: true,
    },
    {
      id: "phone",
      label: "PHONE",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      icon: <Phone size={16} />,
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
      canCopy: true,
    },
    {
      id: "linkedin",
      label: "LINKEDIN",
      value: "linkedin.com/in/utsab-sinha",
      href: profile.linkedin,
      icon: <Globe size={16} />,
      badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-500",
      canCopy: false,
    },
    {
      id: "github",
      label: "GITHUB",
      value: "github.com/Utsabsinha19",
      href: profile.github,
      icon: <Code2 size={16} />,
      badgeColor: "bg-violet-500/10 border-violet-500/30 text-violet-500",
      canCopy: false,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-35 dark:opacity-75 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15), rgba(56,189,248,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="eyebrow mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky-accent)]" />
            <span className="text-primary-gradient font-semibold">
              — 08 · DIRECT COMMUNICATION & INQUIRIES
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="fluid-heading-hero font-semibold tracking-[-0.035em] text-[var(--ink)]"
          >
            LET&apos;S BUILD
            <br />
            <span className="text-primary-gradient">SOMETHING</span>
            <br />
            INTELLIGENT.
          </motion.h2>
          <p className="mt-5 text-base md:text-lg text-[var(--ink-2)] max-w-xl mx-auto leading-relaxed">
            Open to AI/ML engineering roles, internships, research collaborations, and technical partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-3.5">
            {contactLinks.map((link) => (
              <Tilt3DCard key={link.id} maxTilt={4} glowColor="rgba(99,102,241,0.12)">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between w-full p-4 md:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-accent)] transition-all shadow-sm"
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
                      <div className="text-sm font-semibold mt-0.5 text-[var(--ink)] truncate">
                        {link.value}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.canCopy && (
                      <button
                        onClick={(e) => copyToClipboard(link.value, link.id, e)}
                        title="Copy to clipboard"
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                        data-cursor="COPY"
                      >
                        {copiedKey === link.id ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    )}
                    <ArrowUpRight
                      size={18}
                      className="text-[var(--ink-3)] group-hover:text-[var(--ink)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition flex-shrink-0"
                    />
                  </div>
                </a>
              </Tilt3DCard>
            ))}

            {/* Location Card */}
            <div className="p-4 md:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-[var(--color-violet-accent)] flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[var(--ink-3)] uppercase tracking-widest">
                  LOCATION
                </div>
                <div className="text-sm font-semibold mt-0.5 text-[var(--ink)]">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Tilt3DCard maxTilt={3} glowColor="rgba(99,102,241,0.15)">
              <form
                onSubmit={onSubmit}
                className="rounded-2xl glass-card p-6 md:p-8"
                noValidate
              >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
                  <Sparkles size={16} className="text-[var(--color-sky-accent)]" />
                  <span className="text-xs font-mono text-[var(--ink-3)] uppercase tracking-widest">
                    Direct Inquiry Dispatcher
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
                      errors.message ? "border-rose-500/50" : "border-[var(--border)]"
                    }`}
                    placeholder="Tell me about your project, team, or opportunity..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500">{errors.message}</p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[11px] font-mono text-[var(--ink-3)]">
                    Direct: {profile.email}
                  </p>
                  <button
                    type="submit"
                    disabled={submitted === "submitting"}
                    className="btn-primary cursor-pointer"
                  >
                    {submitted === "submitting" ? "Transmitting..." : "Send Message"} <Send size={14} />
                  </button>
                </div>

                {submitted === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2"
                  >
                    <Check size={16} /> Thank you! Message transmitted successfully.
                  </motion.div>
                )}

                {submitted === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-sm text-rose-600 dark:text-rose-400"
                  >
                    {errors.name || errors.email || errors.message
                      ? "Please fix the form errors above."
                      : "Transmission failed. Please use direct email: utsabsinha468@gmail.com"}
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
          error ? "border-rose-500/50" : "border-[var(--border)]"
        }`}
        placeholder={placeholder || label}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}