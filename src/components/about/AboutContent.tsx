// "use client";

// import { useRef, useEffect, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// // ─────────────────────────────────────────────────────────────────────────────
// // DATA
// // ─────────────────────────────────────────────────────────────────────────────

// const TIMELINE = [
//   {
//     year: "2011",
//     title: "The Beginning",
//     description:
//       "NCR Home Tutor was founded in Greater Noida with a single mission — make it easy for families to find honest, qualified home tutors without the hassle of unverified references or inflated fees.",
//     icon: "🌱",
//     side: "left",
//   },
//   {
//     year: "2013",
//     title: "First 500 Tutors",
//     description:
//       "Within two years, the tutor network crossed 500 registered and evaluated tutors — covering every major sector of Greater Noida and expanding into Noida.",
//     icon: "📈",
//     side: "right",
//   },
//   {
//     year: "2016",
//     title: "Full NCR Coverage",
//     description:
//       "Expanded coverage to Ghaziabad, Delhi, and Gurgaon — making NCR Home Tutor a truly region-wide service connecting families across the entire National Capital Region.",
//     icon: "🗺️",
//     side: "left",
//   },
//   {
//     year: "2019",
//     title: "10,000 Families Served",
//     description:
//       "A milestone worth celebrating — 10,000 student families matched with the right tutor. The free demo class and free replacement guarantee became the foundation of our trust.",
//     icon: "🎯",
//     side: "right",
//   },
//   {
//     year: "2021",
//     title: "Online Tuition Added",
//     description:
//       "Launched online tutoring to serve students across India. The same verified, quality-checked tutors — now accessible from anywhere, for any board, any class.",
//     icon: "💻",
//     side: "left",
//   },
//   {
//     year: "2024",
//     title: "8,000+ Tutors. 17,000+ Families.",
//     description:
//       "Today, NCR Home Tutor is Greater Noida's most trusted tuition bureau — with 8,000+ verified tutors, 17,000+ happy student families, and a reputation built entirely on results.",
//     icon: "🏆",
//     side: "right",
//   },
// ];

// const WHY_US = [
//   {
//     icon: "🛡️",
//     title: "Background-Verified Tutors",
//     description:
//       "Every tutor goes through identity verification and a teaching evaluation before being added to our network. Your child's safety is non-negotiable.",
//   },
//   {
//     icon: "⚡",
//     title: "Matched in 24 Hours",
//     description:
//       "No waiting lists. We understand urgency. Qualified tutors are available across every part of Greater Noida — and we move fast.",
//   },
//   {
//     icon: "📊",
//     title: "Result-Oriented Teaching",
//     description:
//       "Our tutors focus on concept clarity and exam readiness — not just syllabus coverage. We track progress and hold ourselves accountable.",
//   },
//   {
//     icon: "📚",
//     title: "All Boards Covered",
//     description:
//       "CBSE, ICSE, UP Board, and IGCSE. Subject experts for every curriculum, every class from Nursery to Graduation.",
//   },
//   {
//     icon: "💰",
//     title: "Affordable & Transparent",
//     description:
//       "Clear, upfront fee structure with zero hidden charges. We work within your budget to find the best possible tutor match.",
//   },
//   {
//     icon: "🔄",
//     title: "Free Replacement Guarantee",
//     description:
//       "Not happy with the tutor? We replace them free of charge, no questions asked. Your child's comfort is everything to us.",
//   },
// ];

// const AREAS = [
//   "Alpha 1 & 2", "Beta 1 & 2", "Gamma", "Delta", "Omega", "Zeta",
//   "Sector Pi-1 & Pi-2", "Chi & Mu", "Gaur City", "Noida Extension",
//   "Pari Chowk", "Knowledge Park", "Techzone 4", "Surajpur",
//   "Kasna", "Sector 93 Noida", "Sector 137 Noida", "Delhi NCR",
//   "Ghaziabad", "Gurgaon",
// ];

// const STATS = [
//   { target: 13,    suffix: "+", label: "Years of Trust",   icon: "🏆", desc: "Founded 2011" },
//   { target: 17000, suffix: "+", label: "Happy Families",   icon: "👨‍👩‍👦", desc: "Across Delhi NCR" },
//   { target: 8000,  suffix: "+", label: "Verified Tutors",  icon: "🛡️", desc: "Background checked" },
//   { target: 100,   suffix: "%", label: "Free Demo Class",  icon: "🎁", desc: "Zero commitment" },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // COUNT UP HOOK
// // ─────────────────────────────────────────────────────────────────────────────

// function useCountUp(target: number, duration = 2000, delay = 0) {
//   const [count, setCount] = useState(0);
//   const ref      = useRef<HTMLDivElement>(null);
//   const inView   = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
//   const started  = useRef(false);

//   useEffect(() => {
//     if (!inView || started.current) return;
//     started.current = true;
//     const startAt  = performance.now() + delay;
//     const ease     = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
//     const tick     = (now: number) => {
//       const elapsed  = Math.max(0, now - startAt);
//       const progress = Math.min(elapsed / duration, 1);
//       setCount(Math.floor(ease(progress) * target));
//       if (progress < 1) requestAnimationFrame(tick);
//       else setCount(target);
//     };
//     requestAnimationFrame(tick);
//   }, [inView, target, duration, delay]);

//   return { count, ref };
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // FADE-IN WRAPPER
// // ─────────────────────────────────────────────────────────────────────────────

// function FadeUp({
//   children,
//   delay = 0,
//   className = "",
// }: {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
// }) {
//   const ref    = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 32 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 1 — HERO
// // ─────────────────────────────────────────────────────────────────────────────

// function HeroSection() {
//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{
//         background: "linear-gradient(155deg, #040D15 0%, #0C2340 45%, #1D5290 100%)",
//         minHeight: "clamp(460px, 60vh, 640px)",
//       }}
//     >
//       {/* Dot grid */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
//           backgroundSize: "28px 28px",
//         }}
//       />

//       {/* Giant year watermark */}
//       <div
//         className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
//         aria-hidden="true"
//       >
//         <span
//           className="font-display font-bold text-white/[0.03] leading-none"
//           style={{ fontSize: "clamp(140px, 22vw, 320px)", letterSpacing: "-0.04em" }}
//         >
//           2011
//         </span>
//       </div>

//       {/* Saffron glow orb */}
//       <div
//         className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
//         style={{ background: "radial-gradient(circle, rgba(246,166,35,0.10) 0%, transparent 65%)" }}
//       />
//       <div
//         className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
//         style={{ background: "radial-gradient(circle, rgba(29,82,144,0.4) 0%, transparent 70%)" }}
//       />

//       <div className="container-custom section-pad-sm relative z-10">
//         <div className="max-w-3xl">
//           {/* Eyebrow */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-4 py-1.5 mb-6 backdrop-blur-sm"
//           >
//             <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse shrink-0" />
//             <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">
//               Our Story
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="font-display font-bold text-white mb-5"
//             style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)", lineHeight: 1.1 }}
//           >
//             Trusted by Greater Noida{" "}
//             <br className="hidden sm:block" />
//             <span className="text-gradient-saffron">Since 2011</span>
//           </motion.h1>

//           {/* Sub */}
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//             className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl"
//           >
//             We started with a simple belief — every child deserves access to a
//             qualified, honest, and caring home tutor. Thirteen years later, that
//             belief still drives everything we do.
//           </motion.p>

//           {/* Quick stat pills */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35, duration: 0.6 }}
//             className="flex flex-wrap gap-3"
//           >
//             {[
//               { icon: "🏆", val: "13+", label: "Years" },
//               { icon: "👨‍👩‍👦", val: "17,000+", label: "Families" },
//               { icon: "🛡️", val: "8,000+", label: "Tutors" },
//             ].map(({ icon, val, label }) => (
//               <div
//                 key={label}
//                 className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-2xl px-4 py-2.5 backdrop-blur-sm"
//               >
//                 <span className="text-xl">{icon}</span>
//                 <div>
//                   <p className="font-display font-bold text-white text-lg leading-none">{val}</p>
//                   <p className="text-white/55 text-xs font-semibold mt-0.5">{label}</p>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Wave → white */}
//       <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0, marginTop: "-1px" }}>
//         <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
//           style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
//           <path d="M0 25 Q360 70 720 42 Q1080 14 1440 58 L1440 70 L0 70 Z" fill="#FFFFFF" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 2 — MISSION & VISION
// // ─────────────────────────────────────────────────────────────────────────────

// function MissionSection() {
//   return (
//     <section className="bg-white section-pad-sm">
//       <div className="container-custom">
//         <FadeUp className="text-center mb-12">
//           <span className="section-eyebrow section-eyebrow-center">What Drives Us</span>
//           <h2
//             className="font-display font-bold text-navy-700 mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
//           >
//             Our Mission &amp; Vision
//           </h2>
//         </FadeUp>

//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Mission */}
//           <FadeUp delay={0.1}>
//             <div
//               className="relative rounded-3xl p-8 h-full overflow-hidden"
//               style={{
//                 background: "linear-gradient(135deg, #0C2340 0%, #1D5290 100%)",
//                 boxShadow: "var(--shadow-pop)",
//               }}
//             >
//               {/* Decorative quote mark */}
//               <span
//                 className="absolute -top-4 -left-2 font-display font-bold text-white/[0.06] leading-none select-none pointer-events-none"
//                 style={{ fontSize: "160px" }}
//                 aria-hidden="true"
//               >
//                 "
//               </span>

//               {/* Dot grid overlay */}
//               <div
//                 className="absolute inset-0 pointer-events-none rounded-3xl dot-grid-light opacity-60"
//               />

//               <div className="relative z-10">
//                 <div className="inline-flex items-center gap-2 bg-saffron-400/20 border border-saffron-400/30 rounded-full px-3.5 py-1.5 mb-5">
//                   <span className="text-base">🎯</span>
//                   <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">Our Mission</span>
//                 </div>

//                 <h3 className="font-display font-bold text-white text-2xl leading-snug mb-4">
//                   Make quality education accessible to every family in Delhi NCR.
//                 </h3>

//                 <p className="text-white/65 text-base leading-relaxed">
//                   We believe the right tutor can change a child's academic trajectory. Our mission
//                   is to remove every barrier between a family and that perfect tutor — be it trust,
//                   cost, time, or geography. We do the hard work so families don't have to.
//                 </p>
//               </div>
//             </div>
//           </FadeUp>

//           {/* Vision */}
//           <FadeUp delay={0.2}>
//             <div
//               className="relative rounded-3xl p-8 h-full overflow-hidden border"
//               style={{
//                 background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E8 100%)",
//                 borderColor: "rgba(246,166,35,0.25)",
//                 boxShadow: "0 8px 40px rgba(246,166,35,0.12)",
//               }}
//             >
//               {/* Decorative quote mark */}
//               <span
//                 className="absolute -top-4 -left-2 font-display font-bold text-saffron-400/[0.08] leading-none select-none pointer-events-none"
//                 style={{ fontSize: "160px" }}
//                 aria-hidden="true"
//               >
//                 "
//               </span>

//               <div className="relative z-10">
//                 <div className="inline-flex items-center gap-2 bg-saffron-400/20 border border-saffron-400/40 rounded-full px-3.5 py-1.5 mb-5">
//                   <span className="text-base">🌟</span>
//                   <span className="text-saffron-600 text-xs font-bold uppercase tracking-widest">Our Vision</span>
//                 </div>

//                 <h3 className="font-display font-bold text-navy-700 text-2xl leading-snug mb-4">
//                   To be the most trusted name in home education across India.
//                 </h3>

//                 <p className="text-ink-secondary text-base leading-relaxed">
//                   We envision a future where no child is left behind due to a lack of
//                   personalised attention. A future where verified, passionate tutors are available
//                   to every student — regardless of which city, board, or budget.
//                 </p>
//               </div>
//             </div>
//           </FadeUp>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 3 — JOURNEY TIMELINE (dark)
// // ─────────────────────────────────────────────────────────────────────────────

// function TimelineSection() {
//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{ background: "linear-gradient(180deg, #040D15 0%, #0C2340 100%)" }}
//     >
//       {/* Dot grid */}
//       <div
//         className="absolute inset-0 pointer-events-none dot-grid-light opacity-40"
//       />

//       {/* Saffron top glow */}
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
//         style={{ background: "radial-gradient(ellipse, rgba(246,166,35,0.08) 0%, transparent 70%)" }}
//       />

//       <div className="container-custom section-pad relative z-10">
//         <FadeUp className="text-center mb-16">
//           <span className="section-eyebrow section-eyebrow-center" style={{ color: "rgba(246,166,35,0.8)" }}>
//             Our Journey
//           </span>
//           <h2
//             className="font-display font-bold text-white mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
//           >
//             13 Years of Building{" "}
//             <span className="text-gradient-saffron">Trust</span>
//           </h2>
//           <p className="text-white/50 mt-3 max-w-xl mx-auto text-base">
//             From a small bureau in Greater Noida to Delhi NCR's most relied-upon home
//             tuition network — one family at a time.
//           </p>
//         </FadeUp>

//         {/* Timeline */}
//         <div className="relative max-w-3xl mx-auto">
//           {/* Centre vertical line */}
//           <div
//             className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
//             style={{ background: "linear-gradient(to bottom, transparent, rgba(246,166,35,0.4) 10%, rgba(246,166,35,0.4) 90%, transparent)" }}
//           />

//           <div className="space-y-10">
//             {TIMELINE.map((item, i) => {
//               const isLeft = item.side === "left";
//               return (
//                 <FadeUp key={item.year} delay={i * 0.08}>
//                   <div className={`flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>

//                     {/* Card */}
//                     <div className="flex-1">
//                       <div
//                         className="card-dark rounded-2xl p-6 h-full"
//                         style={{
//                           background: "rgba(255,255,255,0.05)",
//                           border: "1px solid rgba(255,255,255,0.09)",
//                           backdropFilter: "blur(12px)",
//                         }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <span className="text-2xl">{item.icon}</span>
//                           <span
//                             className="font-display font-bold text-saffron-400 text-sm tracking-widest uppercase"
//                           >
//                             {item.year}
//                           </span>
//                         </div>
//                         <h3 className="font-display font-bold text-white text-xl mb-2">
//                           {item.title}
//                         </h3>
//                         <p className="text-white/55 text-sm leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Centre dot — hidden on mobile */}
//                     <div className="hidden md:flex shrink-0 flex-col items-center" style={{ width: "40px" }}>
//                       <div
//                         className="w-10 h-10 rounded-full border-2 border-saffron-400 flex items-center justify-center text-lg z-10"
//                         style={{
//                           background: "linear-gradient(135deg, #0C2340, #1D5290)",
//                           boxShadow: "0 0 20px rgba(246,166,35,0.35)",
//                         }}
//                       >
//                         {item.icon}
//                       </div>
//                     </div>

//                     {/* Spacer for alternating layout */}
//                     <div className="flex-1 hidden md:block" />
//                   </div>
//                 </FadeUp>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Wave → saffron surface */}
//       <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
//         <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
//           style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
//           <path d="M0 20 Q360 70 720 38 Q1080 10 1440 55 L1440 70 L0 70 Z" fill="#F4F6FA" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 4 — STATS COUNT-UP
// // ─────────────────────────────────────────────────────────────────────────────

// function StatCard({
//   target, suffix, label, icon, desc, delay,
// }: {
//   target: number; suffix: string; label: string;
//   icon: string; desc: string; delay: number;
// }) {
//   const { count, ref } = useCountUp(target, 2000, delay * 1000);
//   const formatted = count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24, scale: 0.9 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true, margin: "0px 0px -60px 0px" }}
//       transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
//       whileHover={{ y: -6, transition: { duration: 0.25 } }}
//       className="group cursor-default"
//     >
//       <div
//         className="relative overflow-hidden rounded-2xl p-6 text-center h-full"
//         style={{
//           background: "rgba(255,255,255,0.07)",
//           border: "1px solid rgba(255,255,255,0.1)",
//           backdropFilter: "blur(12px)",
//           transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
//         }}
//         onMouseEnter={(e) => {
//           const el = e.currentTarget;
//           el.style.borderColor = "rgba(246,166,35,0.5)";
//           el.style.boxShadow = "0 8px 32px rgba(246,166,35,0.2)";
//           el.style.background = "rgba(246,166,35,0.1)";
//         }}
//         onMouseLeave={(e) => {
//           const el = e.currentTarget;
//           el.style.borderColor = "rgba(255,255,255,0.1)";
//           el.style.boxShadow = "none";
//           el.style.background = "rgba(255,255,255,0.07)";
//         }}
//       >
//         <div className="text-4xl mb-3">{icon}</div>
//         <div className="flex items-baseline justify-center gap-0.5 mb-1">
//           <span
//             className="font-display font-bold text-white tabular-nums"
//             style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
//           >
//             {formatted}
//           </span>
//           <span className="font-display font-bold text-saffron-400 text-2xl">{suffix}</span>
//         </div>
//         <p className="font-bold text-white/80 text-sm mb-1">{label}</p>
//         <p className="text-white/35 text-xs uppercase tracking-widest group-hover:text-saffron-400/70 transition-colors duration-300">
//           {desc}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// function StatsSection() {
//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{ background: "linear-gradient(135deg, #0C2340 0%, #1D5290 60%, #14345A 100%)" }}
//     >
//       <div
//         className="absolute inset-0 pointer-events-none dot-grid-light opacity-30"
//       />
//       <div
//         className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
//         style={{ background: "radial-gradient(circle, rgba(246,166,35,0.1) 0%, transparent 65%)" }}
//       />

//       <div className="container-custom section-pad-sm relative z-10">
//         <FadeUp className="text-center mb-12">
//           <span className="section-eyebrow section-eyebrow-center" style={{ color: "rgba(246,166,35,0.8)" }}>
//             By The Numbers
//           </span>
//           <h2
//             className="font-display font-bold text-white mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
//           >
//             Numbers That Tell{" "}
//             <span className="text-gradient-saffron">Our Story</span>
//           </h2>
//         </FadeUp>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {STATS.map((stat, i) => (
//             <StatCard key={stat.label} {...stat} delay={i * 0.12} />
//           ))}
//         </div>
//       </div>

//       {/* Wave → surface-3 */}
//       <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
//         <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
//           style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
//           <path d="M0 20 Q360 70 720 38 Q1080 10 1440 55 L1440 70 L0 70 Z" fill="#F4F6FA" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 5 — WHAT MAKES US DIFFERENT
// // ─────────────────────────────────────────────────────────────────────────────

// function WhyUsSection() {
//   return (
//     <section className="bg-surface-3 section-pad">
//       <div className="container-custom">
//         <FadeUp className="text-center mb-14">
//           <span className="section-eyebrow section-eyebrow-center">Why Choose Us</span>
//           <h2
//             className="font-display font-bold text-navy-700 mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
//           >
//             What Makes Us{" "}
//             <span className="text-gradient-saffron">Different</span>
//           </h2>
//           <p className="text-ink-secondary mt-3 max-w-xl mx-auto">
//             Thousands of tutoring options exist. Here's why 17,000+ families chose us.
//           </p>
//         </FadeUp>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {WHY_US.map((item, i) => (
//             <FadeUp key={item.title} delay={i * 0.07}>
//               <div
//                 className="card rounded-2xl p-6 h-full group"
//                 style={{ background: "#FFFFFF" }}
//               >
//                 {/* Icon bubble */}
//                 <div
//                   className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
//                   style={{
//                     background: "linear-gradient(135deg, #EEF2F8, #D5E0EE)",
//                   }}
//                 >
//                   {item.icon}
//                 </div>

//                 <h3 className="font-display font-bold text-navy-700 text-lg mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-ink-secondary text-sm leading-relaxed">
//                   {item.description}
//                 </p>

//                 {/* Bottom accent line on hover */}
//                 <div
//                   className="mt-4 h-0.5 w-0 group-hover:w-12 rounded-full transition-all duration-500"
//                   style={{ background: "var(--color-saffron-400)" }}
//                 />
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 6 — AREAS WE SERVE
// // ─────────────────────────────────────────────────────────────────────────────

// function AreasSection() {
//   return (
//     <section className="bg-white section-pad-sm">
//       <div className="container-custom">
//         <FadeUp className="text-center mb-10">
//           <span className="section-eyebrow section-eyebrow-center">Coverage</span>
//           <h2
//             className="font-display font-bold text-navy-700 mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
//           >
//             Areas We Serve
//           </h2>
//           <p className="text-ink-secondary mt-3 max-w-lg mx-auto text-sm">
//             From Gaur City to South Delhi — verified tutors available across every corner of Delhi NCR.
//           </p>
//         </FadeUp>

//         <FadeUp delay={0.1}>
//           <div className="flex flex-wrap justify-center gap-3">
//             {AREAS.map((area, i) => (
//               <motion.span
//                 key={area}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.03, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
//                 whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
//                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border cursor-default"
//                 style={{
//                   background: i % 3 === 0
//                     ? "linear-gradient(135deg, #EEF2F8, #D5E0EE)"
//                     : i % 3 === 1
//                     ? "linear-gradient(135deg, #FFFBF0, #FDF0D5)"
//                     : "#F4F6FA",
//                   borderColor: i % 3 === 0
//                     ? "rgba(29,82,144,0.2)"
//                     : i % 3 === 1
//                     ? "rgba(246,166,35,0.3)"
//                     : "rgba(12,35,64,0.08)",
//                   color: i % 3 === 0 ? "#0C2340" : i % 3 === 1 ? "#B87000" : "#4A5568",
//                 }}
//               >
//                 <span
//                   className="w-1.5 h-1.5 rounded-full shrink-0"
//                   style={{
//                     background: i % 3 === 0
//                       ? "#1D5290"
//                       : i % 3 === 1
//                       ? "#F6A623"
//                       : "#718096",
//                   }}
//                 />
//                 {area}
//               </motion.span>
//             ))}
//           </div>
//         </FadeUp>

//         {/* Expanding coverage note */}
//         <FadeUp delay={0.2}>
//           <p className="text-center text-xs text-ink-muted mt-6 flex items-center justify-center gap-1.5">
//             <span className="w-3 h-3 rounded-full bg-green-400 inline-block animate-pulse" />
//             Don't see your area? Call us — we're constantly expanding.
//           </p>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 7 — FOUNDER
// // ─────────────────────────────────────────────────────────────────────────────

// function FounderSection() {
//   return (
//     <section className="bg-surface-3 section-pad-sm">
//       <div className="container-custom">
//         <FadeUp className="text-center mb-10">
//           <span className="section-eyebrow section-eyebrow-center">Leadership</span>
//           <h2
//             className="font-display font-bold text-navy-700 mt-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
//           >
//             Meet the Founder
//           </h2>
//         </FadeUp>

//         <FadeUp delay={0.1}>
//           <div className="max-w-lg mx-auto">
//             <div
//               className="rounded-3xl overflow-hidden"
//               style={{
//                 background: "linear-gradient(135deg, #0C2340 0%, #1D5290 100%)",
//                 boxShadow: "var(--shadow-pop)",
//               }}
//             >
//               {/* Saffron top bar */}
//               <div
//                 className="h-1.5"
//                 style={{ background: "linear-gradient(90deg, #F6A623, #FBDFA0, #E09010)" }}
//               />

//               <div className="p-8 text-center relative overflow-hidden">
//                 {/* Dot grid */}
//                 <div className="absolute inset-0 pointer-events-none dot-grid-light opacity-30" />

//                 {/* Logo circle */}
//                 <div className="relative z-10">
//                   <div
//                     className="w-24 h-24 rounded-2xl mx-auto mb-5 flex items-center justify-center overflow-hidden"
//                     style={{
//                       background: "rgba(255,255,255,0.12)",
//                       border: "2px solid rgba(246,166,35,0.4)",
//                       boxShadow: "0 8px 32px rgba(246,166,35,0.25)",
//                     }}
//                   >
//                     <Image
//                       src="/logo.png"
//                       alt="NCR Home Tutor Logo"
//                       width={80}
//                       height={80}
//                       className="object-contain p-2"
//                     />
//                   </div>

//                   {/* Name + title */}
//                   <h3 className="font-display font-bold text-white text-2xl mb-1">
//                     Vikas Dixit
//                   </h3>
//                   <p className="text-saffron-300 text-sm font-bold uppercase tracking-widest mb-5">
//                     Founder &amp; Director
//                   </p>

//                   {/* Divider */}
//                   <div
//                     className="w-12 h-0.5 mx-auto mb-5 rounded-full"
//                     style={{ background: "linear-gradient(90deg, transparent, #F6A623, transparent)" }}
//                   />

//                   {/* Quote */}
//                   <blockquote className="text-white/70 text-base leading-relaxed italic mb-6">
//                     "We built NCR Home Tutor on one promise — if we send a tutor to
//                     your home, we stand behind that tutor completely. That promise
//                     hasn't changed in 13 years."
//                   </blockquote>

//                   {/* Credential badges */}
//                   <div className="flex flex-wrap justify-center gap-2">
//                     {[
//                       "Since 2011",
//                       "Greater Noida",
//                       "17,000+ Families Served",
//                     ].map((badge) => (
//                       <span
//                         key={badge}
//                         className="px-3 py-1 rounded-full text-xs font-semibold"
//                         style={{
//                           background: "rgba(246,166,35,0.15)",
//                           border: "1px solid rgba(246,166,35,0.3)",
//                           color: "rgba(246,166,35,0.9)",
//                         }}
//                       >
//                         {badge}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SECTION 8 — CTA
// // ─────────────────────────────────────────────────────────────────────────────

// function CTASection() {
//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{ background: "linear-gradient(135deg, #F6A623 0%, #E09010 100%)" }}
//     >
//       {/* Subtle pattern */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
//           backgroundSize: "24px 24px",
//         }}
//       />

//       <div className="container-custom section-pad-sm relative z-10">
//         <FadeUp className="text-center">
//           <h2
//             className="font-display font-bold text-white mb-3"
//             style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
//           >
//             Ready to Find the Perfect Tutor?
//           </h2>
//           <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
//             Join 17,000+ families who trust NCR Home Tutor. First demo class is
//             completely free — no commitment, no pressure.
//           </p>

//           <div className="flex flex-wrap items-center justify-center gap-4">
//             {/* Find tutor */}
//             <Link
//               href="/inquiry"
//               className="inline-flex items-center gap-2.5 bg-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:bg-navy-50 active:scale-95"
//               style={{ color: "#0C2340", boxShadow: "0 8px 28px rgba(12,35,64,0.2)" }}
//             >
//               🎓 Find a Tutor — It&apos;s Free
//             </Link>

//             {/* Join as tutor */}
//             <Link
//               href="/tutor-registration"
//               className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-base border-2 border-white/40 text-white transition-all duration-200 hover:bg-white/15 active:scale-95"
//             >
//               ✏️ Join as a Tutor
//             </Link>
//           </div>

//           {/* Trust micro-copy */}
//           <p className="text-white/60 text-sm mt-6 flex items-center justify-center gap-4 flex-wrap">
//             <span>✅ Free demo class</span>
//             <span>⚡ Matched in 24 hours</span>
//             <span>🔄 Free replacement guarantee</span>
//           </p>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // ROOT EXPORT
// // ─────────────────────────────────────────────────────────────────────────────

// export default function AboutContent() {
//   return (
//     <>
//       <HeroSection />
//       <MissionSection />
//       <TimelineSection />
//       <StatsSection />
//       <WhyUsSection />
//       <AreasSection />
//       <FounderSection />
//       <CTASection />
//     </>
//   );
// }


"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Users,
  ShieldCheck,
  Gift,
  Target,
  Star,
  MapPin,
  Quote,
  CheckCircle2,
  Zap,
  RefreshCw,
  BookOpen,
  Wallet,
  ArrowRight,
  Clock,
  TrendingUp,
  Sprout,
  Globe,
  Laptop,
  Medal,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "2011",
    title: "The Beginning",
    description:
      "Founded in Greater Noida with one mission — make it easy for families to find honest, qualified home tutors without unverified references or inflated fees.",
    icon: Sprout,
    side: "left",
  },
  {
    year: "2013",
    title: "First 500 Tutors",
    description:
      "Within two years, our network crossed 500 registered and evaluated tutors — covering every major sector of Greater Noida and expanding into Noida.",
    icon: TrendingUp,
    side: "right",
  },
  {
    year: "2016",
    title: "Full NCR Coverage",
    description:
      "Expanded to Ghaziabad, Delhi, and Gurgaon — becoming a truly region-wide service connecting families across the entire National Capital Region.",
    icon: Globe,
    side: "left",
  },
  {
    year: "2019",
    title: "10,000 Families Served",
    description:
      "A milestone worth celebrating — 10,000 student families matched with the right tutor. The free demo class and free replacement guarantee became cornerstones of our trust.",
    icon: Medal,
    side: "right",
  },
  {
    year: "2021",
    title: "Online Tuition Launched",
    description:
      "Launched online tutoring to serve students across India. The same verified, quality-checked tutors — now accessible from anywhere, for any board, any class.",
    icon: Laptop,
    side: "left",
  },
  {
    year: "2024",
    title: "8,000+ Tutors. 17,000+ Families.",
    description:
      "Today, NCR Home Tutor is Greater Noida's most trusted tuition bureau — with 8,000+ verified tutors, 17,000+ happy student families, and a reputation built entirely on results.",
    icon: Trophy,
    side: "right",
  },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Background-Verified Tutors",
    description:
      "Every tutor undergoes identity verification and a teaching evaluation before being added to our network. Your child's safety is non-negotiable.",
    accent: "#1D5290",
    bg: "linear-gradient(135deg, #EEF2F8, #D5E0EE)",
  },
  {
    icon: Zap,
    title: "Matched in 24 Hours",
    description:
      "No waiting lists. Qualified tutors are available across every part of Greater Noida — and we move fast when a family needs help.",
    accent: "#F6A623",
    bg: "linear-gradient(135deg, #FFFBF0, #FDF0D5)",
  },
  {
    icon: TrendingUp,
    title: "Result-Oriented Teaching",
    description:
      "Our tutors focus on concept clarity and exam readiness — not just syllabus coverage. We track progress and hold ourselves accountable.",
    accent: "#0C2340",
    bg: "linear-gradient(135deg, #F0F4FA, #E4ECF6)",
  },
  {
    icon: BookOpen,
    title: "All Boards Covered",
    description:
      "CBSE, ICSE, UP Board, and IGCSE. Subject experts for every curriculum, every class from Nursery to Graduation.",
    accent: "#1D5290",
    bg: "linear-gradient(135deg, #EEF2F8, #D5E0EE)",
  },
  {
    icon: Wallet,
    title: "Affordable & Transparent",
    description:
      "Clear, upfront fee structure with zero hidden charges. We work within your budget to find the best possible tutor match.",
    accent: "#F6A623",
    bg: "linear-gradient(135deg, #FFFBF0, #FDF0D5)",
  },
  {
    icon: RefreshCw,
    title: "Free Replacement Guarantee",
    description:
      "Not happy with the tutor? We replace them free of charge, no questions asked. Your child's comfort is everything to us.",
    accent: "#0C2340",
    bg: "linear-gradient(135deg, #F0F4FA, #E4ECF6)",
  },
];

const AREA_GROUPS = [
  {
    region: "Greater Noida",
    areas: ["Alpha 1 & 2", "Beta 1 & 2", "Gamma", "Delta", "Omega", "Zeta", "Sector Pi-1 & Pi-2", "Chi & Mu", "Gaur City", "Pari Chowk", "Knowledge Park", "Techzone 4", "Surajpur", "Kasna", "Noida Extension"],
  },
  {
    region: "Noida",
    areas: ["Sector 93", "Sector 137", "Sector 62", "Sector 18", "Sector 50", "Sector 78"],
  },
  {
    region: "Wider NCR",
    areas: ["Delhi", "Ghaziabad", "Gurgaon", "Faridabad", "Indirapuram"],
  },
];

const STATS = [
  { target: 13,    suffix: "+", label: "Years of Trust",   icon: Trophy,      desc: "Founded 2011",        accentColor: "#F6A623" },
  { target: 17000, suffix: "+", label: "Happy Families",   icon: Users,       desc: "Across Delhi NCR",    accentColor: "#1D5290" },
  { target: 8000,  suffix: "+", label: "Verified Tutors",  icon: ShieldCheck, desc: "Background checked",  accentColor: "#0C2340" },
  { target: 100,   suffix: "%", label: "Free Demo Class",  icon: Gift,        desc: "Zero commitment",     accentColor: "#F6A623" },
];

// ─────────────────────────────────────────────────────────────────────────────
// COUNT UP HOOK
// ─────────────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startAt = performance.now() + delay;
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startAt);
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, delay]);

  return { count, ref };
}

// ─────────────────────────────────────────────────────────────────────────────
// FADE-UP WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #040D15 0%, #0C2340 45%, #1D5290 100%)",
        minHeight: "clamp(480px, 62vh, 660px)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Giant year watermark */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-white/[0.035] leading-none"
          style={{ fontSize: "clamp(120px, 20vw, 300px)", letterSpacing: "-0.04em" }}
        >
          2011
        </span>
      </div>

      {/* Glows */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(246,166,35,0.10) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,82,144,0.4) 0%, transparent 70%)" }}
      />

      {/* Animated orbital ring */}
      <motion.div
        className="absolute right-[-8%] top-[-15%] w-[480px] h-[480px] rounded-full border border-white/[0.04] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-4%] top-[-8%] w-[360px] h-[360px] rounded-full border border-saffron-400/[0.07] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-custom section-pad-sm relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-4 py-1.5 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse shrink-0" />
            <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">
              Our Story
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)", lineHeight: 1.1 }}
          >
            Trusted by Greater Noida{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-saffron">Since 2011</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl"
          >
            We started with a simple belief — every child deserves access to a
            qualified, honest, and caring home tutor. Thirteen years later, that
            belief still drives everything we do.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { Icon: Trophy, val: "13+", label: "Years" },
              { Icon: Users, val: "17,000+", label: "Families" },
              { Icon: ShieldCheck, val: "8,000+", label: "Tutors" },
            ].map(({ Icon, val, label }) => (
              <motion.div
                key={label}
                className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-2xl px-4 py-2.5 backdrop-blur-sm"
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={18} className="text-saffron-400 shrink-0" />
                <div>
                  <p className="font-display font-bold text-white text-lg leading-none">{val}</p>
                  <p className="text-white/55 text-xs font-semibold mt-0.5">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave */}
      <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0, marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
          <path d="M0 25 Q360 70 720 42 Q1080 14 1440 58 L1440 70 L0 70 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — MISSION & VISION
// ─────────────────────────────────────────────────────────────────────────────

function MissionSection() {
  return (
    <section className="bg-white section-pad-sm">
      <div className="container-custom">
        <FadeUp className="text-center mb-12">
          <span className="section-eyebrow section-eyebrow-center">What Drives Us</span>
          <h2
            className="font-display font-bold text-navy-700 mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Our Mission &amp; Vision
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <FadeUp delay={0.1}>
            <motion.div
              className="relative rounded-3xl p-8 h-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0C2340 0%, #1D5290 100%)",
                boxShadow: "var(--shadow-pop)",
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Decorative large quote */}
              <div className="absolute -top-2 -left-1 pointer-events-none select-none" aria-hidden>
                <Quote
                  size={120}
                  strokeWidth={0.5}
                  className="text-white/[0.05]"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-saffron-400/20 border border-saffron-400/30 rounded-full px-3.5 py-1.5 mb-5">
                  <Target size={13} className="text-saffron-300" />
                  <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">Our Mission</span>
                </div>

                <h3 className="font-display font-bold text-white text-2xl leading-snug mb-4">
                  Make quality education accessible to every family in Delhi NCR.
                </h3>

                <p className="text-white/65 text-base leading-relaxed">
                  We believe the right tutor can change a child&apos;s academic trajectory. Our
                  mission is to remove every barrier between a family and that perfect tutor — be
                  it trust, cost, time, or geography.
                </p>

                {/* Trust points */}
                <div className="mt-6 space-y-2">
                  {["Verified before placement", "No hidden fees", "Response within 2 hours"].map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-saffron-400 shrink-0" />
                      <span className="text-white/70 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Vision */}
          <FadeUp delay={0.2}>
            <motion.div
              className="relative rounded-3xl p-8 h-full overflow-hidden border"
              style={{
                background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E8 100%)",
                borderColor: "rgba(246,166,35,0.25)",
                boxShadow: "0 8px 40px rgba(246,166,35,0.12)",
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute -top-2 -left-1 pointer-events-none select-none" aria-hidden>
                <Quote
                  size={120}
                  strokeWidth={0.5}
                  className="text-saffron-400/10"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-saffron-400/20 border border-saffron-400/40 rounded-full px-3.5 py-1.5 mb-5">
                  <Star size={13} className="text-saffron-600" fill="currentColor" />
                  <span className="text-saffron-600 text-xs font-bold uppercase tracking-widest">Our Vision</span>
                </div>

                <h3 className="font-display font-bold text-navy-700 text-2xl leading-snug mb-4">
                  To be the most trusted name in home education across India.
                </h3>

                <p className="text-ink-secondary text-base leading-relaxed">
                  We envision a future where no child is left behind due to a lack of personalised
                  attention — where verified, passionate tutors are available to every student,
                  regardless of city, board, or budget.
                </p>

                <div className="mt-6 space-y-2">
                  {["Pan-India tutor network", "Every board & curriculum", "Online and in-home options"].map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle2 size={14} style={{ color: "#B87000" }} className="shrink-0" />
                      <span className="text-ink-secondary text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040D15 0%, #0C2340 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(246,166,35,0.07) 0%, transparent 70%)" }}
      />

      <div className="container-custom section-pad relative z-10">
        <FadeUp className="text-center mb-16">
          <span className="section-eyebrow section-eyebrow-center" style={{ color: "rgba(246,166,35,0.8)" }}>
            Our Journey
          </span>
          <h2
            className="font-display font-bold text-white mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            13 Years of Building{" "}
            <span className="text-gradient-saffron">Trust</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto text-base">
            From a small bureau in Greater Noida to Delhi NCR&apos;s most relied-upon home tuition network.
          </p>
        </FadeUp>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Centre line — desktop only */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(246,166,35,0.35) 8%, rgba(246,166,35,0.35) 92%, transparent 100%)",
            }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => {
              const isLeft = item.side === "left";
              const Icon = item.icon;
              return (
                <FadeUp key={item.year} delay={i * 0.08}>
                  {/* Mobile: simple stack */}
                  <div className="md:hidden flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #0C2340, #1D5290)",
                          border: "2px solid rgba(246,166,35,0.5)",
                          boxShadow: "0 0 16px rgba(246,166,35,0.25)",
                        }}
                      >
                        <Icon size={16} className="text-saffron-400" />
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 min-h-[2rem]" style={{ background: "rgba(246,166,35,0.25)" }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <span className="font-display font-bold text-saffron-400 text-sm tracking-widest uppercase">
                        {item.year}
                      </span>
                      <h3 className="font-display font-bold text-white text-lg mt-0.5 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Desktop: alternating */}
                  <div className={`hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-0`}>
                    {/* Left slot */}
                    <div className={isLeft ? "pr-8" : ""}>
                      {isLeft ? (
                        <TimelineCard item={item} align="right" />
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="flex justify-center">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #0C2340, #1D5290)",
                          border: "2px solid rgba(246,166,35,0.5)",
                          boxShadow: "0 0 24px rgba(246,166,35,0.3)",
                        }}
                        whileHover={{ scale: 1.15, boxShadow: "0 0 32px rgba(246,166,35,0.5)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={18} className="text-saffron-400" />
                      </motion.div>
                    </div>

                    {/* Right slot */}
                    <div className={!isLeft ? "pl-8" : ""}>
                      {!isLeft ? (
                        <TimelineCard item={item} align="left" />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
          <path d="M0 20 Q360 70 720 38 Q1080 10 1440 55 L1440 70 L0 70 Z" fill="#F4F6FA" />
        </svg>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: (typeof TIMELINE)[0];
  align: "left" | "right";
}) {
  return (
    <motion.div
      className="rounded-2xl p-6 group"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(246,166,35,0.3)",
        y: -4,
        boxShadow: "0 8px 32px rgba(246,166,35,0.12)",
      }}
      transition={{ duration: 0.25 }}
    >
      <span
        className="font-display font-bold text-saffron-400 text-xs tracking-widest uppercase mb-2 block"
      >
        {item.year}
      </span>
      <h3 className="font-display font-bold text-white text-xl mb-2">{item.title}</h3>
      <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — STATS
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({
  target,
  suffix,
  label,
  icon: Icon,
  desc,
  accentColor,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  desc: string;
  accentColor: string;
  delay: number;
}) {
  const { count, ref } = useCountUp(target, 2000, delay * 1000);
  const formatted = count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ delay, duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-center h-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${accentColor}60`;
          el.style.boxShadow = `0 8px 40px ${accentColor}25`;
          el.style.background = "rgba(255,255,255,0.09)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.08)";
          el.style.boxShadow = "none";
          el.style.background = "rgba(255,255,255,0.06)";
        }}
      >
        {/* Icon box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
        >
          <Icon size={22} style={{ color: accentColor }} />
        </div>

        {/* Number */}
        <div className="flex items-baseline justify-center gap-0.5 mb-1">
          <span
            className="font-display font-bold text-white tabular-nums"
            style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
          >
            {formatted}
          </span>
          <span
            className="font-display font-bold text-2xl"
            style={{ color: accentColor }}
          >
            {suffix}
          </span>
        </div>

        <p className="font-bold text-white/85 text-sm mb-1">{label}</p>
        <p
          className="text-xs uppercase tracking-widest transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C2340 0%, #1D5290 60%, #14345A 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(246,166,35,0.1) 0%, transparent 65%)" }}
      />

      <div className="container-custom section-pad-sm relative z-10">
        <FadeUp className="text-center mb-12">
          <span className="section-eyebrow section-eyebrow-center" style={{ color: "rgba(246,166,35,0.8)" }}>
            By The Numbers
          </span>
          <h2
            className="font-display font-bold text-white mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Numbers That Tell{" "}
            <span className="text-gradient-saffron">Our Story</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "clamp(36px, 5vw, 70px)", display: "block" }}>
          <path d="M0 20 Q360 70 720 38 Q1080 10 1440 55 L1440 70 L0 70 Z" fill="#F4F6FA" />
        </svg>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — WHAT MAKES US DIFFERENT
// ─────────────────────────────────────────────────────────────────────────────

function WhyUsSection() {
  return (
    <section className="bg-surface-3 section-pad">
      <div className="container-custom">
        <FadeUp className="text-center mb-14">
          <span className="section-eyebrow section-eyebrow-center">Why Choose Us</span>
          <h2
            className="font-display font-bold text-navy-700 mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            What Makes Us{" "}
            <span className="text-gradient-saffron">Different</span>
          </h2>
          <p className="text-ink-secondary mt-3 max-w-xl mx-auto">
            Thousands of tutoring options exist. Here&apos;s why 17,000+ families chose us.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={i * 0.07}>
                <motion.div
                  className="bg-white rounded-2xl p-6 h-full group cursor-default"
                  style={{
                    border: "1.5px solid rgba(29,82,144,0.08)",
                    boxShadow: "var(--shadow-card)",
                  }}
                  whileHover={{
                    y: -5,
                    borderColor: `${item.accent}30`,
                    boxShadow: `0 12px 40px ${item.accent}15`,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Icon bubble */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: item.bg }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon size={22} style={{ color: item.accent }} />
                  </motion.div>

                  <h3 className="font-display font-bold text-navy-700 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expanding bottom line */}
                  <div
                    className="mt-5 h-0.5 w-0 group-hover:w-10 rounded-full transition-all duration-500"
                    style={{ background: item.accent }}
                  />
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — AREAS WE SERVE
// ─────────────────────────────────────────────────────────────────────────────

function AreasSection() {
  return (
    <section className="bg-white section-pad-sm">
      <div className="container-custom">
        <FadeUp className="text-center mb-10">
          <span className="section-eyebrow section-eyebrow-center">Coverage</span>
          <h2
            className="font-display font-bold text-navy-700 mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Areas We Serve
          </h2>
          <p className="text-ink-secondary mt-3 max-w-lg mx-auto text-sm">
            Verified tutors available across every corner of Delhi NCR — in-home and online.
          </p>
        </FadeUp>

        <div className="space-y-6 max-w-4xl mx-auto">
          {AREA_GROUPS.map((group, gi) => (
            <FadeUp key={group.region} delay={gi * 0.08}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: gi === 0
                    ? "linear-gradient(135deg, #EEF2F8, #F4F7FB)"
                    : gi === 1
                    ? "linear-gradient(135deg, #FFFBF0, #FFF5DF)"
                    : "#F8FAFD",
                  border: `1.5px solid ${gi === 0 ? "rgba(29,82,144,0.12)" : gi === 1 ? "rgba(246,166,35,0.2)" : "rgba(12,35,64,0.06)"}`,
                }}
              >
                {/* Region header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      background: gi === 0 ? "#1D5290" : gi === 1 ? "#F6A623" : "#4A5568",
                    }}
                  >
                    <MapPin size={14} className="text-white" />
                  </div>
                  <span
                    className="font-display font-bold text-sm"
                    style={{ color: gi === 0 ? "#0C2340" : gi === 1 ? "#B87000" : "#374151" }}
                  >
                    {group.region}
                  </span>
                </div>

                {/* Areas */}
                <div className="flex flex-wrap gap-2">
                  {group.areas.map((area, ai) => (
                    <motion.span
                      key={area}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + ai * 0.025, duration: 0.35, ease: [0.34, 1.4, 0.64, 1] }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        border: `1px solid ${gi === 0 ? "rgba(29,82,144,0.15)" : gi === 1 ? "rgba(246,166,35,0.2)" : "rgba(12,35,64,0.08)"}`,
                        color: gi === 0 ? "#1D5290" : gi === 1 ? "#B87000" : "#4A5568",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: gi === 0 ? "#1D5290" : gi === 1 ? "#F6A623" : "#718096" }}
                      />
                      {area}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.25}>
          <p className="text-center text-xs text-ink-muted mt-6 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Don&apos;t see your area? Call us — we&apos;re constantly expanding.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — FOUNDER
// ─────────────────────────────────────────────────────────────────────────────

function FounderSection() {
  return (
    <section className="bg-surface-3 section-pad-sm">
      <div className="container-custom">
        <FadeUp className="text-center mb-10">
          <span className="section-eyebrow section-eyebrow-center">Leadership</span>
          <h2
            className="font-display font-bold text-navy-700 mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Meet the Founder
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, #040D15 0%, #0C2340 55%, #1D5290 100%)",
                boxShadow: "var(--shadow-pop)",
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Saffron top bar */}
              <div
                className="h-1"
                style={{ background: "linear-gradient(90deg, #F6A623, #FBDFA0, #E09010)" }}
              />

              <div className="p-8 md:p-10 relative overflow-hidden">
                {/* Dot grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Large decorative quote mark */}
                <div className="absolute top-6 right-8 pointer-events-none select-none" aria-hidden>
                  <Quote size={80} strokeWidth={0.75} className="text-white/[0.06]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                  {/* Left: identity */}
                  <div className="shrink-0 text-center md:text-left">
                    {/* Monogram avatar */}
                    <div
                      className="w-20 h-20 rounded-2xl mx-auto md:mx-0 flex items-center justify-center mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(246,166,35,0.15), rgba(246,166,35,0.08))",
                        border: "1.5px solid rgba(246,166,35,0.35)",
                        boxShadow: "0 8px 32px rgba(246,166,35,0.2)",
                      }}
                    >
                      <span
                        className="font-display font-bold text-saffron-400"
                        style={{ fontSize: "2rem" }}
                      >
                        VD
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-xl mb-0.5">
                      Vikas Dixit
                    </h3>
                    <p className="text-saffron-400 text-xs font-bold uppercase tracking-widest mb-4">
                      Founder &amp; Director
                    </p>

                    {/* Badges */}
                    <div className="flex flex-col gap-1.5 items-center md:items-start">
                      {["Since 2011", "Greater Noida"].map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(246,166,35,0.12)",
                            border: "1px solid rgba(246,166,35,0.25)",
                            color: "rgba(246,166,35,0.85)",
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: quote */}
                  <div className="flex-1">
                    {/* Divider on mobile */}
                    <div
                      className="w-full h-px mb-6 md:hidden"
                      style={{ background: "rgba(246,166,35,0.2)" }}
                    />

                    {/* Vertical left border on desktop */}
                    <div className="md:pl-8 md:border-l md:border-saffron-400/20">
                      <blockquote
                        className="font-display text-white/80 text-lg leading-relaxed italic mb-6"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                      >
                        &ldquo;We built NCR Home Tutor on one promise — if we send a tutor
                        to your home, we stand behind that tutor completely. That promise
                        hasn&apos;t changed in 13 years.&rdquo;
                      </blockquote>

                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { val: "13+", label: "Years" },
                          { val: "17K+", label: "Families" },
                          { val: "8K+", label: "Tutors" },
                        ].map(({ val, label }) => (
                          <div key={label} className="text-center">
                            <p className="font-display font-bold text-white text-xl leading-none">{val}</p>
                            <p className="text-white/40 text-xs mt-1">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — CTA
// ─────────────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F6A623 0%, #E09010 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Light orb */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
      />

      <div className="container-custom section-pad-sm relative z-10">
        <FadeUp className="text-center">
          <h2
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Ready to Find the Perfect Tutor?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Join 17,000+ families who trust NCR Home Tutor. First demo class is
            completely free — no commitment, no pressure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2.5 bg-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:bg-navy-50"
                style={{
                  color: "#0C2340",
                  boxShadow: "0 8px 28px rgba(12,35,64,0.2)",
                }}
              >
                Find a Tutor — It&apos;s Free
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/tutor-registration"
                className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-base border-2 border-white/40 text-white transition-all duration-200 hover:bg-white/15"
              >
                Join as a Tutor
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-6 flex-wrap">
            {[
              { Icon: Gift, text: "Free demo class" },
              { Icon: Zap, text: "Matched in 24 hours" },
              { Icon: RefreshCw, text: "Free replacement guarantee" },
            ].map(({ Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-white/65 text-sm font-semibold"
              >
                <Icon size={14} className="text-white/80" />
                {text}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <StatsSection />
      <WhyUsSection />
      <AreasSection />
      <FounderSection />
      <CTASection />
    </>
  );
}