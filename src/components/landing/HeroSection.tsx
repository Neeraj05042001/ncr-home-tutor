// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
// import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";
// import TrustBar from "./Trustbar";
// import HeroConversionPanel from "./HeroConversionalPanel";

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const TRUST_PILLS = [
//   "Free demo class",
//   "Verified tutors",
//   "24-hr matching",
//   "Free replacement",
// ];

// const STATS = [
//   {
//     target: 13,
//     suffix: "+",
//     label: "Years of Trust",
//     icon: "🏆",
//     desc: "Since 2011",
//   },
//   {
//     target: 17000,
//     suffix: "+",
//     label: "Happy Students",
//     icon: "👨‍👩‍👦",
//     desc: "Across NCR",
//   },
//   {
//     target: 8000,
//     suffix: "+",
//     label: "Verified Tutors",
//     icon: "🛡️",
//     desc: "Background checked",
//   },
// ];

// const BOARDS = [
//   {
//     name: "CBSE",
//     color: "rgba(99,179,237,0.15)",
//     border: "rgba(99,179,237,0.35)",
//     text: "#93C5FD",
//   },
//   {
//     name: "ICSE",
//     color: "rgba(167,139,250,0.15)",
//     border: "rgba(167,139,250,0.35)",
//     text: "#C4B5FD",
//   },
//   {
//     name: "UP Board",
//     color: "rgba(246,166,35,0.15)",
//     border: "rgba(246,166,35,0.4)",
//     text: "#F6A623",
//   },
// ];

// const TICKER_ITEMS = [
//   "Profile Shared Before Visit",
//   "Free Demo Class",
//   "Free Replacement",
//   "24-Hour Matching",
//   "CBSE · ICSE · UP Board",
//   "5.0 Rated · 17,000+ Families",
//   "Home & Online Tutors",
//   "All Sectors · Greater Noida",
// ];

// const MATCH_STEPS = [
//   {
//     step: "01",
//     title: "Tell us what you need",
//     sub: "Class, subject & your area — takes 60 seconds",
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//         <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//       </svg>
//     ),
//     color: "#F6A623",
//     colorBg: "rgba(246,166,35,0.15)",
//     colorBorder: "rgba(246,166,35,0.3)",
//   },
//   {
//     step: "02",
//     title: "We match you in 24 hrs",
//     sub: "Verified tutors near your area, checked & curated",
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="11" cy="11" r="8" />
//         <path d="M21 21l-4.35-4.35" />
//       </svg>
//     ),
//     color: "#93C5FD",
//     colorBg: "rgba(99,179,237,0.12)",
//     colorBorder: "rgba(99,179,237,0.28)",
//   },
//   {
//     step: "03",
//     title: "Attend your free demo",
//     sub: "Zero payment, zero commitment — love it or replace free",
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
//         <polyline points="22 4 12 14.01 9 11.01" />
//       </svg>
//     ),
//     color: "#6EE7B7",
//     colorBg: "rgba(16,185,129,0.12)",
//     colorBorder: "rgba(16,185,129,0.28)",
//   },
// ];

// // Subject pills — positioned outside the central card
// const SUBJECT_PILLS = [
//   {
//     label: "Mathematics",
//     bg: "rgba(246,166,35,0.15)",
//     border: "rgba(246,166,35,0.35)",
//     text: "#b45309",
//     pos: { top: 12, left: 0 },
//     delay: 0.75,
//     dur: 4.2,
//   },
//   {
//     label: "Physics",
//     bg: "rgba(99,179,237,0.13)",
//     border: "rgba(99,179,237,0.35)",
//     text: "#1d4ed8",
//     pos: { top: 12, right: 0 },
//     delay: 0.85,
//     dur: 5.1,
//   },
//   {
//     label: "Chemistry",
//     bg: "rgba(167,139,250,0.13)",
//     border: "rgba(167,139,250,0.35)",
//     text: "#5b21b6",
//     pos: { bottom: 32, left: 0 },
//     delay: 1.0,
//     dur: 4.7,
//   },
//   {
//     label: "Science",
//     bg: "rgba(16,185,129,0.12)",
//     border: "rgba(16,185,129,0.3)",
//     text: "#065f46",
//     pos: { bottom: 32, right: 0 },
//     delay: 1.1,
//     dur: 5.5,
//   },
// ];

// // ─── useCountUp ───────────────────────────────────────────────────────────────

// function useCountUp(target: number, duration = 2000, delay = 0) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
//   const started = useRef(false);

//   useEffect(() => {
//     if (!inView || started.current) return;
//     started.current = true;
//     const startAt = performance.now() + delay * 1000;
//     const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
//     const tick = (now: number) => {
//       const elapsed = Math.max(0, now - startAt);
//       const progress = Math.min(elapsed / duration, 1);
//       setCount(Math.floor(easeOutExpo(progress) * target));
//       if (progress < 1) requestAnimationFrame(tick);
//       else setCount(target);
//     };
//     requestAnimationFrame(tick);
//   }, [inView, target, duration, delay]);

//   return { count, ref };
// }

// // ─── StatCard ─────────────────────────────────────────────────────────────────

// function StatCard({
//   target,
//   suffix,
//   label,
//   icon,
//   desc,
//   delay,
// }: {
//   target: number;
//   suffix: string;
//   label: string;
//   icon: string;
//   desc: string;
//   delay: number;
// }) {
//   const { count, ref } = useCountUp(target, 2000, delay);
//   const formatted =
//     count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24, scale: 0.88 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
//       whileHover={{
//         y: -5,
//         transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
//       }}
//       className="flex-1 group cursor-default"
//     >
//       <div
//         className="relative overflow-hidden rounded-2xl p-4 h-full"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
//           border: "1px solid rgba(255,255,255,0.12)",
//           boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
//           transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
//         }}
//         onMouseEnter={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.borderColor = "rgba(246,166,35,0.5)";
//           el.style.boxShadow =
//             "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(246,166,35,0.18)";
//           el.style.background =
//             "linear-gradient(135deg, rgba(246,166,35,0.14) 0%, rgba(255,255,255,0.06) 100%)";
//         }}
//         onMouseLeave={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.borderColor = "rgba(255,255,255,0.12)";
//           el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.12)";
//           el.style.background =
//             "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)";
//         }}
//       >
//         <div
//           className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(246,166,35,0.35) 0%, transparent 70%)",
//           }}
//         />

//         <div className="text-2xl mb-3 leading-none">{icon}</div>

//         <div className="flex items-baseline gap-0.5 mb-0.5">
//           <span
//             className="font-display font-bold text-white tabular-nums leading-none"
//             style={{ fontSize: "clamp(24px, 3.2vw, 36px)" }}
//           >
//             {formatted}
//           </span>
//           <span
//             className="font-display font-bold text-saffron-400 leading-none"
//             style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
//           >
//             {suffix}
//           </span>
//         </div>

//         <div className="font-bold text-white/80 text-[13px] tracking-wide mb-0.5">
//           {label}
//         </div>
//         <div className="text-[11px] font-medium text-white/35 group-hover:text-saffron-400/70 transition-colors duration-300 uppercase tracking-widest">
//           {desc}
//         </div>

//         <div
//           className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
//           style={{
//             background:
//               "linear-gradient(90deg, rgba(246,166,35,0.8), rgba(246,166,35,0))",
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// // ─── BackgroundOrbs ───────────────────────────────────────────────────────────

// function BackgroundOrbs() {
//   return (
//     <div
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//       aria-hidden="true"
//     >
//       <motion.div
//         animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(246,166,35,0.2) 0%, transparent 65%)",
//         }}
//       />
//       <motion.div
//         animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2,
//         }}
//         className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(20,52,90,0.9) 0%, transparent 70%)",
//         }}
//       />
//       <div className="absolute inset-0 dot-grid-light opacity-40" />
//       {[
//         { top: "20%", left: "8%", size: 5, delay: 0 },
//         { top: "55%", left: "12%", size: 3, delay: 1.2 },
//         { top: "35%", left: "90%", size: 4, delay: 0.6 },
//         { top: "70%", left: "85%", size: 6, delay: 2 },
//         { top: "15%", left: "50%", size: 3, delay: 1.5 },
//         { top: "80%", left: "40%", size: 4, delay: 0.8 },
//       ].map((p, i) => (
//         <motion.div
//           key={i}
//           animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
//           transition={{
//             duration: 4 + i * 0.5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: p.delay,
//           }}
//           className="absolute rounded-full bg-saffron-400"
//           style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── FloatingNotif ────────────────────────────────────────────────────────────

// function FloatingNotif({
//   icon,
//   iconBg,
//   title,
//   sub,
//   delay,
//   direction = 1,
//   wrapperStyle,
// }: {
//   icon: React.ReactNode;
//   iconBg: string;
//   title: string;
//   sub: string;
//   delay: number;
//   direction?: 1 | -1;
//   wrapperStyle: React.CSSProperties;
// }) {
//   return (
//     <div style={{ position: "absolute", zIndex: 20, ...wrapperStyle }}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1, y: [0, direction * -8, 0] }}
//         transition={{
//           opacity: { delay, duration: 0.5 },
//           scale: { delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
//           y: {
//             delay: delay + 0.55,
//             duration: 4.8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           },
//         }}
//         className="flex items-center gap-3 px-4 py-3 rounded-2xl"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
//           border: "1px solid rgba(255,255,255,0.18)",
//           backdropFilter: "blur(18px)",
//           WebkitBackdropFilter: "blur(18px)",
//           boxShadow:
//             "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
//           whiteSpace: "nowrap",
//         }}
//       >
//         <div
//           className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//           style={{ background: iconBg }}
//         >
//           {icon}
//         </div>
//         <div>
//           <p className="text-white font-semibold text-[12.5px] leading-tight">
//             {title}
//           </p>
//           <p className="text-white/55 text-[11px] mt-0.5">{sub}</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ─── HeroConversionPanel ──────────────────────────────────────────────────────
// //
// //  The premium right-column replacement for the old form.
// //  Shows the 3-step match flow on a glassmorphism card + floating social proof,
// //  then drives users to /inquiry with a bold CTA.

// // function HeroConversionPanel() {
// //   const [activeStep, setActiveStep] = useState(0);

// //   // Auto-cycle through steps
// //   useEffect(() => {
// //     const id = setInterval(() => setActiveStep((s) => (s + 1) % MATCH_STEPS.length), 2800);
// //     return () => clearInterval(id);
// //   }, []);

// //   return (
// //     <div
// //       className="relative hidden lg:block select-none"
// //       style={{ height: 580, isolation: "isolate", overflow: "visible" }}
// //     >
// //       {/* Soft centred glow */}
// //       <div
// //         className="absolute pointer-events-none"
// //         style={{
// //           top: "50%", left: "50%",
// //           transform: "translate(-50%, -50%)",
// //           width: 340, height: 340, borderRadius: "50%",
// //           background: "radial-gradient(circle, rgba(246,166,35,0.08) 0%, transparent 70%)",
// //         }}
// //       />

// //       {/* ── Row 1: Subject pills (above card) ── */}
// //       {SUBJECT_PILLS.slice(0, 2).map((pill) => (
// //         <motion.div
// //           key={pill.label}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1, y: [0, -9, 0] }}
// //           transition={{
// //             opacity: { delay: pill.delay, duration: 0.4 },
// //             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
// //           }}
// //           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
// //           style={{ ...pill.pos, background: pill.bg, border: `1px solid ${pill.border}`, color: pill.text, zIndex: 15 }}
// //         >
// //           {pill.label}
// //         </motion.div>
// //       ))}

// //       {/* ── Floating notifs (top) ── */}
// //       <FloatingNotif
// //         icon={
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //             <polyline points="20 6 9 17 4 12" />
// //           </svg>
// //         }
// //         iconBg="rgba(37,211,102,0.22)"
// //         title="Tutor Matched!"
// //         sub="3 tutors near Gaur City"
// //         delay={0.8}
// //         direction={1}
// //         wrapperStyle={{ top: 54, left: 0 }}
// //       />
// //       <FloatingNotif
// //         icon={<span style={{ fontSize: 15, lineHeight: 1 }}>⭐</span>}
// //         iconBg="rgba(251,191,36,0.22)"
// //         title="4.9 Rating"
// //         sub="126 verified reviews"
// //         delay={0.92}
// //         direction={-1}
// //         wrapperStyle={{ top: 54, right: 0 }}
// //       />

// //       {/* ══════════════════════════════════════════
// //           MAIN CONVERSION CARD
// //       ══════════════════════════════════════════ */}
// //       <motion.div
// //         initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //         animate={{ opacity: 1, y: 0, scale: 1 }}
// //         transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// //         className="absolute bg-white rounded-3xl overflow-hidden"
// //         style={{
// //           top: 122,
// //           left: "50%",
// //           x: "-50%",
// //           width: 300,
// //           zIndex: 10,
// //           boxShadow: "0 32px 80px rgba(4,13,21,0.48), 0 0 0 1px rgba(255,255,255,0.06)",
// //         }}
// //       >
// //         {/* Top colour bar */}
// //         <div className="h-1.5" style={{ background: "linear-gradient(90deg, #F6A623, #ffb83a, #F6A623)" }} />

// //         <div className="p-6">

// //           {/* ── Card header ── */}
// //           <div className="mb-5">
// //             <div className="flex items-center gap-2 mb-1.5">
// //               <div
// //                 className="w-7 h-7 rounded-lg flex items-center justify-center"
// //                 style={{ background: "linear-gradient(135deg, #0C2340, #1D5290)" }}
// //               >
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
// //                   <circle cx="9" cy="7" r="4"/>
// //                   <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
// //                 </svg>
// //               </div>
// //               <h2 className="font-display font-bold text-navy-700 text-[15.5px] leading-tight">
// //                 Find Your Perfect Tutor
// //               </h2>
// //             </div>
// //             <p className="text-slate-500 text-[11.5px] leading-relaxed">
// //               3 simple steps · completely free · results in 24 hrs
// //             </p>
// //           </div>

// //           {/* ── Steps ── */}
// //           <div className="space-y-3 mb-5">
// //             {MATCH_STEPS.map((s, i) => {
// //               const isActive = activeStep === i;
// //               const isDone   = activeStep > i;
// //               return (
// //                 <motion.div
// //                   key={s.step}
// //                   animate={{
// //                     background: isActive
// //                       ? s.colorBg
// //                       : isDone
// //                       ? "rgba(16,185,129,0.06)"
// //                       : "rgba(12,33,63,0.03)",
// //                     borderColor: isActive
// //                       ? s.colorBorder
// //                       : isDone
// //                       ? "rgba(16,185,129,0.2)"
// //                       : "rgba(12,33,63,0.07)",
// //                   }}
// //                   transition={{ duration: 0.4, ease: "easeInOut" }}
// //                   className="flex items-start gap-3 rounded-xl px-3.5 py-3 border cursor-default"
// //                   onClick={() => setActiveStep(i)}
// //                 >
// //                   {/* Step icon / done check */}
// //                   <motion.div
// //                     animate={{
// //                       background: isDone
// //                         ? "linear-gradient(135deg, #10b981, #059669)"
// //                         : isActive
// //                         ? `linear-gradient(135deg, ${s.color}, ${s.color}cc)`
// //                         : "rgba(12,33,63,0.08)",
// //                       color: isDone || isActive ? "white" : "#94a3b8",
// //                     }}
// //                     transition={{ duration: 0.35 }}
// //                     className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
// //                   >
// //                     <AnimatePresence mode="wait">
// //                       {isDone ? (
// //                         <motion.span
// //                           key="check"
// //                           initial={{ scale: 0 }}
// //                           animate={{ scale: 1 }}
// //                           exit={{ scale: 0 }}
// //                           transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //                         >
// //                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
// //                             <polyline points="20 6 9 17 4 12" />
// //                           </svg>
// //                         </motion.span>
// //                       ) : (
// //                         <motion.span key="icon" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
// //                           {s.icon}
// //                         </motion.span>
// //                       )}
// //                     </AnimatePresence>
// //                   </motion.div>

// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-center justify-between gap-1 mb-0.5">
// //                       <p className="text-[12.5px] font-bold text-navy-700 leading-tight">{s.title}</p>
// //                       <span
// //                         className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-full shrink-0"
// //                         style={{
// //                           background: isActive ? s.colorBg : "transparent",
// //                           color: isActive ? s.color : "#cbd5e1",
// //                           border: `1px solid ${isActive ? s.colorBorder : "transparent"}`,
// //                         }}
// //                       >
// //                         {s.step}
// //                       </span>
// //                     </div>
// //                     <p className="text-[11px] text-slate-400 leading-relaxed">{s.sub}</p>
// //                   </div>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>

// //           {/* ── Progress dots ── */}
// //           <div className="flex items-center justify-center gap-1.5 mb-5">
// //             {MATCH_STEPS.map((_, i) => (
// //               <motion.div
// //                 key={i}
// //                 animate={{
// //                   width:      activeStep === i ? 20 : 6,
// //                   background: activeStep === i ? "#F6A623" : activeStep > i ? "#10b981" : "rgba(12,33,63,0.12)",
// //                 }}
// //                 transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
// //                 className="h-1.5 rounded-full cursor-pointer"
// //                 onClick={() => setActiveStep(i)}
// //               />
// //             ))}
// //           </div>

// //           {/* Divider */}
// //           <div className="h-px bg-slate-100 mb-4" />

// //           {/* ── Social proof micro-row ── */}
// //           <div className="flex items-center justify-between mb-4 px-0.5">
// //             {[
// //               { val: "17K+",  label: "Families" },
// //               { val: "8K+",   label: "Tutors" },
// //               { val: "5.0★",  label: "Rated" },
// //             ].map(({ val, label }) => (
// //               <div key={label} className="flex flex-col items-center gap-0.5">
// //                 <span className="font-display font-bold text-navy-700 text-[15px] leading-none tabular-nums">{val}</span>
// //                 <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{label}</span>
// //               </div>
// //             ))}
// //           </div>

// //           {/* ── Primary CTA ── */}
// //           <Link href="/inquiry" className="block">
// //             <motion.div
// //               whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(246,166,35,0.55)" }}
// //               whileTap={{ scale: 0.98 }}
// //               transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //               className="relative w-full py-[13px] rounded-xl font-bold text-[14px] overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
// //               style={{
// //                 background: "linear-gradient(135deg, #F6A623, #ffb83a)",
// //                 color: "#0C213F",
// //                 boxShadow: "0 6px 22px rgba(246,166,35,0.45)",
// //               }}
// //             >
// //               {/* Shimmer */}
// //               <span
// //                 className="absolute inset-0 pointer-events-none"
// //                 style={{
// //                   background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.32) 50%,transparent 60%)",
// //                   backgroundSize: "200% 100%",
// //                   animation: "shimmer 2.5s linear infinite",
// //                 }}
// //               />
// //               <span className="relative z-10 flex items-center gap-2">
// //                 Get Matched — It&apos;s Free
// //                 <motion.span
// //                   animate={{ x: [0, 4, 0] }}
// //                   transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
// //                 >
// //                   →
// //                 </motion.span>
// //               </span>
// //             </motion.div>
// //           </Link>

// //           {/* ── Ghost secondary CTA ── */}
// //           <p className="text-center mt-3 text-[11.5px] text-slate-400 font-medium">
// //             No payment · No lock-in ·{" "}
// //             <a
// //               href={`tel:+${PHONE_RAW}`}
// //               className="text-navy-600 font-semibold hover:text-saffron-500 transition-colors underline underline-offset-2"
// //             >
// //               or just call us
// //             </a>
// //           </p>
// //         </div>

// //         {/* ── Bottom trust strip ── */}
// //         <div
// //           className="border-t border-slate-100 px-6 py-3 flex items-center justify-center gap-5 flex-wrap"
// //           style={{ background: "#F8FAFD" }}
// //         >
// //           {[
// //             { icon: "🔒", text: "100% Secure" },
// //             { icon: "🎁", text: "Always Free" },
// //             { icon: "🔄", text: "Free Replacement" },
// //           ].map(({ icon, text }) => (
// //             <span key={text} className="text-[10.5px] font-semibold text-ink-muted flex items-center gap-1">
// //               {icon} {text}
// //             </span>
// //           ))}
// //         </div>
// //       </motion.div>

// //       {/* ── Bottom notif (Demo Confirmed) ── */}
// //       <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 20, pointerEvents: "none" }}>
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.85 }}
// //           animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
// //           transition={{
// //             opacity: { delay: 1.05, duration: 0.5 },
// //             scale:   { delay: 1.05, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
// //             y: { delay: 1.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
// //           }}
// //           className="flex items-center gap-3 px-4 py-3 rounded-2xl"
// //           style={{
// //             background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
// //             border: "1px solid rgba(255,255,255,0.18)",
// //             backdropFilter: "blur(18px)",
// //             WebkitBackdropFilter: "blur(18px)",
// //             boxShadow: "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
// //             whiteSpace: "nowrap",
// //             pointerEvents: "auto",
// //           }}
// //         >
// //           <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
// //             style={{ background: "rgba(246,166,35,0.22)" }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //               <rect x="3" y="4" width="18" height="18" rx="2" />
// //               <line x1="16" y1="2" x2="16" y2="6" />
// //               <line x1="8" y1="2" x2="8" y2="6" />
// //               <line x1="3" y1="10" x2="21" y2="10" />
// //             </svg>
// //           </div>
// //           <div>
// //             <p className="text-white font-semibold text-[12.5px] leading-tight">Demo Confirmed</p>
// //             <p className="text-white/55 text-[11px] mt-0.5">Tomorrow · 5:00 PM · FREE</p>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* ── Bottom subject pills ── */}
// //       {SUBJECT_PILLS.slice(2).map((pill) => (
// //         <motion.div
// //           key={pill.label}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1, y: [0, -9, 0] }}
// //           transition={{
// //             opacity: { delay: pill.delay, duration: 0.4 },
// //             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
// //           }}
// //           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
// //           style={{ ...pill.pos, background: pill.bg, border: `1px solid ${pill.border}`, color: pill.text, zIndex: 15 }}
// //         >
// //           {pill.label}
// //         </motion.div>
// //       ))}
// //     </div>
// //   );
// // }

// // ─── TickerStrip ──────────────────────────────────────────────────────────────

// function TickerStrip() {
//   const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
//   return (
//     <div
//       className="relative overflow-hidden z-10"
//       style={{
//         background: "linear-gradient(90deg, #F6A623, #ffb83a)",
//         padding: "10px 0",
//       }}
//     >
//       <motion.div
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
//         className="flex items-center will-change-transform"
//       >
//         {doubled.map((item, i) => (
//           <div
//             key={i}
//             className="flex items-center gap-2 px-8 flex-shrink-0"
//             style={{ borderRight: "1.5px solid rgba(12,33,63,0.18)" }}
//           >
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(12,33,63,0.6)"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//             <span className="text-[13px] font-bold text-navy-700 whitespace-nowrap">
//               {item}
//             </span>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// // ─── HeroSection ─────────────────────────────────────────────────────────────

// export default function HeroSection() {
//   return (
//     <section
//       id="hero"
//       aria-label="Find a home tutor in Greater Noida"
//       className="relative bg-navy-700 overflow-hidden"
//       style={{ minHeight: "calc(100vh - 68px)" }}
//     >
//       <BackgroundOrbs />

//       <div className="container-custom relative z-10 py-16 lg:py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">
//           {/* ════════════════════════════════════
//               LEFT — Copy column
//           ════════════════════════════════════ */}
//           <div>
//             {/* Live badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               className="inline-flex items-center gap-2.5 mb-6"
//             >
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron-400" />
//               </span>
//               <span
//                 className="text-saffron-400 font-bold uppercase tracking-widest"
//                 style={{ fontSize: "11.5px" }}
//               >
//                 Greater Noida's #1 Tuition Bureau Since 2011
//               </span>
//             </motion.div>

//             {/* H1 */}
//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.1,
//                 duration: 0.7,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="font-display font-bold text-white leading-[1.1] tracking-tight text-balance mb-6"
//               style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
//             >
//               Find the{" "}
//               <span className="relative inline-block">
//                 <em className="not-italic text-gradient-saffron">
//                   Perfect Tutor
//                 </em>
//                 <motion.svg
//                   className="absolute -bottom-2 left-0 w-full overflow-visible"
//                   viewBox="0 0 200 12"
//                   preserveAspectRatio="none"
//                   height="10"
//                 >
//                   <motion.path
//                     d="M 0 8 Q 50 2, 100 7 Q 150 12, 200 6"
//                     fill="none"
//                     stroke="#F6A623"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     initial={{ pathLength: 0 }}
//                     animate={{ pathLength: 1 }}
//                     transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
//                   />
//                 </motion.svg>
//               </span>{" "}
//               for Your Child in Greater Noida
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.25,
//                 duration: 0.65,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="text-white/65 leading-relaxed mb-8 max-w-xl"
//               style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
//             >
//               Verified, background-checked home tutors for{" "}
//               <span className="text-white/90 font-semibold">Classes 1–12</span>.{" "}
//               All subjects across{" "}
//               {BOARDS.map((board, i) => (
//                 <motion.span
//                   key={board.name}
//                   initial={{ opacity: 0, y: 6, scale: 0.9 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{
//                     delay: 0.4 + i * 0.1,
//                     duration: 0.4,
//                     ease: [0.34, 1.56, 0.64, 1],
//                   }}
//                   whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
//                   className="inline-flex items-center mx-0.5 px-2.5 py-0.5 rounded-full text-[13px] font-bold cursor-default relative overflow-hidden align-middle"
//                   style={{
//                     background: board.color,
//                     border: `1px solid ${board.border}`,
//                     color: board.text,
//                   }}
//                 >
//                   {board.name}
//                 </motion.span>
//               ))}{" "}
//               — matched to your location within{" "}
//               <span className="text-white/90 font-semibold">24 hours</span>.
//             </motion.p>

//             {/* Trust pills */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.35,
//                 duration: 0.6,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="flex flex-wrap gap-2.5 mb-8"
//             >
//               {TRUST_PILLS.map((text, i) => (
//                 <motion.div
//                   key={text}
//                   initial={{ opacity: 0, scale: 0.88 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{
//                     delay: 0.4 + i * 0.08,
//                     duration: 0.4,
//                     ease: [0.34, 1.56, 0.64, 1],
//                   }}
//                   className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
//                   style={{
//                     background: "rgba(255,255,255,0.08)",
//                     border: "1px solid rgba(255,255,255,0.12)",
//                   }}
//                 >
//                   <svg
//                     width="13"
//                     height="13"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#F6A623"
//                     strokeWidth="3"
//                   >
//                     <polyline points="20 6 9 17 4 12" />
//                   </svg>
//                   <span className="text-white/80 font-medium text-sm">
//                     {text}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.45,
//                 duration: 0.6,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="flex flex-col sm:flex-row gap-4 mb-10"
//             >
//               {/* Call Now */}
//               <div className="flex flex-col items-center sm:items-start gap-1.5">
//                 <motion.a
//                   href={`tel:${PHONE_RAW}`}
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.96 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                   className="relative inline-flex items-center gap-3 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden group"
//                   style={{
//                     background: "#F6A623",
//                     color: "#0C213F",
//                     boxShadow: "0 4px 24px rgba(246,166,35,0.4)",
//                   }}
//                 >
//                   <span
//                     className="absolute inset-0 pointer-events-none"
//                     style={{
//                       background:
//                         "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
//                       backgroundSize: "200% 100%",
//                       animation: "shimmer 2.2s linear infinite",
//                     }}
//                   />
//                   <span className="absolute inset-0 rounded-2xl animate-ping opacity-15 bg-saffron-400 pointer-events-none" />
//                   <span className="relative z-10 flex items-center gap-2.5">
//                     <motion.span
//                       animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
//                       transition={{
//                         duration: 1.8,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                     >
//                       <PhoneIcon size={18} />
//                     </motion.span>
//                     Call Now
//                   </span>
//                   <span className="relative z-10 text-navy-700 inline-flex overflow-hidden w-0 group-hover:w-5 transition-all duration-300 ease-out">
//                     →
//                   </span>
//                 </motion.a>
//                 <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">
//                   ⚡ Instant response
//                 </span>
//               </div>

//               {/* WhatsApp */}
//               <div className="flex flex-col items-center sm:items-start gap-1.5">
//                 <motion.a
//                   href={WA_LINK(
//                     "Hello, I am looking for a home tutor in Greater Noida. Please help me find the right tutor for my child.",
//                   )}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{
//                     scale: 1.04,
//                     boxShadow: "0 0 36px rgba(37,211,102,0.45)",
//                   }}
//                   whileTap={{ scale: 0.96 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                   className="relative inline-flex items-center gap-2.5 text-white font-bold rounded-2xl px-7 py-4 text-[15px] border overflow-hidden"
//                   style={{
//                     background: "rgba(37,211,102,0.18)",
//                     borderColor: "rgba(37,211,102,0.45)",
//                     boxShadow:
//                       "0 4px 20px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
//                   }}
//                 >
//                   <span className="relative z-10 flex items-center gap-2.5 text-white">
//                     <motion.span
//                       animate={{
//                         rotate: [0, -18, 18, -12, 12, -6, 6, 0],
//                         scale: [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1],
//                       }}
//                       transition={{
//                         duration: 0.7,
//                         repeat: Infinity,
//                         repeatDelay: 4,
//                         ease: "easeInOut",
//                       }}
//                     >
//                       <WhatsAppIcon size={18} />
//                     </motion.span>
//                     WhatsApp Us
//                   </span>
//                 </motion.a>
//                 <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">
//                   🟢 Usually replies in minutes
//                 </span>
//               </div>

//               {/* ── Mobile-only: Find Tutor CTA ── */}
//               <div className="flex lg:hidden flex-col items-center sm:items-start gap-1.5">
//                 <Link href="/inquiry">
//                   <motion.div
//                     whileHover={{ scale: 1.04 }}
//                     whileTap={{ scale: 0.96 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                     className="relative inline-flex items-center gap-2.5 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden border border-white/20"
//                     style={{
//                       background: "rgba(255,255,255,0.07)",
//                       color: "white",
//                     }}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="11" cy="11" r="8" />
//                       <path d="M21 21l-4.35-4.35" />
//                     </svg>
//                     Find My Tutor — Free
//                   </motion.div>
//                 </Link>
//                 <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">
//                   📋 Fill a 60-sec form
//                 </span>
//               </div>
//             </motion.div>

//             {/* Stats */}
//             <div className="flex items-stretch gap-3">
//               {STATS.map(({ target, suffix, label, icon, desc }, i) => (
//                 <StatCard
//                   key={label}
//                   target={target}
//                   suffix={suffix}
//                   label={label}
//                   icon={icon}
//                   desc={desc}
//                   delay={0.65 + i * 0.12}
//                 />
//               ))}
//             </div>

//             {/* Rating badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9, duration: 0.5 }}
//               className="mt-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
//               style={{
//                 background: "rgba(255,255,255,0.07)",
//                 border: "1px solid rgba(255,255,255,0.10)",
//               }}
//             >
//               <span className="text-amber-400 text-sm tracking-wide">
//                 ★★★★★
//               </span>
//               <span className="text-white/60 text-xs font-medium">
//                 Rated 5.0 by 17,000+ families across Greater Noida
//               </span>
//             </motion.div>
//           </div>

//           {/* ════════════════════════════════════
//               RIGHT — Premium conversion panel
//           ════════════════════════════════════ */}
//           {/* <HeroConversionPanel /> */}

//           <HeroConversionPanel />
//         </div>
//       </div>

//       {/* Wave divider */}
//       <div
//         className="relative pointer-events-none"
//         aria-hidden="true"
//         style={{ lineHeight: 0, marginTop: "-2px" }}
//       >
//         <svg
//           viewBox="0 0 1440 80"
//           preserveAspectRatio="none"
//           xmlns="http://www.w3.org/2000/svg"
//           style={{
//             width: "100%",
//             height: "clamp(40px, 5vw, 80px)",
//             display: "block",
//           }}
//         >
//           <defs>
//             <linearGradient id="hero-wave-shadow" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="rgba(12,35,64,0.12)" />
//               <stop offset="100%" stopColor="rgba(12,35,64,0)" />
//             </linearGradient>
//           </defs>
//           <path
//             d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 80 L0 80 Z"
//             fill="url(#hero-wave-shadow)"
//           />
//           <path
//             d="M0 20 Q360 80 720 46 Q1080 12 1440 66 L1440 80 L0 80 Z"
//             fill="#F6A623"
//           />
//         </svg>
//       </div>
//       <TrustBar />

//       {/* Ticker strip */}
//       {/* <TickerStrip /> */}
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { StarIcon } from "lucide-react";
// import Image from "next/image";

// // ── Animation variants ────────────────────────────────────────────────────────
// const fadeUp = (delay = 0) => ({
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: "easeOut", delay },
//   },
// });

// const scaleIn = (delay = 0) => ({
//   hidden: { opacity: 0, scale: 0.93 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.6, ease: "easeOut", delay },
//   },
// });

// const floatIn = (delay = 0) => ({
//   hidden: { opacity: 0, y: 16 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut", delay },
//   },
// });

// // ── Tiny UI helpers ───────────────────────────────────────────────────────────
// const GlassCard = ({ className = "", children, delay = 0 }) => (
//   <motion.div
//     variants={floatIn(delay)}
//     initial="hidden"
//     animate="visible"
//     whileHover={{ y: -4, transition: { duration: 0.2 } }}
//     className={`backdrop-blur-md bg-white/80 border border-white/50 shadow-lg rounded-2xl px-4 py-3 ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// // Avatar placeholder (coloured circle with initial)
// const Avatar = ({ bg, initial }) => (
//   <div
//     className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${bg} -ml-2 first:ml-0`}
//   >
//     {initial}
//   </div>
// );

// // Feature pill
// const FeaturePill = ({ icon, label }) => (
//   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2E8F0] bg-white shadow-sm text-sm font-medium text-[#0F172A]">
//     <span className="text-[#2563EB] text-base">{icon}</span>
//     {label}
//   </div>
// );

// // ── Logo SVG (book icon) ──────────────────────────────────────────────────────
// const BookIcon = () => (
//   <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//     <rect width="32" height="32" rx="8" fill="#2563EB" />
//     <path d="M8 10h7v12H8V10zm9 0h7v12h-7V10z" fill="white" opacity=".9" />
//     <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="#FACC15" />
//   </svg>
// );

// // WhatsApp SVG icon
// const WhatsAppIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//     <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.523 5.83L.073 23.927l6.29-1.427A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.8-.527-5.383-1.442l-.385-.229-3.733.847.863-3.633-.252-.395A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
//   </svg>
// );

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function HeroSection() {
//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
//       {/* ── Background blobs ── */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-100/60 blur-[120px] translate-x-1/4 -translate-y-1/4" />
//         <div className="absolute bottom-20 left-0 w-[500px] h-[500px] rounded-full bg-yellow-100/50 blur-[100px] -translate-x-1/3" />
//       </div>

//       {/* ══════════════════════════════════════
//           HERO SECTION
//       ══════════════════════════════════════ */}
//       <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 lg:py-20 min-h-[90vh] flex flex-col justify-center">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* ── LEFT CONTENT ── */}
//           <div className="flex flex-col gap-7">
//             {/* Trust badge */}
//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-full shadow-sm text-[13px] font-medium text-[#0F172A]">
//                 <span className="text-yellow-400 text-base">★</span>
//                 Trusted by 17,000+ Parents Across NCR
//               </div>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               variants={fadeUp(0.12)}
//               initial="hidden"
//               animate="visible"
//               className="text-[2.85rem] md:text-[3.4rem] font-extrabold text-[#0F172A] leading-[1.13] tracking-tight"
//             >
//               The Right Tutor
//               <br />
//               Makes All the
//               <br />
//               <span className="text-[#2563EB] relative">
//                 Difference.
//                 {/* Yellow underline */}
//                 <span
//                   className="absolute left-0 -bottom-1 h-[5px] w-full rounded-full"
//                   style={{ background: "#FACC15" }}
//                 />
//               </span>
//             </motion.h1>

//             {/* Subtext */}
//             <motion.p
//               variants={fadeUp(0.2)}
//               initial="hidden"
//               animate="visible"
//               className="text-[1.0625rem] text-[#64748B] leading-relaxed max-w-[460px]"
//             >
//               We connect your child with verified, experienced and dedicated
//               tutors for better learning and brighter future.
//             </motion.p>

//             {/* Feature pills */}
//             <motion.div
//               variants={fadeUp(0.28)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-3"
//             >
//               <FeaturePill
//                 icon={
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.3"
//                   >
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                   </svg>
//                 }
//                 label="Verified Tutors"
//               />
//               <FeaturePill
//                 icon={
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.3"
//                   >
//                     <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                     <circle cx="9" cy="7" r="4" />
//                     <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
//                   </svg>
//                 }
//                 label="Personalized Matching"
//               />
//               <FeaturePill
//                 icon={
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                   >
//                     <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
//                   </svg>
//                 }
//                 label="24–48 Hours Match"
//               />
//             </motion.div>

//             {/* CTA Buttons */}
//             <motion.div
//               variants={fadeUp(0.36)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2563EB] hover:bg-[#1E3A8A] text-white font-semibold rounded-full text-[15px] shadow-lg shadow-blue-200 transition-colors"
//               >
//                 Find a Tutor Now
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#f0fdf4" }}
//                 whileTap={{ scale: 0.97 }}
//                 className="flex items-center justify-center gap-2.5 px-7 py-3.5 border-2 border-[#E2E8F0] hover:border-green-400 text-[#0F172A] font-semibold rounded-full text-[15px] transition-all bg-white"
//               >
//                 <span className="text-green-500">
//                   <WhatsAppIcon />
//                 </span>
//                 Talk to Us on WhatsApp
//               </motion.button>
//             </motion.div>

//             {/* Social proof */}
//             <motion.div
//               variants={fadeUp(0.44)}
//               initial="hidden"
//               animate="visible"
//               className="flex items-center gap-4"
//             >
//               {/* Overlapping avatars */}
//               <div className="flex items-center">
//                 {[
//                   { bg: "bg-rose-400", initial: "P" },
//                   { bg: "bg-amber-400", initial: "R" },
//                   { bg: "bg-sky-500", initial: "A" },
//                 ].map((av) => (
//                   <Avatar key={av.initial} {...av} />
//                 ))}
//               </div>
//               <p className="text-[13.5px] text-[#64748B] font-medium">
//                 17,000+ parents already trust us
//               </p>
//               <div className="h-4 w-px bg-[#E2E8F0]" />
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className="text-yellow-400 text-sm">
//                     <StarIcon/>
//                   </span>
//                 ))}
//                 <span className="text-[13px] font-semibold text-[#0F172A] ml-1">
//                   4.9/5
//                 </span>
//               </div>
//             </motion.div>
//           </div>

//           {/* ── RIGHT VISUAL ── */}
//           <motion.div
//             variants={scaleIn(0.25)}
//             initial="hidden"
//             animate="visible"
//             className="relative hidden lg:block bg-red-500 "
//           >
//             {/* Background blob behind image */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 rounded-3xl blur-2xl scale-95 opacity-70" />

//             {/* Hero image */}
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100">
//               <Image
//                 src="/hero-image-2.png"
//                 alt="Mother and child studying together"
//                 className="w-full h-auto object-cover"
//                 height={540}
//                 width={540}
//               />
//             </div>

//             {/* ── Floating Card: 8,000+ Verified Tutors (top) ── */}
//             <GlassCard
//               delay={0.55}
//               className="absolute -top-5 left-4 flex items-center gap-3 min-w-[210px]"
//             >
//               <div className="flex -space-x-2">
//                 {[
//                   { bg: "bg-indigo-500", initial: "T" },
//                   { bg: "bg-sky-500", initial: "R" },
//                   { bg: "bg-amber-400", initial: "S" },
//                 ].map((av) => (
//                   <div
//                     key={av.initial}
//                     className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white ${av.bg}`}
//                   >
//                     {av.initial}
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <p className="text-[15px] font-bold text-[#2563EB]">8,000+</p>
//                 <p className="text-[12px] text-[#64748B]">Verified Tutors</p>
//               </div>
//             </GlassCard>

//             {/* ── Floating Card: Quick Matching (middle left) ── */}
//             <GlassCard
//               delay={0.65}
//               className="absolute top-[38%] -left-10 flex items-center gap-3 min-w-[200px]"
//             >
//               <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#2563EB"
//                   strokeWidth="2.2"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <path d="M12 6v6l4 2" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-[14px] font-bold text-[#0F172A]">
//                   Quick Matching
//                 </p>
//                 <p className="text-[11px] text-[#64748B]">
//                   Get the best tutor in
//                   <br />
//                   24–48 hours
//                 </p>
//               </div>
//             </GlassCard>

//             {/* ── Floating Card: 100% Safe & Secure (bottom right) ── */}
//             <GlassCard
//               delay={0.75}
//               className="absolute bottom-16 -right-6 flex items-start gap-3 max-w-[220px]"
//             >
//               <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#16a34a"
//                   strokeWidth="2.2"
//                 >
//                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                   <path d="M9 12l2 2 4-4" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-[14px] font-bold text-[#0F172A]">
//                   100% Safe & Secure
//                 </p>
//                 <p className="text-[11px] text-[#64748B]">
//                   Background checked tutors for your peace of mind
//                 </p>
//               </div>
//             </GlassCard>

//             {/* ── Badge: Serving All Across NCR (bottom center) ── */}
//             <GlassCard
//               delay={0.82}
//               className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap"
//             >
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#2563EB"
//                 strokeWidth="2.3"
//               >
//                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//                 <circle cx="12" cy="10" r="3" />
//               </svg>
//               <span className="text-[13px] font-semibold text-[#0F172A]">
//                 Serving All Across NCR
//               </span>
//             </GlassCard>

//             {/* Decorative dots */}
//             <div className="absolute top-12 right-8 flex flex-col gap-2 opacity-40">
//               {[...Array(3)].map((_, r) => (
//                 <div key={r} className="flex gap-2">
//                   {[...Array(3)].map((_, c) => (
//                     <div
//                       key={c}
//                       className="w-1.5 h-1.5 rounded-full bg-blue-300"
//                     />
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* ══════════════════════════════════════
//             STATS BAR
//         ══════════════════════════════════════ */}
//         <motion.div
//           variants={fadeUp(0.5)}
//           initial="hidden"
//           animate="visible"
//           className="mt-16 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 grid grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {[
//             {
//               icon: (
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#2563EB"
//                   strokeWidth="1.8"
//                 >
//                   <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                   <circle cx="9" cy="7" r="4" />
//                   <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
//                 </svg>
//               ),
//               bg: "bg-blue-50",
//               value: "17,000+",
//               label: "Happy Families",
//               sub: "Across NCR",
//             },
//             {
//               icon: (
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#16a34a"
//                   strokeWidth="1.8"
//                 >
//                   <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
//                   <path d="M6 12v5c3 3 9 3 12 0v-5" />
//                 </svg>
//               ),
//               bg: "bg-green-50",
//               value: "8,000+",
//               label: "Verified Tutors",
//               sub: "Background Checked",
//             },
//             {
//               icon: (
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#7c3aed"
//                   strokeWidth="1.8"
//                 >
//                   <circle cx="12" cy="8" r="6" />
//                   <path d="M8 14l-4 7M16 14l4 7" />
//                   <path d="M9 17l3 4 3-4" />
//                 </svg>
//               ),
//               bg: "bg-purple-50",
//               value: "13+",
//               label: "Years of Trust",
//               sub: "Since 2011",
//             },
//             {
//               icon: (
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#d97706"
//                   strokeWidth="1.8"
//                 >
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                 </svg>
//               ),
//               bg: "bg-amber-50",
//               value: "4.9/5",
//               label: "Parent Rating",
//               sub: "Based on 2,000+ reviews",
//             },
//           ].map(({ icon, bg, value, label, sub }) => (
//             <div key={label} className="flex items-center gap-4">
//               <div
//                 className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center shrink-0`}
//               >
//                 {icon}
//               </div>
//               <div>
//                 <p className="text-[22px] font-extrabold text-[#0F172A] leading-tight">
//                   {value}
//                 </p>
//                 <p className="text-[13.5px] font-semibold text-[#0F172A]">
//                   {label}
//                 </p>
//                 <p className="text-[12px] text-[#64748B]">{sub}</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </section>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import type { Variants } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────
// const fadeUp = (delay = 0) => ({
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: "easeOut" as const, delay },
//   },
// });

// const scaleIn = (delay = 0) => ({
//   hidden: { opacity: 0, scale: 0.93 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.6, ease: "easeOut" as const, delay },
//   },
// });

// const floatIn = (delay = 0) => ({
//   hidden: { opacity: 0, y: 16 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" as const, delay },
//   },
// });



const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  },
});

const floatIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  },
});

const scaleIn = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  },
});

// ── Tiny UI helpers ───────────────────────────────────────────────────────────
// const GlassCard = ({
//   className = "",
//   children,
//   delay = 0,
// }: {
//   className?: string;
//   children: ReactNode;
//   delay?: number;
// }) => (
//   <motion.div
//     variants={floatIn(delay)}
//     initial="hidden"
//     animate="visible"
//     whileHover={{ y: -3, transition: { duration: 0.2 } }}
//     className={`backdrop-blur-md bg-white/85 border border-white/60 shadow-xl shadow-blue-100/40 rounded-2xl px-3.5 py-2.5 ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// const Avatar =({
//   bg,
//   initial,
// }: {
//   bg: string;
//   initial: string;
// }) => ...
const GlassCard = ({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) => (
  <motion.div
    variants={floatIn(delay)}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {children}
  </motion.div>
);

const Avatar = ({ bg, initial }: { bg: string; initial: string }) => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: bg,
      border: "2.5px solid #fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      fontWeight: 700,
      color: "#1D4ED8",
    }}
  >
    {initial}
  </div>
);

const FeaturePill = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 14px",
      background: "#F1F5FF",
      borderRadius: 9999,
      fontSize: 13,
      fontWeight: 500,
      color: "#1F2937",
    }}
  >
    {icon}
    {label}
  </div>
);
// const FeaturePill = ({
//   icon,
//   label,
// }: {
//   icon: ReactNode;
//   label: string;
// }) => (
//   <div
//     className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${bg} -ml-2 first:ml-0`}
//   >
//     {initial}
//   </div>
// );

// const FeaturePill = ({ icon, label }) => (
//   <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#E2E8F0] bg-white shadow-sm text-[13px] font-semibold text-[#0F172A] hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-default">
//     <span className="text-[#2563EB]">{icon}</span>
//     {label}
//   </div>
// );

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.523 5.83L.073 23.927l6.29-1.427A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.8-.527-5.383-1.442l-.385-.229-3.733.847.863-3.633-.252-.395A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
      {/* ── Background blobs ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] lg:w-[700px] h-[400px] md:h-[600px] lg:h-[700px] rounded-full bg-blue-100/60 blur-[100px] lg:blur-[120px] translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-20 left-0 w-[300px] md:w-[450px] lg:w-[500px] h-[300px] md:h-[450px] lg:h-[500px] rounded-full bg-yellow-100/50 blur-[80px] lg:blur-[100px] -translate-x-1/3" />
      </div>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
            {/* Trust badge */}
            <motion.div
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#E2E8F0] rounded-full shadow-sm text-[12px] sm:text-[13px] font-semibold text-[#0F172A]">
                <span className="text-yellow-400 text-sm">★</span>
                Trusted by 17,000+ Parents Across NCR
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.12)}
              initial="hidden"
              animate="visible"
              className="text-[2.2rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.15rem] xl:text-[3.5rem] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight"
            >
              The Right Tutor
              <br />
              Makes All the
              <br />
              <span className="text-[#2563EB] relative inline-block">
                Difference.
                <span
                  className="absolute left-0 -bottom-1 h-[4px] sm:h-[5px] w-full rounded-full"
                  style={{ background: "#FACC15" }}
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              className="text-[0.9375rem] sm:text-[1rem] lg:text-[1.0625rem] text-[#64748B] leading-relaxed max-w-[460px]"
            >
              We connect your child with verified, experienced and dedicated
              tutors for better learning and a brighter future.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              variants={fadeUp(0.28)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              <FeaturePill
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                }
                label="Verified Tutors"
              />
              <FeaturePill
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                }
                label="Personalized Matching"
              />
              <FeaturePill
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                }
                label="24–48 Hours Match"
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp(0.36)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold rounded-full text-[14px] sm:text-[15px] shadow-lg shadow-blue-200/70 transition-colors duration-200 w-full sm:w-auto"
              >
                Find a Tutor Now
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "#f0fdf4" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 border-2 border-[#E2E8F0] hover:border-green-400 text-[#0F172A] font-semibold rounded-full text-[14px] sm:text-[15px] transition-all duration-200 bg-white w-full sm:w-auto"
              >
                <span className="text-green-500">
                  <WhatsAppIcon />
                </span>
                Talk to Us on WhatsApp
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp(0.44)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <div className="flex items-center">
                {[
                  { bg: "bg-rose-400", initial: "P" },
                  { bg: "bg-amber-400", initial: "R" },
                  { bg: "bg-sky-500", initial: "A" },
                ].map((av) => (
                  <Avatar key={av.initial} {...av} />
                ))}
              </div>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#64748B] font-medium">
                17,000+ parents already trust us
              </p>
              <div className="h-4 w-px bg-[#E2E8F0] hidden sm:block" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#0F172A] ml-1">
                  4.9/5
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT VISUAL — visible on ALL screen sizes ── */}
          <motion.div
            variants={scaleIn(0.25)}
            initial="hidden"
            animate="visible"
            className="relative w-full mt-2 lg:mt-0"
          >
            {/* Glow blob behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 rounded-3xl blur-2xl scale-95 opacity-60 pointer-events-none" />

            {/* Hero image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/60">
              <Image
                src="/hero-image-2.png"
                alt="Mother and child studying together"
                className="w-full h-auto object-cover"
                height={540}
                width={540}
                priority
              />
            </div>

            {/* ── Floating Card: 8,000+ Verified Tutors (top-left) ── */}
            <GlassCard
              delay={0.55}
              className="absolute -top-4 sm:-top-5 left-2 sm:left-4 flex items-center gap-2.5 sm:gap-3 min-w-[170px] sm:min-w-[210px]"
            >
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-indigo-500", initial: "T" },
                  { bg: "bg-sky-500", initial: "R" },
                  { bg: "bg-amber-400", initial: "S" },
                ].map((av) => (
                  <div
                    key={av.initial}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white ${av.bg}`}
                  >
                    {av.initial}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-[#2563EB]">
                  8,000+
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#64748B]">
                  Verified Tutors
                </p>
              </div>
            </GlassCard>

            {/* ── Floating Card: Quick Matching (middle left) ── */}
            <GlassCard
              delay={0.65}
              className="absolute top-[36%] -left-3 sm:-left-8 lg:-left-10 flex items-center gap-2.5 sm:gap-3 min-w-[175px] sm:min-w-[200px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] sm:text-[14px] font-bold text-[#0F172A]">
                  Quick Matching
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#64748B]">
                  Get the best tutor in
                  <br />
                  24–48 hours
                </p>
              </div>
            </GlassCard>

            {/* ── Floating Card: 100% Safe & Secure (bottom right) ── */}
            <GlassCard
              delay={0.75}
              className="absolute bottom-12 sm:bottom-14 -right-2 sm:-right-4 lg:-right-6 flex items-start gap-2.5 sm:gap-3 max-w-[185px] sm:max-w-[220px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] sm:text-[14px] font-bold text-[#0F172A]">
                  100% Safe & Secure
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#64748B]">
                  Background checked tutors for your peace of mind
                </p>
              </div>
            </GlassCard>

            {/* ── Badge: Serving All Across NCR (bottom center) ── */}
            <GlassCard
              delay={0.82}
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#0F172A]">
                Serving All Across NCR
              </span>
            </GlassCard>

            {/* Decorative dots */}
            <div className="absolute top-10 right-6 flex flex-col gap-1.5 sm:gap-2 opacity-30 sm:opacity-40">
              {[...Array(3)].map((_, r) => (
                <div key={r} className="flex gap-1.5 sm:gap-2">
                  {[...Array(3)].map((_, c) => (
                    <div
                      key={c}
                      className="w-1.5 h-1.5 rounded-full bg-blue-300"
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <motion.div
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
          className="mt-14 sm:mt-16 lg:mt-20 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {[
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="1.8"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              ),
              bg: "bg-blue-50",
              value: "17,000+",
              label: "Happy Families",
              sub: "Across NCR",
            },
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="1.8"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              ),
              bg: "bg-green-50",
              value: "8,000+",
              label: "Verified Tutors",
              sub: "Background Checked",
            },
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M8 14l-4 7M16 14l4 7" />
                  <path d="M9 17l3 4 3-4" />
                </svg>
              ),
              bg: "bg-purple-50",
              value: "13+",
              label: "Years of Trust",
              sub: "Since 2011",
            },
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.8"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              bg: "bg-amber-50",
              value: "4.9/5",
              label: "Parent Rating",
              sub: "Based on 2,000+ reviews",
            },
          ].map(({ icon, bg, value, label, sub }) => (
            <div key={label} className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 ${bg} rounded-full flex items-center justify-center shrink-0`}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-[18px] sm:text-[21px] font-extrabold text-[#0F172A] leading-tight">
                  {value}
                </p>
                <p className="text-[12px] sm:text-[13px] font-semibold text-[#0F172A] leading-snug">
                  {label}
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#64748B] leading-snug truncate">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
