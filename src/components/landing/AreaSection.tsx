


// "use client";

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";

// // ─── Data ─────────────────────────────────────────────────────────────────────
// // size: "xl" | "lg" | "md" | "sm" — encodes demand/popularity
// // zone color groups: blue=west, purple=central, green=south, amber=north, pink=east

// const AREAS = [
//   // High demand — xl
//   { name: "Gaur City",            zone: "west",    size: "xl", popular: true  },
//   { name: "Noida Extension",      zone: "west",    size: "xl", popular: true  },
//   // Strong demand — lg
//   { name: "Alpha 1 & 2",          zone: "central", size: "lg", popular: true  },
//   { name: "Pari Chowk",           zone: "central", size: "lg", popular: true  },
//   { name: "Techzone",             zone: "west",    size: "lg", popular: true  },
//   // Good demand — md
//   { name: "Beta 1 & 2",           zone: "central", size: "md", popular: false },
//   { name: "Knowledge Park 1/2/3", zone: "south",   size: "md", popular: false },
//   { name: "Gamma 1 & 2",          zone: "central", size: "md", popular: false },
//   { name: "Delta 1 & 2",          zone: "central", size: "md", popular: false },
//   { name: "Sector Pi-1 / Pi-2",   zone: "central", size: "md", popular: false },
//   { name: "Sector 93",            zone: "north",   size: "md", popular: false },
//   { name: "Omega",                zone: "south",   size: "md", popular: false },
//   // Smaller — sm
//   { name: "Zeta 1 & 2",           zone: "south",   size: "sm", popular: false },
//   { name: "Sector 137",           zone: "north",   size: "sm", popular: false },
//   { name: "Chi 1 & 2",            zone: "south",   size: "sm", popular: false },
//   { name: "Swarna Nagri",         zone: "east",    size: "sm", popular: false },
//   { name: "Phi",                  zone: "south",   size: "sm", popular: false },
//   { name: "Surajpur",             zone: "east",    size: "sm", popular: false },
//   { name: "Mu",                   zone: "central", size: "sm", popular: false },
//   { name: "Eta",                  zone: "central", size: "sm", popular: false },
//   { name: "Sector 1 & 2",         zone: "north",   size: "sm", popular: false },
//   { name: "Sector 4 & 10",        zone: "north",   size: "sm", popular: false },
// ] as const;

// const ZONE_STYLES = {
//   west:    { color: "#93C5FD", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)",  glow: "rgba(59,130,246,0.35)"  },
//   central: { color: "#C4B5FD", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.35)", glow: "rgba(139,92,246,0.35)" },
//   south:   { color: "#6EE7B7", bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.35)",  glow: "rgba(16,185,129,0.35)"  },
//   north:   { color: "#FCD34D", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.35)",  glow: "rgba(245,158,11,0.35)"  },
//   east:    { color: "#F9A8D4", bg: "rgba(236,72,153,0.15)",  border: "rgba(236,72,153,0.35)",  glow: "rgba(236,72,153,0.35)"  },
// };

// const SIZE_STYLES = {
//   xl: { fontSize: "15px",   px: "18px", py: "9px"  },
//   lg: { fontSize: "13.5px", px: "16px", py: "8px"  },
//   md: { fontSize: "12.5px", px: "14px", py: "7px"  },
//   sm: { fontSize: "11px",   px: "12px", py: "6px"  },
// };

// const LEGEND = [
//   { zone: "west",    label: "West",    dot: "#3B82F6" },
//   { zone: "central", label: "Central", dot: "#8B5CF6" },
//   { zone: "south",   label: "South",   dot: "#10B981" },
//   { zone: "north",   label: "North",   dot: "#F59E0B" },
//   { zone: "east",    label: "East",    dot: "#EC4899" },
// ];

// // ─── Single Tag ───────────────────────────────────────────────────────────────

// function AreaTag({
//   area,
//   index,
//   inView,
// }: {
//   area: typeof AREAS[number];
//   index: number;
//   inView: boolean;
// }) {
//   const style = ZONE_STYLES[area.zone];
//   const size  = SIZE_STYLES[area.size];

//   return (
//    <motion.div
//   initial={{ opacity: 0, scale: 0.75, y: 12 }}
//   animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
//   transition={{
//     delay: index * 0.04,
//     duration: 0.45,
//     ease: [0.34, 1.56, 0.64, 1] as const,
//     type: "spring",
//     stiffness: 400,
//     damping: 20,
//   }}
//   whileHover={{ scale: 1.1, y: -4 }}
//   whileTap={{ scale: 0.96 }}
//   className="relative inline-flex items-center gap-2 cursor-default select-none flex-shrink-0"
//   style={{
//     background: style.bg,
//     border: `1px solid ${style.border}`,
//     borderRadius: "999px",
//     padding: `${size.py} ${size.px}`,
//     boxShadow: `0 2px 12px ${style.bg}`,
//   }}
// >
//       {/* Popular pulsing dot */}
//       {area.popular && (
//         <span className="relative flex-shrink-0 w-2 h-2">
//           <span
//             className="absolute inset-0 rounded-full animate-ping opacity-70"
//             style={{ background: "#F6A623" }}
//           />
//           <span
//             className="relative block w-2 h-2 rounded-full"
//             style={{ background: "#F6A623" }}
//           />
//         </span>
//       )}

//       {/* Name */}
//       <span
//         className="font-bold whitespace-nowrap leading-none"
//         style={{ fontSize: size.fontSize, color: style.color }}
//       >
//         {area.name}
//       </span>
//     </motion.div>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────

// export default function AreasSection() {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

//   return (
//     <section
//       id="areas"
//       ref={ref}
//       aria-label="Areas covered in Greater Noida"
//       className="relative bg-navy-700 section-pad overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 dot-grid-light opacity-20 pointer-events-none" />
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse, rgba(246,166,35,0.07) 0%, transparent 65%)",
//         }}
//       />

//       <div className="container-custom relative z-10">

//         {/* ── Header ── */}
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 mb-4"
//             >
//               <span className="w-6 h-px bg-saffron-400" />
//               <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-400">
//                 Greater Noida Coverage
//               </span>
//             </motion.div>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//               className="font-display font-bold text-white leading-tight tracking-tight"
//               style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
//             >
//               Tutors Available{" "}
//               <em className="not-italic text-gradient-saffron">Near You</em>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="text-white/55 text-[16px] leading-relaxed mt-3 max-w-lg"
//             >
//               Every major sector across Greater Noida covered. Scan for your area —
//               larger tags mean higher tutor availability.
//             </motion.p>
//           </div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="flex items-center gap-3 flex-wrap flex-shrink-0"
//           >
//             {[
//               { value: `${AREAS.length}+`, label: "Areas"      },
//               { value: "8,000+",           label: "Tutors"     },
//               { value: "24 hrs",           label: "Avg. Match" },
//             ].map(({ value, label }, i) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, scale: 0.88 }}
//                 animate={inView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
//                 className="text-center px-5 py-4 rounded-2xl"
//                 style={{
//                   background: "rgba(255,255,255,0.06)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   minWidth: "88px",
//                 }}
//               >
//                 <div
//                   className="font-display font-black text-white leading-none mb-1"
//                   style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}
//                 >
//                   {value}
//                 </div>
//                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
//                   {label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* ── Tag Cloud ── */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ delay: 0.25, duration: 0.5 }}
//           className="relative rounded-3xl p-7 sm:p-10"
//           style={{
//             background: "rgba(255,255,255,0.03)",
//             border: "1px solid rgba(255,255,255,0.07)",
//             boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
//           }}
//         >
//           {/* Ambient inner glow */}
//           <div
//             className="absolute inset-0 rounded-3xl pointer-events-none"
//             style={{
//               background:
//                 "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.06) 0%, transparent 65%)",
//             }}
//           />

//           <div className="relative z-10 flex flex-wrap gap-3 items-center justify-start">
//             {AREAS.map((area, i) => (
//               <AreaTag key={area.name} area={area} index={i} inView={inView} />
//             ))}
//           </div>
//         </motion.div>

//         {/* ── Legend ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.9, duration: 0.5 }}
//           className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
//         >
//           <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
//             Legend:
//           </span>

//           {LEGEND.map(({ zone, label, dot }) => (
//             <div key={zone} className="flex items-center gap-2">
//               <span
//                 className="w-2.5 h-2.5 rounded-full flex-shrink-0"
//                 style={{ background: dot }}
//               />
//               <span className="text-[11.5px] font-semibold text-white/40">
//                 {label} Zone
//               </span>
//             </div>
//           ))}

//           {/* Demand hint */}
//           <div className="flex items-center gap-2 ml-auto">
//             <span className="flex items-center gap-1">
//               <span className="inline-block rounded-full px-2 py-0.5 text-[8px] font-bold bg-white/10 text-white/40">Large</span>
//               <span className="text-white/20 text-xs">→</span>
//               <span className="inline-block rounded-full px-1.5 py-0.5 text-[7px] font-bold bg-white/5 text-white/25">Small</span>
//             </span>
//             <span className="text-[11px] text-white/30 font-medium">= demand level</span>
//           </div>

//           {/* Popular indicator */}
//           <div className="flex items-center gap-2">
//             <span className="relative flex w-2 h-2">
//               <span
//                 className="absolute inset-0 rounded-full animate-ping opacity-70"
//                 style={{ background: "#F6A623" }}
//               />
//               <span
//                 className="relative block w-2 h-2 rounded-full"
//                 style={{ background: "#F6A623" }}
//               />
//             </span>
//             <span className="text-[11.5px] font-semibold text-white/40">
//               High demand area
//             </span>
//           </div>
//         </motion.div>

//         {/* ── CTA strip ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.7, duration: 0.6 }}
//           className="mt-10 rounded-3xl overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(246,166,35,0.12) 0%, rgba(246,166,35,0.04) 100%)",
//             border: "1px solid rgba(246,166,35,0.2)",
//           }}
//         >
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-8 py-6">
//             <div className="flex items-center gap-4 text-center sm:text-left">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
//                 style={{ background: "rgba(246,166,35,0.15)" }}
//               >
//                 📍
//               </div>
//               <div>
//                 <h3 className="font-display font-bold text-white text-[17px] mb-0.5">
//                   Don't see your area?
//                 </h3>
//                 <p className="text-white/50 text-sm">
//                   We likely cover it — call us to confirm availability near you.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
//               <motion.a
//                 href={`tel:${PHONE_RAW}`}
//                 whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(246,166,35,0.45)" }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3 relative overflow-hidden"
//                 style={{ background: "#F6A623", color: "#0C2340" }}
//               >
//                 <span
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     background:
//                       "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
//                     backgroundSize: "200% 100%",
//                     animation: "shimmer 2.5s linear infinite",
//                   }}
//                 />
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
//                 </svg>
//                 <span className="relative z-10">Call to Confirm</span>
//               </motion.a>

//               <motion.a
//                 href={WA_LINK("Hi, I want to check if you have tutors available in my area in Greater Noida.")}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3"
//                 style={{
//                   background: "rgba(37,211,102,0.15)",
//                   color: "#25D366",
//                   border: "1px solid rgba(37,211,102,0.3)",
//                 }}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
//                   <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
//                 </svg>
//                 WhatsApp
//               </motion.a>
//             </div>
//           </div>
//         </motion.div>

//       </div>
//       <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
//   <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)" }} />
// </div>
//     </section>
//   );
// }


// "use client";

// import { useRef, useState } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { PHONE_RAW, WA_LINK } from "@/lib/utils";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type Size = "xl" | "lg" | "md" | "sm";

// interface Area {
//   name: string;
//   size: Size;
//   popular: boolean;
// }

// interface City {
//   id: string;
//   name: string;
//   shortName?: string;
//   color: string;
//   bg: string;
//   border: string;
//   glow: string;
//   areas: Area[];
// }

// // ─── City & Area Data ─────────────────────────────────────────────────────────

// const CITIES: City[] = [
//   {
//     id: "delhi",
//     name: "Delhi",
//     color: "#FCA5A5",
//     bg: "rgba(239,68,68,0.12)",
//     border: "rgba(239,68,68,0.28)",
//     glow: "rgba(239,68,68,0.18)",
//     areas: [
//       { name: "Dwarka",         size: "xl", popular: true  },
//       { name: "Rohini",         size: "xl", popular: true  },
//       { name: "Janakpuri",      size: "lg", popular: true  },
//       { name: "Saket",          size: "lg", popular: false },
//       { name: "Vasant Kunj",    size: "lg", popular: false },
//       { name: "Pitampura",      size: "md", popular: false },
//       { name: "Laxmi Nagar",    size: "md", popular: false },
//       { name: "Preet Vihar",    size: "md", popular: false },
//       { name: "Mayur Vihar",    size: "md", popular: false },
//       { name: "Uttam Nagar",    size: "sm", popular: false },
//       { name: "Paschim Vihar",  size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "noida",
//     name: "Noida",
//     color: "#93C5FD",
//     bg: "rgba(59,130,246,0.12)",
//     border: "rgba(59,130,246,0.28)",
//     glow: "rgba(59,130,246,0.18)",
//     areas: [
//       { name: "Sector 62",   size: "xl", popular: true  },
//       { name: "Sector 18",   size: "xl", popular: true  },
//       { name: "Sector 137",  size: "lg", popular: true  },
//       { name: "Sector 150",  size: "lg", popular: false },
//       { name: "Sector 44",   size: "lg", popular: false },
//       { name: "Sector 100",  size: "md", popular: false },
//       { name: "Sector 76",   size: "md", popular: false },
//       { name: "Sector 168",  size: "md", popular: false },
//       { name: "Sector 93A",  size: "sm", popular: false },
//       { name: "Sector 128",  size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "noida-extension",
//     name: "Noida Extension",
//     shortName: "Noida Ext.",
//     color: "#86EFAC",
//     bg: "rgba(34,197,94,0.12)",
//     border: "rgba(34,197,94,0.28)",
//     glow: "rgba(34,197,94,0.18)",
//     areas: [
//       { name: "Gaur City 1",       size: "xl", popular: true  },
//       { name: "Gaur City 2",       size: "xl", popular: true  },
//       { name: "Crossing Republik", size: "lg", popular: true  },
//       { name: "Raj Nagar Ext.",    size: "lg", popular: false },
//       { name: "Govindpuram",       size: "md", popular: false },
//       { name: "Arthala",           size: "md", popular: false },
//       { name: "Tronica City",      size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "greater-noida",
//     name: "Greater Noida",
//     shortName: "Gr. Noida",
//     color: "#C4B5FD",
//     bg: "rgba(139,92,246,0.12)",
//     border: "rgba(139,92,246,0.28)",
//     glow: "rgba(139,92,246,0.18)",
//     areas: [
//       { name: "Alpha 1 & 2",    size: "xl", popular: true  },
//       { name: "Pari Chowk",     size: "xl", popular: true  },
//       { name: "Beta 1 & 2",     size: "lg", popular: false },
//       { name: "Knowledge Park", size: "lg", popular: false },
//       { name: "Gamma 1 & 2",    size: "md", popular: false },
//       { name: "Delta 1 & 2",    size: "md", popular: false },
//       { name: "Omega",          size: "md", popular: false },
//       { name: "Zeta 1 & 2",     size: "sm", popular: false },
//       { name: "Chi 1 & 2",      size: "sm", popular: false },
//       { name: "Sector Pi-1/2",  size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "greater-noida-west",
//     name: "Greater Noida West",
//     shortName: "GN West",
//     color: "#FDE68A",
//     bg: "rgba(245,158,11,0.12)",
//     border: "rgba(245,158,11,0.28)",
//     glow: "rgba(245,158,11,0.18)",
//     areas: [
//       { name: "Techzone IV",  size: "xl", popular: true  },
//       { name: "Sector 16B",   size: "lg", popular: true  },
//       { name: "Sector 10",    size: "lg", popular: false },
//       { name: "NRI City",     size: "md", popular: false },
//       { name: "Ecotech",      size: "md", popular: false },
//       { name: "Sector 1",     size: "sm", popular: false },
//       { name: "Sector 3",     size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "ghaziabad",
//     name: "Ghaziabad",
//     color: "#FDBA74",
//     bg: "rgba(249,115,22,0.12)",
//     border: "rgba(249,115,22,0.28)",
//     glow: "rgba(249,115,22,0.18)",
//     areas: [
//       { name: "Indirapuram",       size: "xl", popular: true  },
//       { name: "Vaishali",          size: "xl", popular: true  },
//       { name: "Vasundhara",        size: "lg", popular: true  },
//       { name: "Kaushambi",         size: "lg", popular: false },
//       { name: "Raj Nagar",         size: "md", popular: false },
//       { name: "Shalimar Garden",   size: "md", popular: false },
//       { name: "Mohan Nagar",       size: "sm", popular: false },
//       { name: "Crossings Republik",size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "gurugram",
//     name: "Gurugram",
//     color: "#67E8F9",
//     bg: "rgba(6,182,212,0.12)",
//     border: "rgba(6,182,212,0.28)",
//     glow: "rgba(6,182,212,0.18)",
//     areas: [
//       { name: "DLF Cyber City",   size: "xl", popular: true  },
//       { name: "Sohna Road",       size: "xl", popular: true  },
//       { name: "Golf Course Rd",   size: "lg", popular: true  },
//       { name: "MG Road",          size: "lg", popular: false },
//       { name: "Sector 14",        size: "md", popular: false },
//       { name: "Sector 56",        size: "md", popular: false },
//       { name: "Manesar",          size: "sm", popular: false },
//       { name: "South City",       size: "sm", popular: false },
//     ],
//   },
//   {
//     id: "faridabad",
//     name: "Faridabad",
//     color: "#F9A8D4",
//     bg: "rgba(236,72,153,0.12)",
//     border: "rgba(236,72,153,0.28)",
//     glow: "rgba(236,72,153,0.18)",
//     areas: [
//       { name: "Sector 15",     size: "xl", popular: true  },
//       { name: "NIT Faridabad", size: "xl", popular: true  },
//       { name: "Neharpar",      size: "lg", popular: false },
//       { name: "Ballabhgarh",   size: "lg", popular: false },
//       { name: "Sector 21",     size: "md", popular: false },
//       { name: "Old Faridabad", size: "sm", popular: false },
//       { name: "Sector 46",     size: "sm", popular: false },
//     ],
//   },
// ];

// const SIZE_STYLES: Record<Size, { fontSize: string; px: string; py: string }> = {
//   xl: { fontSize: "15px",   px: "18px", py: "9px"  },
//   lg: { fontSize: "13.5px", px: "16px", py: "8px"  },
//   md: { fontSize: "12.5px", px: "14px", py: "7px"  },
//   sm: { fontSize: "11px",   px: "12px", py: "6px"  },
// };

// const TOTAL_AREAS = CITIES.reduce((acc, c) => acc + c.areas.length, 0);

// // ─── Area Tag ─────────────────────────────────────────────────────────────────

// function AreaTag({
//   area,
//   city,
//   index,
// }: {
//   area: Area;
//   city: City;
//   index: number;
// }) {
//   const size = SIZE_STYLES[area.size];
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.72, y: 16 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.72, y: -10 }}
//       transition={{
//         delay: index * 0.038,
//         duration: 0.42,
//         type: "spring",
//         stiffness: 380,
//         damping: 22,
//       }}
//       whileHover={{ scale: 1.1, y: -4 }}
//       whileTap={{ scale: 0.95 }}
//       className="relative inline-flex items-center gap-2 cursor-default select-none flex-shrink-0"
//       style={{
//         background: city.bg,
//         border: `1px solid ${city.border}`,
//         borderRadius: "999px",
//         padding: `${size.py} ${size.px}`,
//         boxShadow: `0 2px 14px ${city.glow}`,
//       }}
//     >
//       {/* High-demand pulse dot */}
//       {area.popular && (
//         <span className="relative flex-shrink-0 w-2 h-2">
//           <span
//             className="absolute inset-0 rounded-full animate-ping opacity-70"
//             style={{ background: "#F6A623" }}
//           />
//           <span
//             className="relative block w-2 h-2 rounded-full"
//             style={{ background: "#F6A623" }}
//           />
//         </span>
//       )}

//       <span
//         className="font-bold whitespace-nowrap leading-none"
//         style={{ fontSize: size.fontSize, color: city.color }}
//       >
//         {area.name}
//       </span>
//     </motion.div>
//   );
// }

// // ─── City Tab ─────────────────────────────────────────────────────────────────

// function CityTab({
//   city,
//   isActive,
//   onClick,
//   index,
//   inView,
// }: {
//   city: City;
//   isActive: boolean;
//   onClick: () => void;
//   index: number;
//   inView: boolean;
// }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       initial={{ opacity: 0, y: 10 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay: 0.4 + index * 0.055, duration: 0.4 }}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors duration-300 outline-none focus-visible:ring-2 ring-offset-2 ring-offset-transparent"
//       style={{
//         background: isActive ? city.bg : "rgba(255,255,255,0.05)",
//         border: `1.5px solid ${isActive ? city.border : "rgba(255,255,255,0.08)"}`,
//         color: isActive ? city.color : "rgba(255,255,255,0.4)",
//         boxShadow: isActive ? `0 0 22px ${city.glow}` : "none",
//       }}
//     >
//       {/* Sliding active indicator */}
//       {isActive && (
//         <motion.span
//           layoutId="city-active-bg"
//           className="absolute inset-0 rounded-full pointer-events-none"
//           style={{ background: city.bg }}
//           transition={{ type: "spring", stiffness: 380, damping: 30 }}
//         />
//       )}

//       {/* Color dot */}
//       <span
//         className="relative z-10 w-2 h-2 rounded-full flex-shrink-0 transition-opacity duration-300"
//         style={{
//           background: city.color,
//           opacity: isActive ? 1 : 0.3,
//         }}
//       />

//       <span className="relative z-10 whitespace-nowrap">
//         {city.shortName ?? city.name}
//       </span>

//       {/* Area count */}
//       <span
//         className="relative z-10 text-[10px] font-semibold transition-opacity duration-300"
//         style={{
//           color: isActive ? city.color : "rgba(255,255,255,0.25)",
//           opacity: isActive ? 0.65 : 1,
//         }}
//       >
//         {city.areas.length}
//       </span>
//     </motion.button>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────

// export default function AreasSection() {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
//   const [activeId, setActiveId] = useState<string>(CITIES[0].id);

//   const city = CITIES.find((c) => c.id === activeId)!;

//   return (
//     <section
//       id="areas"
//       ref={ref}
//       aria-label="Areas covered across NCR"
//       className="relative bg-navy-700 section-pad overflow-hidden"
//     >
//       {/* Dot grid */}
//       <div className="absolute inset-0 dot-grid-light opacity-20 pointer-events-none" />

//       {/* Morphing top glow — changes with active city */}
//       <motion.div
//         key={activeId + "-top-glow"}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7 }}
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] pointer-events-none"
//         style={{
//           background: `radial-gradient(ellipse, ${city.glow} 0%, transparent 65%)`,
//         }}
//       />

//       <div className="container-custom relative z-10">

//         {/* ── Header ── */}
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 mb-4"
//             >
//               <span className="w-6 h-px bg-saffron-400" />
//               <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-400">
//                 Pan-NCR Coverage
//               </span>
//             </motion.div>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//               className="font-display font-bold text-white leading-tight tracking-tight"
//               style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
//             >
//               Tutors Available{" "}
//               <em className="not-italic text-gradient-saffron">Near You</em>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="text-white/55 text-[16px] leading-relaxed mt-3 max-w-lg"
//             >
//               Pick your city below to explore covered areas. Larger tags mean
//               higher tutor density — the{" "}
//               <span className="text-[#F6A623] font-semibold">orange pulse</span>{" "}
//               marks the highest-demand zones.
//             </motion.p>
//           </div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="flex items-center gap-3 flex-wrap flex-shrink-0"
//           >
//             {[
//               { value: `${CITIES.length}`,   label: "Cities"     },
//               { value: `${TOTAL_AREAS}+`,    label: "Areas"      },
//               { value: "8,000+",             label: "Tutors"     },
//               { value: "24 hrs",             label: "Avg. Match" },
//             ].map(({ value, label }, i) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, scale: 0.88 }}
//                 animate={inView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{
//                   delay: 0.35 + i * 0.08,
//                   duration: 0.5,
//                   ease: [0.34, 1.56, 0.64, 1],
//                 }}
//                 className="text-center px-5 py-4 rounded-2xl"
//                 style={{
//                   background: "rgba(255,255,255,0.06)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   minWidth: "78px",
//                 }}
//               >
//                 <div
//                   className="font-display font-black text-white leading-none mb-1"
//                   style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
//                 >
//                   {value}
//                 </div>
//                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
//                   {label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* ── City Tab Bar ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.35, duration: 0.55 }}
//           className="mb-5"
//         >
//           {/* Scrollable row — no visible scrollbar */}
//           <div
//             className="flex items-center gap-2.5 overflow-x-auto pb-2"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {CITIES.map((c, i) => (
//               <CityTab
//                 key={c.id}
//                 city={c}
//                 isActive={c.id === activeId}
//                 onClick={() => setActiveId(c.id)}
//                 index={i}
//                 inView={inView}
//               />
//             ))}
//           </div>

//           {/* Subtle fade-out right edge hint on mobile */}
//           <div
//             className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:hidden"
//             style={{
//               background: "linear-gradient(to left, rgba(12,35,64,0.8), transparent)",
//             }}
//           />
//         </motion.div>

//         {/* ── Tag Cloud ── */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ delay: 0.45, duration: 0.5 }}
//           className="relative rounded-3xl p-7 sm:p-10 overflow-hidden"
//           style={{
//             background: "rgba(255,255,255,0.03)",
//             border: "1px solid rgba(255,255,255,0.07)",
//             boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
//             minHeight: "160px",
//           }}
//         >
//           {/* Ambient inner glow — city-aware */}
//           <motion.div
//             key={activeId + "-inner-glow"}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="absolute inset-0 rounded-3xl pointer-events-none"
//             style={{
//               background: `radial-gradient(ellipse at 40% 70%, ${city.glow} 0%, transparent 65%)`,
//             }}
//           />

//           {/* City watermark label (top-right) */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeId + "-label"}
//               initial={{ opacity: 0, x: 8 }}
//               animate={{ opacity: 0.28, x: 0 }}
//               exit={{ opacity: 0, x: -8 }}
//               transition={{ duration: 0.3 }}
//               className="absolute top-5 right-6 flex items-center gap-2 pointer-events-none select-none"
//             >
//               <span
//                 className="w-2 h-2 rounded-full"
//                 style={{ background: city.color }}
//               />
//               <span
//                 className="text-[11px] font-bold uppercase tracking-[0.12em]"
//                 style={{ color: city.color }}
//               >
//                 {city.name}
//               </span>
//             </motion.div>
//           </AnimatePresence>

//           {/* Tags */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeId}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.12 }}
//               className="relative z-10 flex flex-wrap gap-3 items-center justify-start"
//             >
//               {city.areas.map((area, i) => (
//                 <AreaTag key={area.name} area={area} city={city} index={i} />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>

//         {/* ── Legend ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.9, duration: 0.5 }}
//           className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
//         >
//           {/* Demand level hint */}
//           <div className="flex items-center gap-2">
//             <span className="flex items-center gap-1">
//               <span className="inline-block rounded-full px-2 py-0.5 text-[8px] font-bold bg-white/10 text-white/40">
//                 Large
//               </span>
//               <span className="text-white/20 text-xs">→</span>
//               <span className="inline-block rounded-full px-1.5 py-0.5 text-[7px] font-bold bg-white/5 text-white/25">
//                 Small
//               </span>
//             </span>
//             <span className="text-[11px] text-white/30 font-medium">
//               = demand level
//             </span>
//           </div>

//           {/* High demand pulse */}
//           <div className="flex items-center gap-2">
//             <span className="relative flex w-2 h-2">
//               <span
//                 className="absolute inset-0 rounded-full animate-ping opacity-70"
//                 style={{ background: "#F6A623" }}
//               />
//               <span
//                 className="relative block w-2 h-2 rounded-full"
//                 style={{ background: "#F6A623" }}
//               />
//             </span>
//             <span className="text-[11.5px] font-semibold text-white/40">
//               High demand area
//             </span>
//           </div>
//         </motion.div>

//         {/* ── CTA Strip ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.7, duration: 0.6 }}
//           className="mt-10 rounded-3xl overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(246,166,35,0.12) 0%, rgba(246,166,35,0.04) 100%)",
//             border: "1px solid rgba(246,166,35,0.2)",
//           }}
//         >
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-8 py-6">
//             <div className="flex items-center gap-4 text-center sm:text-left">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
//                 style={{ background: "rgba(246,166,35,0.15)" }}
//               >
//                 📍
//               </div>
//               <div>
//                 <h3 className="font-display font-bold text-white text-[17px] mb-0.5">
//                   Don't see your area?
//                 </h3>
//                 <p className="text-white/50 text-sm">
//                   We likely cover it — call us to confirm availability near you.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
//               {/* Call CTA */}
//               <motion.a
//                 href={`tel:${PHONE_RAW}`}
//                 whileHover={{
//                   scale: 1.04,
//                   boxShadow: "0 8px 28px rgba(246,166,35,0.45)",
//                 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3 relative overflow-hidden"
//                 style={{ background: "#F6A623", color: "#0C2340" }}
//               >
//                 <span
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     background:
//                       "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
//                     backgroundSize: "200% 100%",
//                     animation: "shimmer 2.5s linear infinite",
//                   }}
//                 />
//                 <svg
//                   width="14" height="14" viewBox="0 0 24 24"
//                   fill="none" stroke="currentColor"
//                   strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
//                 >
//                   <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z" />
//                 </svg>
//                 <span className="relative z-10">Call to Confirm</span>
//               </motion.a>

//               {/* WhatsApp CTA */}
//               <motion.a
//                 href={WA_LINK(
//                   "Hi, I want to check if you have tutors available in my area."
//                 )}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3"
//                 style={{
//                   background: "rgba(37,211,102,0.15)",
//                   color: "#25D366",
//                   border: "1px solid rgba(37,211,102,0.3)",
//                 }}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//                   <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
//                 </svg>
//                 WhatsApp
//               </motion.a>
//             </div>
//           </div>
//         </motion.div>

//       </div>

//       {/* Bottom border line */}
//       <div
//         className="absolute bottom-0 left-0 right-0 pointer-events-none"
//         aria-hidden="true"
//       >
//         <div
//           style={{
//             height: "1px",
//             background:
//               "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)",
//           }}
//         />
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PHONE_RAW, WA_LINK } from "@/lib/utils";

const CITIES = [
  { name: "Delhi",            x: 196, y: 192, r: 6,   labelX: 178, labelY: 177, anchor: "end"    as const, primary: true  },
  { name: "Gurugram",        x: 108, y: 290, r: 4.5, labelX: 94,  labelY: 284, anchor: "end"    as const, primary: false },
  { name: "Faridabad",       x: 218, y: 338, r: 4,   labelX: 218, labelY: 356, anchor: "middle" as const, primary: false },
  { name: "Noida",           x: 310, y: 192, r: 5.5, labelX: 322, labelY: 197, anchor: "start"  as const, primary: false },
  { name: "Ghaziabad",       x: 328, y: 112, r: 4.5, labelX: 328, labelY: 97,  anchor: "middle" as const, primary: false },
  { name: "Greater Noida",   x: 365, y: 278, r: 4,   labelX: 377, labelY: 282, anchor: "start"  as const, primary: false },
  { name: "Noida Extension", x: 352, y: 234, r: 3.5, labelX: 364, labelY: 230, anchor: "start"  as const, primary: false },
  { name: "GN West",         x: 290, y: 252, r: 3.5, labelX: 278, labelY: 267, anchor: "end"    as const, primary: false },
] as const;

const CONNECTIONS = [
  { x1: 196, y1: 192, x2: 108, y2: 290 },
  { x1: 196, y1: 192, x2: 218, y2: 338 },
  { x1: 196, y1: 192, x2: 310, y2: 192 },
  { x1: 196, y1: 192, x2: 328, y2: 112 },
  { x1: 310, y1: 192, x2: 365, y2: 278 },
  { x1: 310, y1: 192, x2: 352, y2: 234 },
  { x1: 310, y1: 192, x2: 290, y2: 252 },
  { x1: 310, y1: 192, x2: 328, y2: 112 },
];

const MARQUEE_CITIES = [
  "Delhi", "Noida", "Gurugram", "Ghaziabad",
  "Greater Noida", "Faridabad", "Noida Extension", "Greater Noida West",
];

export default function AreasSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="areas"
      ref={ref}
      aria-label="Pan-NCR coverage"
      className="relative bg-navy-700 section-pad overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid-light opacity-[0.18] pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[460px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(246,166,35,0.055) 0%, transparent 65%)" }}
      />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center ">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-5"
          >
            <span className="w-7 h-px bg-saffron-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-saffron-400">
              Pan-NCR Coverage
            </span>
            <span className="w-7 h-px bg-saffron-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight tracking-tight max-w-3xl"
            style={{ fontSize: "clamp(28px, 4.5vw, 50px)" }}
          >
            Wherever you are in NCR —{" "}
            <em className="not-italic text-gradient-saffron">we're already there.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="text-white/45 text-[15.5px] mt-5 max-w-md leading-relaxed"
          >
            From the heart of Delhi to the newest sectors of Greater Noida —
            one call connects you to the right tutor.
          </motion.p>
        </div>

        {/* Ghost Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-8 -mt-12 md:-mt-30"
          style={{ maxWidth: "840px" }}
        >
          <svg viewBox="0 0 500 390" className="w-full h-auto" style={{ overflow: "visible" }}>
            <defs>
              <filter id="ar-gs" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="ar-gsoft" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="12" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ar-dg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(246,166,35,0.16)"/>
                <stop offset="100%" stopColor="rgba(246,166,35,0)"/>
              </radialGradient>
              <radialGradient id="ar-ng" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(246,166,35,0.04)"/>
                <stop offset="100%" stopColor="rgba(246,166,35,0)"/>
              </radialGradient>
            </defs>

            <ellipse cx="258" cy="208" rx="225" ry="178" fill="url(#ar-ng)"/>
            <ellipse cx="196" cy="192" rx="84" ry="72" fill="url(#ar-dg)" filter="url(#ar-gsoft)"/>

            {CONNECTIONS.map((c, i) => (
              <motion.line
                key={i}
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="rgba(246,166,35,0.13)"
                strokeWidth="1"
                strokeDasharray="4 7"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.7 }}
              />
            ))}

            {CITIES.map((city, i) => (
              <g key={city.name}>
                <motion.circle
                  cx={city.x} cy={city.y}
                  r={city.r * (city.primary ? 3.8 : 3.2)}
                  fill="none"
                  stroke={city.primary ? "rgba(246,166,35,0.22)" : "rgba(246,166,35,0.1)"}
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={inView ? { scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] } : {}}
                  transition={{
                    delay: 0.8 + i * 0.12,
                    duration: city.primary ? 2.6 : 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                />
                <circle cx={city.x} cy={city.y} r={city.r * 2}
                  fill={city.primary ? "rgba(246,166,35,0.14)" : "rgba(246,166,35,0.07)"}
                  filter="url(#ar-gsoft)"
                />
                <motion.circle
                  cx={city.x} cy={city.y} r={city.r}
                  fill={city.primary ? "#F6A623" : "rgba(246,166,35,0.65)"}
                  filter="url(#ar-gs)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.5, type: "spring", stiffness: 280, damping: 18 }}
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                />
                <motion.text
                  x={city.labelX} y={city.labelY}
                  textAnchor={city.anchor}
                  fill={city.primary ? "rgba(246,166,35,0.92)" : "rgba(255,255,255,0.42)"}
                  fontSize={city.primary ? 11.5 : 10}
                  fontWeight={city.primary ? 700 : 600}
                  letterSpacing={city.primary ? 0.5 : 0.2}
                  filter={city.primary ? "url(#ar-gs)" : undefined}
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.85 + i * 0.09, duration: 0.55 }}
                >
                  {city.name}
                </motion.text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="overflow-hidden mb-14"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex whitespace-nowrap mb-2.5" style={{ animation: "ar-ltr 32s linear infinite" }}>
            {[...MARQUEE_CITIES, ...MARQUEE_CITIES].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-3.5 px-5 flex-shrink-0">
                <span className="font-display font-extrabold"
                  style={{ fontSize: "clamp(13px, 2vw, 17px)", color: "rgba(255,255,255,0.16)", letterSpacing: "0.04em" }}>
                  {name}
                </span>
                <span style={{ color: "rgba(246,166,35,0.35)", fontSize: "8px" }}>◆</span>
              </span>
            ))}
          </div>
          <div className="flex whitespace-nowrap" style={{ animation: "ar-rtl 24s linear infinite" }}>
            {[...MARQUEE_CITIES, ...MARQUEE_CITIES].slice().reverse().map((name, i) => (
              <span key={i} className="inline-flex items-center gap-3.5 px-5 flex-shrink-0">
                <span className="font-display font-bold uppercase"
                  style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "rgba(255,255,255,0.09)", letterSpacing: "0.1em" }}>
                  {name}
                </span>
                <span style={{ color: "rgba(246,166,35,0.22)", fontSize: "7px" }}>◆</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.72, duration: 0.65 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(246,166,35,0.11) 0%, rgba(246,166,35,0.03) 100%)",
            border: "1px solid rgba(246,166,35,0.2)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-8 py-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(246,166,35,0.14)" }}>📍</div>
              <div>
                <h3 className="font-display font-bold text-white text-[17px] mb-1">
                  Not sure if we cover your area?
                </h3>
                <p className="text-white/45 text-[13.5px]">
                  If you're in NCR, we're almost certainly there. Just ask.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
              <motion.a
                href={`tel:${PHONE_RAW}`}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(246,166,35,0.45)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3 relative overflow-hidden"
                style={{ background: "#F6A623", color: "#0C2340" }}
              >
                <span className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
                  backgroundSize: "200% 100%", animation: "shimmer 2.5s linear infinite",
                }}/>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
                </svg>
                <span className="relative z-10">Call Us</span>
              </motion.a>
              <motion.a
                href={WA_LINK("Hi, I want to check if you have tutors available in my area in NCR.")}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-full px-5 py-3"
                style={{ background: "rgba(37,211,102,0.13)", color: "#25D366", border: "1px solid rgba(37,211,102,0.3)" }}
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
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)" }}/>
      </div>

      <style>{`
        @keyframes ar-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ar-rtl { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}