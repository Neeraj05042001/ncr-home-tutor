"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    color: "#1E40AF",           // deep blue
    bg:    "rgba(30,64,175,0.15)",
    label: "Profile Shared Before Visit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    color: "#059669",           // emerald
    bg:    "rgba(5,150,105,0.15)",
    label: "Free Demo Class",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    color: "#7C3AED",           // violet
    bg:    "rgba(124,58,237,0.15)",
    label: "Free Replacement",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 014-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 01-4 4H3"/>
      </svg>
    ),
  },
  {
    color: "#DC2626",           // red-orange
    bg:    "rgba(220,38,38,0.15)",
    label: "24-Hour Matching",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    color: "#0C2340",           // navy
    bg:    "rgba(12,35,64,0.18)",
    label: "CBSE · ICSE · UP Board",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    color: "#D97706",           // amber
    bg:    "rgba(217,119,6,0.15)",
    label: "5.0 Rated · 17,000+ Families",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    color: "#0891B2",           // cyan
    bg:    "rgba(8,145,178,0.15)",
    label: "Home & Online Tutors",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    color: "#BE185D",           // pink
    bg:    "rgba(190,24,93,0.15)",
    label: "All Sectors · Greater Noida",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

// Separator — diamond sparkle
function Sparkle() {
  return (
    <span
      className="flex-shrink-0 select-none"
      style={{ color: "rgba(12,35,64,0.3)", fontSize: "10px", lineHeight: 1 }}
      aria-hidden="true"
    >
      ✦
    </span>
  );
}

// ─── Premium Chip ─────────────────────────────────────────────────────────────

function Chip({
  icon, label, color, bg,
}: {
  icon: React.ReactNode; label: string; color: string; bg: string;
}) {
  return (
    <motion.span
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      className="inline-flex items-center gap-2.5 flex-shrink-0 cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(255,255,255,1)",
        borderRadius: "999px",
        padding: "7px 16px 7px 8px",
        boxShadow: "0 1px 4px rgba(12,35,64,0.1), 0 2px 12px rgba(12,35,64,0.06)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 4px 16px rgba(12,35,64,0.15), 0 1px 4px ${bg}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 4px rgba(12,35,64,0.1), 0 2px 12px rgba(12,35,64,0.06)";
      }}
    >
      {/* Colored icon bubble */}
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 2px 8px ${bg}`,
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#0C2340",
          letterSpacing: "0.005em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </motion.span>
  );
}

// ─── Marquee — Framer Motion, runs on all screen sizes ───────────────────────

const ALL_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS]; // 3 copies = seamless at all widths
const CARD_WIDTH  = 220; // avg chip width + gap
const UNIT_WIDTH  = ITEMS.length * CARD_WIDTH;

function Marquee() {
  const x        = useMotionValue(0);
  const paused   = useRef(false);
  const speed    = 45; // px per second

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    const next = x.get() - (speed / 1000) * delta;
    x.set(next <= -UNIT_WIDTH ? 0 : next);
  });

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={()   => { paused.current = false; }}
    >
      {/* Left mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #F6A623 0%, transparent 100%)" }}
      />
      {/* Right mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #F6A623 0%, transparent 100%)" }}
      />

      <motion.div
        style={{ x }}
        className="flex items-center w-max"
      >
        <div className="flex items-center gap-4 w-max py-3.5 px-6">
          {ALL_ITEMS.map((item, i) => (
            <span key={`bar-item-${i}`} className="inline-flex items-center gap-4 flex-shrink-0">
              <Chip {...item} />
              <Sparkle />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function TrustBar() {
  return (
    <section
      aria-label="Why parents trust NCR Home Tutor"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F6A623 0%, #F59E0B 50%, #F6A623 100%)",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
      />
      {/* Bottom shadow line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-navy-700/10 pointer-events-none" />

      {/* Single marquee — all breakpoints */}
      <Marquee />
      
    </section>
  );
}