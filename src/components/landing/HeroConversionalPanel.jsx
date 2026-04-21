"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PHONE_RAW, WA_LINK } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MATCH_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    sub: "Class, subject & your area — takes 60 seconds",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    color: "#F6A623",
    colorBg: "rgba(246,166,35,0.12)",
    colorBorder: "rgba(246,166,35,0.28)",
  },
  {
    step: "02",
    title: "We match you in 24 hrs",
    sub: "Verified tutors near your area, checked & curated",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    color: "#93C5FD",
    colorBg: "rgba(99,179,237,0.10)",
    colorBorder: "rgba(99,179,237,0.25)",
  },
  {
    step: "03",
    title: "Attend your free demo",
    sub: "Zero payment · love it or replace for free",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    color: "#6EE7B7",
    colorBg: "rgba(16,185,129,0.10)",
    colorBorder: "rgba(16,185,129,0.25)",
  },
];

const TRUST_ITEMS = [
  { icon: "🔒", text: "100% Secure" },
  { icon: "🎁", text: "Always Free" },
  { icon: "🔄", text: "Free Replacement" },
];

const SOCIAL_PROOF = [
  { val: "17K+", label: "Families" },
  { val: "8K+", label: "Tutors" },
  { val: "5.0★", label: "Rating" },
];

// ─── Floating notif pill ──────────────────────────────────────────────────────

function FloatingNotif({
  icon,
  iconBg,
  title,
  sub,
  delay,
  direction = 1,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, direction * -7, 0] }}
      transition={{
        opacity: { delay, duration: 0.45 },
        scale: { delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
        y: {
          delay: delay + 0.5,
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255,255,255,0.17)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 12px 36px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold text-[12px] leading-tight">
          {title}
        </p>
        <p className="text-white/50 text-[10.5px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

// ─── HeroConversionPanel ──────────────────────────────────────────────────────

const HeroConversionPanel = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActiveStep((s) => (s + 1) % MATCH_STEPS.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex flex-col items-center lg:items-stretch">
      {/* ── Floating badges row (above card, desktop only) ── */}
      <div className="hidden lg:flex items-center justify-between w-full mb-3 px-1">
        <FloatingNotif
          icon={
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#25D366"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
          iconBg="rgba(37,211,102,0.22)"
          title="Tutor Matched!"
          sub="3 tutors near Gaur City"
          delay={0.75}
          direction={1}
        />

        <FloatingNotif
          icon={<span style={{ fontSize: 14, lineHeight: 1 }}>⭐</span>}
          iconBg="rgba(251,191,36,0.22)"
          title="4.9 Rating"
          sub="126 verified reviews"
          delay={0.88}
          direction={-1}
        />
      </div>

      {/* ══════════════════════════════════════════
          MAIN CARD
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.28, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-white rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "0 28px 72px rgba(4,13,21,0.44), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Colour bar */}
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(90deg, #e8960e, #F6A623, #ffca62, #F6A623, #e8960e)",
          }}
        />

        <div className="p-6 sm:p-7">
          {/* ── Header ── */}
          <div className="flex items-start gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: "linear-gradient(135deg, #0C2340, #1a3f6e)",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F6A623"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div>
              <h2 className="font-display font-bold text-navy-700 text-[17px] leading-tight tracking-tight">
                Find Your Perfect Tutor
              </h2>
              <p className="text-slate-500 text-[12px] mt-0.5 leading-relaxed">
                3 simple steps · completely free · results in 24 hrs
              </p>
            </div>
          </div>

          {/* ── Steps ── */}
          <div className="space-y-2.5 mb-6">
            {MATCH_STEPS.map((s, i) => {
              const isActive = activeStep === i;
              const isDone = activeStep > i;
              return (
                <motion.button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  animate={{
                    background: isActive
                      ? s.colorBg
                      : isDone
                        ? "rgba(16,185,129,0.05)"
                        : "rgba(12,33,63,0.03)",
                    borderColor: isActive
                      ? s.colorBorder
                      : isDone
                        ? "rgba(16,185,129,0.18)"
                        : "rgba(12,33,63,0.07)",
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full flex items-start gap-3 rounded-xl px-4 py-3.5 border text-left cursor-pointer transition-shadow hover:shadow-sm"
                  style={{
                    border: `1px solid ${isActive ? s.colorBorder : isDone ? "rgba(16,185,129,0.18)" : "rgba(12,33,63,0.07)"}`,
                  }}
                >
                  {/* Icon circle */}
                  <motion.div
                    animate={{
                      background: isDone
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : isActive
                          ? `linear-gradient(135deg, ${s.color}, ${s.color}bb)`
                          : "rgba(12,33,63,0.08)",
                      color: isDone || isActive ? "white" : "#94a3b8",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  >
                    <AnimatePresence mode="wait">
                      {isDone ? (
                        <motion.span
                          key="done"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 22,
                          }}
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="icon"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          {s.icon}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[13px] font-bold text-navy-700 leading-tight">
                        {s.title}
                      </p>
                      <motion.span
                        animate={{
                          background: isActive ? s.colorBg : "transparent",
                          color: isActive ? s.color : "#cbd5e1",
                          borderColor: isActive ? s.colorBorder : "transparent",
                        }}
                        className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-full shrink-0 border"
                      >
                        {s.step}
                      </motion.span>
                    </div>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">
                      {s.sub}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── Progress dots ── */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {MATCH_STEPS.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveStep(i)}
                animate={{
                  width: activeStep === i ? 22 : 6,
                  background:
                    activeStep === i
                      ? "#F6A623"
                      : activeStep > i
                        ? "#10b981"
                        : "rgba(12,33,63,0.12)",
                }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="h-1.5 rounded-full cursor-pointer"
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

          {/* ── Social proof row ── */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {SOCIAL_PROOF.map(({ val, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl"
                style={{
                  background: "rgba(12,33,63,0.03)",
                  border: "1px solid rgba(12,33,63,0.06)",
                }}
              >
                <span className="font-display font-bold text-navy-700 text-[16px] leading-none tabular-nums">
                  {val}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Primary CTA ── */}
          <Link href="/inquiry" className="block mb-3">
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 14px 40px rgba(246,166,35,0.55)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="relative w-full py-4 rounded-2xl font-bold text-[15px] overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #F6A623 0%, #ffca62 50%, #F6A623 100%)",
                backgroundSize: "200% 100%",
                color: "#0C213F",
                boxShadow: "0 6px 24px rgba(246,166,35,0.42)",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.38) 50%, transparent 65%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.4s linear infinite",
                }}
              />
              <span className="relative z-10 flex items-center gap-2.5 tracking-tight">
                Get Matched — It&apos;s Free
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>
          </Link>

          {/* ── Secondary row ── */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={`tel:+${PHONE_RAW}`}
              className="flex items-center gap-1.5 text-[12px] text-slate-500 font-semibold hover:text-navy-700 transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call us
            </a>
            <span className="text-slate-200 text-sm">|</span>
            <a
              href={WA_LINK("Hello, I need a home tutor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-slate-500 font-semibold hover:text-green-600 transition-colors"
            >
              <WhatsAppIcon size={13} />
              WhatsApp
            </a>
            <span className="text-slate-200 text-sm">|</span>
            <span className="text-[12px] text-slate-400">
              No payment needed
            </span>
          </div>
        </div>

        {/* ── Bottom trust strip ── */}
        <div
          className="border-t border-slate-100 px-6 py-3 flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          style={{ background: "linear-gradient(to bottom, #F8FAFD, #f3f6fb)" }}
        >
          {TRUST_ITEMS.map(({ icon, text }) => (
            <span
              key={text}
              className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5"
            >
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Floating badge (below card, desktop only) ── */}
      <div className="hidden lg:flex justify-center mt-4">
        <FloatingNotif
          icon={
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F6A623"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          iconBg="rgba(246,166,35,0.22)"
          title="Demo Confirmed"
          sub="Tomorrow · 5:00 PM · FREE"
          delay={1.0}
          direction={1}
        />
      </div>
    </div>
  );
};

export default HeroConversionPanel;
