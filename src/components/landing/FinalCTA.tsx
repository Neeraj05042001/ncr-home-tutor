"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useAnimationFrame } from "framer-motion";
import { PHONE_RAW, WA_LINK, DEFAULT_WA_MSG } from "@/lib/utils";

// ─── Floating particle ────────────────────────────────────────────────────────

function Particle({ x, y, size, delay, color }: {
  x: number; y: number; size: number; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{
        y: [0, -18, 0],
        opacity: [0.25, 0.6, 0.25],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 3.5 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const PARTICLES = [
  { x: 8,  y: 20, size: 5,  delay: 0,    color: "rgba(246,166,35,0.5)"  },
  { x: 15, y: 65, size: 3,  delay: 0.8,  color: "rgba(255,255,255,0.3)" },
  { x: 25, y: 40, size: 4,  delay: 1.4,  color: "rgba(246,166,35,0.3)"  },
  { x: 72, y: 25, size: 6,  delay: 0.5,  color: "rgba(246,166,35,0.4)"  },
  { x: 85, y: 60, size: 3,  delay: 1.2,  color: "rgba(255,255,255,0.25)"},
  { x: 92, y: 35, size: 4,  delay: 2.1,  color: "rgba(246,166,35,0.35)" },
  { x: 50, y: 10, size: 3,  delay: 1.8,  color: "rgba(255,255,255,0.2)" },
  { x: 62, y: 80, size: 5,  delay: 0.3,  color: "rgba(246,166,35,0.3)"  },
];

// ─── Marquee trust strip ──────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "✦ Free Demo Class",
  "✦ ID-Verified Tutors",
  "✦ Profile Shared Before Visit",
  "✦ Free Replacement Guarantee",
  "✦ All Boards — CBSE · ICSE · UP Board",
  "✦ Matched Within 24 Hours",
  "✦ Serving Greater Noida Since 2011",
  "✦ 17,000+ Families Served",
];

function TrustMarquee() {
  const x = useMotionValue(0);
  const ITEM_W = 260;
  const UNIT   = TRUST_ITEMS.length * ITEM_W;
  const items  = [...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS];

  useAnimationFrame((_, delta) => {
    const next = x.get() - (38 / 1000) * delta;
    x.set(next <= -UNIT ? 0 : next);
  });

  return (
    <div className="relative overflow-hidden py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #0C2340, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #0C2340, transparent)" }} />
      <motion.div style={{ x }} className="flex w-max">
        {items.map((item, i) => (
          <span  key={`marquee-${i}`} className="inline-flex items-center whitespace-nowrap text-[12px] font-bold text-white/50 tracking-wide" style={{ width: ITEM_W }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Get started — find a home tutor"
      className="relative overflow-hidden"
      style={{ background: "#0A1E37" }}
    >
      {/* ── Ambient background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(246,166,35,0.12) 0%, transparent 65%)",
        }}
      />
      {/* <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(246,166,35,0.3), transparent)" }}
      /> */}

      {/* Floating particles */}
      {PARTICLES.map((p, i) => <Particle key={`particle-${i}`} {...p} />)}

      <div className="container-custom relative z-10 py-24 sm:py-32">

        {/* ── Main CTA block ── */}
        <div className="text-center max-w-3xl mx-auto">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-6 h-px bg-saffron-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-saffron-400">
              Start Today — It's Free
            </span>
            <span className="w-6 h-px bg-saffron-400" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 58px)" }}
          >
            Your Child Deserves{" "}
            <br className="hidden sm:block" />
            the{" "}
            <em className="not-italic text-gradient-saffron">Right Tutor.</em>
            <br className="hidden sm:block" />
            Let's Find Them.
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/55 text-[17px] leading-relaxed mb-10 max-w-xl mx-auto"
          >
            One call. A verified tutor profile in your WhatsApp.
            A free demo at home. No fees, no paperwork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {/* Primary — Call */}
            <motion.a
              href={`tel:${PHONE_RAW}`}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 48px rgba(246,166,35,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative inline-flex items-center gap-3 font-bold rounded-full overflow-hidden w-full sm:w-auto justify-center"
              style={{
                background: "linear-gradient(135deg, #F6A623 0%, #E09010 100%)",
                color: "#0C2340",
                fontSize: "16px",
                padding: "16px 36px",
                boxShadow: "0 8px 32px rgba(246,166,35,0.3)",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
              {/* Phone wiggle icon */}
              <motion.svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
              </motion.svg>
              <span className="relative z-10">Call +91 80766 61356</span>
            </motion.a>

            {/* Secondary — WhatsApp */}
            <motion.a
              href={WA_LINK(DEFAULT_WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 font-bold rounded-full w-full sm:w-auto justify-center"
              style={{
                background: "rgba(37,211,102,0.12)",
                color: "#25D366",
                border: "1.5px solid rgba(37,211,102,0.35)",
                fontSize: "16px",
                padding: "16px 36px",
              }}
            >
              <motion.svg
                width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
              </motion.svg>
              WhatsApp Us
            </motion.a>
          </motion.div>

          {/* Micro trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            {[
              "No registration fee",
              "Free demo class",
              "Tutor profile before visit",
            ].map((t, i) => (
              <div key={`trust-${i}`} className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[12.5px] font-semibold text-white/45">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* ── Trust marquee strip ── */}
      <TrustMarquee />

      <div
  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
  aria-hidden="true"
  style={{ background: "linear-gradient(180deg, transparent, #050F1A)" }}
/>

    </section>
  );
}