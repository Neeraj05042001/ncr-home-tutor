"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    label: "Profile Shared Before Visit",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    iconBg: "#1E40AF",
    iconGlow: "rgba(59,130,246,0.55)",
  },
  {
    label: "Free Demo Class",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    iconBg: "#065F46",
    iconGlow: "rgba(16,185,129,0.55)",
  },
  {
    label: "Free Replacement",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
    iconBg: "#4C1D95",
    iconGlow: "rgba(124,58,237,0.55)",
  },
  {
    label: "24-Hour Matching",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    iconBg: "#991B1B",
    iconGlow: "rgba(220,38,38,0.55)",
  },
  {
    label: "CBSE · ICSE · UP Board",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    iconBg: "#0C2340",
    iconGlow: "rgba(12,35,64,0.5)",
  },
  {
    label: "5.0 Rated · 17,000+ Families",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#FDE68A" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    iconBg: "#78350F",
    iconGlow: "rgba(217,119,6,0.55)",
  },
  {
    label: "Home & Online Tutors",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: "#164E63",
    iconGlow: "rgba(8,145,178,0.55)",
  },
  {
    label: "All Sectors · Greater Noida",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FBCFE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    iconBg: "#831843",
    iconGlow: "rgba(190,24,93,0.55)",
  },
];

// ─── Separator ────────────────────────────────────────────────────────────────

function Sep() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "4px",
        height: "4px",
        borderRadius: "1px",
        background: "rgba(12,35,64,0.28)",
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({
  icon,
  label,
  iconBg,
  iconGlow,
}: {
  icon: React.ReactNode;
  label: string;
  iconBg: string;
  iconGlow: string;
}) {
  return (
    <motion.span
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 440, damping: 22 }}
      className="inline-flex items-center gap-2.5 flex-shrink-0 cursor-default select-none"
      style={{
        backgroundImage: "linear-gradient(145deg, rgba(8,24,52,0.95) 0%, rgba(12,35,64,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: "999px",
        padding: "6px 16px 6px 6px",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.07) inset, 0 4px 16px rgba(12,35,64,0.4), 0 1px 3px rgba(12,35,64,0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 24px rgba(12,35,64,0.5), 0 0 0 1px ${iconGlow}, 0 4px 18px ${iconGlow}`;
        el.style.borderColor = "rgba(255,255,255,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.07) inset, 0 4px 16px rgba(12,35,64,0.4), 0 1px 3px rgba(12,35,64,0.5)";
        el.style.borderColor = "rgba(255,255,255,0.13)";
      }}
    >
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 27,
          height: 27,
          borderRadius: "50%",
          background: iconBg,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 2px 10px ${iconGlow}`,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "12.5px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: "0.015em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </motion.span>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const ALL_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];
const CARD_WIDTH = 240;
const UNIT_WIDTH = ITEMS.length * CARD_WIDTH;

function Marquee() {
  const x = useMotionValue(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    const next = x.get() - (42 / 1000) * delta;
    x.set(next <= -UNIT_WIDTH ? 0 : next);
  });

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={() => { paused.current = false; }}
    >
      {/* Edge fades — match saffron bg so chips dissolve naturally at edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #F59E0B 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #F59E0B 0%, transparent 100%)" }}
      />

      <motion.div style={{ x }} className="flex items-center w-max">
        <div className="flex items-center gap-4 w-max pb-0 pt-0 px-8">
          {ALL_ITEMS.map((item, i) => (
            <span key={`bar-item-${i}`} className="inline-flex items-center gap-4 flex-shrink-0">
              <Chip {...item} />
              <Sep />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TrustBar() {
  return (
    <section
      aria-label="Why parents trust NCR Home Tutor"
      className="relative overflow-hidden"
      style={{ background: "#F59E0B" }}
    >
      {/* Very subtle warm texture */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(12,35,64,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      /> */}

      {/* Inner top glow — blends with hero wave above */}
      <div
        className="absolute top-0 inset-x-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(246,166,35,0.6) 0%, transparent 100%)",
        }}
      />

      <Marquee />

      {/*
        ── Bottom transition to HowItWorks (bg-surface-3) ──
        Single clean wave — no wave above, so this is the ONLY shape cut.
        Uses a tall enough viewBox so it's a gentle slope, not a spiky peak.
      */}
      <div
        className="relative pointer-events-none"
        aria-hidden="true"
        style={{ lineHeight: 0, marginTop: "-2px" }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "clamp(40px, 5vw, 80px)", display: "block" }}
        >
          <defs>
            <linearGradient id="tb-shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(12,35,64,0.12)" />
              <stop offset="100%" stopColor="rgba(12,35,64,0)" />
            </linearGradient>
          </defs>

          {/* Soft shadow layer for depth */}
          <path
            d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 80 L0 80 Z"
            fill="url(#tb-shadow)"
          />

          {/* Main fill — HowItWorks surface-3 */}
          <path
            d="M0 20 Q360 80 720 46 Q1080 12 1440 66 L1440 80 L0 80 Z"
            fill="var(--color-surface-3, #F4F6FA)"
          />
        </svg>
      </div>
    </section>
  );
}