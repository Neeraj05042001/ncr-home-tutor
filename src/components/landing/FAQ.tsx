"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn, PHONE_RAW, WA_LINK } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",     label: "All Questions", icon: "✦" },
  { id: "process", label: "Process",       icon: "⚡" },
  { id: "tutors",  label: "Tutors",        icon: "👤" },
  { id: "fees",    label: "Fees",          icon: "💰" },
  { id: "boards",  label: "Boards",        icon: "📚" },
] as const;

type CatId = typeof CATEGORIES[number]["id"];

const FAQS: {
  q: string;
  a: string;
  cat: CatId;
  popular?: boolean;
}[] = [
  {
    q: "Is the first demo class really free? What's the catch?",
    a: "Completely free — no registration fee, no deposit, no payment of any kind. The demo is your chance to evaluate the tutor's teaching style before committing to anything. Only if you're satisfied and choose to continue do you pay the tutor directly. We've operated this way since 2011 and have no intention of changing it.",
    cat: "process",
    popular: true,
  },
  {
    q: "How quickly can a tutor be arranged?",
    a: "We typically share matching tutor profiles within 24 hours of your call or WhatsApp. For most areas in Greater Noida, the first demo class can be arranged within 24–48 hours. Some less common subjects or very specific requirements may take an extra day — we'll tell you upfront.",
    cat: "process",
    popular: true,
  },
  {
    q: "What if my child doesn't like the tutor?",
    a: "Call or WhatsApp us and we'll arrange a replacement at no extra charge. No awkward conversations, no delay, no fine print. This has been our policy since day one. The replacement tutor goes through the same verification process as the first.",
    cat: "process",
    popular: true,
  },
  {
    q: "How do you verify tutors before sending them home?",
    a: "Every tutor goes through two layers before joining our network: identity verification (government-issued ID) and qualification check (we verify their educational certificates and relevant teaching experience). We also share the tutor's profile — photo, qualifications, experience summary — on WhatsApp before their first visit, so you know exactly who is coming.",
    cat: "tutors",
    popular: true,
  },
  {
    q: "What are the typical tutor fees in Greater Noida?",
    a: "Fees vary based on class level, subject, number of sessions per week, and tutor experience. As a rough guide: primary classes (1–5) typically start from ₹2,000–₹3,500/month; middle school (6–8) from ₹3,000–₹4,500/month; high school PCM/PCB (11–12) can range from ₹4,000–₹7,000/month. We'll give you a clear fee range when you call — no hidden charges.",
    cat: "fees",
  },
  {
    q: "Do you charge a registration or service fee?",
    a: "No. We don't charge parents any registration, placement, or service fee. You pay the tutor directly at the agreed monthly rate. That's it. Our business model has worked this way for 13 years.",
    cat: "fees",
    popular: true,
  },
  {
    q: "Which boards do your tutors cover?",
    a: "CBSE, ICSE, UP Board, and IGCSE. Our tutors are board-specific — we don't send a CBSE-focused tutor to a UP Board student and expect it to work. When you call, tell us your board and we match accordingly.",
    cat: "boards",
  },
  {
    q: "Can you find tutors for UP Board specifically?",
    a: "Yes. UP Board has a different syllabus, exam pattern, and marking scheme than CBSE. We have tutors who specifically teach UP Board Hindi, Maths, Science, and other subjects and know the board's exam expectations in depth.",
    cat: "boards",
  },
  {
    q: "Do you provide online tutors as well?",
    a: "Yes — both home (in-person) and online (via Zoom or Google Meet). Online tutoring became a significant part of our service during COVID and we kept it as a permanent option. Let us know your preference when you reach out.",
    cat: "process",
  },
  {
    q: "What subjects and classes do you cover?",
    a: "Nursery through Class 12 across all subjects — Maths, Science, Physics, Chemistry, Biology, English, Hindi, Social Science, Accountancy, Business Studies, Economics, Computer Science, Sanskrit, and more. For graduation-level subjects, availability depends on the subject — just ask.",
    cat: "boards",
  },
  {
    q: "How experienced are the tutors you send?",
    a: "It varies — we have both fresh B.Ed graduates and tutors with 10+ years of experience. What we verify in every case is their qualification and subject knowledge. When you call, you can specify if you need a highly experienced tutor, and we'll filter accordingly.",
    cat: "tutors",
  },
  {
    q: "What areas in Greater Noida do you cover?",
    a: "All major sectors — Alpha, Beta, Gamma, Delta, Omega, Zeta, Gaur City, Noida Extension, Pari Chowk, Knowledge Park, Sector Pi, Techzone, Sector 93, 137, Chi, Phi, Mu, Eta, Swarna Nagri, Surajpur, and more. If your sector isn't listed, call us — we likely cover it.",
    cat: "process",
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group rounded-2xl overflow-hidden border transition-all duration-300",
        isOpen
          ? "border-saffron-400/40 shadow-saffron"
          : "border-border hover:border-saffron-400/25"
      )}
      style={{
        background: isOpen
          ? "linear-gradient(135deg, rgba(246,166,35,0.04) 0%, rgba(255,255,255,1) 30%)"
          : "#ffffff",
        boxShadow: isOpen
          ? "0 8px 32px rgba(246,166,35,0.1), 0 1px 0 rgba(246,166,35,0.2)"
          : "0 1px 4px rgba(12,35,64,0.06)",
      }}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-6 py-5 text-left outline-none group"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={cn(
            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5 transition-all duration-300",
            isOpen
              ? "bg-saffron-400 text-navy-700"
              : "bg-surface-3 text-ink-muted group-hover:bg-saffron-100 group-hover:text-saffron-600"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "font-bold leading-snug transition-colors duration-200 pr-2",
                isOpen ? "text-navy-700" : "text-navy-700 group-hover:text-saffron-600"
              )}
              style={{ fontSize: "clamp(14px, 1.8vw, 16px)" }}
            >
              {faq.q}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Popular badge */}
              {faq.popular && !isOpen && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="hidden sm:inline-flex text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(246,166,35,0.12)", color: "#E09010" }}
                >
                  Popular
                </motion.span>
              )}
              {/* Chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                  isOpen
                    ? "bg-saffron-400 text-navy-700"
                    : "bg-surface-3 text-ink-muted group-hover:bg-saffron-100"
                )}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pl-[72px]">
              {/* Divider */}
              <div
                className="mb-4 h-px"
                style={{ background: "linear-gradient(90deg, rgba(246,166,35,0.3), transparent)" }}
              />
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="text-ink-secondary leading-relaxed"
                style={{ fontSize: "clamp(13.5px, 1.6vw, 15px)" }}
              >
                {faq.a}
              </motion.p>

              {/* Still have questions CTA inline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4 flex items-center gap-3"
              >
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-saffron-500 hover:text-saffron-600 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
                  </svg>
                  Still have a question? Call us
                </a>
                <span className="text-ink-muted text-[11px]">or</span>
                <a
                  href={WA_LINK(`Hi, I have a question: ${faq.q}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-whatsapp hover:opacity-80 transition-opacity"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
                  </svg>
                  Ask on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FAQ() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [openIdx, setOpenIdx]     = useState<number | null>(0); // first open by default
  const [activecat, setActivecat] = useState<CatId>("process");

  const filtered = activecat === "all"
    ? FAQS
    : FAQS.filter(f => f.cat === activecat);

  const toggle = (i: number) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <section
      id="faq"
      ref={ref}
      aria-label="Frequently asked questions"
      className="relative bg-surface section-pad overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(246,166,35,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* ── Layout: Header left + FAQ right on desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 xl:gap-20 items-start">

          {/* ── Left: Sticky header + CTA ── */}
          <div className="lg:sticky lg:top-28">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-eyebrow mb-4"
            >
              Frequently Asked
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-navy-700 leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Everything Parents
              Want to{" "}
              <em className="not-italic text-gradient-saffron">Know First</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-ink-secondary text-[15px] leading-relaxed mb-8"
            >
              Every question parents ask before calling us —
              answered honestly, no fluff.
            </motion.p>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {CATEGORIES.map(cat => (
                <motion.button
                  key={cat.id}
                  onClick={() => { setActivecat(cat.id); setOpenIdx(null); }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] font-bold",
                    "transition-all duration-200 outline-none",
                    activecat === cat.id
                      ? "bg-navy-700 text-white shadow-sm"
                      : "bg-surface-3 text-ink-secondary hover:bg-saffron-100 hover:text-saffron-600 border border-border"
                  )}
                >
                  <span className="text-sm leading-none">{cat.icon}</span>
                  {cat.label}
                  {/* Count */}
                  <span
                    className={cn(
                      "text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center",
                      activecat === cat.id ? "bg-saffron-400 text-navy-700" : "bg-border text-ink-muted"
                    )}
                  >
                    {cat.id === "all" ? FAQS.length : FAQS.filter(f => f.cat === cat.id).length}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="rounded-2xl p-5 border border-border"
              style={{
                background: "linear-gradient(135deg, rgba(12,35,64,0.03) 0%, rgba(246,166,35,0.03) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(246,166,35,0.12)" }}
                >
                  💬
                </div>
                <div>
                  <div className="font-bold text-navy-700 text-[14px]">
                    Still have questions?
                  </div>
                  <div className="text-ink-muted text-[12px]">
                    We answer within 2 hours
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="inline-flex items-center justify-center gap-2 font-bold text-[13px] rounded-xl py-2.5 transition-colors"
                  style={{ background: "#0C2340", color: "#ffffff" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
                  </svg>
                  Call
                </a>
                <a
                  href={WA_LINK("Hi, I have a question about your tutoring service.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-bold text-[13px] rounded-xl py-2.5 hover:opacity-90 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right: FAQ List ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activecat}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                {filtered.map((faq, i) => (
                  <FAQItem
                    key={`${activecat}-${i}`}
                    faq={faq}
                    index={i}
                    isOpen={openIdx === i}
                    onToggle={() => toggle(i)}
                    inView={inView}
                  />
                ))}

                {/* Empty state */}
                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 text-ink-muted text-sm"
                  >
                    No questions in this category yet.
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true" style={{ lineHeight: 0 }}>
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "60px", display: "block" }}>
    <path d="M0 60 L0 40 Q240 0 480 32 Q720 60 960 24 Q1200 0 1440 36 L1440 60 Z" fill="#0A1E37" />
  </svg>
</div>
    </section>
  );
}