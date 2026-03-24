


"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────
// size: "xl" | "lg" | "md" | "sm" — encodes demand/popularity
// zone color groups: blue=west, purple=central, green=south, amber=north, pink=east

const AREAS = [
  // High demand — xl
  { name: "Gaur City",            zone: "west",    size: "xl", popular: true  },
  { name: "Noida Extension",      zone: "west",    size: "xl", popular: true  },
  // Strong demand — lg
  { name: "Alpha 1 & 2",          zone: "central", size: "lg", popular: true  },
  { name: "Pari Chowk",           zone: "central", size: "lg", popular: true  },
  { name: "Techzone",             zone: "west",    size: "lg", popular: true  },
  // Good demand — md
  { name: "Beta 1 & 2",           zone: "central", size: "md", popular: false },
  { name: "Knowledge Park 1/2/3", zone: "south",   size: "md", popular: false },
  { name: "Gamma 1 & 2",          zone: "central", size: "md", popular: false },
  { name: "Delta 1 & 2",          zone: "central", size: "md", popular: false },
  { name: "Sector Pi-1 / Pi-2",   zone: "central", size: "md", popular: false },
  { name: "Sector 93",            zone: "north",   size: "md", popular: false },
  { name: "Omega",                zone: "south",   size: "md", popular: false },
  // Smaller — sm
  { name: "Zeta 1 & 2",           zone: "south",   size: "sm", popular: false },
  { name: "Sector 137",           zone: "north",   size: "sm", popular: false },
  { name: "Chi 1 & 2",            zone: "south",   size: "sm", popular: false },
  { name: "Swarna Nagri",         zone: "east",    size: "sm", popular: false },
  { name: "Phi",                  zone: "south",   size: "sm", popular: false },
  { name: "Surajpur",             zone: "east",    size: "sm", popular: false },
  { name: "Mu",                   zone: "central", size: "sm", popular: false },
  { name: "Eta",                  zone: "central", size: "sm", popular: false },
  { name: "Sector 1 & 2",         zone: "north",   size: "sm", popular: false },
  { name: "Sector 4 & 10",        zone: "north",   size: "sm", popular: false },
] as const;

const ZONE_STYLES = {
  west:    { color: "#93C5FD", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)",  glow: "rgba(59,130,246,0.35)"  },
  central: { color: "#C4B5FD", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.35)", glow: "rgba(139,92,246,0.35)" },
  south:   { color: "#6EE7B7", bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.35)",  glow: "rgba(16,185,129,0.35)"  },
  north:   { color: "#FCD34D", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.35)",  glow: "rgba(245,158,11,0.35)"  },
  east:    { color: "#F9A8D4", bg: "rgba(236,72,153,0.15)",  border: "rgba(236,72,153,0.35)",  glow: "rgba(236,72,153,0.35)"  },
};

const SIZE_STYLES = {
  xl: { fontSize: "15px",   px: "18px", py: "9px"  },
  lg: { fontSize: "13.5px", px: "16px", py: "8px"  },
  md: { fontSize: "12.5px", px: "14px", py: "7px"  },
  sm: { fontSize: "11px",   px: "12px", py: "6px"  },
};

const LEGEND = [
  { zone: "west",    label: "West",    dot: "#3B82F6" },
  { zone: "central", label: "Central", dot: "#8B5CF6" },
  { zone: "south",   label: "South",   dot: "#10B981" },
  { zone: "north",   label: "North",   dot: "#F59E0B" },
  { zone: "east",    label: "East",    dot: "#EC4899" },
];

// ─── Single Tag ───────────────────────────────────────────────────────────────

function AreaTag({
  area,
  index,
  inView,
}: {
  area: typeof AREAS[number];
  index: number;
  inView: boolean;
}) {
  const style = ZONE_STYLES[area.zone];
  const size  = SIZE_STYLES[area.size];

  return (
   <motion.div
  initial={{ opacity: 0, scale: 0.75, y: 12 }}
  animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
  transition={{
    delay: index * 0.04,
    duration: 0.45,
    ease: [0.34, 1.56, 0.64, 1] as const,
    type: "spring",
    stiffness: 400,
    damping: 20,
  }}
  whileHover={{ scale: 1.1, y: -4 }}
  whileTap={{ scale: 0.96 }}
  className="relative inline-flex items-center gap-2 cursor-default select-none flex-shrink-0"
  style={{
    background: style.bg,
    border: `1px solid ${style.border}`,
    borderRadius: "999px",
    padding: `${size.py} ${size.px}`,
    boxShadow: `0 2px 12px ${style.bg}`,
  }}
>
      {/* Popular pulsing dot */}
      {area.popular && (
        <span className="relative flex-shrink-0 w-2 h-2">
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-70"
            style={{ background: "#F6A623" }}
          />
          <span
            className="relative block w-2 h-2 rounded-full"
            style={{ background: "#F6A623" }}
          />
        </span>
      )}

      {/* Name */}
      <span
        className="font-bold whitespace-nowrap leading-none"
        style={{ fontSize: size.fontSize, color: style.color }}
      >
        {area.name}
      </span>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function AreasSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="areas"
      ref={ref}
      aria-label="Areas covered in Greater Noida"
      className="relative bg-navy-700 section-pad overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid-light opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(246,166,35,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-6 h-px bg-saffron-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-400">
                Greater Noida Coverage
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Tutors Available{" "}
              <em className="not-italic text-gradient-saffron">Near You</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-[16px] leading-relaxed mt-3 max-w-lg"
            >
              Every major sector across Greater Noida covered. Scan for your area —
              larger tags mean higher tutor availability.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 flex-wrap flex-shrink-0"
          >
            {[
              { value: `${AREAS.length}+`, label: "Areas"      },
              { value: "8,000+",           label: "Tutors"     },
              { value: "24 hrs",           label: "Avg. Match" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-center px-5 py-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minWidth: "88px",
                }}
              >
                <div
                  className="font-display font-black text-white leading-none mb-1"
                  style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}
                >
                  {value}
                </div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Tag Cloud ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="relative rounded-3xl p-7 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Ambient inner glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.06) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 flex flex-wrap gap-3 items-center justify-start">
            {AREAS.map((area, i) => (
              <AreaTag key={area.name} area={area} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            Legend:
          </span>

          {LEGEND.map(({ zone, label, dot }) => (
            <div key={zone} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: dot }}
              />
              <span className="text-[11.5px] font-semibold text-white/40">
                {label} Zone
              </span>
            </div>
          ))}

          {/* Demand hint */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="flex items-center gap-1">
              <span className="inline-block rounded-full px-2 py-0.5 text-[8px] font-bold bg-white/10 text-white/40">Large</span>
              <span className="text-white/20 text-xs">→</span>
              <span className="inline-block rounded-full px-1.5 py-0.5 text-[7px] font-bold bg-white/5 text-white/25">Small</span>
            </span>
            <span className="text-[11px] text-white/30 font-medium">= demand level</span>
          </div>

          {/* Popular indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-70"
                style={{ background: "#F6A623" }}
              />
              <span
                className="relative block w-2 h-2 rounded-full"
                style={{ background: "#F6A623" }}
              />
            </span>
            <span className="text-[11.5px] font-semibold text-white/40">
              High demand area
            </span>
          </div>
        </motion.div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(246,166,35,0.12) 0%, rgba(246,166,35,0.04) 100%)",
            border: "1px solid rgba(246,166,35,0.2)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-8 py-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(246,166,35,0.15)" }}
              >
                📍
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-[17px] mb-0.5">
                  Don't see your area?
                </h3>
                <p className="text-white/50 text-sm">
                  We likely cover it — call us to confirm availability near you.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
              <motion.a
                href={`tel:${PHONE_RAW}`}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(246,166,35,0.45)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3 relative overflow-hidden"
                style={{ background: "#F6A623", color: "#0C2340" }}
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s linear infinite",
                  }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
                </svg>
                <span className="relative z-10">Call to Confirm</span>
              </motion.a>

              <motion.a
                href={WA_LINK("Hi, I want to check if you have tutors available in my area in Greater Noida.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3"
                style={{
                  background: "rgba(37,211,102,0.15)",
                  color: "#25D366",
                  border: "1px solid rgba(37,211,102,0.3)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
                </svg>
                WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
  <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)" }} />
</div>
    </section>
  );
}