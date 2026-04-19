"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CLASSES = [
  "Nursery / KG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
  "Graduation Level",
];

const BOARDS = ["CBSE", "ICSE", "UP Board", "IGCSE", "Other"];

const SUBJECTS_BY_LEVEL = {
  primary: [
    "All Subjects",
    "Mathematics",
    "English",
    "Hindi",
    "Environmental Science",
    "General Knowledge",
  ],
  middle: [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Science",
    "Sanskrit",
    "Computer Science",
  ],
  secondary: [
    "Mathematics",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "Social Science",
    "Computer Science",
    "Sanskrit",
  ],
  senior: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "Accountancy",
    "Business Studies",
    "Economics",
    "Computer Science",
    "History",
    "Political Science",
    "Geography",
    "Physical Education",
  ],
  graduation: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English Literature",
    "Economics",
    "Accountancy / Finance",
    "Computer Science / IT",
    "History",
    "Political Science",
    "Other",
  ],
};

const CITIES = [
  "Greater Noida",
  "Noida",
  "Delhi",
  "Ghaziabad",
  "Gurgaon / Gurugram",
  "Faridabad",
  "Other",
];

const DELHI_AREAS = [
  "South Delhi", "North Delhi", "East Delhi", "West Delhi",
  "Central Delhi", "Dwarka", "Rohini", "Pitampura",
  "Janakpuri", "Rajouri Garden", "Karol Bagh", "Lajpat Nagar",
  "Saket", "Vasant Kunj", "Connaught Place", "Other Area in Delhi",
];

const GREATER_NOIDA_AREAS = [
  "Alpha 1 / Alpha 2", "Beta 1 / Beta 2", "Gamma / Delta",
  "Omega / Zeta", "Sector Pi-1 / Pi-2", "Gaur City",
  "Noida Extension", "Pari Chowk", "Knowledge Park",
  "Techzone", "Chi / Mu / Eta", "Surajpur", "Kasna", "Other Area",
];

const NOIDA_AREAS = [
  "Sector 18", "Sector 37", "Sector 50", "Sector 62",
  "Sector 76–78", "Sector 93", "Sector 100–104",
  "Sector 119", "Sector 120", "Sector 125–128",
  "Sector 135–137", "Sector 150", "Other Area in Noida",
];

const SESSIONS_OPTIONS = [
  "1 day / week",
  "2 days / week",
  "3 days / week",
  "4 days / week",
  "5 days / week",
  "6 days / week",
  "Daily (7 days)",
  "Flexible",
];

const TIMING_OPTIONS = [
  "Morning (7am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–8pm)",
  "Flexible",
];

const START_OPTIONS = [
  "As soon as possible",
  "Within a week",
  "Within 2 weeks",
  "Next month",
];

const BUDGET_OPTIONS = [
  "Under ₹2,000 / month",
  "₹2,000 – ₹4,000 / month",
  "₹4,000 – ₹6,000 / month",
  "₹6,000 – ₹10,000 / month",
  "Above ₹10,000 / month",
  "Flexible / Not sure",
];

const REFERRAL_OPTIONS = [
  "Google Search",
  "WhatsApp",
  "Friend / Family Referral",
  "Facebook / Instagram",
  "Other",
];

const STEPS_CONFIG = [
  { icon: "👋", label: "About You" },
  { icon: "📚", label: "Requirements" },
  { icon: "📍", label: "Location" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getSubjectsForClass(cls: string): string[] {
  if (!cls) return SUBJECTS_BY_LEVEL.secondary;
  if (["Nursery / KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"].includes(cls))
    return SUBJECTS_BY_LEVEL.primary;
  if (["Class 6", "Class 7", "Class 8"].includes(cls))
    return SUBJECTS_BY_LEVEL.middle;
  if (["Class 9", "Class 10"].includes(cls))
    return SUBJECTS_BY_LEVEL.secondary;
  if (["Class 11", "Class 12"].includes(cls))
    return SUBJECTS_BY_LEVEL.senior;
  if (cls === "Graduation Level")
    return SUBJECTS_BY_LEVEL.graduation;
  return SUBJECTS_BY_LEVEL.secondary;
}

function isHighStakeClass(cls: string): boolean {
  return ["Class 10", "Class 11", "Class 12"].includes(cls);
}

function getAreaOptions(city: string): string[] {
  if (city === "Delhi") return DELHI_AREAS;
  if (city === "Greater Noida") return GREATER_NOIDA_AREAS;
  if (city === "Noida") return NOIDA_AREAS;
  return [];
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type UserType = "parent" | "student";

type FormData = {
  // Step 1
  userType: UserType;
  parentName: string;
  studentName: string;
  phone: string;
  whatsappSame: boolean;
  whatsappNumber: string;
  email: string;
  // Step 2
  studentClass: string;
  board: string;
  subjects: string[];
  tuitionMode: string;
  sessionsPerWeek: string;
  preferredTimings: string[];
  startWhen: string;
  examPrep: string; // only shown for class 10/11/12
  // Step 3
  city: string;
  area: string;
  otherCity: string;
  tutorGender: string;
  budget: string;
  specificRequirements: string;
  referralSource: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL: FormData = {
  userType: "parent",
  parentName: "",
  studentName: "",
  phone: "",
  whatsappSame: true,
  whatsappNumber: "",
  email: "",
  studentClass: "",
  board: "",
  subjects: [],
  tuitionMode: "",
  sessionsPerWeek: "",
  preferredTimings: [],
  startWhen: "",
  examPrep: "",
  city: "",
  area: "",
  otherCity: "",
  tutorGender: "",
  budget: "",
  specificRequirements: "",
  referralSource: "",
};

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): FormErrors {
  const err: FormErrors = {};
  const phone10 = /^[6-9]\d{9}$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  switch (step) {
    case 0:
      if (!data.parentName.trim() || data.parentName.trim().length < 2)
        err.parentName = data.userType === "parent"
          ? "Please enter your name"
          : "Please enter your name";
      if (data.userType === "parent" && (!data.studentName.trim() || data.studentName.trim().length < 2))
        err.studentName = "Please enter your child's name";
      if (!phone10.test(data.phone.replace(/\s/g, "")))
        err.phone = "Enter a valid 10-digit Indian mobile number";
      if (!data.whatsappSame && !phone10.test(data.whatsappNumber.replace(/\s/g, "")))
        err.whatsappNumber = "Enter a valid 10-digit WhatsApp number";
      if (data.email && !emailRx.test(data.email))
        err.email = "Enter a valid email address";
      break;

    case 1:
      if (!data.studentClass) err.studentClass = "Please select a class";
      if (!data.board) err.board = "Please select a board";
      if (data.subjects.length === 0) err.subjects = "Please select at least one subject";
      if (!data.tuitionMode) err.tuitionMode = "Please select a tuition mode";
      if (!data.sessionsPerWeek) err.sessionsPerWeek = "Please select sessions per week";
      if (data.preferredTimings.length === 0)
        err.preferredTimings = "Please select at least one preferred timing";
      if (!data.startWhen) err.startWhen = "Please select when you want to start";
      break;

    case 2:
      if (!data.city) err.city = "Please select your city";
      if (
        ["Delhi", "Greater Noida", "Noida"].includes(data.city) &&
        !data.area
      )
        err.area = "Please select your area";
      if (data.city === "Other" && !data.otherCity.trim())
        err.otherCity = "Please enter your city name";
      if (!data.tutorGender) err.tutorGender = "Please select a preference";
      break;
  }

  return err;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function FieldWrapper({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-ink-secondary">
        {label}
        {required && <span className="text-saffron-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = (error?: string, extra = "") =>
  `w-full px-4 py-3 rounded-xl border bg-white text-ink text-[15px] font-body
   placeholder:text-ink-muted/60 transition-all duration-200
   focus:outline-none focus:ring-2 focus:ring-saffron-400/25 focus:border-saffron-400
   disabled:bg-surface-3 disabled:text-ink-muted disabled:cursor-not-allowed
   ${error ? "border-red-400 ring-2 ring-red-400/20" : "border-border hover:border-border-strong"
  } ${extra}`;

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input {...props} className={inputBase(error)} />;
}

function TextAreaInput({ error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea {...props} rows={3} className={inputBase(error, "resize-none")} />;
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <div className="relative">
      <select {...props} className={inputBase(error, "appearance-none pr-10 cursor-pointer")}>
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
  );
}

function ChipButton({
  selected,
  onClick,
  children,
  variant = "navy",
  size = "md",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "navy" | "saffron";
  size?: "sm" | "md";
}) {
  const active = variant === "saffron"
    ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
    : "bg-navy-700 border-navy-700 text-white";
  const pad = size === "sm" ? "px-3 py-2 text-xs" : "px-3.5 py-2.5 text-sm";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${pad} rounded-xl font-semibold border-2 transition-all duration-200 flex items-center gap-1.5 ${
        selected
          ? active
          : "bg-white border-border text-ink-secondary hover:border-navy-300 hover:bg-navy-50"
      }`}
    >
      {selected && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
      {children}
    </button>
  );
}

function PhoneInput({
  value,
  onChange,
  error,
  placeholder = "98XXXXXXXX",
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-secondary text-sm font-semibold pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        +91
      </span>
      <input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className={inputBase(error)}
        style={{ paddingLeft: "52px" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — About You
// ─────────────────────────────────────────────────────────────────────────────

function Step1({ data, onChange, errors }: { data: FormData; onChange: (u: Partial<FormData>) => void; errors: FormErrors }) {
  const isParent = data.userType === "parent";

  return (
    <div className="space-y-5">

      {/* User type toggle */}
      <FieldWrapper label="I am a" required>
        <div className="grid grid-cols-2 gap-3">
          {(["parent", "student"] as UserType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ userType: type, studentName: "" })}
              className={`py-4 rounded-xl font-bold border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                data.userType === type
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_20px_rgba(246,166,35,0.4)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              <span className="text-2xl">{type === "parent" ? "👨‍👩‍👦" : "🎓"}</span>
              <span className="text-sm">{type === "parent" ? "Parent / Guardian" : "Student (Self)"}</span>
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Name fields */}
      <div className={`grid gap-5 ${isParent ? "sm:grid-cols-2" : ""}`}>
        <FieldWrapper
          label={isParent ? "Your Name (Parent / Guardian)" : "Your Full Name"}
          required
          error={errors.parentName}
        >
          <TextInput
            type="text"
            placeholder={isParent ? "e.g. Rajesh Kumar" : "e.g. Priya Sharma"}
            value={data.parentName}
            onChange={(e) => onChange({ parentName: e.target.value })}
            error={errors.parentName}
            autoComplete="name"
          />
        </FieldWrapper>

        <AnimatePresence>
          {isParent && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <FieldWrapper label="Student's Name" required error={errors.studentName}>
                <TextInput
                  type="text"
                  placeholder="e.g. Aditya Kumar"
                  value={data.studentName}
                  onChange={(e) => onChange({ studentName: e.target.value })}
                  error={errors.studentName}
                />
              </FieldWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone */}
      <FieldWrapper label="Phone Number" required error={errors.phone}>
        <PhoneInput
          value={data.phone}
          onChange={(v) => onChange({ phone: v })}
          error={errors.phone}
        />
      </FieldWrapper>

      {/* WhatsApp same toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none group w-fit">
        <div
          onClick={() => onChange({ whatsappSame: !data.whatsappSame, whatsappNumber: "" })}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
            data.whatsappSame
              ? "bg-saffron-400 border-saffron-400"
              : "bg-white border-border group-hover:border-saffron-300"
          }`}
        >
          {data.whatsappSame && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm font-semibold text-ink-secondary group-hover:text-ink transition-colors">
          My WhatsApp number is the same as above
        </span>
      </label>

      {/* WhatsApp number — conditional */}
      <AnimatePresence>
        {!data.whatsappSame && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <FieldWrapper label="WhatsApp Number" required error={errors.whatsappNumber}>
              <PhoneInput
                value={data.whatsappNumber}
                onChange={(v) => onChange({ whatsappNumber: v })}
                error={errors.whatsappNumber}
                placeholder="WhatsApp number"
              />
            </FieldWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email — optional */}
      <FieldWrapper label="Email Address" hint="Optional — we'll primarily contact you by phone" error={errors.email}>
        <TextInput
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          error={errors.email}
          autoComplete="email"
        />
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Requirements
// ─────────────────────────────────────────────────────────────────────────────

function Step2({ data, onChange, errors }: { data: FormData; onChange: (u: Partial<FormData>) => void; errors: FormErrors }) {
  const isParent   = data.userType === "parent";
  const subjectList = getSubjectsForClass(data.studentClass);
  const showExamPrep = isHighStakeClass(data.studentClass);

  const toggleSubject = (s: string) => {
    const updated = data.subjects.includes(s)
      ? data.subjects.filter((x) => x !== s)
      : [...data.subjects, s];
    onChange({ subjects: updated });
  };

  const toggleTiming = (t: string) => {
    const updated = data.preferredTimings.includes(t)
      ? data.preferredTimings.filter((x) => x !== t)
      : [...data.preferredTimings, t];
    onChange({ preferredTimings: updated });
  };

  return (
    <div className="space-y-6">

      {/* Class */}
      <FieldWrapper
        label={isParent ? "Your Child's Class" : "Your Class"}
        required
        error={errors.studentClass}
      >
        <SelectInput
          value={data.studentClass}
          onChange={(e) => onChange({ studentClass: e.target.value, subjects: [] })}
          error={errors.studentClass}
        >
          <option value="">Select class</option>
          {CLASSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      {/* Board */}
      <FieldWrapper
        label={isParent ? "Your Child's Board" : "Your Board"}
        required
        error={errors.board}
      >
        <div className="flex flex-wrap gap-2">
          {BOARDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onChange({ board: b })}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                data.board === b
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Subjects */}
      <FieldWrapper
        label="Subjects Needed"
        required
        error={errors.subjects}
        hint="Select all subjects you need a tutor for"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {subjectList.map((s) => (
            <ChipButton
              key={s}
              selected={data.subjects.includes(s)}
              onClick={() => toggleSubject(s)}
            >
              {s}
            </ChipButton>
          ))}
        </div>
        {data.subjects.length > 0 && (
          <p className="text-xs text-saffron-500 font-semibold mt-2">
            ✓ {data.subjects.length} subject{data.subjects.length > 1 ? "s" : ""} selected
          </p>
        )}
      </FieldWrapper>

      {/* Exam prep — only for Class 10/11/12 */}
      <AnimatePresence>
        {showExamPrep && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <FieldWrapper
              label="Exam / Competitive Prep?"
              hint="Let us know if you need preparation for a specific exam"
            >
              <div className="flex flex-wrap gap-2">
                {[
                  "Board Exams only",
                  "JEE Mains / Advanced",
                  "NEET",
                  "NDA",
                  "CUET",
                  "Other Competitive Exam",
                  "None",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChange({ examPrep: data.examPrep === opt ? "" : opt })}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                      data.examPrep === opt
                        ? "bg-navy-700 border-navy-700 text-white"
                        : "bg-white border-border text-ink-secondary hover:border-navy-300"
                    }`}
                  >
                    {data.examPrep === opt ? "✓ " : ""}{opt}
                  </button>
                ))}
              </div>
            </FieldWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tuition mode */}
      <FieldWrapper label="Tuition Mode" required error={errors.tuitionMode}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: "Home Tuition", icon: "🏠", label: "Home Tuition" },
            { val: "Online", icon: "💻", label: "Online" },
            { val: "Either", icon: "🤝", label: "Either is fine" },
          ].map(({ val, icon, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ tuitionMode: val })}
              className={`py-4 rounded-xl font-bold border-2 transition-all duration-200 flex flex-col items-center gap-1.5 text-sm ${
                data.tuitionMode === val
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Sessions + Timing in a grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper label="Sessions per Week" required error={errors.sessionsPerWeek}>
          <SelectInput
            value={data.sessionsPerWeek}
            onChange={(e) => onChange({ sessionsPerWeek: e.target.value })}
            error={errors.sessionsPerWeek}
          >
            <option value="">Select frequency</option>
            {SESSIONS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper label="When to Start" required error={errors.startWhen}>
          <SelectInput
            value={data.startWhen}
            onChange={(e) => onChange({ startWhen: e.target.value })}
            error={errors.startWhen}
          >
            <option value="">Select timeline</option>
            {START_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      {/* Preferred timing */}
      <FieldWrapper
        label="Preferred Timing"
        required
        error={errors.preferredTimings}
        hint="Select all timings that work for you"
      >
        <div className="flex flex-wrap gap-2 mt-1">
          {TIMING_OPTIONS.map((t) => (
            <ChipButton
              key={t}
              selected={data.preferredTimings.includes(t)}
              onClick={() => toggleTiming(t)}
              variant="saffron"
            >
              {t}
            </ChipButton>
          ))}
        </div>
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — Location & Extras
// ─────────────────────────────────────────────────────────────────────────────

function Step3({ data, onChange, errors }: { data: FormData; onChange: (u: Partial<FormData>) => void; errors: FormErrors }) {
  const areaOptions = getAreaOptions(data.city);
  const hasSubAreas = areaOptions.length > 0;

  return (
    <div className="space-y-6">

      {/* City + Area */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper label="Your City" required error={errors.city}>
          <SelectInput
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value, area: "", otherCity: "" })}
            error={errors.city}
          >
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <AnimatePresence mode="wait">
          {hasSubAreas && (
            <motion.div
              key="sub-area"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <FieldWrapper label={`Area in ${data.city}`} required error={errors.area}>
                <SelectInput
                  value={data.area}
                  onChange={(e) => onChange({ area: e.target.value })}
                  error={errors.area}
                >
                  <option value="">Select area</option>
                  {areaOptions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </SelectInput>
              </FieldWrapper>
            </motion.div>
          )}

          {data.city === "Other" && (
            <motion.div
              key="other-city"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <FieldWrapper label="City Name" required error={errors.otherCity}>
                <TextInput
                  type="text"
                  placeholder="Enter your city"
                  value={data.otherCity}
                  onChange={(e) => onChange({ otherCity: e.target.value })}
                  error={errors.otherCity}
                />
              </FieldWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tutor gender preference */}
      <FieldWrapper
        label="Preferred Tutor Gender"
        required
        error={errors.tutorGender}
        hint="We respect your preference and will match accordingly"
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: "Male", icon: "👨‍🏫", label: "Male Tutor" },
            { val: "Female", icon: "👩‍🏫", label: "Female Tutor" },
            { val: "No Preference", icon: "🤝", label: "No Preference" },
          ].map(({ val, icon, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ tutorGender: val })}
              className={`py-4 rounded-xl font-bold border-2 transition-all duration-200 flex flex-col items-center gap-1.5 text-xs sm:text-sm ${
                data.tutorGender === val
                  ? "bg-navy-700 border-navy-700 text-white"
                  : "bg-white border-border text-ink-secondary hover:border-navy-300 hover:bg-navy-50"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              {val === "No Preference" ? "No Preference" : label}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Budget — optional */}
      <FieldWrapper label="Budget Range" hint="Optional — helps us find the best match for you">
        <SelectInput
          value={data.budget}
          onChange={(e) => onChange({ budget: e.target.value })}
        >
          <option value="">Select budget (optional)</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      {/* Specific requirements — optional */}
      <FieldWrapper
        label="Anything Specific?"
        hint="Optional — weak topics, upcoming exams, special needs, preferred teaching style, etc."
      >
        <TextAreaInput
          placeholder="e.g. My child is weak in Algebra and has board exams in March. Prefer a patient tutor..."
          value={data.specificRequirements}
          onChange={(e) => onChange({ specificRequirements: e.target.value })}
          maxLength={500}
        />
        {data.specificRequirements && (
          <p className="text-xs text-ink-muted text-right">
            {data.specificRequirements.length} / 500
          </p>
        )}
      </FieldWrapper>

      {/* How did you hear — optional */}
      <FieldWrapper label="How Did You Hear About Us?" hint="Optional — helps us understand where to reach more families">
        <div className="flex flex-wrap gap-2">
          {REFERRAL_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ referralSource: data.referralSource === r ? "" : r })}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                data.referralSource === r
                  ? "bg-navy-700 border-navy-700 text-white"
                  : "bg-white border-border text-ink-secondary hover:border-navy-300"
              }`}
            >
              {data.referralSource === r ? "✓ " : ""}{r}
            </button>
          ))}
        </div>
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function SuccessScreen({ data }: { data: FormData }) {
  const firstName = (data.userType === "parent" ? data.parentName : data.parentName)
    .trim()
    .split(" ")[0] || "there";

  const waMessage = encodeURIComponent(
    `Hi NCR Home Tutor! I just submitted an inquiry for a ${data.studentClass} ${data.subjects.join(" & ")} tutor in ${data.city}. Please help me find the right tutor.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="text-center py-14 px-6"
    >
      {/* Checkmark */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl">✅</div>
      </div>

      <h2 className="font-display font-bold text-navy-700 text-3xl sm:text-4xl mb-3">
        Request Received!
      </h2>
      <p className="text-ink-secondary text-lg mb-2">
        Hi <span className="font-bold text-navy-600">{firstName}</span>, we've got your enquiry!
      </p>
      <p className="text-ink-muted text-base mb-8 max-w-md mx-auto leading-relaxed">
        Our team will call you within{" "}
        <span className="font-semibold text-ink">2 hours</span> with a
        verified tutor match. For faster response, WhatsApp us directly.
      </p>

      {/* WhatsApp CTA — primary action */}
      <a
        href={`https://wa.me/918076661356?text=${waMessage}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-8 py-4 rounded-2xl text-base mb-4 transition-opacity hover:opacity-90"
        style={{ background: "#25D366", boxShadow: "0 8px 28px rgba(37,211,102,0.4)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
        </svg>
        WhatsApp Us Now
      </a>

      <p className="text-xs text-ink-muted mb-8">🟢 Usually replies within minutes</p>

      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary hover:text-ink transition-colors"
      >
        ← Back to Home
      </a>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP PROGRESS
// ─────────────────────────────────────────────────────────────────────────────

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="h-1 bg-border rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #F6A623 0%, #FBDFA0 50%, #F6A623 100%)", backgroundSize: "200% auto" }}
          initial={{ width: "0%" }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="absolute top-5 left-5 right-5 h-px bg-border hidden sm:block" />
        <motion.div
          className="absolute top-5 left-5 h-px hidden sm:block"
          style={{ background: "var(--color-saffron-400)" }}
          initial={{ width: "0%" }}
          animate={{ width: current === 0 ? "0%" : `calc(${(current / (total - 1)) * 100}% - 0px)` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />

        {STEPS_CONFIG.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="relative flex flex-col items-center gap-2 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300 ${
                done
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_2px_12px_rgba(246,166,35,0.45)]"
                  : active
                  ? "bg-white border-saffron-400 text-saffron-500 shadow-[0_0_0_4px_rgba(246,166,35,0.15)]"
                  : "bg-white border-border text-ink-muted"
              }`}>
                {done
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  : <span className="text-base leading-none">{step.icon}</span>
                }
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block transition-colors ${
                active ? "text-saffron-500" : done ? "text-ink-secondary" : "text-ink-muted"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-ink-muted mt-4 sm:hidden">
        Step {current + 1} of {total} — <span className="font-bold text-ink">{STEPS_CONFIG[current].label}</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const STEP_TITLES = [
  "About You",
  "Your Requirements",
  "Location & Preferences",
];

const STEP_SUBTITLES = [
  "Tell us who's looking for a tutor",
  "What does the student need help with?",
  "Where are you and any final preferences?",
];

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData]       = useState<FormData>(INITIAL);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]     = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = STEPS_CONFIG.length;

  const onChange = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const cleared = { ...prev };
      Object.keys(updates).forEach((k) => delete cleared[k as keyof FormErrors]);
      return cleared;
    });
  }, []);

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((p) => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        userType:             formData.userType,
        parentName:           formData.parentName,
        studentName:          formData.userType === "parent" ? formData.studentName : formData.parentName,
        phone:                formData.phone,
        whatsappNumber:       formData.whatsappSame ? formData.phone : formData.whatsappNumber,
        email:                formData.email,
        studentClass:         formData.studentClass,
        board:                formData.board,
        subjects:             formData.subjects.join(", "),
        examPrep:             formData.examPrep,
        tuitionMode:          formData.tuitionMode,
        sessionsPerWeek:      formData.sessionsPerWeek,
        preferredTimings:     formData.preferredTimings.join(", "),
        startWhen:            formData.startWhen,
        city:                 formData.city,
        area:                 formData.area,
        otherCity:            formData.otherCity,
        tutorGender:          formData.tutorGender,
        budget:               formData.budget,
        specificRequirements: formData.specificRequirements,
        referralSource:       formData.referralSource,
      };

      const res = await fetch("/api/submit-inquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(body.message ?? "Submission failed. Please try again.");
      }

      setIsSuccess(true);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    <Step1 key="s1" data={formData} onChange={onChange} errors={errors} />,
    <Step2 key="s2" data={formData} onChange={onChange} errors={errors} />,
    <Step3 key="s3" data={formData} onChange={onChange} errors={errors} />,
  ];

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-pop)" }}>
        <div className="h-1.5" style={{ background: "linear-gradient(90deg, #4ade80, #22c55e, #16a34a)" }} />
        <SuccessScreen data={formData} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-pop)" }}>
      {/* Saffron top bar */}
      <div className="h-1.5" style={{ background: "linear-gradient(90deg, #F6A623, #FBDFA0 50%, #E09010)" }} />

      <div className="p-6 sm:p-8 md:p-10">
        <StepProgress current={currentStep} total={totalSteps} />

        {/* Step header */}
        <div className="mb-7">
          <h2 className="font-display font-bold text-navy-700 text-2xl sm:text-[1.75rem] leading-tight">
            {STEP_TITLES[currentStep]}
          </h2>
          <p className="text-ink-muted text-sm mt-1.5">
            {STEP_SUBTITLES[currentStep]}&nbsp;·&nbsp;
            <span className="text-saffron-500 font-semibold">* Required fields</span>
          </p>
        </div>

        {/* Animated step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>

        {/* Submit error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2"
          >
            <span className="text-base shrink-0">⚠️</span>
            <div>
              <p className="font-semibold">Submission failed</p>
              <p className="text-red-500 text-xs mt-0.5">{submitError}</p>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "bg-surface-3 text-ink hover:bg-border active:scale-95"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Back
          </button>

          <span className="text-xs text-ink-muted font-semibold tabular-nums hidden sm:block">
            {currentStep + 1} / {totalSteps}
          </span>

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
              style={{ background: "var(--color-saffron-400)", boxShadow: "var(--shadow-saffron)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-saffron-500)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-saffron-400)"; }}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isSubmitting ? "var(--color-navy-500)" : "var(--color-navy-700)",
                boxShadow: "var(--shadow-glow-navy)",
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin shrink-0" />
                  Submitting...
                </>
              ) : (
                <>
                  Find My Tutor
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="bg-surface-3 border-t border-border px-8 py-3.5 flex items-center justify-center gap-6 flex-wrap">
        {[
          { icon: "🎁", text: "Free Demo Class" },
          { icon: "⚡", text: "24-hr Matching" },
          { icon: "🔒", text: "100% Safe" },
          { icon: "🔄", text: "Free Replacement" },
        ].map(({ icon, text }) => (
          <span key={text} className="text-xs font-semibold text-ink-muted flex items-center gap-1.5">
            {icon} {text}
          </span>
        ))}
      </div>
    </div>
  );
}