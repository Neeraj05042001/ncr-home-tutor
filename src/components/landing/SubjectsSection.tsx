"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All", icon: "✦" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "maths", label: "Mathematics", icon: "📐" },
  { id: "commerce", label: "Commerce", icon: "📊" },
  { id: "language", label: "Languages", icon: "🔤" },
  { id: "other", label: "Others", icon: "🎨" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const SUBJECTS: {
  name: string;
  cat: CategoryId;
  icon: string;
  color: string;
  bg: string;
  border: string;
  popular?: boolean;
  classes: string;
}[] = [
  {
    name: "Mathematics",
    cat: "maths",
    icon: "📐",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    popular: true,
    classes: "Class 1–12",
  },
  {
    name: "Physics",
    cat: "science",
    icon: "⚛️",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    popular: true,
    classes: "Class 9–12",
  },
  {
    name: "Chemistry",
    cat: "science",
    icon: "🧪",
    color: "#10B981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    popular: true,
    classes: "Class 9–12",
  },
  {
    name: "Biology",
    cat: "science",
    icon: "🧬",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
    classes: "Class 9–12",
  },
  {
    name: "Science",
    cat: "science",
    icon: "🔬",
    color: "#0891B2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.2)",
    classes: "Class 1–8",
  },
  {
    name: "English",
    cat: "language",
    icon: "🔤",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    popular: true,
    classes: "Class 1–12",
  },
  {
    name: "Hindi",
    cat: "language",
    icon: "🇮🇳",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    classes: "Class 1–12",
  },
  {
    name: "Social Science",
    cat: "other",
    icon: "🌍",
    color: "#84CC16",
    bg: "rgba(132,204,22,0.08)",
    border: "rgba(132,204,22,0.2)",
    classes: "Class 1–10",
  },
  {
    name: "Accountancy",
    cat: "commerce",
    icon: "📊",
    color: "#F6A623",
    bg: "rgba(246,166,35,0.08)",
    border: "rgba(246,166,35,0.2)",
    popular: true,
    classes: "Class 11–12",
  },
  {
    name: "Business Studies",
    cat: "commerce",
    icon: "💼",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    classes: "Class 11–12",
  },
  {
    name: "Economics",
    cat: "commerce",
    icon: "📈",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.2)",
    classes: "Class 11–12",
  },
  {
    name: "Computer Science",
    cat: "science",
    icon: "💻",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.2)",
    classes: "Class 9–12",
  },
  {
    name: "Sanskrit",
    cat: "language",
    icon: "📜",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    classes: "Class 5–10",
  },
  {
    name: "Drawing / Art",
    cat: "other",
    icon: "🎨",
    color: "#F97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    classes: "All Classes",
  },
  {
    name: "EVS",
    cat: "science",
    icon: "🌱",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
    classes: "Class 1–5",
  },
  {
    name: "Maths (Nursery)",
    cat: "maths",
    icon: "🔢",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
    classes: "Nursery–KG",
  },
];

const CLASS_GROUPS = [
  {
    label: "Nursery & Primary",
    range: "Nursery – Class 5",
    icon: "🌟",
    color: "#F59E0B",
    subjects: ["Maths", "English", "Hindi", "EVS", "Drawing", "All Subjects"],
  },
  {
    label: "Middle School",
    range: "Class 6 – 8",
    icon: "📖",
    color: "#3B82F6",
    subjects: [
      "Maths",
      "Science",
      "English",
      "Hindi",
      "Social Science",
      "Computer",
    ],
  },
  {
    label: "High School",
    range: "Class 9 – 10",
    icon: "🎯",
    color: "#8B5CF6",
    subjects: ["Maths", "Physics", "Chemistry", "Biology", "English", "S.St"],
  },
  {
    label: "Senior Secondary",
    range: "Class 11 – 12",
    icon: "🏆",
    color: "#10B981",
    subjects: [
      "PCM / PCB",
      "Accountancy",
      "Economics",
      "Business Studies",
      "English",
    ],
  },
];

// ─── TabBtn — with spring count badge ────────────────────────────────────────

function TabBtn({
  cat,
  active,
  onClick,
}: {
  cat: (typeof CATEGORIES)[number];
  active: boolean;
  onClick: () => void;
}) {
  const count =
    cat.id === "all"
      ? SUBJECTS.length
      : SUBJECTS.filter((s) => s.cat === cat.id).length;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold",
        "transition-colors duration-200 outline-none whitespace-nowrap",
        active
          ? "bg-navy-700 text-white shadow-lg"
          : "bg-white text-ink-secondary border border-border hover:border-navy-700/30 hover:text-navy-700",
      )}
    >
      <span className="text-base leading-none">{cat.icon}</span>
      {cat.label}

      {/* Spring count badge */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="inline-flex items-center justify-center text-[10px] font-black rounded-full min-w-[18px] h-[18px] px-1"
            style={{ background: "#F6A623", color: "#0C2340" }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>

      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 rounded-full bg-navy-700 -z-10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// ─── SubjectCard — scroll-triggered stagger ───────────────────────────────────

function SubjectCard({
  subject,
  index,
  inView,
}: {
  subject: (typeof SUBJECTS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.88, y: 16 }
      }
      exit={{ opacity: 0, scale: 0.85, y: 8 }}
      transition={{
        delay: index * 0.04,
        duration: 0.42,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="relative group cursor-default"
    >
      <div
        className="relative rounded-2xl p-4 h-full overflow-hidden border transition-all duration-300"
        style={{
          background: subject.bg,
          borderColor: subject.border,
          boxShadow: "0 1px 8px rgba(12,35,64,0.04)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = `0 8px 28px ${subject.bg.replace("0.08", "0.25")}`;
          el.style.borderColor = subject.color;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 1px 8px rgba(12,35,64,0.04)";
          el.style.borderColor = subject.border;
        }}
      >
        {subject.popular && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.04 + 0.3,
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
            className="absolute top-2.5 right-2.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: subject.color, color: "#fff" }}
          >
            Popular
          </motion.div>
        )}

        <div className="text-2xl mb-3 leading-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">
          {subject.icon}
        </div>
        <div
          className="font-display font-bold text-[14px] leading-tight mb-1.5"
          style={{ color: subject.color }}
        >
          {subject.name}
        </div>
        <div className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest">
          {subject.classes}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${subject.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── ClassGroupCard — entrance + idle float ───────────────────────────────────

function ClassGroupCard({
  group,
  index,
  inView,
}: {
  group: (typeof CLASS_GROUPS)[0];
  index: number;
  inView: boolean;
}) {
  // Float phase offset per card (0°, 90°, 180°, 270°)
  const floatDelay = index * 0.9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-white rounded-2xl p-6 border border-border cursor-default group overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(12,35,64,0.06)" }}
    >
      {/* Idle float as separate child so hover override works cleanly */}
      <motion.div
        animate={inView ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{
          y: {
            delay: floatDelay,
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Hover lift on the real content */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative z-10"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${group.color}18` }}
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{
              duration: 0.65,
              repeat: Infinity,
              repeatDelay: 3 + index * 0.8,
              ease: "easeInOut",
            }}
          >
            {group.icon}
          </motion.div>
          <div>
            <div className="font-display font-bold text-navy-700 text-[15px] leading-tight">
              {group.label}
            </div>
            <div
              className="text-[11px] font-bold uppercase tracking-wider mt-0.5"
              style={{ color: group.color }}
            >
              {group.range}
            </div>
          </div>
        </div>

        {/* Subject tags */}
        <div className="flex flex-wrap gap-1.5">
          {group.subjects.map((s) => (
            <span
              key={s}
              className="inline-flex items-center text-[11.5px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `${group.color}12`,
                color: group.color,
                border: `1px solid ${group.color}30`,
              }}
            >
              {s}
            </span>
          ))}
          <span
            className="inline-flex items-center text-[11.5px] font-semibold px-2.5 py-1 rounded-full text-ink-muted"
            style={{
              background: "rgba(12,35,64,0.05)",
              border: "1px solid rgba(12,35,64,0.08)",
            }}
          >
            + more
          </span>
        </div>
      </motion.div>

      {/* Bottom accent on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function SubjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [activeTab, setActiveTab] = useState<CategoryId>("all");

  const filtered =
    activeTab === "all"
      ? SUBJECTS
      : SUBJECTS.filter((s) => s.cat === activeTab);

  return (
    <section
      id="subjects"
      ref={ref}
      aria-label="Subjects and classes covered"
      className="relative bg-surface-2 section-pad overflow-hidden"
    >
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,35,64,0.03) 0%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-6 h-px bg-saffron-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-saffron-500">
              Full Subject Coverage
            </span>
            <span className="w-6 h-px bg-saffron-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.1,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-bold text-navy-700 leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Whatever Your Child Needs —{" "}
            <em className="not-italic text-gradient-saffron">
              We Have It Covered
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-ink-secondary text-[16px] leading-relaxed max-w-xl mx-auto"
          >
            From Nursery to Class 12. Every board, every subject. Tutors who
            know your syllabus inside out.
          </motion.p>
        </div>

        {/* Class Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {CLASS_GROUPS.map((group, i) => (
            <ClassGroupCard key={i} group={group} index={i} inView={inView} />
          ))}
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="flex items-center gap-2.5 flex-wrap justify-center mb-8"
        >
          {CATEGORIES.map((cat) => (
            <TabBtn
              key={cat.id}
              cat={cat}
              active={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
            />
          ))}
        </motion.div>

        {/* Subjects Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((subject, i) => (
              <SubjectCard
                key={subject.name}
                subject={subject}
                index={i}
                inView={inView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-2xl"
          style={{
            background: "rgba(12,35,64,0.04)",
            border: "1px solid rgba(12,35,64,0.08)",
          }}
        >
          <p className="text-sm text-ink-secondary text-center sm:text-left">
            <span className="font-bold text-navy-700">
              Don't see your subject?
            </span>{" "}
            We likely cover it — our network spans 40+ subjects. Just ask.
          </p>
          <motion.a
            href="tel:+918076661356"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(246,166,35,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative inline-flex items-center gap-2 font-bold text-sm rounded-full px-5 py-2.5 flex-shrink-0 overflow-hidden"
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z" />
            </svg>
            <span className="relative z-10">Ask Us</span>
          </motion.a>
        </motion.div>
      </div>
     

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{ lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "52px", display: "block" }}
        >
          <path
            d="M0 52 L0 30 Q360 0 720 26 Q1080 52 1440 14 L1440 52 Z"
            fill="#0C2340"
          />
        </svg>
      </div>
    </section>
  );
}
