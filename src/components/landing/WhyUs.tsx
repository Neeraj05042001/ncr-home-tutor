"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    color: "#3B82F6",
    colorBg: "rgba(59,130,246,0.1)",
    title: "Identity & Qualification Verified",
    description:
      "Every tutor is verified for government ID and educational qualifications before joining our network. We share their full profile with you before the first visit.",
    stat: "100%",
    statLabel: "tutors verified",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: "#F6A623",
    colorBg: "rgba(246,166,35,0.1)",
    title: "Matched in Under 24 Hours",
    description:
      "Tell us your requirements and we present matching tutor profiles within one business day — not 3–7 days like most bureaus. Speed without compromising quality.",
    stat: "24hrs",
    statLabel: "average match time",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    color: "#10B981",
    colorBg: "rgba(16,185,129,0.1)",
    title: "Free Demo — Zero Commitment",
    description:
      "The first class is completely free. No registration fee, no deposit, no lock-in. Judge the tutor yourself before paying a single rupee.",
    stat: "₹0",
    statLabel: "to try a tutor",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
    color: "#8B5CF6",
    colorBg: "rgba(139,92,246,0.1)",
    title: "Free Replacement, Always",
    description:
      "Not satisfied with the tutor for any reason — teaching style, punctuality, subject depth? We replace them at no cost. No arguments, no delays.",
    stat: "0",
    statLabel: "replacement cost",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: "#EC4899",
    colorBg: "rgba(236,72,153,0.1)",
    title: "8,000+ Tutors, Every Sector",
    description:
      "Alpha, Beta, Gamma, Delta, Gaur City, Noida Extension, Pari Chowk, Techzone — wherever you live in Greater Noida, we have a verified tutor near you.",
    stat: "8,000+",
    statLabel: "active tutors",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    color: "#0891B2",
    colorBg: "rgba(8,145,178,0.1)",
    title: "All Classes, All Boards",
    description:
      "Nursery to Class 12 and graduation level. Maths, Science, English, Hindi, Accountancy, PCM, PCB. CBSE, ICSE, UP Board, IGCSE — every board, every subject.",
    stat: "12+",
    statLabel: "subjects covered",
  },
];

// ─── Comparison table data ────────────────────────────────────────────────────

const COMPARE_ROWS = [
  {
    feature: "Tutor Verification",
    us: "ID + Qualification",
    them: "Self-reported",
    online: "No physical check",
  },
  {
    feature: "Profile Before Visit",
    us: "Always shared",
    them: "Rarely",
    online: "Not applicable",
  },
  {
    feature: "Free Demo Class",
    us: "Always free",
    them: "Sometimes paid",
    online: "Rarely offered",
  },
  {
    feature: "Free Replacement",
    us: "Guaranteed",
    them: "Rarely",
    online: "Not applicable",
  },
  {
    feature: "Matching Speed",
    us: "Within 24 hours",
    them: "3–7 days",
    online: "Instant but unverified",
  },
  {
    feature: "Local Knowledge",
    us: "13 yrs in Gr. Noida",
    them: "Limited",
    online: "None",
  },
  {
    feature: "Personal Support",
    us: "Direct call + WA",
    them: "Ticket-based",
    online: "Chatbot only",
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl p-6 border border-border cursor-default overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(12,35,64,0.06)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 16px 48px rgba(12,35,64,0.12), 0 0 0 1px ${feature.colorBg}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 12px rgba(12,35,64,0.06)";
      }}
    >
      {/* Corner glow on hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${feature.colorBg} 0%, transparent 70%)`,
        }}
      />

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
        }}
      />

      {/* Icon + Stat row */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: feature.colorBg,
            color: feature.color,
          }}
          animate={{
            rotate: [0, -6, 6, -4, 4, 0],
            scale: [1, 1.05, 1.05, 1.02, 1.02, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 3 + index * 0.7,
            ease: "easeInOut",
          }}
        >
          {feature.icon}
        </motion.div>

        {/* Stat badge */}
        <div className="text-right">
          <div
            className="font-display font-black leading-none"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", color: feature.color }}
          >
            {feature.stat}
          </div>
          <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mt-0.5">
            {feature.statLabel}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-navy-700 text-[17px] leading-snug mb-2.5 group-hover:text-navy-700 transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-ink-secondary text-[14px] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

const CHECK = (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
    style={{ background: "rgba(16,185,129,0.15)" }}
  >
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#10B981"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const DASH = (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
    style={{ background: "rgba(255,255,255,0.05)" }}
  >
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
      <line
        x1="0"
        y1="1"
        x2="8"
        y2="1"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

function ComparisonTable({ inView }: { inView: boolean }) {
  const COLS = [
    { label: "Feature", sub: "", highlight: false },
    { label: "NCR Home Tutor", sub: "Greater Noida's #1", highlight: true },
    { label: "Typical Bureau", sub: "Most competitors", highlight: false },
    { label: "Online Platforms", sub: "Apps & websites", highlight: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      {/* Table header eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div
          className="h-px flex-1 max-w-[80px]"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">
          Side-by-side comparison
        </span>
        <div
          className="h-px flex-1 max-w-[80px]"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
      </div>

      {/* Scrollable wrapper */}
      <div className="overflow-x-auto pb-2">
        <div
          className="min-w-[680px] rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-4">
            {COLS.map((col, ci) => (
              <div
                key={ci}
                className="relative px-5 py-5"
                style={{
                  background: col.highlight
                    ? "linear-gradient(180deg, rgba(246,166,35,0.14) 0%, rgba(246,166,35,0.06) 100%)"
                    : ci === 0
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.02)",
                  borderRight:
                    ci < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                {/* Saffron top border for highlighted col */}
                {col.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-saffron-400" />
                )}
                <div
                  className={cn(
                    "font-display font-bold leading-tight",
                    col.highlight ? "text-saffron-400" : "text-white/70",
                    ci === 0
                      ? "text-xs uppercase tracking-widest text-white/30"
                      : "text-sm",
                  )}
                >
                  {col.label}
                </div>
                {col.sub && (
                  <div
                    className="text-[10px] font-semibold mt-0.5 uppercase tracking-wider"
                    style={{
                      color: col.highlight
                        ? "rgba(246,166,35,0.5)"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {col.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {COMPARE_ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.45 + i * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-4 group"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Feature label */}
              <div
                className="px-5 py-4 flex items-center"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-white/60 text-sm font-semibold">
                  {row.feature}
                </span>
              </div>

              {/* Our value — saffron highlighted column */}
              <div
                className="px-5 py-4 flex items-center gap-2.5 relative"
                style={{
                  background: "rgba(246,166,35,0.05)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(246,166,35,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(246,166,35,0.05)";
                }}
              >
                {/* Left saffron rail */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-saffron-400/40" />
                {CHECK}
                <span className="text-white font-bold text-sm leading-snug">
                  {row.us}
                </span>
              </div>

              {/* Competitor 1 */}
              <div
                className="px-5 py-4 flex items-center gap-2.5"
                style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
              >
                {DASH}
                <span className="text-white/35 text-sm">{row.them}</span>
              </div>

              {/* Competitor 2 */}
              <div className="px-5 py-4 flex items-center gap-2.5">
                {DASH}
                <span className="text-white/35 text-sm">{row.online}</span>
              </div>
            </motion.div>
          ))}

          {/* Footer strip */}
          <div
            className="grid grid-cols-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="px-5 py-3.5"
              style={{ background: "rgba(255,255,255,0.025)" }}
            />
            <div
              className="px-5 py-3.5 flex items-center justify-center"
              style={{ background: "rgba(246,166,35,0.07)" }}
            >
              <span className="text-[11px] font-bold text-saffron-400 uppercase tracking-widest">
                ✦ Clear winner
              </span>
            </div>
            <div
              className="px-5 py-3.5"
              style={{ background: "rgba(255,255,255,0.01)" }}
            />
            <div
              className="px-5 py-3.5"
              style={{ background: "rgba(255,255,255,0.01)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="why-us"
      ref={ref}
      aria-label="Why choose NCR Home Tutor"
      className="relative bg-navy-700 section-pad overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid-light opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(246,166,35,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-6 h-px bg-saffron-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-400">
              Why 17,000 Families Chose Us
            </span>
            <span className="w-6 h-px bg-saffron-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.1,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-bold text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Not Just a Bureau —{" "}
            <em className="not-italic text-gradient-saffron">
              Your Child's Academic Partner
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/55 text-[16px] leading-relaxed max-w-xl mx-auto"
          >
            Every other bureau in Greater Noida makes the same claims. Here's
            what actually sets us apart — in writing.
          </motion.p>
        </div>

        {/* ── Feature Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Comparison Table ── */}
        <ComparisonTable inView={inView} />

        {/* ── 13 years badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(246,166,35,0.12)",
              border: "1px solid rgba(246,166,35,0.25)",
            }}
          >
            <span className="text-3xl">🏆</span>
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg leading-snug">
              Serving Greater Noida since 2011 — 13 years of trust, not
              marketing.
            </p>
            <p className="text-white/45 text-sm mt-0.5">
              Every tutor we send, every demo we arrange, every replacement we
              provide — our reputation is on the line. That's why we never cut
              corners.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
