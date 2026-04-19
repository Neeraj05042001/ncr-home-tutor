"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SUBJECTS_LIST = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Social Science",
  "Computer Science",
  "Accountancy",
  "Business Studies",
  "Economics",
  "Sanskrit",
  "French",
  "History & Geography",
  "Political Science",
  "Physical Education",
];

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
  "South Delhi",
  "North Delhi",
  "East Delhi",
  "West Delhi",
  "Central Delhi",
  "Dwarka",
  "Rohini",
  "Pitampura",
  "Janakpuri",
  "Rajouri Garden",
  "Karol Bagh",
  "Lajpat Nagar",
  "Saket",
  "Vasant Kunj",
  "Connaught Place",
  "Other Area in Delhi",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1 – 2 years",
  "2 – 5 years",
  "5 – 10 years",
  "10+ years",
];

const CLASS_OPTIONS = [
  "Nursery / KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Graduation Level",
];

const QUALIFICATION_OPTIONS = [
  "12th Pass",
  "Pursuing Graduation",
  "Graduate (B.A. / B.Sc. / B.Com.)",
  "B.Ed",
  "Post Graduate (M.A. / M.Sc. / M.Com.)",
  "M.Ed",
  "B.Tech / B.E.",
  "M.Tech",
  "PhD",
  "Other",
];

const ID_PROOF_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Driving License",
  "Passport",
  "Voter ID",
];

const PREFERRED_LOCATIONS = [
  "Greater Noida",
  "Gaur City / Noida Ext.",
  "Alpha 1 / Alpha 2",
  "Beta 1 / Beta 2",
  "Gamma / Delta",
  "Omega / Zeta",
  "Pari Chowk",
  "Knowledge Park",
  "Sector Pi-1 / Pi-2",
  "Techzone",
  "Noida (Sector 93–100)",
  "Noida (Sector 137+)",
  "Delhi NCR (Any)",
  "Online Teaching",
];

const STEPS_CONFIG = [
  { icon: "👤", label: "Personal" },
  { icon: "📍", label: "Address" },
  { icon: "📚", label: "Teaching" },
  { icon: "ℹ️", label: "Additional" },
  { icon: "📄", label: "Documents" },
];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 — Personal
  fullName: string;
  gender: string;
  phone: string;
  alternatePhone: string;
  email: string;
  // Step 2 — Address
  correspondenceAddress: string;
  sameAddress: boolean;
  permanentAddress: string;
  city: string;
  delhiArea: string;
  otherCity: string;
  // Step 3 — Teaching
  experience: string;
  subjects: string[];
  fromClass: string;
  toClass: string;
  preferredLocations: string[];
  // Step 4 — Additional
  hasVehicle: string;
  qualification: string;
  idProofType: string;
  // Step 5 — Documents
  idProofFile: File | null;
};

type FormErrors = {
  fullName?: string;
  gender?: string;
  phone?: string;
  alternatePhone?: string;
  email?: string;
  correspondenceAddress?: string;
  permanentAddress?: string;
  city?: string;
  delhiArea?: string;
  otherCity?: string;
  experience?: string;
  subjects?: string;
  fromClass?: string;
  toClass?: string;
  preferredLocations?: string;
  hasVehicle?: string;
  qualification?: string;
  idProofType?: string;
  idProofFile?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_DATA: FormData = {
  fullName: "",
  gender: "",
  phone: "",
  alternatePhone: "",
  email: "",
  correspondenceAddress: "",
  sameAddress: false,
  permanentAddress: "",
  city: "",
  delhiArea: "",
  otherCity: "",
  experience: "",
  subjects: [],
  fromClass: "",
  toClass: "",
  preferredLocations: [],
  hasVehicle: "",
  qualification: "",
  idProofType: "",
  idProofFile: null,
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
      if (!data.fullName.trim() || data.fullName.trim().length < 2)
        err.fullName = "Please enter your full name";
      if (!data.gender) err.gender = "Please select your gender";
      if (!phone10.test(data.phone.replace(/\s/g, "")))
        err.phone = "Enter a valid 10-digit Indian mobile number";
      if (
        data.alternatePhone &&
        !phone10.test(data.alternatePhone.replace(/\s/g, ""))
      )
        err.alternatePhone = "Enter a valid 10-digit mobile number";
      if (!data.email || !emailRx.test(data.email))
        err.email = "Enter a valid email address";
      break;

    case 1:
      if (
        !data.correspondenceAddress.trim() ||
        data.correspondenceAddress.trim().length < 10
      )
        err.correspondenceAddress =
          "Please enter your complete correspondence address";
      if (
        !data.permanentAddress.trim() ||
        data.permanentAddress.trim().length < 10
      )
        err.permanentAddress = "Please enter your permanent address";
      if (!data.city) err.city = "Please select a city";
      if (data.city === "Delhi" && !data.delhiArea)
        err.delhiArea = "Please select your area in Delhi";
      if (data.city === "Other" && !data.otherCity.trim())
        err.otherCity = "Please enter your city name";
      break;

    case 2:
      if (!data.experience) err.experience = "Please select your experience";
      if (data.subjects.length === 0)
        err.subjects = "Please select at least one subject";
      if (!data.fromClass) err.fromClass = "Please select starting class";
      if (!data.toClass) err.toClass = "Please select ending class";
      if (data.preferredLocations.length === 0)
        err.preferredLocations = "Please select at least one preferred location";
      break;

    case 3:
      if (!data.hasVehicle) err.hasVehicle = "Please select an option";
      if (!data.qualification)
        err.qualification = "Please select your qualification";
      if (!data.idProofType)
        err.idProofType = "Please select which ID proof you will upload";
      break;

    case 4:
      if (!data.idProofFile) err.idProofFile = "Please upload your ID proof";
      break;
  }

  return err;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED INPUT PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function FieldWrapper({
  label,
  required,
  error,
  hint,
  children,
}: FieldWrapperProps) {
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// Shared input base styles — extracted for consistency
const inputBase = (error?: string, extra = "") =>
  `w-full px-4 py-3 rounded-xl border bg-white text-ink text-[15px] font-body
   placeholder:text-ink-muted/60 transition-all duration-200
   focus:outline-none focus:ring-2 focus:ring-saffron-400/25 focus:border-saffron-400
   disabled:bg-surface-3 disabled:text-ink-muted disabled:cursor-not-allowed
   ${
     error
       ? "border-red-400 ring-2 ring-red-400/20"
       : "border-border hover:border-border-strong"
   } ${extra}`;

function TextInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input {...props} className={inputBase(error)} />;
}

function TextAreaInput({
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      {...props}
      rows={3}
      className={inputBase(error, "resize-none")}
    />
  );
}

function SelectInput({
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={inputBase(error, "appearance-none pr-10 cursor-pointer")}
      >
        {children}
      </select>
      {/* Custom chevron */}
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
  );
}

// Chip / pill toggle button used for subjects and locations
function ChipButton({
  selected,
  onClick,
  children,
  variant = "navy",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "navy" | "saffron";
}) {
  const active =
    variant === "saffron"
      ? "bg-saffron-400 border-saffron-400 text-white"
      : "bg-navy-700 border-navy-700 text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 text-left transition-all duration-200 flex items-center gap-1.5 ${
        selected
          ? active
          : "bg-white border-border text-ink-secondary hover:border-navy-300 hover:bg-navy-50"
      }`}
    >
      {selected && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface StepProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: FormErrors;
}

// ── Step 1: Personal Information ──────────────────────────────────────────────

function Step1Personal({ data, onChange, errors }: StepProps) {
  return (
    <div className="space-y-5">
      {/* Full Name */}
      <FieldWrapper label="Full Name" required error={errors.fullName}>
        <TextInput
          type="text"
          placeholder="e.g. Ramesh Kumar Sharma"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          error={errors.fullName}
          autoComplete="name"
        />
      </FieldWrapper>

      {/* Gender */}
      <FieldWrapper label="Gender" required error={errors.gender}>
        <div className="flex gap-3">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange({ gender: g })}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                data.gender === g
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              {g === "Male" ? "♂ Male" : g === "Female" ? "♀ Female" : "⚧ Other"}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Phone + Alternate */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper label="Phone Number" required error={errors.phone}>
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
              placeholder="98XXXXXXXX"
              value={data.phone}
              onChange={(e) =>
                onChange({
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              autoComplete="tel"
              className={inputBase(errors.phone)}
              style={{ paddingLeft: "52px" }}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper
          label="Alternate Phone"
          error={errors.alternatePhone}
          hint="Optional"
        >
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
              placeholder="Optional"
              value={data.alternatePhone}
              onChange={(e) =>
                onChange({
                  alternatePhone: e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10),
                })
              }
              className={inputBase(errors.alternatePhone)}
              style={{ paddingLeft: "52px" }}
            />
          </div>
        </FieldWrapper>
      </div>

      {/* Email */}
      <FieldWrapper label="Email Address" required error={errors.email}>
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

// ── Step 2: Address Details ───────────────────────────────────────────────────

function Step2Address({ data, onChange, errors }: StepProps) {
  const handleSameToggle = () => {
    const next = !data.sameAddress;
    onChange({
      sameAddress: next,
      permanentAddress: next ? data.correspondenceAddress : "",
    });
  };

  return (
    <div className="space-y-5">
      {/* Correspondence Address */}
      <FieldWrapper
        label="Correspondence Address"
        required
        error={errors.correspondenceAddress}
        hint="Your current/contact address where we can reach you"
      >
        <TextAreaInput
          placeholder="Flat / House No, Street, Colony, City, PIN..."
          value={data.correspondenceAddress}
          onChange={(e) => {
            const val = e.target.value;
            onChange({
              correspondenceAddress: val,
              ...(data.sameAddress ? { permanentAddress: val } : {}),
            });
          }}
          error={errors.correspondenceAddress}
        />
      </FieldWrapper>

      {/* Same address checkbox */}
      <label className="flex items-center gap-3 cursor-pointer select-none group w-fit">
        <div
          onClick={handleSameToggle}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
            data.sameAddress
              ? "bg-saffron-400 border-saffron-400"
              : "bg-white border-border group-hover:border-saffron-300"
          }`}
        >
          {data.sameAddress && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path
                d="M1 4L4 7L10 1"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-sm font-semibold text-ink-secondary group-hover:text-ink transition-colors">
          Permanent address same as correspondence address
        </span>
      </label>

      {/* Permanent Address */}
      <FieldWrapper
        label="Permanent Address"
        required
        error={errors.permanentAddress}
      >
        <TextAreaInput
          placeholder="Flat / House No, Street, Colony, City, PIN..."
          value={data.permanentAddress}
          onChange={(e) => onChange({ permanentAddress: e.target.value })}
          error={errors.permanentAddress}
          disabled={data.sameAddress}
        />
      </FieldWrapper>

      {/* City + Conditional area */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper label="Select City" required error={errors.city}>
          <SelectInput
            value={data.city}
            onChange={(e) =>
              onChange({ city: e.target.value, delhiArea: "", otherCity: "" })
            }
            error={errors.city}
          >
            <option value="">Select your city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <AnimatePresence mode="wait">
          {data.city === "Delhi" && (
            <motion.div
              key="delhi-area"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <FieldWrapper
                label="Area in Delhi"
                required
                error={errors.delhiArea}
              >
                <SelectInput
                  value={data.delhiArea}
                  onChange={(e) => onChange({ delhiArea: e.target.value })}
                  error={errors.delhiArea}
                >
                  <option value="">Select area</option>
                  {DELHI_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
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
              <FieldWrapper
                label="Your City Name"
                required
                error={errors.otherCity}
              >
                <TextInput
                  type="text"
                  placeholder="Enter city name"
                  value={data.otherCity}
                  onChange={(e) => onChange({ otherCity: e.target.value })}
                  error={errors.otherCity}
                />
              </FieldWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Step 3: Teaching Preferences ─────────────────────────────────────────────

function Step3Teaching({ data, onChange, errors }: StepProps) {
  const toggle = (
    field: "subjects" | "preferredLocations",
    item: string
  ) => {
    const current = data[field];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    onChange({ [field]: updated });
  };

  return (
    <div className="space-y-6">
      {/* Experience */}
      <FieldWrapper
        label="Teaching Experience"
        required
        error={errors.experience}
      >
        <div className="flex flex-wrap gap-2 mt-0.5">
          {EXPERIENCE_OPTIONS.map((exp) => (
            <button
              key={exp}
              type="button"
              onClick={() => onChange({ experience: exp })}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                data.experience === exp
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Subjects — multi-select chips */}
      <FieldWrapper
        label="Subjects You Can Teach"
        required
        error={errors.subjects}
        hint="Select all that apply"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {SUBJECTS_LIST.map((subject) => (
            <ChipButton
              key={subject}
              selected={data.subjects.includes(subject)}
              onClick={() => toggle("subjects", subject)}
              variant="navy"
            >
              {subject}
            </ChipButton>
          ))}
        </div>
        {/* Selection count badge */}
        {data.subjects.length > 0 && (
          <p className="text-xs text-saffron-500 font-semibold mt-2">
            ✓ {data.subjects.length} subject
            {data.subjects.length > 1 ? "s" : ""} selected
          </p>
        )}
      </FieldWrapper>

      {/* From / To Class */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper
          label="Teaching From Class"
          required
          error={errors.fromClass}
        >
          <SelectInput
            value={data.fromClass}
            onChange={(e) => onChange({ fromClass: e.target.value })}
            error={errors.fromClass}
          >
            <option value="">Select starting class</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper
          label="Teaching Up To Class"
          required
          error={errors.toClass}
        >
          <SelectInput
            value={data.toClass}
            onChange={(e) => onChange({ toClass: e.target.value })}
            error={errors.toClass}
          >
            <option value="">Select ending class</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      {/* Preferred Locations — multi-select chips */}
      <FieldWrapper
        label="Preferred Teaching Locations"
        required
        error={errors.preferredLocations}
        hint="Select all areas where you can travel to teach"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {PREFERRED_LOCATIONS.map((loc) => (
            <ChipButton
              key={loc}
              selected={data.preferredLocations.includes(loc)}
              onClick={() => toggle("preferredLocations", loc)}
              variant="navy"
            >
              {loc}
            </ChipButton>
          ))}
        </div>
        {data.preferredLocations.length > 0 && (
          <p className="text-xs text-saffron-500 font-semibold mt-2">
            ✓ {data.preferredLocations.length} location
            {data.preferredLocations.length > 1 ? "s" : ""} selected
          </p>
        )}
      </FieldWrapper>
    </div>
  );
}

// ── Step 4: Additional Information ───────────────────────────────────────────

function Step4Additional({ data, onChange, errors }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Vehicle */}
      <FieldWrapper
        label="Do you own a vehicle?"
        required
        error={errors.hasVehicle}
        hint="Having a vehicle helps you reach student homes across NCR"
      >
        <div className="grid grid-cols-2 gap-3 mt-0.5">
          {[
            { val: "Yes", icon: "🛵", label: "Yes, I have a vehicle" },
            { val: "No", icon: "🚶", label: "No, I don't" },
          ].map(({ val, icon, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ hasVehicle: val })}
              className={`py-4 rounded-xl text-sm font-bold border-2 transition-all duration-200 flex flex-col items-center gap-1.5 ${
                data.hasVehicle === val
                  ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_4px_16px_rgba(246,166,35,0.35)]"
                  : "bg-white border-border text-ink-secondary hover:border-saffron-300 hover:bg-saffron-50"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Qualification */}
      <FieldWrapper
        label="Highest Qualification"
        required
        error={errors.qualification}
      >
        <SelectInput
          value={data.qualification}
          onChange={(e) => onChange({ qualification: e.target.value })}
          error={errors.qualification}
        >
          <option value="">Select your qualification</option>
          {QUALIFICATION_OPTIONS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </SelectInput>
      </FieldWrapper>

      {/* ID Proof Type */}
      <FieldWrapper
        label="ID Proof Type"
        required
        error={errors.idProofType}
        hint="You will upload the actual document in the next step"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-0.5">
          {ID_PROOF_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ idProofType: type })}
              className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 text-center ${
                data.idProofType === type
                  ? "bg-navy-700 border-navy-700 text-white"
                  : "bg-white border-border text-ink-secondary hover:border-navy-300 hover:bg-navy-50"
              }`}
            >
              {data.idProofType === type ? "✓ " : ""}
              {type}
            </button>
          ))}
        </div>
      </FieldWrapper>
    </div>
  );
}

// ── Step 5: Documents & Review ────────────────────────────────────────────────

function Step5Documents({ data, onChange, errors }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFile = (file: File) => {
    setFileError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Only JPG, PNG, or PDF files are accepted");
      return;
    }
    if (file.size > MAX_SIZE) {
      setFileError("File must be under 5 MB");
      return;
    }
    onChange({ idProofFile: file });
  };

  // Summary rows — only show filled values
  const summaryRows = [
    { label: "Name", value: data.fullName },
    { label: "Phone", value: data.phone ? `+91 ${data.phone}` : "" },
    { label: "Email", value: data.email },
    { label: "City", value: data.city },
    { label: "Experience", value: data.experience },
    {
      label: "Subjects",
      value:
        data.subjects.length > 0
          ? data.subjects.slice(0, 3).join(", ") +
            (data.subjects.length > 3
              ? ` +${data.subjects.length - 3} more`
              : "")
          : "",
    },
    {
      label: "Classes",
      value:
        data.fromClass && data.toClass
          ? `${data.fromClass} → ${data.toClass}`
          : "",
    },
    { label: "Qualification", value: data.qualification },
    { label: "ID Proof", value: data.idProofType },
  ].filter((r) => r.value);

  return (
    <div className="space-y-6">
      {/* Review summary */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background:
            "linear-gradient(135deg, #EEF2F8 0%, #F4F6FA 100%)",
          borderColor: "rgba(29,82,144,0.12)",
        }}
      >
        <h3 className="font-display font-bold text-navy-700 mb-3 text-[13px] uppercase tracking-widest flex items-center gap-2">
          <span>📋</span> Registration Summary
        </h3>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex gap-2 min-w-0">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide shrink-0 w-20 pt-0.5">
                {label}
              </span>
              <span className="text-sm text-ink font-semibold truncate">
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-muted mt-3 flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Want to change something? Hit Back to edit previous steps.
        </p>
      </div>

      {/* File Upload Zone */}
      <FieldWrapper
        label={`Upload ${data.idProofType || "ID Proof Document"}`}
        required
        error={errors.idProofFile || fileError || undefined}
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-8 cursor-pointer text-center transition-all duration-200 ${
            dragOver
              ? "border-saffron-400 bg-saffron-50"
              : data.idProofFile
              ? "border-green-400 bg-green-50"
              : errors.idProofFile || fileError
              ? "border-red-300 bg-red-50"
              : "border-border hover:border-saffron-300 hover:bg-surface-3"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          {data.idProofFile ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                {data.idProofFile.type === "application/pdf" ? "📄" : "🖼️"}
              </div>
              <p className="font-bold text-green-700 text-sm truncate max-w-[220px]">
                {data.idProofFile.name}
              </p>
              <p className="text-xs text-ink-muted">
                {(data.idProofFile.size / 1024).toFixed(0)} KB ·{" "}
                <span className="text-saffron-500 font-semibold">
                  Click to replace
                </span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center text-3xl">
                📤
              </div>
              <div>
                <p className="font-bold text-ink mb-1">
                  {dragOver
                    ? "Drop it here!"
                    : `Drop your ${data.idProofType || "ID proof"} here`}
                </p>
                <p className="text-sm text-ink-muted">
                  or{" "}
                  <span className="text-saffron-500 font-bold">
                    click to browse
                  </span>
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {["JPG", "PNG", "PDF", "Max 5 MB"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-3 border border-border rounded-full px-2.5 py-1 text-[11px] font-semibold text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function SuccessScreen({ firstName }: { firstName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="text-center py-14 px-6"
    >
      {/* Animated checkmark */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl">
          ✅
        </div>
      </div>

      <h2 className="font-display font-bold text-navy-700 text-3xl sm:text-4xl mb-3">
        Registration Successful!
      </h2>
      <p className="text-ink-secondary text-lg mb-2">
        Welcome to the team,{" "}
        <span className="font-bold text-navy-600">{firstName}</span>!
      </p>
      <p className="text-ink-muted text-base mb-10 max-w-md mx-auto leading-relaxed">
        Your profile and documents are under review. Our team will verify
        your application and reach out within{" "}
        <span className="font-semibold text-ink">24–48 hours</span> with
        student leads.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-navy-700 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-navy-600 transition-colors duration-200"
        >
          ← Back to Home
        </a>
        <a
          href="https://wa.me/918076661356?text=Hi%20NCR%20Home%20Tutor!%20I%20just%20registered%20as%20a%20tutor."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-white transition-opacity duration-200 hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
          </svg>
          WhatsApp Us
        </a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP PROGRESS INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

function StepProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="mb-8">
      {/* Animated progress bar */}
      <div className="h-1 bg-border rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #F6A623 0%, #FBDFA0 50%, #F6A623 100%)",
            backgroundSize: "200% auto",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Step circles + labels */}
      <div className="relative flex items-start justify-between">
        {/* Background connector line */}
        <div className="absolute top-5 left-5 right-5 h-px bg-border hidden sm:block" />

        {/* Progress connector line */}
        <motion.div
          className="absolute top-5 left-5 h-px hidden sm:block"
          style={{ background: "var(--color-saffron-400)" }}
          initial={{ width: "0%" }}
          animate={{
            width:
              current === 0
                ? "0%"
                : `calc(${(current / (total - 1)) * 100}% - 0px)`,
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />

        {STEPS_CONFIG.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div
              key={i}
              className="relative flex flex-col items-center gap-2 z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300 ${
                  done
                    ? "bg-saffron-400 border-saffron-400 text-white shadow-[0_2px_12px_rgba(246,166,35,0.45)]"
                    : active
                    ? "bg-white border-saffron-400 text-saffron-500 shadow-[0_0_0_4px_rgba(246,166,35,0.15)]"
                    : "bg-white border-border text-ink-muted"
                }`}
              >
                {done ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <span className="text-base leading-none">{step.icon}</span>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block transition-colors ${
                  active
                    ? "text-saffron-500"
                    : done
                    ? "text-ink-secondary"
                    : "text-ink-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: current step label */}
      <p className="text-center text-xs text-ink-muted mt-4 sm:hidden">
        Step {current + 1} of {total} —{" "}
        <span className="font-bold text-ink">
          {STEPS_CONFIG[current].label}
        </span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const STEP_TITLES = [
  "Personal Information",
  "Address Details",
  "Teaching Preferences",
  "Additional Information",
  "Upload ID Proof",
];

const STEP_SUBTITLES = [
  "Tell us about yourself so we can verify your identity",
  "Where are you located? This helps us match local students",
  "What, where, and whom would you like to teach?",
  "A few more details to complete your profile",
  "Review your details and upload your ID document",
];

export default function TutorRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = STEPS_CONFIG.length;

  // ── Field updater ──────────────────────────────────────────────────────────
  const onChange = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      // Sync permanent address when sameAddress is checked and correspondence changes
      if (next.sameAddress && "correspondenceAddress" in updates) {
        next.permanentAddress = next.correspondenceAddress;
      }
      return next;
    });
    // Clear errors for any field that was just updated
    setErrors((prev) => {
      const cleared = { ...prev };
      Object.keys(updates).forEach((k) => {
        delete cleared[k as keyof FormErrors];
      });
      return cleared;
    });
  }, []);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll to first error
      setTimeout(() => {
        const el = document.querySelector("[data-error]");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
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

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Build FormData for multipart/form-data (file + text fields)
      const fd = new globalThis.FormData();

      // Text fields
      const textFields: Array<[string, string]> = [
        ["fullName", formData.fullName],
        ["gender", formData.gender],
        ["phone", formData.phone],
        ["alternatePhone", formData.alternatePhone],
        ["email", formData.email],
        ["correspondenceAddress", formData.correspondenceAddress],
        ["permanentAddress", formData.permanentAddress],
        ["city", formData.city],
        ["delhiArea", formData.delhiArea],
        ["otherCity", formData.otherCity],
        ["experience", formData.experience],
        ["subjects", formData.subjects.join(", ")],
        ["fromClass", formData.fromClass],
        ["toClass", formData.toClass],
        ["preferredLocations", formData.preferredLocations.join(", ")],
        ["hasVehicle", formData.hasVehicle],
        ["qualification", formData.qualification],
        ["idProofType", formData.idProofType],
        [
          "entryDate",
          new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        ],
      ];

      textFields.forEach(([k, v]) => fd.append(k, v));

      // File field
      if (formData.idProofFile) {
        fd.append("idProofFile", formData.idProofFile);
      }

      const res = await fetch("/api/submit-tutor", {
        method: "POST",
        body: fd,
        // Note: do NOT set Content-Type header — the browser sets it automatically
        // with the correct multipart boundary when using FormData
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(body.message ?? "Submission failed. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step components map ────────────────────────────────────────────────────
  const steps = [
    <Step1Personal key="step1" data={formData} onChange={onChange} errors={errors} />,
    <Step2Address  key="step2" data={formData} onChange={onChange} errors={errors} />,
    <Step3Teaching key="step3" data={formData} onChange={onChange} errors={errors} />,
    <Step4Additional key="step4" data={formData} onChange={onChange} errors={errors} />,
    <Step5Documents  key="step5" data={formData} onChange={onChange} errors={errors} />,
  ];

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div
        className="bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-pop)" }}
      >
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(90deg, #4ade80, #22c55e, #16a34a)",
          }}
        />
        <SuccessScreen
          firstName={formData.fullName.trim().split(" ")[0] || "Tutor"}
        />
      </div>
    );
  }

  // ── Form card ──────────────────────────────────────────────────────────────
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden"
      style={{ boxShadow: "var(--shadow-pop)" }}
    >
      {/* Saffron top accent bar */}
      <div
        className="h-1.5"
        style={{
          background:
            "linear-gradient(90deg, #F6A623, #FBDFA0 50%, #E09010)",
        }}
      />

      <div className="p-6 sm:p-8 md:p-10">
        {/* Step progress */}
        <StepProgress current={currentStep} total={totalSteps} />

        {/* Step header */}
        <div className="mb-7">
          <h2 className="font-display font-bold text-navy-700 text-2xl sm:text-[1.75rem] leading-tight">
            {STEP_TITLES[currentStep]}
          </h2>
          <p className="text-ink-muted text-sm mt-1.5">
            {STEP_SUBTITLES[currentStep]}&nbsp;·&nbsp;
            <span className="text-saffron-500 font-semibold">
              * Required fields
            </span>
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

        {/* Server-side submit error */}
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

        {/* Navigation: Back / Next / Submit */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {/* Back button */}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Back
          </button>

          {/* Step counter */}
          <span className="text-xs text-ink-muted font-semibold tabular-nums hidden sm:block">
            {currentStep + 1} / {totalSteps}
          </span>

          {/* Next / Submit */}
          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
              style={{
                background: "var(--color-saffron-400)",
                boxShadow: "var(--shadow-saffron)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-saffron-500)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-saffron-400)";
              }}
            >
              Continue
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
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
                background: isSubmitting
                  ? "var(--color-navy-500)"
                  : "var(--color-navy-700)",
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
                  Submit Registration
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
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
          { icon: "🔒", text: "Data Secure" },
          { icon: "✅", text: "Verified Process" },
          { icon: "🆓", text: "Free Registration" },
          { icon: "⚡", text: "Quick Response" },
        ].map(({ icon, text }) => (
          <span
            key={text}
            className="text-xs font-semibold text-ink-muted flex items-center gap-1.5"
          >
            {icon} {text}
          </span>
        ))}
      </div>
    </div>
  );
}