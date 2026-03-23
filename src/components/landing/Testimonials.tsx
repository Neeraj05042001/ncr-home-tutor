"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";



const TESTIMONIALS = [
  {
    id:1,
    quote:
      "Honestly I was hesitant at first — tried two other bureaus that year and both were disappointing. The tutor they sent for Aryan's Maths was patient in a way I hadn't seen before. He went from 44 to 67 in his half-yearlies. Not a miracle, but real progress.",
    name: "Meena Rawat",
    role: "Mother of Class 9 student",
    area: "Gaur City",
    color: "#F6A623",
    init: "MR",
    year: "2024",
  },
  {
     id:2,
    quote:
      "The first tutor they sent wasn't a good fit — my daughter found her too fast-paced. I called them and they replaced her within two days. No awkwardness, no extra charge. The second tutor has been with us for eight months now.",
    name: "Sandeep Bhatia",
    role: "Father of Class 7 student",
    area: "Alpha 2, Greater Noida",
    color: "#3B82F6",
    init: "SB",
    year: "2024",
  },
  {
     id:3,
    quote:
      "My son needed help with Class 11 Physics specifically — not general science, specifically Physics numericals. They found someone who had taught PCM for years. That specificity is what I appreciated.",
    name: "Rekha Sharma",
    role: "Mother of Class 11 student",
    area: "Noida Extension",
    color: "#10B981",
    init: "RS",
    year: "2023",
  },
  {
     id:4,
    quote:
      "We live in Omega sector and I wasn't sure they'd have tutors this far out. They did, and she arrived on time for the demo. My son has been studying with her three times a week since October.",
    name: "Vivek Tomar",
    role: "Father of Class 5 student",
    area: "Omega, Greater Noida",
    color: "#8B5CF6",
    init: "VT",
    year: "2024",
  },
  {
     id:5,
    quote:
      "What made the difference was that they sent the tutor's qualifications on WhatsApp before the first visit. I could see she had a B.Ed and had taught CBSE for six years. That gave me confidence before she even walked in.",
    name: "Priya Negi",
    role: "Mother of Class 6 student",
    area: "Beta 1, Greater Noida",
    color: "#EC4899",
    init: "PN",
    year: "2023",
  },
  {
     id:6,
    quote:
      "My daughter had her Class 10 boards in three months. I called on a Thursday, the demo happened Saturday, and she started regular classes the following Monday. That turnaround matters when time is short.",
    name: "Ashok Verma",
    role: "Father of Class 10 student",
    area: "Pari Chowk",
    color: "#F59E0B",
    init: "AV",
    year: "2024",
  },
  {
     id:7,
    quote:
      "We needed a Hindi tutor for UP Board — not easy to find someone who really knows the exam pattern and the mark scheme. The tutor they sent had been teaching UP Board Hindi for over four years. My son passed comfortably.",
    name: "Sunita Yadav",
    role: "Mother of Class 10 UP Board student",
    area: "Techzone",
    color: "#14B8A6",
    init: "SY",
    year: "2023",
  },
  {
     id:8,
    quote:
      "I was a bit sceptical about the free demo — usually there's a catch. There wasn't. We took the demo, liked the tutor, decided on the spot. Fees were straightforward, no hidden charges.",
    name: "Rajeev Mishra",
    role: "Father of Class 3 student",
    area: "Gamma 1, Greater Noida",
    color: "#6366F1",
    init: "RM",
    year: "2024",
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function Stars({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={`star-${i}`} width="13" height="13" viewBox="0 0 24 24" fill={color}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── Animated Quote (word by word) ───────────────────────────────────────────

function AnimatedQuote({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p
      className="font-display leading-relaxed mb-5"
      style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", color: "rgba(255,255,255,0.92)" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`w${i}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + i * 0.028, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[4px]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({
  color,
  isActive,
  duration,
}: {
  color: string;
  isActive: boolean;
  duration: number;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <motion.div
        className="h-full rounded-b-2xl"
        style={{ background: color }}
        initial={{ width: "0%" }}
        animate={isActive ? { width: "100%" } : { width: "0%" }}
        transition={
          isActive
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0 }
        }
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const ROTATION_MS = 6000;

export default function Testimonials() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [cur, setCur]         = useState(1);
  const [progKey, setProgKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const goTo = useCallback((idx: number) => {
    setCur(idx);
    setProgKey(k => k + 1);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      setCur(c => (c + 1) % TESTIMONIALS.length);
      setProgKey(k => k + 1);
    }, ROTATION_MS);
  }, []);

  useEffect(() => {
    if (inView) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, startTimer]);

  const handleNav = (idx: number) => {
    goTo(idx);
    startTimer();
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      aria-label="Parent testimonials"
      className="relative bg-navy-700 section-pad overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid-light opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(246,166,35,0.08) 0%, transparent 65%)",
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
              Parent Reviews
            </span>
            <span className="w-6 h-px bg-saffron-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            What Parents in{" "}
            <em className="not-italic text-gradient-saffron">Greater Noida</em>{" "}
            Are Saying
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/55 text-[16px] leading-relaxed max-w-lg mx-auto"
          >
            Real experiences from families across Greater Noida —
            unfiltered, unscripted.
          </motion.p>
        </div>

        {/* ── Card Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stage — hover/touch pauses rotation */}
          <div
            className="relative mx-auto mb-8"
            style={{ height: "clamp(380px, 45vw, 440px)", maxWidth: "680px" }}
            onMouseEnter={() => { isPausedRef.current = true; setIsPaused(true); }}
            onMouseLeave={() => { isPausedRef.current = false; setIsPaused(false); }}
            onTouchStart={() => { isPausedRef.current = true; setIsPaused(true); }}
            onTouchEnd={() => { isPausedRef.current = false; setIsPaused(false); }}
          >
            {TESTIMONIALS.map((t, i) => {
              const off    = i - cur;
              const absOff = Math.abs(off);
              if (absOff > 2) return null;

              const isFront = absOff === 0;
              const scale   = 1 - absOff * 0.09;
              const tx      = off * 220;
              const ty      = absOff * 22;
              const blur    = absOff * 3;
              const opacity = 1 - absOff * 0.38;
              const zIndex  = 10 - absOff;

              return (
                <motion.div
                  key={t.id}
                  animate={{
                    x: `calc(-50% + ${tx}px)`,
                    y: ty,
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`,
                    zIndex,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.34, 1.2, 0.64, 1],
                  }}
                  className="absolute left-1/2 rounded-2xl p-7 w-[340px] sm:w-[420px]"
                  style={{
                    background: isFront
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isFront ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isFront
                      ? `0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)`
                      : "none",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    pointerEvents: isFront ? "auto" : "none",
                    cursor: "default",
                  }}
                >
                  {/* Shimmer sweep — plays once on mount */}
                  {isFront && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-y-0 w-1/3"
                        initial={{ left: "-33%" }}
                        animate={{ left: "133%" }}
                        transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                          transform: "skewX(-12deg)",
                        }}
                      />
                    </motion.div>
                  )}
                  {/* Top accent — full width on front, subtle gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 rounded-t-2xl"
                    style={{
                      height: isFront ? "3px" : "1px",
                      background: isFront
                        ? `linear-gradient(90deg, transparent 0%, ${t.color} 30%, ${t.color} 70%, transparent 100%)`
                        : `linear-gradient(90deg, transparent, ${t.color}30, transparent)`,
                      opacity: isFront ? 1 : 0.5,
                    }}
                  />

                  <Stars color={t.color} />

                  {/* Animated quote — only front card animates */}
                  {isFront ? (
                    <AnimatedQuote
                      key={cur}
                      text={t.quote}
                    />
                  ) : (
                    <p
                      className="font-display leading-relaxed mb-5 text-[14px]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
"{t.quote.slice(0, 55)}…"
                    </p>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{
                        background: hexA(t.color, 0.25),
                        color: t.color,
                        boxShadow: `0 0 0 1px ${hexA(t.color, 0.3)}`,
                      }}
                    >
                      {t.init}
                    </div>
                    <div>
                      <div
                        className="font-bold text-[14px] leading-tight"
                        style={{ color: isFront ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)" }}
                      >
                        {t.name}
                      </div>

                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full"
                        style={{
                          background: hexA(t.color, 0.1),
                          color: t.color,
                          opacity: isFront ? 1 : 0.5,
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {t.area}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar — pauses on hover */}
                  {isFront && (
                    <ProgressBar
                      key={progKey}
                      color={t.color}
                      isActive={isFront && !isPaused}
                      duration={ROTATION_MS}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-center gap-4">
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleNav((cur - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <motion.button
                  key={`dot-${i}`}
                  onClick={() => handleNav(i)}
                  initial={{ background: "rgba(255,255,255,0.2)", width: 8 }}
                  animate={{
                    width: cur === i ? 24 : 8,
                    background: cur === i ? t.color : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full outline-none"
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleNav((cur + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          </div>



        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 grid grid-cols-3 divide-x rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            divideColor: "rgba(255,255,255,0.1)",
          }}
        >
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#F6A623">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ),
              value: "5.0",
              label: "Rated on Google",
              sub: "★★★★★",
              color: "#F6A623",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              ),
              value: "17,000+",
              label: "Families Served",
              sub: "Since 2011",
              color: "#10B981",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              ),
              value: "Free",
              label: "First Demo Class",
              sub: "No payment needed",
              color: "#3B82F6",
            },
          ].map(({ icon, value, label, sub, color }, i) => (
            <motion.div
              key={i}
              whileHover={{ background: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center px-4 py-5 gap-2 cursor-default"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {/* Icon bubble */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${color === "#F6A623" ? "246,166,35" : color === "#10B981" ? "16,185,129" : "59,130,246"},0.15)` }}
              >
                {icon}
              </div>
              {/* Value */}
              <div
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(20px, 2.8vw, 28px)", color }}
              >
                {value}
              </div>
              {/* Label */}
              <div className="text-[12px] font-bold text-white/70 leading-tight">{label}</div>
              {/* Sub */}
              <div className="text-[10px] text-white/35 font-medium">{sub}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}