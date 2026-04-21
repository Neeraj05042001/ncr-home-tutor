// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { motion, useInView } from "framer-motion";

// // import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
// // import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";

// // // ─── Data ─────────────────────────────────────────────────────────────────────

// // const CLASSES = [
// //   "Nursery / KG",
// //   "Class 1",
// //   "Class 2",
// //   "Class 3",
// //   "Class 4",
// //   "Class 5",
// //   "Class 6",
// //   "Class 7",
// //   "Class 8",
// //   "Class 9",
// //   "Class 10",
// //   "Class 11",
// //   "Class 12",
// //   "Graduation Level",
// // ];
// // const BOARDS = ["CBSE", "ICSE", "UP Board", "IGCSE", "Other"];
// // const AREAS = [
// //   "Gaur City / Noida Extension",
// //   "Alpha 1 / Alpha 2",
// //   "Beta 1 / Beta 2",
// //   "Gamma 1 / Gamma 2",
// //   "Delta 1 / Delta 2",
// //   "Omega",
// //   "Zeta 1 / Zeta 2",
// //   "Pari Chowk",
// //   "Knowledge Park 1 / 2 / 3",
// //   "Sector Pi-1 / Pi-2",
// //   "Techzone",
// //   "Sector 93",
// //   "Sector 137",
// //   "Chi 1 / Chi 2",
// //   "Other Area",
// // ];
// // const TRUST_PILLS = [
// //   "Free demo class",
// //   "Verified tutors",
// //   "24-hr matching",
// //   "Free replacement",
// // ];
// // // const STATS = [
// // //   { target: 13,    suffix: "+",    label: "Years of Trust",  icon: "" },
// // //   { target: 17000, suffix: "+",    label: "Happy Students",  icon: "👨‍👩‍👧" },
// // //   { target: 8000,  suffix: "+",    label: "Verified Tutors", icon: "✅" },
// // // ];

// // const STATS = [
// //   {
// //     target: 13,
// //     suffix: "+",
// //     label: "Years of Trust",
// //     icon: "🏆",
// //     desc: "Since 2011",
// //   },
// //   {
// //     target: 17000,
// //     suffix: "+",
// //     label: "Happy Students",
// //     icon: "👨‍👩‍👦",
// //     desc: "Across NCR",
// //   },
// //   {
// //     target: 8000,
// //     suffix: "+",
// //     label: "Verified Tutors",
// //     icon: "🛡️",
// //     desc: "Background checked",
// //   },
// // ];

// // // ─── useCountUp hook ──────────────────────────────────────────────────────────

// // // ─── useCountUp ───────────────────────────────────────────────────────────────

// // function useCountUp(target: number, duration = 2000, delay = 0) {
// //   const [count, setCount] = useState(0);
// //   const ref = useRef<HTMLDivElement>(null);
// //   const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
// //   const started = useRef(false);

// //   useEffect(() => {
// //     if (!inView || started.current) return;
// //     started.current = true;
// //     const startAt = performance.now() + delay * 1000;

// //     const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// //     const tick = (now: number) => {
// //       const elapsed = Math.max(0, now - startAt);
// //       const progress = Math.min(elapsed / duration, 1);
// //       setCount(Math.floor(easeOutExpo(progress) * target));
// //       if (progress < 1) requestAnimationFrame(tick);
// //       else setCount(target);
// //     };
// //     requestAnimationFrame(tick);
// //   }, [inView, target, duration, delay]);

// //   return { count, ref };
// // }

// // // ─── StatCard ─────────────────────────────────────────────────────────────────

// // function StatCard({
// //   target,
// //   suffix,
// //   label,
// //   icon,
// //   desc,
// //   delay,
// // }: {
// //   target: number;
// //   suffix: string;
// //   label: string;
// //   icon: string;
// //   desc: string;
// //   delay: number;
// // }) {
// //   const { count, ref } = useCountUp(target, 2000, delay);
// //   const formatted =
// //     count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

// //   return (
// //     <motion.div
// //       ref={ref}
// //       initial={{ opacity: 0, y: 24, scale: 0.88 }}
// //       animate={{ opacity: 1, y: 0, scale: 1 }}
// //       transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
// //       whileHover={{
// //         y: -5,
// //         transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
// //       }}
// //       className="flex-1 group cursor-default"
// //     >
// //       <div
// //         className="relative overflow-hidden rounded-2xl p-4 h-full"
// //         style={{
// //           background:
// //             "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
// //           border: "1px solid rgba(255,255,255,0.12)",
// //           boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
// //           backdropFilter: "blur(12px)",
// //           transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
// //         }}
// //         onMouseEnter={(e) => {
// //           const el = e.currentTarget;
// //           el.style.borderColor = "rgba(246,166,35,0.5)";
// //           el.style.boxShadow =
// //             "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(246,166,35,0.18)";
// //           el.style.background =
// //             "linear-gradient(135deg, rgba(246,166,35,0.14) 0%, rgba(255,255,255,0.06) 100%)";
// //         }}
// //         onMouseLeave={(e) => {
// //           const el = e.currentTarget;
// //           el.style.borderColor = "rgba(255,255,255,0.12)";
// //           el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.12)";
// //           el.style.background =
// //             "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)";
// //         }}
// //       >
// //         {/* Top-right glow orb */}
// //         <div
// //           className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
// //           style={{
// //             background:
// //               "radial-gradient(circle, rgba(246,166,35,0.35) 0%, transparent 70%)",
// //           }}
// //         />

// //         {/* Icon */}
// //         <div className="text-2xl mb-3 leading-none">{icon}</div>

// //         {/* Counting number */}
// //         <div className="flex items-baseline gap-0.5 mb-0.5">
// //           <span
// //             className="font-display font-bold text-white tabular-nums leading-none"
// //             style={{ fontSize: "clamp(24px, 3.2vw, 36px)" }}
// //           >
// //             {formatted}
// //           </span>
// //           <span
// //             className="font-display font-bold text-saffron-400 leading-none"
// //             style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
// //           >
// //             {suffix}
// //           </span>
// //         </div>

// //         {/* Label */}
// //         <div className="font-bold text-white/80 text-[13px] tracking-wide mb-0.5">
// //           {label}
// //         </div>

// //         {/* Sub-desc — fades in on hover */}
// //         <div className="text-[11px] font-medium text-white/35 group-hover:text-saffron-400/70 transition-colors duration-300 uppercase tracking-widest">
// //           {desc}
// //         </div>

// //         {/* Bottom shimmer line — animates in on hover */}
// //         <div
// //           className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
// //           style={{
// //             background:
// //               "linear-gradient(90deg, rgba(246,166,35,0.8), rgba(246,166,35,0))",
// //           }}
// //         />
// //       </div>
// //     </motion.div>
// //   );
// // }

// // // ─── Background decoration ────────────────────────────────────────────────────

// // function BackgroundOrbs() {
// //   return (
// //     <div
// //       className="absolute inset-0 overflow-hidden pointer-events-none"
// //       aria-hidden="true"
// //     >
// //       <motion.div
// //         animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
// //         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// //         className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
// //         style={{
// //           background:
// //             "radial-gradient(circle, rgba(246,166,35,0.2) 0%, transparent 65%)",
// //         }}
// //       />
// //       <motion.div
// //         animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
// //         transition={{
// //           duration: 10,
// //           repeat: Infinity,
// //           ease: "easeInOut",
// //           delay: 2,
// //         }}
// //         className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
// //         style={{
// //           background:
// //             "radial-gradient(circle, rgba(20,52,90,0.9) 0%, transparent 70%)",
// //         }}
// //       />
// //       <div className="absolute inset-0 dot-grid-light opacity-40" />
// //       {[
// //         { top: "20%", left: "8%", size: 5, delay: 0 },
// //         { top: "55%", left: "12%", size: 3, delay: 1.2 },
// //         { top: "35%", left: "90%", size: 4, delay: 0.6 },
// //         { top: "70%", left: "85%", size: 6, delay: 2 },
// //         { top: "15%", left: "50%", size: 3, delay: 1.5 },
// //         { top: "80%", left: "40%", size: 4, delay: 0.8 },
// //       ].map((p, i) => (
// //         <motion.div
// //           key={i}
// //           animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
// //           transition={{
// //             duration: 4 + i * 0.5,
// //             repeat: Infinity,
// //             ease: "easeInOut",
// //             delay: p.delay,
// //           }}
// //           className="absolute rounded-full bg-saffron-400"
// //           style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// // // ─── Select Field ─────────────────────────────────────────────────────────────

// // function SelectField({
// //   label,
// //   value,
// //   onChange,
// //   options,
// //   placeholder,
// //   error,
// // }: {
// //   label: string;
// //   value: string;
// //   onChange: (v: string) => void;
// //   options: string[];
// //   placeholder: string;
// //   error?: string;
// // }) {
// //   const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7A8D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;
// //   return (
// //     <div>
// //       <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-1.5">
// //         {label}
// //       </label>
// //       <select
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         className={cn(
// //           "w-full px-3.5 py-3 rounded-xl border text-sm font-medium bg-white appearance-none cursor-pointer",
// //           "focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-all duration-200",
// //           error
// //             ? "border-red-400 bg-red-50"
// //             : "border-border hover:border-border-strong",
// //         )}
// //         style={{
// //           backgroundImage: chevron,
// //           backgroundRepeat: "no-repeat",
// //           backgroundPosition: "right 12px center",
// //           paddingRight: "32px",
// //         }}
// //       >
// //         <option value="" disabled>
// //           {placeholder}
// //         </option>
// //         {options.map((o) => (
// //           <option key={o}>{o}</option>
// //         ))}
// //       </select>
// //       {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
// //     </div>
// //   );
// // }

// // // ─── Lead Form ────────────────────────────────────────────────────────────────

// // function LeadForm() {
// //   const [cls, setCls] = useState("");
// //   const [board, setBoard] = useState("");
// //   const [area, setArea] = useState("");
// //   const [name, setName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const [loading, setLoading] = useState(false);
// //   const [done, setDone] = useState(false);

// //   const validate = () => {
// //     const e: Record<string, string> = {};
// //     if (!cls) e.cls = "Please select a class";
// //     if (!area) e.area = "Please select your area";
// //     if (!name.trim()) e.name = "Please enter your name";
// //     if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
// //       e.phone = "Enter a valid 10-digit number";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const submit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!validate()) return;
// //     setLoading(true);
// //     await new Promise((r) => setTimeout(r, 1200));
// //     setLoading(false);
// //     setDone(true);
// //   };

// //   if (done)
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
// //         className="text-center py-4"
// //       >
// //         <motion.div
// //           initial={{ scale: 0 }}
// //           animate={{ scale: 1 }}
// //           transition={{
// //             delay: 0.1,
// //             type: "spring",
// //             stiffness: 300,
// //             damping: 20,
// //           }}
// //           className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
// //         >
// //           <svg
// //             width="36"
// //             height="36"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="#16a34a"
// //             strokeWidth="2.5"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //           >
// //             <polyline points="20 6 9 17 4 12" />
// //           </svg>
// //         </motion.div>
// //         <h3 className="font-display font-bold text-navy-700 text-2xl mb-2">
// //           Request Received!
// //         </h3>
// //         <p className="text-ink-secondary text-sm leading-relaxed mb-6">
// //           We'll call you within <strong>2 hours</strong> to arrange your{" "}
// //           <strong>free demo class</strong>.
// //         </p>
// //         <a
// //           href={WA_LINK(
// //             `Hi! I just requested a home tutor for ${cls} in ${area}. Please help.`,
// //           )}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="inline-flex items-center justify-center gap-2.5 w-full bg-whatsapp text-white font-bold rounded-2xl py-4 text-[15px] hover:opacity-90 transition-opacity"
// //         >
// //           <WhatsAppIcon size={18} />
// //           Message Us on WhatsApp
// //         </a>
// //       </motion.div>
// //     );

// //   return (
// //     <form onSubmit={submit} noValidate className="space-y-4">
// //       <div className="grid grid-cols-2 gap-3">
// //         <SelectField
// //           label="Tuition For"
// //           value={cls}
// //           onChange={setCls}
// //           options={CLASSES}
// //           placeholder="Select Class"
// //           error={errors.cls}
// //         />
// //         <SelectField
// //           label="Board"
// //           value={board}
// //           onChange={setBoard}
// //           options={BOARDS}
// //           placeholder="Select Board"
// //         />
// //       </div>
// //       <SelectField
// //         label="Your Area in Greater Noida"
// //         value={area}
// //         onChange={setArea}
// //         options={AREAS}
// //         placeholder="Select your area"
// //         error={errors.area}
// //       />

// //       <div>
// //         <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-1.5">
// //           Parent's Name
// //         </label>
// //         <input
// //           type="text"
// //           placeholder="Your full name"
// //           value={name}
// //           onChange={(e) => {
// //             setName(e.target.value);
// //             setErrors((p) => ({ ...p, name: undefined as any }));
// //           }}
// //           className={cn(
// //             "w-full px-3.5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700",
// //             errors.name
// //               ? "border-red-400 bg-red-50"
// //               : "border-border hover:border-border-strong bg-white",
// //           )}
// //         />
// //         {errors.name && (
// //           <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
// //         )}
// //       </div>

// //       <div>
// //         <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-1.5">
// //           WhatsApp / Mobile Number
// //         </label>
// //         <div className="relative">
// //           <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-secondary select-none">
// //             +91
// //           </span>
// //           <input
// //             type="tel"
// //             placeholder="XXXXX XXXXX"
// //             value={phone}
// //             maxLength={11}
// //             onChange={(e) => {
// //               setPhone(e.target.value);
// //               setErrors((p) => ({ ...p, phone: undefined as any }));
// //             }}
// //             className={cn(
// //               "w-full pl-12 pr-3.5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700",
// //               errors.phone
// //                 ? "border-red-400 bg-red-50"
// //                 : "border-border hover:border-border-strong bg-white",
// //             )}
// //           />
// //         </div>
// //         {errors.phone && (
// //           <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
// //         )}
// //       </div>

// //       <motion.button
// //         type="submit"
// //         disabled={loading}
// //         whileHover={
// //           !loading
// //             ? { scale: 1.02, boxShadow: "0 10px 32px rgba(246,166,35,0.45)" }
// //             : {}
// //         }
// //         whileTap={!loading ? { scale: 0.98 } : {}}
// //         transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //         className={cn(
// //           "w-full py-4 rounded-2xl font-bold text-navy-700 relative overflow-hidden text-[15px] tracking-wide transition-colors duration-200",
// //           loading
// //             ? "bg-saffron-300 cursor-not-allowed"
// //             : "bg-saffron-400 hover:bg-saffron-500",
// //         )}
// //       >
// //         {!loading && (
// //           <span
// //             className="absolute inset-0 pointer-events-none"
// //             style={{
// //               background:
// //                 "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)",
// //               backgroundSize: "200% 100%",
// //               animation: "shimmer 2.5s linear infinite",
// //             }}
// //           />
// //         )}
// //         <span className="relative z-10 flex items-center justify-center gap-2">
// //           {loading ? (
// //             <>
// //               <svg
// //                 className="animate-spin"
// //                 width="18"
// //                 height="18"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //               >
// //                 <circle
// //                   cx="12"
// //                   cy="12"
// //                   r="10"
// //                   stroke="currentColor"
// //                   strokeWidth="3"
// //                   strokeDasharray="31"
// //                   strokeDashoffset="10"
// //                   strokeLinecap="round"
// //                 />
// //               </svg>
// //               Submitting...
// //             </>
// //           ) : (
// //             <>
// //               Book FREE Demo Class
// //               <svg
// //                 width="16"
// //                 height="16"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth="2.5"
// //               >
// //                 <path d="M5 12h14M12 5l7 7-7 7" />
// //               </svg>
// //             </>
// //           )}
// //         </span>
// //       </motion.button>

// //       <p className="text-center text-[12px] text-ink-muted flex items-center justify-center gap-1.5">
// //         <svg
// //           width="13"
// //           height="13"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="2"
// //         >
// //           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
// //         </svg>
// //         100% private · No spam · No payment needed
// //       </p>
// //     </form>
// //   );
// // }

// // // ─── Hero Section ─────────────────────────────────────────────────────────────

// // export default function HeroSection() {
// //   return (
// //     <section
// //       id="hero"
// //       aria-label="Find a home tutor in Greater Noida"
// //       className="relative bg-navy-700 overflow-hidden"
// //       style={{ minHeight: "calc(100vh - 68px)" }}
// //     >
// //       <BackgroundOrbs />

// //       <div className="container-custom relative z-10 py-16 lg:py-24">
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-center">
// //           {/* ── LEFT: Copy ── */}
// //           <div>
// //             {/* Live badge */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
// //               className="inline-flex items-center gap-2.5 mb-6"
// //             >
// //               <span className="relative flex h-2.5 w-2.5">
// //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75" />
// //                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron-400" />
// //               </span>
// //               <span
// //                 className="text-saffron-400 font-bold uppercase tracking-widest"
// //                 style={{ fontSize: "11.5px" }}
// //               >
// //                 Greater Noida's #1 Tuition Bureau Since 2011
// //               </span>
// //             </motion.div>

// //             {/* H1 */}
// //             <motion.h1
// //               initial={{ opacity: 0, y: 40 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{
// //                 delay: 0.1,
// //                 duration: 0.7,
// //                 ease: [0.22, 1, 0.36, 1],
// //               }}
// //               className="font-display font-bold text-white leading-[1.1] tracking-tight text-balance mb-6"
// //               style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
// //             >
// //               Find the{" "}
// //               <span className="relative inline-block">
// //                 <em className="not-italic text-gradient-saffron">
// //                   Perfect Tutor
// //                 </em>
// //                 <motion.svg
// //                   className="absolute -bottom-2 left-0 w-full overflow-visible"
// //                   viewBox="0 0 200 12"
// //                   preserveAspectRatio="none"
// //                   height="10"
// //                 >
// //                   <motion.path
// //                     d="M 0 8 Q 50 2, 100 7 Q 150 12, 200 6"
// //                     fill="none"
// //                     stroke="#F6A623"
// //                     strokeWidth="3"
// //                     strokeLinecap="round"
// //                     initial={{ pathLength: 0 }}
// //                     animate={{ pathLength: 1 }}
// //                     transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
// //                   />
// //                 </motion.svg>
// //               </span>{" "}
// //               for Your Child in Greater Noida
// //             </motion.h1>

// //             {/* Sub */}
// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{
// //                 delay: 0.25,
// //                 duration: 0.65,
// //                 ease: [0.22, 1, 0.36, 1],
// //               }}
// //               className="text-white/65 leading-relaxed mb-8 max-w-xl"
// //               style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
// //             >
// //               Verified, background-checked home tutors for{" "}
// //   <span className="text-white/90 font-semibold">Classes 1–12</span>.{" "}
// //  All subjects across{" "}
// // {[
// //   { name: "CBSE",     color: "rgba(99,179,237,0.15)",  border: "rgba(99,179,237,0.35)",  text: "#93C5FD" },
// //   { name: "ICSE",     color: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.35)", text: "#C4B5FD" },
// //   { name: "UP Board", color: "rgba(246,166,35,0.15)",  border: "rgba(246,166,35,0.4)",   text: "#F6A623" },
// // ].map((board, i) => (
// //   <motion.span
// //     key={board.name}
// //     initial={{ opacity: 0, y: 6, scale: 0.9 }}
// //     animate={{ opacity: 1, y: 0, scale: 1 }}
// //     transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
// //     whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
// //     className="inline-flex items-center mx-0.5 px-2.5 py-0.5 rounded-full text-[13px] font-bold cursor-default relative overflow-hidden align-middle"
// //     style={{
// //       background: board.color,
// //       border: `1px solid ${board.border}`,
// //       color: board.text,
// //       boxShadow: `0 0 12px ${board.color}`,
// //     }}
// //     onMouseEnter={e => {
// //       (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${board.border}`;
// //       (e.currentTarget as HTMLElement).style.background = board.color.replace("0.15", "0.25");
// //     }}
// //     onMouseLeave={e => {
// //       (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${board.color}`;
// //       (e.currentTarget as HTMLElement).style.background = board.color;
// //     }}
// //   >
// //     {/* one-time shimmer sweep on mount */}
// //     <motion.span
// //       className="absolute inset-0 pointer-events-none"
// //       initial={{ x: "-100%", opacity: 0.6 }}
// //       animate={{ x: "200%", opacity: 0 }}
// //       transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: "easeOut" }}
// //       style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
// //     />
// //     {board.name}
// //   </motion.span>
// // ))}
// // {" "} Matched to your location within{" "}
// //   <span className="text-white/90 font-semibold">24 hours</span>.
// //             </motion.p>

            

// //             {/* Trust pills */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{
// //                 delay: 0.35,
// //                 duration: 0.6,
// //                 ease: [0.22, 1, 0.36, 1],
// //               }}
// //               className="flex flex-wrap gap-2.5 mb-8"
// //             >
// //               {TRUST_PILLS.map((text, i) => (
// //                 <motion.div
// //                   key={text}
// //                   initial={{ opacity: 0, scale: 0.88 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   transition={{
// //                     delay: 0.4 + i * 0.08,
// //                     duration: 0.4,
// //                     ease: [0.34, 1.56, 0.64, 1],
// //                   }}
// //                   className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5"
// //                 >
// //                   <svg
// //                     width="13"
// //                     height="13"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="#F6A623"
// //                     strokeWidth="3"
// //                   >
// //                     <polyline points="20 6 9 17 4 12" />
// //                   </svg>
// //                   <span className="text-white/80 font-medium text-sm">
// //                     {text}
// //                   </span>
// //                 </motion.div>
// //               ))}
// //             </motion.div>

// //             {/* CTA buttons */}
// //             {/* CTA buttons */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{
// //                 delay: 0.45,
// //                 duration: 0.6,
// //                 ease: [0.22, 1, 0.36, 1],
// //               }}
// //               className="flex flex-col sm:flex-row gap-4 mb-8"
// //             >
// //               {/* ── PRIMARY: Call Now ── */}
// //               <div className="flex flex-col items-center sm:items-start gap-1.5">
// //                 <motion.a
// //                   href={`tel:${PHONE_RAW}`}
// //                   whileHover={{ scale: 1.04 }}
// //                   whileTap={{ scale: 0.96 }}
// //                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //                   className="relative inline-flex items-center gap-3 bg-saffron-400 text-navy-700 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden group"
// //                   style={{ boxShadow: "0 0 0 0 rgba(246,166,35,0.5)" }}
// //                 >
// //                   {/* Shimmer sweep */}
// //                   <span
// //                     className="absolute inset-0 pointer-events-none"
// //                     style={{
// //                       background:
// //                         "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
// //                       backgroundSize: "200% 100%",
// //                       animation: "shimmer 2.2s linear infinite",
// //                     }}
// //                   />
// //                   {/* Pulse ring */}
// //                   <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-saffron-400 pointer-events-none" />

// //                   <span className="relative z-10 flex items-center gap-2.5">
// //                     {/* Animated phone icon */}
// //                     <motion.span
// //                       animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
// //                       transition={{
// //                         duration: 1.8,
// //                         repeat: Infinity,
// //                         repeatDelay: 3,
// //                       }}
// //                     >
// //                       <PhoneIcon size={18} />
// //                     </motion.span>
// //                     Call Now
// //                   </span>

// //                   {/* Arrow that slides in on hover */}
// //                   <span className="relative z-10 text-navy-700 inline-flex overflow-hidden w-0 group-hover:w-5 transition-all duration-300 ease-out">
// //                     →
// //                   </span>
// //                 </motion.a>
// //                 {/* Micro-copy */}
// //                 <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">
// //                   ⚡ Instant response
// //                 </span>
// //               </div>

// //               {/* ── SECONDARY: WhatsApp ── */}
// //               <div className="flex flex-col items-center sm:items-start gap-1.5">
// //                 <motion.a
// //                   href={WA_LINK(
// //                     "Hello, I am looking for a home tutor in Greater Noida. Please help me find the right tutor for my child.",
// //                   )}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   whileHover={{
// //                     scale: 1.04,
// //                     boxShadow: "0 0 36px rgba(37,211,102,0.45)",
// //                   }}
// //                   whileTap={{ scale: 0.96 }}
// //                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //                   className="relative inline-flex items-center gap-2.5 text-white font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden border border-whatsapp/50 group"
// //                   style={{
// //                     background: "rgba(37,211,102,0.68)",
// //                     boxShadow:
// //                       "0 0 24px rgba(37,211,102,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
// //                   }}
// //                   //   onMouseEnter={(e) => {
// //                   //     (e.currentTarget as HTMLElement).style.background =
// //                   //       "rgba(37,211,102,0.22)";
// //                   //     (e.currentTarget as HTMLElement).style.boxShadow =
// //                   //       "0 0 32px rgba(37,211,102,0.3)";
// //                   //     (e.currentTarget as HTMLElement).style.borderColor =
// //                   //       "rgba(37,211,102,0.7)";
// //                   //   }}
// //                   //   onMouseLeave={(e) => {
// //                   //     (e.currentTarget as HTMLElement).style.background =
// //                   //       "rgba(37,211,102,0.82)";
// //                   //     (e.currentTarget as HTMLElement).style.boxShadow =
// //                   //       "0 0 24px rgba(37,211,102,0.15)";
// //                   //     (e.currentTarget as HTMLElement).style.borderColor =
// //                   //       "rgba(37,211,102,0.4)";
// //                   //   }}
// //                 >
// //                   {/* Subtle inner glow */}
// //                   <span
// //                     className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
// //                     style={{
// //                       background:
// //                         "radial-gradient(ellipse at center, rgba(37,211,102,0.15) 0%, transparent 70%)",
// //                     }}
// //                   />
// //                   <span className="relative z-10 flex items-center gap-2.5 text-white">
// //                     {/* WA icon: bounces in on load, then rings every 4s */}
// //                     <motion.span
// //                       animate={{
// //                         rotate: [0, -18, 18, -12, 12, -6, 6, 0],
// //                         scale: [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1],
// //                       }}
// //                       transition={{
// //                         duration: 0.7,
// //                         repeat: Infinity,
// //                         repeatDelay: 4,
// //                         ease: "easeInOut",
// //                       }}
// //                       className="shrink-0"
// //                     >
// //                       <WhatsAppIcon size={18} />
// //                     </motion.span>
// //                     WhatsApp Us
// //                   </span>
// //                 </motion.a>
// //                 {/* Micro-copy */}
// //                 <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">
// //                   🟢 Usually replies in minutes
// //                 </span>
// //               </div>
// //             </motion.div>

// //             {/* Stats cards */}
// //             <div className="flex items-stretch gap-3">
// //               {STATS.map(({ target, suffix, label, icon, desc }, i) => (
// //                 <StatCard
// //                   key={label}
// //                   target={target}
// //                   suffix={suffix}
// //                   label={label}
// //                   icon={icon}
// //                   desc={desc}
// //                   delay={0.65 + i * 0.12}
// //                 />
// //               ))}
// //             </div>
// //             {/* Rating badge */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.9, duration: 0.5 }}
// //               className="mt-6 inline-flex items-center gap-2.5 bg-white/8 border border-white/10 rounded-full px-4 py-2"
// //             >
// //               <span className="text-amber-400 text-sm tracking-wide">
// //                 ★★★★★
// //               </span>
// //               <span className="text-white/60 text-xs font-medium">
// //                 Rated 5.0 by 17,000+ families across Greater Noida
// //               </span>
// //             </motion.div>
// //           </div>

// //           {/* ── RIGHT: Form ── */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 40, y: 20 }}
// //             animate={{ opacity: 1, x: 0, y: 0 }}
// //             transition={{
// //               delay: 0.2,
// //               duration: 0.75,
// //               ease: [0.22, 1, 0.36, 1],
// //             }}
// //             className="lg:sticky lg:top-24"
// //             id="book-demo"
// //           >
// //             <div
// //               className="bg-white rounded-3xl overflow-hidden relative"
// //               style={{
// //                 boxShadow:
// //                   "0 24px 80px rgba(4,13,21,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
// //               }}
// //             >
// //               {/* Top colour bar */}
// //               <div className="h-1.5 bg-linear-to-r from-saffron-400 via-saffron-300 to-saffron-500" />

// //               <div className="p-6 sm:p-8">
// //                 <div className="mb-6">
// //                   <h2 className="font-display font-bold text-navy-700 text-2xl leading-tight mb-1.5">
// //                     Book Your Free Demo Class
// //                   </h2>
// //                   <p className="text-ink-secondary text-sm flex items-center gap-1.5">
// //                     <svg
// //                       width="14"
// //                       height="14"
// //                       viewBox="0 0 24 24"
// //                       fill="#25D366"
// //                     >
// //                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
// //                       <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
// //                     </svg>
// //                     We'll call you back within{" "}
// //                     <strong className="text-green-600">2 hours</strong>
// //                   </p>
// //                 </div>
// //                 <LeadForm />
// //               </div>

// //               {/* Bottom trust strip */}
// //               <div className="bg-surface-3 border-t border-border px-8 py-3.5 flex items-center justify-center gap-6 flex-wrap">
// //                 {[
// //                   { icon: "🔒", text: "100% Secure" },
// //                   { icon: "🎁", text: "Always Free" },
// //                   { icon: "🔄", text: "No Lock-in" },
// //                 ].map(({ icon, text }) => (
// //                   <span
// //                     key={text}
// //                     className="text-xs font-semibold text-ink-muted flex items-center gap-1"
// //                   >
// //                     {icon} {text}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Wave divider */}
// //       {/* <div
// //         className="absolute bottom-0 left-0 right-0 pointer-events-none"
// //         aria-hidden="true"
// //       >
// //         <svg
// //           viewBox="0 0 1440 48"
// //           fill="none"
// //           xmlns="http://www.w3.org/2000/svg"
// //           preserveAspectRatio="none"
// //           className="w-full"
// //           style={{ height: "48px", display: "block" }}
// //         >
// //           <path
// //             d="M0 48 L0 24 Q180 0 360 20 Q540 40 720 16 Q900 0 1080 22 Q1260 44 1440 18 L1440 48 Z"
// //             // fill="#ffffff"
// //             fill="#F6A623"

// //           />
// //         </svg>
// //       </div> */}
// // <div
// //         className="relative pointer-events-none"
// //         aria-hidden="true"
// //         style={{ lineHeight: 0, marginTop: "-2px" }}
// //       >
// //         <svg
// //           viewBox="0 0 1440 80"
// //           preserveAspectRatio="none"
// //           xmlns="http://www.w3.org/2000/svg"
// //           style={{ width: "100%", height: "clamp(40px, 5vw, 80px)", display: "block" }}
// //         >
// //           <defs>
// //             <linearGradient id="tb-shadow" x1="0" y1="0" x2="0" y2="1">
// //               <stop offset="0%" stopColor="rgba(12,35,64,0.12)" />
// //               <stop offset="100%" stopColor="rgba(12,35,64,0)" />
// //             </linearGradient>
// //           </defs>

// //           {/* Soft shadow layer for depth */}
// //           <path
// //             d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 80 L0 80 Z"
// //             fill="url(#tb-shadow)"
// //           />

// //           {/* Main fill — HowItWorks surface-3 */}
// //           <path
// //             d="M0 20 Q360 80 720 46 Q1080 12 1440 66 L1440 80 L0 80 Z"
// //             fill="#F6A623"
// //           />
// //         </svg>
// //       </div>
      
// //     </section>
// //   );
// // }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, useInView } from "framer-motion";
// import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
// import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const TRUST_PILLS = [
//   "Free demo class",
//   "Verified tutors",
//   "24-hr matching",
//   "Free replacement",
// ];

// const STATS = [
//   { target: 13,    suffix: "+", label: "Years of Trust",   icon: "🏆", desc: "Since 2011"        },
//   { target: 17000, suffix: "+", label: "Happy Students",   icon: "👨‍👩‍👦", desc: "Across NCR"         },
//   { target: 8000,  suffix: "+", label: "Verified Tutors",  icon: "🛡️", desc: "Background checked" },
// ];

// const BOARDS = [
//   { name: "CBSE",     color: "rgba(99,179,237,0.15)",  border: "rgba(99,179,237,0.35)",  text: "#93C5FD" },
//   { name: "ICSE",     color: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.35)", text: "#C4B5FD" },
//   { name: "UP Board", color: "rgba(246,166,35,0.15)",  border: "rgba(246,166,35,0.4)",   text: "#F6A623" },
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

// // Subject pills floating around the card.
// // Positions are calculated so they sit OUTSIDE the card's bounding box
// // (card: top 78px, left ~88px, width 275px → right ~363px, height ~375px → bottom ~453px).
// // Vertical bands used: top 0-68 (above card) and bottom 456-560 (below card).
// // Horizontal bands: left 0-83 and right 363-460 (beside card).
// const SUBJECT_PILLS: {
//   label: string;
//   bg: string;
//   border: string;
//   text: string;
//   pos: Record<string, string | number>;
//   delay: number;
//   dur: number;
// }[] = [
//   // Above-card row — left side
//   {
//     label: "Mathematics",
//     bg: "rgba(246,166,35,0.15)", border: "rgba(246,166,35,0.35)", text: "#b45309",
//     pos: { top: 8, left: 8 },
//     delay: 0.75, dur: 4.2,
//   },
//   // Above-card row — right side
//   {
//     label: "Physics",
//     bg: "rgba(99,179,237,0.13)", border: "rgba(99,179,237,0.35)", text: "#1d4ed8",
//     pos: { top: 8, right: 8 },
//     delay: 0.85, dur: 5.1,
//   },
//   // Below-card row — left side
//   {
//     label: "Chemistry",
//     bg: "rgba(167,139,250,0.13)", border: "rgba(167,139,250,0.35)", text: "#5b21b6",
//     pos: { bottom: 28, left: 8 },
//     delay: 1.0, dur: 4.7,
//   },
//   // Below-card row — right side
//   {
//     label: "Science",
//     bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#065f46",
//     pos: { bottom: 28, right: 8 },
//     delay: 1.1, dur: 5.5,
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
//   target, suffix, label, icon, desc, delay,
// }: {
//   target: number; suffix: string; label: string; icon: string; desc: string; delay: number;
// }) {
//   const { count, ref } = useCountUp(target, 2000, delay);
//   const formatted = count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24, scale: 0.88 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
//       whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
//       className="flex-1 group cursor-default"
//     >
//       <div
//         className="relative overflow-hidden rounded-2xl p-4 h-full"
//         style={{
//           background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
//           border: "1px solid rgba(255,255,255,0.12)",
//           boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
//           transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
//         }}
//         onMouseEnter={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.borderColor = "rgba(246,166,35,0.5)";
//           el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(246,166,35,0.18)";
//           el.style.background = "linear-gradient(135deg, rgba(246,166,35,0.14) 0%, rgba(255,255,255,0.06) 100%)";
//         }}
//         onMouseLeave={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.borderColor = "rgba(255,255,255,0.12)";
//           el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.12)";
//           el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)";
//         }}
//       >
//         {/* Glow orb on hover */}
//         <div
//           className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{ background: "radial-gradient(circle, rgba(246,166,35,0.35) 0%, transparent 70%)" }}
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

//         <div className="font-bold text-white/80 text-[13px] tracking-wide mb-0.5">{label}</div>
//         <div className="text-[11px] font-medium text-white/35 group-hover:text-saffron-400/70 transition-colors duration-300 uppercase tracking-widest">
//           {desc}
//         </div>

//         {/* Bottom shimmer line */}
//         <div
//           className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
//           style={{ background: "linear-gradient(90deg, rgba(246,166,35,0.8), rgba(246,166,35,0))" }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// // ─── BackgroundOrbs ───────────────────────────────────────────────────────────

// function BackgroundOrbs() {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
//       <motion.div
//         animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
//         style={{ background: "radial-gradient(circle, rgba(246,166,35,0.2) 0%, transparent 65%)" }}
//       />
//       <motion.div
//         animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
//         style={{ background: "radial-gradient(circle, rgba(20,52,90,0.9) 0%, transparent 70%)" }}
//       />
//       <div className="absolute inset-0 dot-grid-light opacity-40" />
//       {[
//         { top: "20%", left: "8%",  size: 5, delay: 0   },
//         { top: "55%", left: "12%", size: 3, delay: 1.2 },
//         { top: "35%", left: "90%", size: 4, delay: 0.6 },
//         { top: "70%", left: "85%", size: 6, delay: 2   },
//         { top: "15%", left: "50%", size: 3, delay: 1.5 },
//         { top: "80%", left: "40%", size: 4, delay: 0.8 },
//       ].map((p, i) => (
//         <motion.div
//           key={i}
//           animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
//           transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
//           className="absolute rounded-full bg-saffron-400"
//           style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── NotifCard ────────────────────────────────────────────────────────────────
// // Each notification floats independently via its own motion.div.
// // The outer wrapper (a plain div) handles absolute positioning so that
// // framer-motion's y animation never conflicts with a CSS translateX.

// interface NotifCardProps {
//   icon: React.ReactNode;
//   iconBg: string;
//   title: string;
//   sub: string;
//   delay: number;
//   /** Pass 1 or -1 to invert the float direction for variety */
//   direction?: 1 | -1;
//   wrapperStyle: React.CSSProperties;
// }

// function NotifCard({
//   icon, iconBg, title, sub, delay, direction = 1, wrapperStyle,
// }: NotifCardProps) {
//   return (
//     <div style={{ position: "absolute", zIndex: 20, ...wrapperStyle }}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1, y: [0, direction * -8, 0] }}
//         transition={{
//           opacity: { delay, duration: 0.5 },
//           scale:   { delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
//           y: {
//             delay: delay + 0.55,
//             duration: 4.8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           },
//         }}
//         className="flex items-center gap-3 px-4 py-3 rounded-2xl"
//         style={{
//           background:     "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
//           border:         "1px solid rgba(255,255,255,0.18)",
//           backdropFilter: "blur(18px)",
//           WebkitBackdropFilter: "blur(18px)",
//           boxShadow:      "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
//           whiteSpace:     "nowrap",
//         }}
//       >
//         <div
//           className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//           style={{ background: iconBg }}
//         >
//           {icon}
//         </div>
//         <div>
//           <p className="text-white font-semibold text-[12.5px] leading-tight">{title}</p>
//           <p className="text-white/55 text-[11px] mt-0.5">{sub}</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ─── TutorMatchVisual ─────────────────────────────────────────────────────────
// //
// // Layout (container 460 × 560 px):
// //
// //   ┌─────────────────────────────────────────────┐  y = 0
// //   │ [Mathematics pill]       [Physics pill]     │  y = 8…38
// //   │  ─────────────────────────────────────────  │  y = 54
// //   │ [✓ Tutor Matched!]     [★★★★★ 4.9 Rating]  │  y = 58…116
// //   │  ─────────────────────────────────────────  │  y = 128
// //   │         ┌─────────────────────────┐         │
// //   │         │   TUTOR CARD (white)    │         │  y=128…470
// //   │         │  photo · name · rating  │         │
// //   │         │  chips · subjects       │         │
// //   │         │  avail dot · CTA btn   │         │
// //   │         └─────────────────────────┘         │
// //   │  ─────────────────────────────────────────  │  y = 476
// //   │ [📅 Demo Confirmed]    [Chemistry] [Science]│  y = 480…538
// //   │                                             │  y = 548
// //   └─────────────────────────────────────────────┘  y = 560
// //
// // Subject pills in the top and bottom rows are placed symmetrically
// // so they never overlap the card or the notification cards.

// function TutorMatchVisual() {
//   return (
//     <div
//       className="relative hidden lg:block select-none"
//       style={{ height: 560, isolation: "isolate", overflow: "visible" }}
//     >
//       {/* Soft radial glow centred behind the card */}
//       <div
//         className="absolute pointer-events-none"
//         style={{
//           top: "50%", left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 320, height: 320,
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(246,166,35,0.10) 0%, transparent 70%)",
//         }}
//       />

//       {/* ── Row 1: Subject pills (y 8-38, above all notifs) ── */}
//       {SUBJECT_PILLS.slice(0, 2).map((pill) => (
//         <motion.div
//           key={pill.label}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, y: [0, -9, 0] }}
//           transition={{
//             opacity: { delay: pill.delay, duration: 0.4 },
//             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
//           style={{
//             ...pill.pos,
//             background: pill.bg,
//             border: `1px solid ${pill.border}`,
//             color: pill.text,
//             zIndex: 15,
//           }}
//         >
//           {pill.label}
//         </motion.div>
//       ))}

//       {/* ── Row 2: Notification cards (y 58-116, between pills and card) ── */}

//       {/* LEFT notif – "Tutor Matched" */}
//       <NotifCard
//         icon={
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points="20 6 9 17 4 12" />
//           </svg>
//         }
//         iconBg="rgba(37,211,102,0.22)"
//         title="Tutor Matched!"
//         sub="3 tutors near Gaur City"
//         delay={0.8}
//         direction={1}
//         wrapperStyle={{ top: 58, left: 0 }}
//       />

//       {/* RIGHT notif – star rating */}
//       <NotifCard
//         icon={<span style={{ fontSize: 15, lineHeight: 1 }}>⭐</span>}
//         iconBg="rgba(251,191,36,0.22)"
//         title="4.9 Rating"
//         sub="126 verified reviews"
//         delay={0.92}
//         direction={-1}
//         wrapperStyle={{ top: 58, right: 0 }}
//       />

//       {/* ── MAIN TUTOR CARD (y 128 – ~470) ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 24, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
//         transition={{
//           opacity: { delay: 0.3, duration: 0.7 },
//           scale:   { delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
//           y: { delay: 1.1, duration: 6, repeat: Infinity, ease: "easeInOut" },
//         }}
//         className="absolute bg-white rounded-3xl overflow-hidden"
//         style={{
//           top: 128,
//           left: "50%",
//           // Use framer-motion x so it plays nicely with the y animation above
//           x: "-50%",
//           width: 275,
//           zIndex: 10,
//           boxShadow: "0 32px 80px rgba(4,13,21,0.48), 0 0 0 1px rgba(255,255,255,0.06)",
//         }}
//       >
//         {/* Top colour bar */}
//         <div
//           className="h-1.5"
//           style={{ background: "linear-gradient(90deg, #F6A623, #ffb83a, #F6A623)" }}
//         />

//         <div className="p-5">
//           {/* ── Header: photo + name ── */}
//           <div className="flex items-start gap-3 mb-4">
//             {/* Photo */}
//             <div className="relative flex-shrink-0">
//               <div
//                 className="w-[66px] h-[66px] rounded-2xl overflow-hidden"
//                 style={{
//                   border: "2.5px solid #F6A623",
//                   boxShadow: "0 4px 14px rgba(246,166,35,0.35)",
//                 }}
//               >
//                 {/*
//                   NOTE: To use next/image instead of <img>, add this to next.config.js:
//                   images: { remotePatterns: [{ hostname: "images.unsplash.com" }] }
//                   Then replace with:
//                   <Image
//                     src="https://images.unsplash.com/..."
//                     alt="Priya Sharma – Verified Tutor"
//                     width={66} height={66}
//                     className="object-cover"
//                   />
//                 */}
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&q=80"
//                   alt="Priya Sharma – Verified Tutor"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Verified tick */}
//               <div
//                 className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full flex items-center justify-center"
//                 style={{
//                   background: "linear-gradient(135deg, #10b981, #059669)",
//                   border: "2px solid white",
//                   boxShadow: "0 2px 8px rgba(16,185,129,0.5)",
//                 }}
//               >
//                 <svg
//                   width="10" height="10" viewBox="0 0 24 24"
//                   fill="none" stroke="white" strokeWidth="3.5"
//                   strokeLinecap="round" strokeLinejoin="round"
//                 >
//                   <polyline points="20 6 9 17 4 12" />
//                 </svg>
//               </div>
//             </div>

//             {/* Name + qual + stars */}
//             <div className="flex-1 min-w-0 pt-0.5">
//               <h3 className="font-bold text-navy-700 text-[15.5px] leading-tight tracking-tight">
//                 Priya Sharma
//               </h3>
//               <p className="text-slate-500 text-[11.5px] mt-0.5">M.Sc. Mathematics · Delhi Univ.</p>
//               <div className="flex items-center gap-1.5 mt-2">
//                 <span className="text-amber-400 text-[11px] leading-none tracking-wide">★★★★★</span>
//                 <span className="text-slate-400 text-[11px]">4.9 · 126 reviews</span>
//               </div>
//             </div>
//           </div>

//           {/* ── Chips row ── */}
//           <div className="flex flex-wrap items-center gap-1.5 mb-3">
//             {[
//               { label: "CBSE",       bg: "rgba(59,130,246,0.1)",   border: "rgba(59,130,246,0.25)",  text: "#1d4ed8" },
//               { label: "7 yrs exp.", bg: "rgba(246,166,35,0.12)",  border: "rgba(246,166,35,0.28)",  text: "#92400e" },
//               { label: "Gaur City",  bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.25)",  text: "#065f46" },
//             ].map((c) => (
//               <span
//                 key={c.label}
//                 className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
//                 style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
//               >
//                 {c.label}
//               </span>
//             ))}
//           </div>

//           {/* ── Subject tags ── */}
//           <div className="flex flex-wrap gap-1.5 mb-4">
//             {[
//               { label: "Maths",   accent: true  },
//               { label: "Science", accent: false },
//               { label: "English", accent: true  },
//               { label: "Physics", accent: false },
//             ].map(({ label, accent }) => (
//               <span
//                 key={label}
//                 className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
//                 style={{
//                   background: accent ? "rgba(246,166,35,0.1)"    : "rgba(12,33,63,0.06)",
//                   color:      accent ? "#92540a"                  : "#475569",
//                   border:     `1px solid ${accent ? "rgba(246,166,35,0.25)" : "rgba(12,33,63,0.1)"}`,
//                 }}
//               >
//                 {label}
//               </span>
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="h-px bg-slate-100 mb-3" />

//           {/* Availability */}
//           <div className="flex items-center gap-2 mb-4">
//             <span className="relative flex h-2 w-2 flex-shrink-0">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
//             </span>
//             <span className="text-[12px] text-slate-500 font-medium">
//               Available · Gaur City &amp; Alpha 1
//             </span>
//           </div>

//           {/* CTA button */}
//           <button
//             className="w-full py-[11px] rounded-xl font-bold text-[13.5px] relative overflow-hidden"
//             style={{
//               background:  "linear-gradient(135deg, #F6A623, #ffb83a)",
//               color:       "#0C213F",
//               boxShadow:   "0 4px 16px rgba(246,166,35,0.4)",
//               transition:  "box-shadow 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(246,166,35,0.55)";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(246,166,35,0.4)";
//             }}
//           >
//             {/* Shimmer sweep — requires @keyframes shimmer in globals.css */}
//             <span
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background:     "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.32) 50%,transparent 60%)",
//                 backgroundSize: "200% 100%",
//                 animation:      "shimmer 2.5s linear infinite",
//               }}
//             />
//             <span className="relative z-10">Book Free Demo Class →</span>
//           </button>
//         </div>
//       </motion.div>

//       {/* ── Row 3: Bottom notif + subject pills (y 476-538) ── */}

//       {/* CENTRE notif – "Demo Confirmed"
//           Plain div handles centering; motion.div handles float animation only.
//           This avoids any conflict between CSS translateX(-50%) and framer-motion transforms. */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 22,
//           left: 0,
//           right: 0,
//           display: "flex",
//           justifyContent: "center",
//           zIndex: 20,
//           pointerEvents: "none",
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85 }}
//           animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
//           transition={{
//             opacity: { delay: 1.05, duration: 0.5 },
//             scale:   { delay: 1.05, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
//             y: { delay: 1.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="flex items-center gap-3 px-4 py-3 rounded-2xl"
//           style={{
//             background:     "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
//             border:         "1px solid rgba(255,255,255,0.18)",
//             backdropFilter: "blur(18px)",
//             WebkitBackdropFilter: "blur(18px)",
//             boxShadow:      "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
//             whiteSpace:     "nowrap",
//             pointerEvents:  "auto",
//           }}
//         >
//           <div
//             className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//             style={{ background: "rgba(246,166,35,0.22)" }}
//           >
//             <svg
//               width="14" height="14" viewBox="0 0 24 24"
//               fill="none" stroke="#F6A623" strokeWidth="2.5"
//               strokeLinecap="round" strokeLinejoin="round"
//             >
//               <rect x="3" y="4" width="18" height="18" rx="2" />
//               <line x1="16" y1="2" x2="16" y2="6" />
//               <line x1="8" y1="2" x2="8" y2="6" />
//               <line x1="3" y1="10" x2="21" y2="10" />
//             </svg>
//           </div>
//           <div>
//             <p className="text-white font-semibold text-[12.5px] leading-tight">Demo Confirmed</p>
//             <p className="text-white/55 text-[11px] mt-0.5">Tomorrow · 5:00 PM · FREE</p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom subject pills — flanking the demo notif (no overlap) */}
//       {SUBJECT_PILLS.slice(2).map((pill) => (
//         <motion.div
//           key={pill.label}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, y: [0, -9, 0] }}
//           transition={{
//             opacity: { delay: pill.delay, duration: 0.4 },
//             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
//           style={{
//             ...pill.pos,
//             background: pill.bg,
//             border: `1px solid ${pill.border}`,
//             color: pill.text,
//             zIndex: 15,
//           }}
//         >
//           {pill.label}
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// // ─── TickerStrip ──────────────────────────────────────────────────────────────

// function TickerStrip() {
//   // Duplicate items so the loop is seamless
//   const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
//   return (
//     <div
//       className="relative overflow-hidden z-10"
//       style={{
//         background:  "linear-gradient(90deg, #F6A623, #ffb83a)",
//         padding:     "10px 0",
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
//               width="12" height="12" viewBox="0 0 24 24"
//               fill="none" stroke="rgba(12,33,63,0.6)" strokeWidth="3"
//               strokeLinecap="round" strokeLinejoin="round"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//             <span className="text-[13px] font-bold text-navy-700 whitespace-nowrap">{item}</span>
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
//               transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//               className="font-display font-bold text-white leading-[1.1] tracking-tight text-balance mb-6"
//               style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
//             >
//               Find the{" "}
//               <span className="relative inline-block">
//                 <em className="not-italic text-gradient-saffron">Perfect Tutor</em>
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
//               transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
//                   transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
//                   whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
//                   className="inline-flex items-center mx-0.5 px-2.5 py-0.5 rounded-full text-[13px] font-bold cursor-default relative overflow-hidden align-middle"
//                   style={{
//                     background: board.color,
//                     border:     `1px solid ${board.border}`,
//                     color:      board.text,
//                   }}
//                 >
//                   {board.name}
//                 </motion.span>
//               ))}
//               {" "}— matched to your location within{" "}
//               <span className="text-white/90 font-semibold">24 hours</span>.
//             </motion.p>

//             {/* Trust pills */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="flex flex-wrap gap-2.5 mb-8"
//             >
//               {TRUST_PILLS.map((text, i) => (
//                 <motion.div
//                   key={text}
//                   initial={{ opacity: 0, scale: 0.88 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
//                   className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
//                   style={{
//                     background: "rgba(255,255,255,0.08)",
//                     border:     "1px solid rgba(255,255,255,0.12)",
//                   }}
//                 >
//                   <svg
//                     width="13" height="13" viewBox="0 0 24 24"
//                     fill="none" stroke="#F6A623" strokeWidth="3"
//                   >
//                     <polyline points="20 6 9 17 4 12" />
//                   </svg>
//                   <span className="text-white/80 font-medium text-sm">{text}</span>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="flex flex-col sm:flex-row gap-4 mb-10"
//             >
//               {/* ── Call Now ── */}
//               <div className="flex flex-col items-center sm:items-start gap-1.5">
//                 <motion.a
//                   href={`tel:${PHONE_RAW}`}
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.96 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                   className="relative inline-flex items-center gap-3 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden group"
//                   style={{
//                     background: "#F6A623",
//                     color:      "#0C213F",
//                     boxShadow:  "0 4px 24px rgba(246,166,35,0.4)",
//                   }}
//                 >
//                   {/* Shimmer sweep */}
//                   <span
//                     className="absolute inset-0 pointer-events-none"
//                     style={{
//                       background:     "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
//                       backgroundSize: "200% 100%",
//                       animation:      "shimmer 2.2s linear infinite",
//                     }}
//                   />
//                   {/* Pulse ring */}
//                   <span className="absolute inset-0 rounded-2xl animate-ping opacity-15 bg-saffron-400 pointer-events-none" />

//                   <span className="relative z-10 flex items-center gap-2.5">
//                     <motion.span
//                       animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
//                       transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
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

//               {/* ── WhatsApp ── */}
//               <div className="flex flex-col items-center sm:items-start gap-1.5">
//                 <motion.a
//                   href={WA_LINK(
//                     "Hello, I am looking for a home tutor in Greater Noida. Please help me find the right tutor for my child.",
//                   )}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(37,211,102,0.45)" }}
//                   whileTap={{ scale: 0.96 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                   className="relative inline-flex items-center gap-2.5 text-white font-bold rounded-2xl px-7 py-4 text-[15px] border overflow-hidden"
//                   style={{
//                     background:  "rgba(37,211,102,0.18)",
//                     borderColor: "rgba(37,211,102,0.45)",
//                     boxShadow:   "0 4px 20px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
//                   }}
//                 >
//                   <span className="relative z-10 flex items-center gap-2.5 text-white">
//                     <motion.span
//                       animate={{
//                         rotate: [0, -18, 18, -12, 12, -6, 6, 0],
//                         scale:  [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1],
//                       }}
//                       transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
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
//                 border:     "1px solid rgba(255,255,255,0.10)",
//               }}
//             >
//               <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
//               <span className="text-white/60 text-xs font-medium">
//                 Rated 5.0 by 17,000+ families across Greater Noida
//               </span>
//             </motion.div>
//           </div>

//           {/* ════════════════════════════════════
//               RIGHT — Tutor visual column
//           ════════════════════════════════════ */}
//           <TutorMatchVisual />
//         </div>
//       </div>

//       {/* ── Wave divider ── */}
//       <div
//         className="relative pointer-events-none"
//         aria-hidden="true"
//         style={{ lineHeight: 0, marginTop: "-2px" }}
//       >
//         <svg
//           viewBox="0 0 1440 80"
//           preserveAspectRatio="none"
//           xmlns="http://www.w3.org/2000/svg"
//           style={{ width: "100%", height: "clamp(40px, 5vw, 80px)", display: "block" }}
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

//       {/* ── Ticker strip ── */}
//       <TickerStrip />
//     </section>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";
import TrustBar from "./Trustbar";
import HeroConversionPanel from "./HeroConversionalPanel"

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST_PILLS = [
  "Free demo class",
  "Verified tutors",
  "24-hr matching",
  "Free replacement",
];

const STATS = [
  { target: 13,    suffix: "+", label: "Years of Trust",  icon: "🏆", desc: "Since 2011"         },
  { target: 17000, suffix: "+", label: "Happy Students",  icon: "👨‍👩‍👦", desc: "Across NCR"          },
  { target: 8000,  suffix: "+", label: "Verified Tutors", icon: "🛡️", desc: "Background checked"  },
];

const BOARDS = [
  { name: "CBSE",     color: "rgba(99,179,237,0.15)",  border: "rgba(99,179,237,0.35)",  text: "#93C5FD" },
  { name: "ICSE",     color: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.35)", text: "#C4B5FD" },
  { name: "UP Board", color: "rgba(246,166,35,0.15)",  border: "rgba(246,166,35,0.4)",   text: "#F6A623" },
];

const TICKER_ITEMS = [
  "Profile Shared Before Visit",
  "Free Demo Class",
  "Free Replacement",
  "24-Hour Matching",
  "CBSE · ICSE · UP Board",
  "5.0 Rated · 17,000+ Families",
  "Home & Online Tutors",
  "All Sectors · Greater Noida",
];

const MATCH_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    sub: "Class, subject & your area — takes 60 seconds",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    color: "#F6A623",
    colorBg: "rgba(246,166,35,0.15)",
    colorBorder: "rgba(246,166,35,0.3)",
  },
  {
    step: "02",
    title: "We match you in 24 hrs",
    sub: "Verified tutors near your area, checked & curated",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    color: "#93C5FD",
    colorBg: "rgba(99,179,237,0.12)",
    colorBorder: "rgba(99,179,237,0.28)",
  },
  {
    step: "03",
    title: "Attend your free demo",
    sub: "Zero payment, zero commitment — love it or replace free",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    color: "#6EE7B7",
    colorBg: "rgba(16,185,129,0.12)",
    colorBorder: "rgba(16,185,129,0.28)",
  },
];

// Subject pills — positioned outside the central card
const SUBJECT_PILLS = [
  { label: "Mathematics", bg: "rgba(246,166,35,0.15)", border: "rgba(246,166,35,0.35)", text: "#b45309", pos: { top: 12, left: 0 },    delay: 0.75, dur: 4.2 },
  { label: "Physics",     bg: "rgba(99,179,237,0.13)", border: "rgba(99,179,237,0.35)", text: "#1d4ed8", pos: { top: 12, right: 0 },   delay: 0.85, dur: 5.1 },
  { label: "Chemistry",   bg: "rgba(167,139,250,0.13)",border: "rgba(167,139,250,0.35)",text: "#5b21b6", pos: { bottom: 32, left: 0 }, delay: 1.0,  dur: 4.7 },
  { label: "Science",     bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)",  text: "#065f46", pos: { bottom: 32, right: 0 },delay: 1.1,  dur: 5.5 },
];

// ─── useCountUp ───────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startAt = performance.now() + delay * 1000;
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startAt);
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, delay]);

  return { count, ref };
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ target, suffix, label, icon, desc, delay }: {
  target: number; suffix: string; label: string; icon: string; desc: string; delay: number;
}) {
  const { count, ref } = useCountUp(target, 2000, delay);
  const formatted = count >= 1000 ? count.toLocaleString("en-IN") : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="flex-1 group cursor-default"
    >
      <div
        className="relative overflow-hidden rounded-2xl p-4 h-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
          transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(246,166,35,0.5)";
          el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(246,166,35,0.18)";
          el.style.background = "linear-gradient(135deg, rgba(246,166,35,0.14) 0%, rgba(255,255,255,0.06) 100%)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.12)";
          el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.12)";
          el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)";
        }}
      >
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, rgba(246,166,35,0.35) 0%, transparent 70%)" }} />

        <div className="text-2xl mb-3 leading-none">{icon}</div>

        <div className="flex items-baseline gap-0.5 mb-0.5">
          <span className="font-display font-bold text-white tabular-nums leading-none" style={{ fontSize: "clamp(24px, 3.2vw, 36px)" }}>
            {formatted}
          </span>
          <span className="font-display font-bold text-saffron-400 leading-none" style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
            {suffix}
          </span>
        </div>

        <div className="font-bold text-white/80 text-[13px] tracking-wide mb-0.5">{label}</div>
        <div className="text-[11px] font-medium text-white/35 group-hover:text-saffron-400/70 transition-colors duration-300 uppercase tracking-widest">
          {desc}
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(246,166,35,0.8), rgba(246,166,35,0))" }} />
      </div>
    </motion.div>
  );
}

// ─── BackgroundOrbs ───────────────────────────────────────────────────────────

function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(246,166,35,0.2) 0%, transparent 65%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(20,52,90,0.9) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 dot-grid-light opacity-40" />
      {[
        { top: "20%", left: "8%",  size: 5, delay: 0   },
        { top: "55%", left: "12%", size: 3, delay: 1.2 },
        { top: "35%", left: "90%", size: 4, delay: 0.6 },
        { top: "70%", left: "85%", size: 6, delay: 2   },
        { top: "15%", left: "50%", size: 3, delay: 1.5 },
        { top: "80%", left: "40%", size: 4, delay: 0.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className="absolute rounded-full bg-saffron-400"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}

// ─── FloatingNotif ────────────────────────────────────────────────────────────

function FloatingNotif({
  icon, iconBg, title, sub, delay, direction = 1, wrapperStyle,
}: {
  icon: React.ReactNode; iconBg: string; title: string; sub: string;
  delay: number; direction?: 1 | -1; wrapperStyle: React.CSSProperties;
}) {
  return (
    <div style={{ position: "absolute", zIndex: 20, ...wrapperStyle }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, y: [0, direction * -8, 0] }}
        transition={{
          opacity: { delay, duration: 0.5 },
          scale:   { delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
          y: { delay: delay + 0.55, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
          whiteSpace: "nowrap",
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
          {icon}
        </div>
        <div>
          <p className="text-white font-semibold text-[12.5px] leading-tight">{title}</p>
          <p className="text-white/55 text-[11px] mt-0.5">{sub}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── HeroConversionPanel ──────────────────────────────────────────────────────
//
//  The premium right-column replacement for the old form.
//  Shows the 3-step match flow on a glassmorphism card + floating social proof,
//  then drives users to /inquiry with a bold CTA.

// function HeroConversionPanel() {
//   const [activeStep, setActiveStep] = useState(0);

//   // Auto-cycle through steps
//   useEffect(() => {
//     const id = setInterval(() => setActiveStep((s) => (s + 1) % MATCH_STEPS.length), 2800);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div
//       className="relative hidden lg:block select-none"
//       style={{ height: 580, isolation: "isolate", overflow: "visible" }}
//     >
//       {/* Soft centred glow */}
//       <div
//         className="absolute pointer-events-none"
//         style={{
//           top: "50%", left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 340, height: 340, borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(246,166,35,0.08) 0%, transparent 70%)",
//         }}
//       />

//       {/* ── Row 1: Subject pills (above card) ── */}
//       {SUBJECT_PILLS.slice(0, 2).map((pill) => (
//         <motion.div
//           key={pill.label}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, y: [0, -9, 0] }}
//           transition={{
//             opacity: { delay: pill.delay, duration: 0.4 },
//             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
//           style={{ ...pill.pos, background: pill.bg, border: `1px solid ${pill.border}`, color: pill.text, zIndex: 15 }}
//         >
//           {pill.label}
//         </motion.div>
//       ))}

//       {/* ── Floating notifs (top) ── */}
//       <FloatingNotif
//         icon={
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points="20 6 9 17 4 12" />
//           </svg>
//         }
//         iconBg="rgba(37,211,102,0.22)"
//         title="Tutor Matched!"
//         sub="3 tutors near Gaur City"
//         delay={0.8}
//         direction={1}
//         wrapperStyle={{ top: 54, left: 0 }}
//       />
//       <FloatingNotif
//         icon={<span style={{ fontSize: 15, lineHeight: 1 }}>⭐</span>}
//         iconBg="rgba(251,191,36,0.22)"
//         title="4.9 Rating"
//         sub="126 verified reviews"
//         delay={0.92}
//         direction={-1}
//         wrapperStyle={{ top: 54, right: 0 }}
//       />

//       {/* ══════════════════════════════════════════
//           MAIN CONVERSION CARD
//       ══════════════════════════════════════════ */}
//       <motion.div
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute bg-white rounded-3xl overflow-hidden"
//         style={{
//           top: 122,
//           left: "50%",
//           x: "-50%",
//           width: 300,
//           zIndex: 10,
//           boxShadow: "0 32px 80px rgba(4,13,21,0.48), 0 0 0 1px rgba(255,255,255,0.06)",
//         }}
//       >
//         {/* Top colour bar */}
//         <div className="h-1.5" style={{ background: "linear-gradient(90deg, #F6A623, #ffb83a, #F6A623)" }} />

//         <div className="p-6">

//           {/* ── Card header ── */}
//           <div className="mb-5">
//             <div className="flex items-center gap-2 mb-1.5">
//               <div
//                 className="w-7 h-7 rounded-lg flex items-center justify-center"
//                 style={{ background: "linear-gradient(135deg, #0C2340, #1D5290)" }}
//               >
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
//                   <circle cx="9" cy="7" r="4"/>
//                   <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
//                 </svg>
//               </div>
//               <h2 className="font-display font-bold text-navy-700 text-[15.5px] leading-tight">
//                 Find Your Perfect Tutor
//               </h2>
//             </div>
//             <p className="text-slate-500 text-[11.5px] leading-relaxed">
//               3 simple steps · completely free · results in 24 hrs
//             </p>
//           </div>

//           {/* ── Steps ── */}
//           <div className="space-y-3 mb-5">
//             {MATCH_STEPS.map((s, i) => {
//               const isActive = activeStep === i;
//               const isDone   = activeStep > i;
//               return (
//                 <motion.div
//                   key={s.step}
//                   animate={{
//                     background: isActive
//                       ? s.colorBg
//                       : isDone
//                       ? "rgba(16,185,129,0.06)"
//                       : "rgba(12,33,63,0.03)",
//                     borderColor: isActive
//                       ? s.colorBorder
//                       : isDone
//                       ? "rgba(16,185,129,0.2)"
//                       : "rgba(12,33,63,0.07)",
//                   }}
//                   transition={{ duration: 0.4, ease: "easeInOut" }}
//                   className="flex items-start gap-3 rounded-xl px-3.5 py-3 border cursor-default"
//                   onClick={() => setActiveStep(i)}
//                 >
//                   {/* Step icon / done check */}
//                   <motion.div
//                     animate={{
//                       background: isDone
//                         ? "linear-gradient(135deg, #10b981, #059669)"
//                         : isActive
//                         ? `linear-gradient(135deg, ${s.color}, ${s.color}cc)`
//                         : "rgba(12,33,63,0.08)",
//                       color: isDone || isActive ? "white" : "#94a3b8",
//                     }}
//                     transition={{ duration: 0.35 }}
//                     className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
//                   >
//                     <AnimatePresence mode="wait">
//                       {isDone ? (
//                         <motion.span
//                           key="check"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           exit={{ scale: 0 }}
//                           transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                         >
//                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                             <polyline points="20 6 9 17 4 12" />
//                           </svg>
//                         </motion.span>
//                       ) : (
//                         <motion.span key="icon" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
//                           {s.icon}
//                         </motion.span>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between gap-1 mb-0.5">
//                       <p className="text-[12.5px] font-bold text-navy-700 leading-tight">{s.title}</p>
//                       <span
//                         className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-full shrink-0"
//                         style={{
//                           background: isActive ? s.colorBg : "transparent",
//                           color: isActive ? s.color : "#cbd5e1",
//                           border: `1px solid ${isActive ? s.colorBorder : "transparent"}`,
//                         }}
//                       >
//                         {s.step}
//                       </span>
//                     </div>
//                     <p className="text-[11px] text-slate-400 leading-relaxed">{s.sub}</p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* ── Progress dots ── */}
//           <div className="flex items-center justify-center gap-1.5 mb-5">
//             {MATCH_STEPS.map((_, i) => (
//               <motion.div
//                 key={i}
//                 animate={{
//                   width:      activeStep === i ? 20 : 6,
//                   background: activeStep === i ? "#F6A623" : activeStep > i ? "#10b981" : "rgba(12,33,63,0.12)",
//                 }}
//                 transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//                 className="h-1.5 rounded-full cursor-pointer"
//                 onClick={() => setActiveStep(i)}
//               />
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="h-px bg-slate-100 mb-4" />

//           {/* ── Social proof micro-row ── */}
//           <div className="flex items-center justify-between mb-4 px-0.5">
//             {[
//               { val: "17K+",  label: "Families" },
//               { val: "8K+",   label: "Tutors" },
//               { val: "5.0★",  label: "Rated" },
//             ].map(({ val, label }) => (
//               <div key={label} className="flex flex-col items-center gap-0.5">
//                 <span className="font-display font-bold text-navy-700 text-[15px] leading-none tabular-nums">{val}</span>
//                 <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{label}</span>
//               </div>
//             ))}
//           </div>

//           {/* ── Primary CTA ── */}
//           <Link href="/inquiry" className="block">
//             <motion.div
//               whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(246,166,35,0.55)" }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ type: "spring", stiffness: 400, damping: 20 }}
//               className="relative w-full py-[13px] rounded-xl font-bold text-[14px] overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
//               style={{
//                 background: "linear-gradient(135deg, #F6A623, #ffb83a)",
//                 color: "#0C213F",
//                 boxShadow: "0 6px 22px rgba(246,166,35,0.45)",
//               }}
//             >
//               {/* Shimmer */}
//               <span
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                   background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.32) 50%,transparent 60%)",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 2.5s linear infinite",
//                 }}
//               />
//               <span className="relative z-10 flex items-center gap-2">
//                 Get Matched — It&apos;s Free
//                 <motion.span
//                   animate={{ x: [0, 4, 0] }}
//                   transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   →
//                 </motion.span>
//               </span>
//             </motion.div>
//           </Link>

//           {/* ── Ghost secondary CTA ── */}
//           <p className="text-center mt-3 text-[11.5px] text-slate-400 font-medium">
//             No payment · No lock-in ·{" "}
//             <a
//               href={`tel:+${PHONE_RAW}`}
//               className="text-navy-600 font-semibold hover:text-saffron-500 transition-colors underline underline-offset-2"
//             >
//               or just call us
//             </a>
//           </p>
//         </div>

//         {/* ── Bottom trust strip ── */}
//         <div
//           className="border-t border-slate-100 px-6 py-3 flex items-center justify-center gap-5 flex-wrap"
//           style={{ background: "#F8FAFD" }}
//         >
//           {[
//             { icon: "🔒", text: "100% Secure" },
//             { icon: "🎁", text: "Always Free" },
//             { icon: "🔄", text: "Free Replacement" },
//           ].map(({ icon, text }) => (
//             <span key={text} className="text-[10.5px] font-semibold text-ink-muted flex items-center gap-1">
//               {icon} {text}
//             </span>
//           ))}
//         </div>
//       </motion.div>

//       {/* ── Bottom notif (Demo Confirmed) ── */}
//       <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 20, pointerEvents: "none" }}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85 }}
//           animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
//           transition={{
//             opacity: { delay: 1.05, duration: 0.5 },
//             scale:   { delay: 1.05, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
//             y: { delay: 1.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="flex items-center gap-3 px-4 py-3 rounded-2xl"
//           style={{
//             background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
//             border: "1px solid rgba(255,255,255,0.18)",
//             backdropFilter: "blur(18px)",
//             WebkitBackdropFilter: "blur(18px)",
//             boxShadow: "0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
//             whiteSpace: "nowrap",
//             pointerEvents: "auto",
//           }}
//         >
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//             style={{ background: "rgba(246,166,35,0.22)" }}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="4" width="18" height="18" rx="2" />
//               <line x1="16" y1="2" x2="16" y2="6" />
//               <line x1="8" y1="2" x2="8" y2="6" />
//               <line x1="3" y1="10" x2="21" y2="10" />
//             </svg>
//           </div>
//           <div>
//             <p className="text-white font-semibold text-[12.5px] leading-tight">Demo Confirmed</p>
//             <p className="text-white/55 text-[11px] mt-0.5">Tomorrow · 5:00 PM · FREE</p>
//           </div>
//         </motion.div>
//       </div>

//       {/* ── Bottom subject pills ── */}
//       {SUBJECT_PILLS.slice(2).map((pill) => (
//         <motion.div
//           key={pill.label}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, y: [0, -9, 0] }}
//           transition={{
//             opacity: { delay: pill.delay, duration: 0.4 },
//             y: { delay: pill.delay + 0.4, duration: pill.dur, repeat: Infinity, ease: "easeInOut" },
//           }}
//           className="absolute px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
//           style={{ ...pill.pos, background: pill.bg, border: `1px solid ${pill.border}`, color: pill.text, zIndex: 15 }}
//         >
//           {pill.label}
//         </motion.div>
//       ))}
//     </div>
//   );
// }


// ─── TickerStrip ──────────────────────────────────────────────────────────────

function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden z-10" style={{ background: "linear-gradient(90deg, #F6A623, #ffb83a)", padding: "10px 0" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex items-center will-change-transform"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 flex-shrink-0"
            style={{ borderRight: "1.5px solid rgba(12,33,63,0.18)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(12,33,63,0.6)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[13px] font-bold text-navy-700 whitespace-nowrap">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}



// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Find a home tutor in Greater Noida"
      className="relative bg-navy-700 overflow-hidden"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      <BackgroundOrbs />

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">

          {/* ════════════════════════════════════
              LEFT — Copy column
          ════════════════════════════════════ */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron-400" />
              </span>
              <span className="text-saffron-400 font-bold uppercase tracking-widest" style={{ fontSize: "11.5px" }}>
                Greater Noida's #1 Tuition Bureau Since 2011
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-[1.1] tracking-tight text-balance mb-6"
              style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
            >
              Find the{" "}
              <span className="relative inline-block">
                <em className="not-italic text-gradient-saffron">Perfect Tutor</em>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full overflow-visible"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  height="10"
                >
                  <motion.path
                    d="M 0 8 Q 50 2, 100 7 Q 150 12, 200 6"
                    fill="none" stroke="#F6A623" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>{" "}
              for Your Child in Greater Noida
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/65 leading-relaxed mb-8 max-w-xl"
              style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
            >
              Verified, background-checked home tutors for{" "}
              <span className="text-white/90 font-semibold">Classes 1–12</span>.{" "}
              All subjects across{" "}
              {BOARDS.map((board, i) => (
                <motion.span
                  key={board.name}
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                  className="inline-flex items-center mx-0.5 px-2.5 py-0.5 rounded-full text-[13px] font-bold cursor-default relative overflow-hidden align-middle"
                  style={{ background: board.color, border: `1px solid ${board.border}`, color: board.text }}
                >
                  {board.name}
                </motion.span>
              ))}
              {" "}— matched to your location within{" "}
              <span className="text-white/90 font-semibold">24 hours</span>.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {TRUST_PILLS.map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6A623" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white/80 font-medium text-sm">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              {/* Call Now */}
              <div className="flex flex-col items-center sm:items-start gap-1.5">
                <motion.a
                  href={`tel:${PHONE_RAW}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative inline-flex items-center gap-3 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden group"
                  style={{ background: "#F6A623", color: "#0C213F", boxShadow: "0 4px 24px rgba(246,166,35,0.4)" }}
                >
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2.2s linear infinite",
                    }}
                  />
                  <span className="absolute inset-0 rounded-2xl animate-ping opacity-15 bg-saffron-400 pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    <motion.span
                      animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <PhoneIcon size={18} />
                    </motion.span>
                    Call Now
                  </span>
                  <span className="relative z-10 text-navy-700 inline-flex overflow-hidden w-0 group-hover:w-5 transition-all duration-300 ease-out">→</span>
                </motion.a>
                <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">⚡ Instant response</span>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center sm:items-start gap-1.5">
                <motion.a
                  href={WA_LINK("Hello, I am looking for a home tutor in Greater Noida. Please help me find the right tutor for my child.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(37,211,102,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative inline-flex items-center gap-2.5 text-white font-bold rounded-2xl px-7 py-4 text-[15px] border overflow-hidden"
                  style={{
                    background: "rgba(37,211,102,0.18)",
                    borderColor: "rgba(37,211,102,0.45)",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2.5 text-white">
                    <motion.span
                      animate={{ rotate: [0, -18, 18, -12, 12, -6, 6, 0], scale: [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    >
                      <WhatsAppIcon size={18} />
                    </motion.span>
                    WhatsApp Us
                  </span>
                </motion.a>
                <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">🟢 Usually replies in minutes</span>
              </div>

              {/* ── Mobile-only: Find Tutor CTA ── */}
              <div className="flex lg:hidden flex-col items-center sm:items-start gap-1.5">
                <Link href="/inquiry">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative inline-flex items-center gap-2.5 font-bold rounded-2xl px-7 py-4 text-[15px] overflow-hidden border border-white/20"
                    style={{ background: "rgba(255,255,255,0.07)", color: "white" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    Find My Tutor — Free
                  </motion.div>
                </Link>
                <span className="text-[11px] text-white/40 font-medium tracking-wide pl-1">📋 Fill a 60-sec form</span>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="flex items-stretch gap-3">
              {STATS.map(({ target, suffix, label, icon, desc }, i) => (
                <StatCard
                  key={label}
                  target={target}
                  suffix={suffix}
                  label={label}
                  icon={icon}
                  desc={desc}
                  delay={0.65 + i * 0.12}
                />
              ))}
            </div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
              <span className="text-white/60 text-xs font-medium">
                Rated 5.0 by 17,000+ families across Greater Noida
              </span>
            </motion.div>
          </div>

          {/* ════════════════════════════════════
              RIGHT — Premium conversion panel
          ════════════════════════════════════ */}
          {/* <HeroConversionPanel /> */}

          <HeroConversionPanel/>
          
          
          
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative pointer-events-none" aria-hidden="true" style={{ lineHeight: 0, marginTop: "-2px" }}>
        <svg
          viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "clamp(40px, 5vw, 80px)", display: "block" }}
        >
          <defs>
            <linearGradient id="hero-wave-shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(12,35,64,0.12)" />
              <stop offset="100%" stopColor="rgba(12,35,64,0)" />
            </linearGradient>
          </defs>
          <path d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 80 L0 80 Z" fill="url(#hero-wave-shadow)" />
          <path d="M0 20 Q360 80 720 46 Q1080 12 1440 66 L1440 80 L0 80 Z" fill="#F6A623" />
        </svg>
      </div>
      <TrustBar/>

      {/* Ticker strip */}
      {/* <TickerStrip /> */}
    </section>
  );
}