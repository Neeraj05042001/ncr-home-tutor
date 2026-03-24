// "use client";

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
// import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const STEPS = [
//   {
//     number: "01",
//     title: "Call or WhatsApp Us",
//     description:
//       "Tell us your child's class, subject, board, and preferred timings. Our team picks up fast — no bots, no forms, just a real conversation.",
//     duration: "Takes 2 minutes",
//     icon: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
//       </svg>
//     ),
//     color: "#3B82F6",
//     colorBg: "rgba(59,130,246,0.08)",
//     colorBorder: "rgba(59,130,246,0.2)",
//     bullets: [
//       "No registration fees",
//       "Available 7 days a week",
//       "Real person answers",
//     ],
//   },
//   {
//     number: "02",
//     title: "We Match the Right Tutor",
//     description:
//       "Within 24 hours we shortlist verified tutors near your location from our network of 8,000+. You get their profiles to review before committing.",
//     duration: "Within 24 hours",
//     icon: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="11" cy="11" r="8"/>
//         <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//         <line x1="11" y1="8" x2="11" y2="14"/>
//         <line x1="8" y1="11" x2="14" y2="11"/>
//       </svg>
//     ),
//     color: "#F6A623",
//     colorBg: "rgba(246,166,35,0.08)",
//     colorBorder: "rgba(246,166,35,0.2)",
//     bullets: [
//       "ID & qualification verified",
//       "Matched to your sector",
//       "Profile shared before visit",
//     ],
//   },
//   {
//     number: "03",
//     title: "Free Demo — Then Decide",
//     description:
//       "The tutor comes home for a free trial class. See the teaching style firsthand. Happy? Continue. Not happy? We replace — no cost, no questions.",
//     duration: "Zero commitment",
//     icon: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="20 6 9 17 4 12"/>
//       </svg>
//     ),
//     color: "#10B981",
//     colorBg: "rgba(16,185,129,0.08)",
//     colorBorder: "rgba(16,185,129,0.2)",
//     bullets: [
//       "No payment for demo",
//       "Free replacement if unhappy",
//       "You decide, not us",
//     ],
//   },
// ];

// // ─── Connector line between steps ─────────────────────────────────────────────

// function Connector({ inView, delay }: { inView: boolean; delay: number }) {
//   return (
//     // <div className="hidden lg:flex items-center flex-shrink-0 w-16 xl:w-24 relative">
//     <div className="hidden lg:flex items-center self-center flex-shrink-0 w-16 xl:w-24 relative mt-[-40px]">
//       {/* Track */}
//       <div className="w-full h-px bg-border-strong" />
//       {/* Animated fill */}
//       <motion.div
//         className="absolute left-0 top-0 h-px bg-saffron-400"
//         initial={{ width: "0%" }}
//         animate={inView ? { width: "100%" } : { width: "0%" }}
//         transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//       />
//       {/* Arrow head */}
//       <motion.div
//         className="absolute right-0 top-1/2 -translate-y-1/2"
//         initial={{ opacity: 0, x: -4 }}
//         animate={inView ? { opacity: 1, x: 0 } : {}}
//         transition={{ delay: delay + 0.6, duration: 0.3 }}
//       >
//         <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
//           <path d="M1 1l6 5-6 5" stroke="#F6A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </motion.div>
//     </div>
//   );
// }

// // ─── Step Card ────────────────────────────────────────────────────────────────

// function StepCard({
//   step,
//   index,
//   inView,
// }: {
//   step: typeof STEPS[0];
//   index: number;
//   inView: boolean;
// }) {
//   const isMiddle = index === 1;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         delay: index * 0.18,
//         duration: 0.65,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="flex-1 min-w-0 group"
//     >
//       <motion.div
//         whileHover={{ y: -8 }}
//         transition={{ type: "spring", stiffness: 300, damping: 24 }}
//         className={cn(
//           "relative h-full rounded-3xl p-7 xl:p-8 overflow-hidden",
//           "border transition-all duration-300",
//           isMiddle
//             ? "bg-navy-700 border-navy-600"
//             : "bg-white border-border hover:border-saffron-400/40"
//         )}
//         style={{
//           boxShadow: isMiddle
//             ? "0 24px 64px rgba(12,35,64,0.25)"
//             : "0 2px 16px rgba(12,35,64,0.06)",
//         }}
//         onMouseEnter={e => {
//           if (!isMiddle) {
//             (e.currentTarget as HTMLElement).style.boxShadow =
//               "0 16px 48px rgba(12,35,64,0.12)";
//           }
//         }}
//         onMouseLeave={e => {
//           if (!isMiddle) {
//             (e.currentTarget as HTMLElement).style.boxShadow =
//               "0 2px 16px rgba(12,35,64,0.06)";
//           }
//         }}
//       >
//         {/* Background glow for middle card */}
//         {isMiddle && (
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background:
//                 "radial-gradient(ellipse at 30% 0%, rgba(246,166,35,0.12) 0%, transparent 60%)",
//             }}
//           />
//         )}

//         {/* Top: number + icon */}
//         <div className="flex items-start justify-between mb-6">
//           {/* Step number */}
//           <span
//             className={cn(
//               "font-display font-black leading-none select-none",
//               isMiddle ? "text-white/10" : "text-navy-700/8"
//             )}
//             style={{ fontSize: "clamp(52px, 6vw, 72px)", lineHeight: 1 }}
//           >
//             {step.number}
//           </span>

//           {/* Icon bubble */}
//           <motion.div
//             whileHover={{ rotate: -12, scale: 1.12 }}
//             transition={{ type: "spring", stiffness: 400, damping: 18 }}
//             className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
//             style={{
//               background: step.colorBg,
//               border: `1px solid ${step.colorBorder}`,
//               color: step.color,
//             }}
//           >
//             {step.icon}
//           </motion.div>
//         </div>

//         {/* Duration badge */}
//         <div className="mb-4">
//           <span
//             className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full px-3 py-1"
//             style={{
//               background: step.colorBg,
//               color: step.color,
//               border: `1px solid ${step.colorBorder}`,
//             }}
//           >
//             <span
//               className="w-1.5 h-1.5 rounded-full animate-pulse"
//               style={{ background: step.color }}
//             />
//             {step.duration}
//           </span>
//         </div>

//         {/* Title */}
//         <h3
//           className={cn(
//             "font-display font-bold leading-tight mb-3",
//             isMiddle ? "text-white" : "text-navy-700"
//           )}
//           style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
//         >
//           {step.title}
//         </h3>

//         {/* Description */}
//         <p
//           className={cn(
//             "text-[15px] leading-relaxed mb-6",
//             isMiddle ? "text-white/60" : "text-ink-secondary"
//           )}
//         >
//           {step.description}
//         </p>

//         {/* Bullet list */}
//         <ul className="space-y-2.5">
//           {step.bullets.map((b, i) => (
//             <motion.li
//               key={i}
//               initial={{ opacity: 0, x: -10 }}
//               animate={inView ? { opacity: 1, x: 0 } : {}}
//               transition={{ delay: index * 0.18 + 0.4 + i * 0.08 }}
//               className="flex items-center gap-2.5"
//             >
//               <span
//                 className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
//                 style={{ background: step.colorBg }}
//               >
//                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="20 6 9 17 4 12"/>
//                 </svg>
//               </span>
//               <span
//                 className={cn(
//                   "text-[13.5px] font-semibold",
//                   isMiddle ? "text-white/75" : "text-ink-secondary"
//                 )}
//               >
//                 {b}
//               </span>
//             </motion.li>
//           ))}
//         </ul>

//         {/* Bottom accent line */}
//         <div
//           className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
//           }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────

// export default function HowItWorks() {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

//   return (
//     <section
//       id="how-it-works"
//       ref={ref}
//       aria-label="How NCR Home Tutor works"
//       className="relative bg-surface-3 section-pad overflow-hidden"
//     >
//       {/* Background dot grid */}
//       <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

//       {/* Subtle top gradient */}
//       <div
//         className="absolute top-0 inset-x-0 h-32 pointer-events-none"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(246,166,35,0.04) 0%, transparent 100%)",
//         }}
//       />

//       <div className="container-custom relative z-10">

//         {/* ── Section Header ── */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center justify-center gap-2 mb-4"
//           >
//             <span className="w-6 h-px bg-saffron-400" />
//             <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-500">
//               Simple 3-Step Process
//             </span>
//             <span className="w-6 h-px bg-saffron-400" />
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//             className="font-display font-bold text-navy-700 leading-tight tracking-tight mb-4"
//             style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
//           >
//             From First Call to First Class —{" "}
//             <span className="relative inline-block">
//               <em className="not-italic text-gradient-saffron">
//                 Usually in 24 Hours
//               </em>
//             </span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="text-ink-secondary text-[16px] leading-relaxed max-w-xl mx-auto"
//           >
//             No complicated onboarding. No long waits. Just tell us what your child needs
//             and we handle the rest.
//           </motion.p>
//         </div>

//         {/* ── Steps ── */}
//         <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 mb-16">
//           {STEPS.map((step, i) => (
//             <div key={i} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0 gap-0">
//               <StepCard step={step} index={i} inView={inView} />
//               {i < STEPS.length - 1 && (
//                 <Connector inView={inView} delay={i * 0.18 + 0.5} />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ── Bottom CTA strip ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           className="relative rounded-3xl overflow-hidden"
//           style={{
//             background: "linear-gradient(135deg, #0C2340 0%, #14345A 60%, #0A1B30 100%)",
//           }}
//         >
//           {/* Inner glow */}
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background:
//                 "radial-gradient(ellipse at 20% 50%, rgba(246,166,35,0.08) 0%, transparent 60%)",
//             }}
//           />
//           <div className="dot-grid-light absolute inset-0 opacity-30 pointer-events-none" />

//           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7">
//             <div>
//               <h3 className="font-display font-bold text-white text-xl mb-1">
//                 Ready to start? It takes 2 minutes.
//               </h3>
//               <p className="text-white/50 text-sm">
//                 Free demo · Verified tutor · No commitment
//               </p>
//             </div>
//             <div className="flex items-center gap-3 flex-shrink-0">
//               <motion.a
//                 href={`tel:${PHONE_RAW}`}
//                 whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(246,166,35,0.45)" }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center gap-2 bg-saffron-400 text-navy-700 font-bold rounded-full px-6 py-3.5 text-sm relative overflow-hidden"
//               >
//                 <span
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
//                     backgroundSize: "200% 100%",
//                     animation: "shimmer 2.5s linear infinite",
//                   }}
//                 />
//                 <PhoneIcon size={15} />
//                 <span className="relative z-10">Call Now</span>
//               </motion.a>
//               <motion.a
//                 href={WA_LINK("Hello, I want to book a free demo class for my child.")}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(37,211,102,0.4)" }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center gap-2 bg-whatsapp text-white font-bold rounded-full px-6 py-3.5 text-sm"
//               >
//                 <WhatsAppIcon size={15} />
//                 WhatsApp
//               </motion.a>
//             </div>
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Call or WhatsApp Us",
    description:
      "Tell us your child's class, subject, board, and preferred timings. Our team picks up fast — no bots, no forms, just a real conversation.",
    duration: "Takes 2 minutes",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
      </svg>
    ),
    color: "#3B82F6",
    colorBg: "rgba(59,130,246,0.08)",
    colorBorder: "rgba(59,130,246,0.2)",
    bullets: [
      "No registration fees",
      "Available 7 days a week",
      "Real person answers",
    ],
  },
  {
    number: "02",
    title: "We Match the Right Tutor",
    description:
      "Within 24 hours we shortlist verified tutors near you. We share their photo, qualifications, and experience for you to review — before anyone visits your home.",
    duration: "Within 24 hours",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
    color: "#F6A623",
    colorBg: "rgba(246,166,35,0.08)",
    colorBorder: "rgba(246,166,35,0.2)",
    bullets: [
      "ID & qualification verified",
      "Matched to your location",
      "Profile shared before visit",
    ],
  },
  {
    number: "03",
    title: "Free Demo — Then Decide",
    description:
      "The tutor comes home for a free trial class. See the teaching style firsthand. Happy? Continue. Not happy? We replace — no cost, no questions.",
    duration: "Zero commitment",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    color: "#10B981",
    colorBg: "rgba(16,185,129,0.08)",
    colorBorder: "rgba(16,185,129,0.2)",
    bullets: [
      "No payment for demo",
      "Free replacement if unhappy",
      "You decide, not us",
    ],
  },
];

// ─── Premium Connector ────────────────────────────────────────────────────────
// Arc path + perpetually looping dot — always animating when visible

function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  const PATH = "M 4 20 Q 50 4 96 20";
  const LOOP_DUR = "2.2s"; // dot completes one pass every 2.2s

  return (
    <div
      className="hidden lg:flex items-center self-center flex-shrink-0 w-20 xl:w-28 relative"
      style={{ height: 44 }}
    >
      <svg
        viewBox="0 0 100 44"
        fill="none"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for the filled arc */}
          <linearGradient id={`cg-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#F6A623" stopOpacity="0.25" />
            <stop offset="45%"  stopColor="#F6A623" stopOpacity="1"    />
            <stop offset="100%" stopColor="#E09010" stopOpacity="0.5"  />
          </linearGradient>
          {/* Glow filter for the dot */}
          <filter id={`gf-${delay}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ── 1. Ghost dashed track (always visible) ── */}
        <path
          d={PATH}
          stroke="rgba(12,35,64,0.1)"
          strokeWidth="1.5"
          strokeDasharray="3.5 3"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── 2. Saffron arc — draws in once on scroll, stays drawn ── */}
        <motion.path
          d={PATH}
          stroke={`url(#cg-${delay})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── 3. Arrowhead — appears once after path draws ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: delay + 0.85,
            duration: 0.35,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: "96px 20px" }}
        >
          <circle cx="96" cy="20" r="5.5" fill="rgba(246,166,35,0.18)" />
          <path
            d="M93 17.5l4 2.5-4 2.5"
            stroke="#F6A623"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>

        {/* ── 4. Perpetually looping glowing dot (pure SVG SMIL) ── */}
        {inView && (
          <>
            {/* Halo */}
            <circle r="7" fill="#F6A623" opacity="0">
              <animateMotion
                dur={LOOP_DUR}
                begin={`${delay + 0.9}s`}
                repeatCount="indefinite"
                path={PATH}
              />
              <animate
                attributeName="opacity"
                values="0;0.15;0.15;0"
                keyTimes="0;0.08;0.88;1"
                dur={LOOP_DUR}
                begin={`${delay + 0.9}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Core dot */}
            <circle r="3.5" fill="#F6A623" filter={`url(#gf-${delay})`} opacity="0">
              <animateMotion
                dur={LOOP_DUR}
                begin={`${delay + 0.9}s`}
                repeatCount="indefinite"
                path={PATH}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.08;0.88;1"
                dur={LOOP_DUR}
                begin={`${delay + 0.9}s`}
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  inView,
}: {
  step: typeof STEPS[0];
  index: number;
  inView: boolean;
}) {
  const isMiddle = index === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.18,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1 min-w-0 group"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cn(
          "relative h-full rounded-3xl p-7 xl:p-8 overflow-hidden",
          "border transition-all duration-300",
          isMiddle
            ? "bg-navy-700 border-navy-600"
            : "bg-white border-border hover:border-saffron-400/40"
        )}
        style={{
          boxShadow: isMiddle
            ? "0 24px 64px rgba(12,35,64,0.25)"
            : "0 2px 16px rgba(12,35,64,0.06)",
        }}
        onMouseEnter={e => {
          if (!isMiddle) {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 16px 48px rgba(12,35,64,0.12)";
          }
        }}
        onMouseLeave={e => {
          if (!isMiddle) {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 16px rgba(12,35,64,0.06)";
          }
        }}
      >
        {/* Background glow for middle card */}
        {isMiddle && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 0%, rgba(246,166,35,0.12) 0%, transparent 60%)",
            }}
          />
        )}

        {/* Top: number + icon */}
        <div className="flex items-start justify-between mb-6">
          {/* Step number */}
          <span
            className={cn(
              "font-display font-black leading-none select-none",
              isMiddle ? "text-white/10" : "text-navy-700/8"
            )}
            style={{ fontSize: "clamp(52px, 6vw, 72px)", lineHeight: 1 }}
          >
            {step.number}
          </span>

          {/* Icon bubble — animates on CARD hover via group-hover */}
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
              "transition-all duration-300 ease-out",
              "group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-lg"
            )}
            style={{
              background: step.colorBg,
              border: `1px solid ${step.colorBorder}`,
              color: step.color,
              boxShadow: "none",
            }}
          >
            <motion.span
              className="flex items-center justify-center"
              animate={{ rotate: [0, -8, 8, -6, 6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            >
              {step.icon}
            </motion.span>
          </div>
        </div>

        {/* Duration badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full px-3 py-1"
            style={{
              background: step.colorBg,
              color: step.color,
              border: `1px solid ${step.colorBorder}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: step.color }}
            />
            {step.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold leading-tight mb-3",
            isMiddle ? "text-white" : "text-navy-700"
          )}
          style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-[15px] leading-relaxed mb-6",
            isMiddle ? "text-white/60" : "text-ink-secondary"
          )}
        >
          {step.description}
        </p>

        {/* Bullet list */}
        <ul className="space-y-2.5">
          {step.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.18 + 0.4 + i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: step.colorBg }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span
                className={cn(
                  "text-[13.5px] font-semibold",
                  isMiddle ? "text-white/75" : "text-ink-secondary"
                )}
              >
                {b}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      aria-label="How NCR Home Tutor works"
      className="relative bg-surface-3 section-pad overflow-hidden"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Subtle top gradient */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(246,166,35,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-6 h-px bg-saffron-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-500">
              Simple 3-Step Process
            </span>
            <span className="w-6 h-px bg-saffron-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-navy-700 leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            From First Call to First Class —{" "}
            <span className="relative inline-block">
              <em className="not-italic text-gradient-saffron">
                Usually in 24 Hours
              </em>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-ink-secondary text-[16px] leading-relaxed max-w-xl mx-auto"
          >
            No complicated onboarding. No long waits. Just tell us what your child needs
            and we handle the rest.
          </motion.p>
        </div>

        {/* ── Steps ── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 mb-16">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0 gap-0">
              <StepCard step={step} index={i} inView={inView} />
              {i < STEPS.length - 1 && (
                <Connector inView={inView} delay={i * 0.18 + 0.5} />
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0C2340 0%, #14345A 60%, #0A1B30 100%)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, rgba(246,166,35,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="dot-grid-light absolute inset-0 opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7">
            <div>
              <h3 className="font-display font-bold text-white text-xl mb-1">
                Ready to start? It takes 2 minutes.
              </h3>
              <p className="text-white/50 text-sm">
                Free demo · Verified tutor · No commitment
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.a
                href={`tel:${PHONE_RAW}`}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(246,166,35,0.45)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-2 bg-saffron-400 text-navy-700 font-bold rounded-full px-6 py-3.5 text-sm relative overflow-hidden"
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s linear infinite",
                  }}
                />
                <PhoneIcon size={15} />
                <span className="relative z-10">Call Now</span>
              </motion.a>
              <motion.a
                href={WA_LINK("Hello, I want to book a free demo class for my child.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(37,211,102,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-2 bg-whatsapp text-white font-bold rounded-full px-6 py-3.5 text-sm"
              >
                <WhatsAppIcon size={15} />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
  <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "56px", display: "block" }}>
    <path d="M0 56 L0 32 Q240 0 480 28 Q720 56 960 20 Q1200 0 1440 30 L1440 56 Z" fill="#0C2340" />
  </svg>
</div>
    </section>
  );
}