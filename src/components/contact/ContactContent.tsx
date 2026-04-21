"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Navigation,
  CheckCircle2,
  ChevronDown,
  Send,
  User,
  Hash,
  AtSign,
  MessageSquare,
  Shield,
  Zap,
  Gift,
  ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PHONE = "+91 8076661356";
const PHONE_RAW = "918076661356";
const EMAIL_ADDR = "info@ncrhometutor.com";
const ADDRESS_SHORT = "Sector Pi-1, Greater Noida";
const ADDRESS_FULL =
  "Radha Krishna Complex, Aicher Market, Sector Pi-1, Greater Noida, UP — 201310";
const MAPS_HREF = "https://goo.gl/maps/Fd1vZSRb5agrhfki8";
const MAPS_DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=Radha+Krishna+Complex,Aicher+Market,Sector+Pi-1,Greater+Noida+201310";
const MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=Sector+Pi-1+Greater+Noida+Uttar+Pradesh+201310&output=embed&z=15&iwloc=near";
const WA_MESSAGE = encodeURIComponent(
  "Hi NCR Home Tutor! I have a question about home tuition."
);

const SUBJECTS = [
  "General Inquiry",
  "Find a Tutor for My Child",
  "Register as a Tutor",
  "Fee Structure",
  "Tutor Replacement Request",
  "Online Tuition Query",
  "Other",
];

const OFFICE_HOURS = [
  { days: "Monday – Saturday", hours: "9:00 AM – 8:00 PM", open: true },
  { days: "Sunday", hours: "10:00 AM – 6:00 PM", open: true },
];

const CONTACT_FAQS = [
  {
    q: "How quickly will you respond?",
    a: "We respond to WhatsApp messages within minutes and to all other inquiries within 2 hours during office hours.",
  },
  {
    q: "Can I visit your office?",
    a: "Yes — we welcome walk-ins at our Sector Pi-1, Greater Noida office during office hours. No appointment needed.",
  },
  {
    q: "Do you serve areas outside Greater Noida?",
    a: "Yes. We cover all of Greater Noida, Noida, Delhi, Ghaziabad, Gurgaon, and Faridabad. Online tuition is available pan-India.",
  },
  {
    q: "Is the first demo class really free?",
    a: "Absolutely — 100% free, zero commitment. Your child attends the first class and you only proceed if fully satisfied.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const err: FormErrors = {};
  const phone10 = /^[6-9]\d{9}$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name.trim() || data.name.trim().length < 2)
    err.name = "Please enter your name";
  if (!phone10.test(data.phone.replace(/\s/g, "")))
    err.phone = "Enter a valid 10-digit Indian mobile number";
  if (data.email && !emailRx.test(data.email))
    err.email = "Enter a valid email address";
  if (!data.subject) err.subject = "Please select a subject";
  if (!data.message.trim() || data.message.trim().length < 10)
    err.message = "Please write a message (at least 10 characters)";

  return err;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
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
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const inputBase = (error?: string) =>
  `w-full px-4 py-3.5 rounded-xl border bg-white text-ink text-[15px]
   placeholder:text-ink-muted/55 transition-all duration-200
   focus:outline-none focus:ring-2 focus:ring-saffron-400/25 focus:border-saffron-400
   ${
     error
       ? "border-red-400 ring-2 ring-red-400/20"
       : "border-border hover:border-border-strong"
   }`;

function FieldWrapper({
  label,
  required,
  error,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-ink-secondary flex items-center gap-1.5">
        {icon && (
          <span className="text-ink-muted/70 w-3.5 h-3.5 flex items-center">
            {icon}
          </span>
        )}
        {label}
        {required && <span className="text-saffron-400 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 flex items-center gap-1"
          >
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
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #040D15 0%, #0C2340 50%, #1D5290 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glows */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(246,166,35,0.11) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(29,82,144,0.25) 0%, transparent 65%)",
        }}
      />

      {/* Animated ring decoration */}
      <motion.div
        className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-5%] top-[-10%] w-[380px] h-[380px] rounded-full border border-saffron-400/8 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-custom section-pad-sm relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-4 py-1.5 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">
              We Reply in Under 2 Hours
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.12 }}
          >
            We&apos;re Here to{" "}
            <span className="text-gradient-saffron">Help You</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="text-white/65 text-lg leading-relaxed mb-8"
          >
            Have a question about finding a tutor, joining our network, or
            anything else? Reach us instantly on WhatsApp or fill the form below.
          </motion.p>

          {/* Quick contact buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.a
              href={`https://wa.me/${PHONE_RAW}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-6 py-3.5 rounded-2xl text-white transition-all duration-200 active:scale-95"
              style={{
                background: "#25D366",
                boxShadow: "0 8px 28px rgba(37,211,102,0.4)",
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={18} />
              WhatsApp Us Now
            </motion.a>
            <motion.a
              href={`tel:+${PHONE_RAW}`}
              className="inline-flex items-center gap-2.5 font-bold px-6 py-3.5 rounded-2xl text-white border-2 border-white/25 transition-all duration-200 bg-saffron-500 hover:bg-white/10 active:scale-95"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={18} />
              Call {PHONE}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Wave → surface-3 */}
      <div
        className="relative pointer-events-none"
        aria-hidden="true"
        style={{ lineHeight: 0, marginTop: "-1px" }}
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "clamp(30px, 4vw, 60px)",
            display: "block",
          }}
        >
          <path
            d="M0 20 Q360 60 720 36 Q1080 12 1440 50 L1440 60 L0 60 Z"
            fill="#F4F6FA"
          />
        </svg>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT METHOD CARDS
// ─────────────────────────────────────────────────────────────────────────────

function ContactCardsSection() {
  const cards = [
    {
      icon: <MessageCircle size={24} />,
      label: "WhatsApp",
      value: PHONE,
      sub: "Usually replies in minutes",
      href: `https://wa.me/${PHONE_RAW}?text=${WA_MESSAGE}`,
      isExternal: true,
      accent: "#25D366",
      bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      border: "rgba(37,211,102,0.25)",
      iconBg: "#25D366",
      cta: "Open WhatsApp",
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: PHONE,
      sub: "Mon–Sat 9am–8pm, Sun 10am–6pm",
      href: `tel:+${PHONE_RAW}`,
      isExternal: false,
      accent: "#1D5290",
      bg: "linear-gradient(135deg, #EEF2F8, #D5E0EE)",
      border: "rgba(29,82,144,0.2)",
      iconBg: "#1D5290",
      cta: "Call Now",
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: EMAIL_ADDR,
      sub: "We reply within 4 hours",
      href: `mailto:${EMAIL_ADDR}`,
      isExternal: false,
      accent: "#F6A623",
      bg: "linear-gradient(135deg, #FFFBF0, #FDF0D5)",
      border: "rgba(246,166,35,0.3)",
      iconBg: "#F6A623",
      cta: "Send Email",
    },
    {
      icon: <MapPin size={24} />,
      label: "Office Address",
      value: ADDRESS_SHORT,
      sub: "Radha Krishna Complex, Aicher Market",
      href: MAPS_HREF,
      isExternal: true,
      accent: "#0C2340",
      bg: "linear-gradient(135deg, #F4F6FA, #EEF2F8)",
      border: "rgba(12,35,64,0.1)",
      iconBg: "#0C2340",
      cta: "Get Directions",
    },
  ];

  return (
    <section className="bg-surface-3 section-pad-sm">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <FadeUp key={card.label} delay={i * 0.08}>
              <motion.a
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noreferrer" : undefined}
                className="block rounded-2xl p-5 h-full group cursor-pointer"
                style={{
                  background: card.bg,
                  border: `1.5px solid ${card.border}`,
                  boxShadow: "var(--shadow-card)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-card-hover)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
                  style={{ background: card.iconBg }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {card.icon}
                </motion.div>

                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1.5">
                  {card.label}
                </p>
                <p
                  className="font-display font-bold text-base leading-snug mb-1"
                  style={{ color: card.accent }}
                >
                  {card.value}
                </p>
                <p className="text-xs text-ink-muted leading-relaxed mb-3">
                  {card.sub}
                </p>

                {/* Arrow CTA */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  style={{ color: card.accent }}
                >
                  {card.cta}
                  <ArrowRight size={12} />
                </div>
              </motion.a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE MAP PANEL
// ─────────────────────────────────────────────────────────────────────────────

function MapPanel() {
  const [mapHovered, setMapHovered] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Map embed */}
      <div
        className="relative rounded-2xl overflow-hidden flex-1"
        style={{
          minHeight: "320px",
          border: "1.5px solid rgba(29,82,144,0.12)",
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={() => setMapHovered(true)}
        onMouseLeave={() => setMapHovered(false)}
      >
        <iframe
          src={MAPS_EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", minHeight: "320px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="NCR Home Tutor Office Location"
        />

        {/* Hover overlay — get directions CTA */}
        <AnimatePresence>
          {mapHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ background: "rgba(4,13,21,0.35)", backdropFilter: "blur(2px)" }}
            >
              <motion.a
                href={MAPS_DIRECTIONS_HREF}
                target="_blank"
                rel="noreferrer"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ delay: 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto inline-flex items-center gap-2.5 font-bold px-6 py-3.5 rounded-2xl text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #0C2340, #1D5290)",
                  boxShadow: "0 8px 32px rgba(4,13,21,0.5)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Navigation size={16} />
                Get Directions
                <ExternalLink size={13} className="opacity-70" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pinned location badge — bottom left */}
        <div
          className="absolute bottom-4 left-4 right-4"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="inline-flex items-start gap-3 rounded-xl px-3.5 py-3 max-w-full"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "linear-gradient(135deg, #0C2340, #1D5290)" }}
            >
              <MapPin size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-navy-700 text-sm leading-tight">
                NCR Home Tutor
              </p>
              <p className="text-ink-muted text-xs leading-snug mt-0.5 truncate">
                Radha Krishna Complex, Sector Pi-1
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Directions button */}
      <motion.a
        href={MAPS_DIRECTIONS_HREF}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-3 rounded-2xl px-5 py-4 group"
        style={{
          background: "linear-gradient(135deg, #0C2340, #1D5290)",
          boxShadow: "0 4px 20px rgba(12,35,64,0.3)",
        }}
        whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(12,35,64,0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(246,166,35,0.2)" }}
          >
            <Navigation size={18} className="text-saffron-300" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">
              Get Directions
            </p>
            <p className="text-white/55 text-xs mt-0.5">{ADDRESS_SHORT}</p>
          </div>
        </div>
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)" }}
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={16} className="text-white" />
        </motion.div>
      </motion.a>

      {/* Office info grid */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, #EEF2F8, #F4F6FA)",
          border: "1.5px solid rgba(29,82,144,0.12)",
        }}
      >
        {/* Address row */}
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(29,82,144,0.12)" }}
          >
            <MapPin size={16} className="text-navy-700" />
          </div>
          <div>
            <p className="font-bold text-navy-700 text-sm mb-0.5">Office Address</p>
            <p className="text-ink-secondary text-xs leading-relaxed">{ADDRESS_FULL}</p>
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold mt-1.5 transition-colors hover:opacity-70"
              style={{ color: "#1D5290" }}
            >
              Open in Maps <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(246,166,35,0.15)" }}
          >
            <Clock size={16} style={{ color: "#B87000" }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-navy-700 text-sm mb-2.5">Office Hours</p>
            <div className="space-y-2">
              {OFFICE_HOURS.map((oh) => (
                <div
                  key={oh.days}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-xs font-semibold text-ink-secondary">
                    {oh.days}
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      background: "rgba(246,166,35,0.15)",
                      color: "#B87000",
                      border: "1px solid rgba(246,166,35,0.25)",
                    }}
                  >
                    {oh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick contact row */}
      <div className="grid grid-cols-2 gap-3">
        <motion.a
          href={`https://wa.me/${PHONE_RAW}?text=${WA_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 font-bold text-white text-sm"
          style={{ background: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </motion.a>
        <motion.a
          href={`tel:+${PHONE_RAW}`}
          className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 font-bold text-navy-700 text-sm"
          style={{
            background: "white",
            border: "1.5px solid rgba(29,82,144,0.2)",
            boxShadow: "var(--shadow-card)",
          }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Phone size={16} />
          <span>Call Us</span>
        </motion.a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────────────────────

function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(body.message ?? "Submission failed");
      }
      setIsSuccess(true);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white section-pad">
      <div className="container-custom">
        {/* Section header */}
        <FadeUp className="max-w-xl mb-10">
          <span className="section-eyebrow">Get in Touch</span>
          <h2
            className="font-display font-bold text-navy-700 mt-3 mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            Let&apos;s Talk About{" "}
            <span className="text-gradient-saffron">Your Child&apos;s</span>{" "}
            Education
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed">
            Whether you&apos;re looking for a tutor, want to join our network,
            or simply have a question — we respond fast.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
          {/* ── LEFT: Form ──────────────────────────────────────────────── */}
          <FadeUp delay={0.1}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                border: "1.5px solid rgba(29,82,144,0.1)",
                boxShadow: "0 8px 48px rgba(12,35,64,0.08)",
              }}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ── SUCCESS STATE ─────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white p-10 flex flex-col items-center text-center gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}
                    >
                      <CheckCircle2 size={40} style={{ color: "#16a34a" }} />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-navy-700 text-2xl mb-2">
                        Message Sent! 🎉
                      </h3>
                      <p className="text-ink-secondary text-base leading-relaxed max-w-sm mx-auto">
                        We&apos;ve received your message and will get back to
                        you within 2 hours during office hours.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${PHONE_RAW}?text=${WA_MESSAGE}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm"
                      style={{ background: "#25D366" }}
                    >
                      <MessageCircle size={16} />
                      Also message on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData(INITIAL);
                      }}
                      className="text-sm font-semibold text-ink-muted hover:text-ink-secondary transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ────────────────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white"
                    noValidate
                  >
                    {/* Form header */}
                    <div
                      className="px-8 py-6 border-b border-border"
                      style={{
                        background:
                          "linear-gradient(135deg, #F8FAFD 0%, #F1F5FB 100%)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #0C2340, #1D5290)",
                          }}
                        >
                          <Send size={18} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-navy-700 text-base leading-tight">
                            Send Us a Message
                          </h3>
                          <p className="text-ink-muted text-xs mt-0.5">
                            We reply within 2 hours
                          </p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Online Now
                        </div>
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="px-8 py-6 space-y-5">
                      {/* Name + Phone row */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FieldWrapper
                          label="Full Name"
                          required
                          error={errors.name}
                          icon={<User size={14} />}
                        >
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            className={inputBase(errors.name)}
                            autoComplete="name"
                          />
                        </FieldWrapper>

                        <FieldWrapper
                          label="Mobile Number"
                          required
                          error={errors.phone}
                          icon={<Hash size={14} />}
                        >
                          <input
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => onChange("phone", e.target.value)}
                            className={inputBase(errors.phone)}
                            autoComplete="tel"
                            maxLength={10}
                          />
                        </FieldWrapper>
                      </div>

                      {/* Email */}
                      <FieldWrapper
                        label="Email Address"
                        error={errors.email}
                        icon={<AtSign size={14} />}
                      >
                        <input
                          type="email"
                          placeholder="your@email.com (optional)"
                          value={formData.email}
                          onChange={(e) => onChange("email", e.target.value)}
                          className={inputBase(errors.email)}
                          autoComplete="email"
                        />
                      </FieldWrapper>

                      {/* Subject */}
                      <FieldWrapper
                        label="What can we help you with?"
                        required
                        error={errors.subject}
                        icon={<MessageSquare size={14} />}
                      >
                        <select
                          value={formData.subject}
                          onChange={(e) => onChange("subject", e.target.value)}
                          className={`${inputBase(errors.subject)} appearance-none cursor-pointer`}
                        >
                          <option value="">Select a subject…</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </FieldWrapper>

                      {/* Message */}
                      <FieldWrapper
                        label="Your Message"
                        required
                        error={errors.message}
                        icon={<MessageSquare size={14} />}
                      >
                        <textarea
                          rows={4}
                          placeholder="Tell us what you need…"
                          value={formData.message}
                          onChange={(e) => onChange("message", e.target.value)}
                          className={`${inputBase(errors.message)} resize-none`}
                        />
                        <div className="flex justify-end">
                          <span
                            className="text-xs text-ink-muted"
                            style={{
                              color:
                                formData.message.length < 10
                                  ? "#ef4444"
                                  : "#9ca3af",
                            }}
                          >
                            {formData.message.length} / 500
                          </span>
                        </div>
                      </FieldWrapper>

                      {/* Submit error */}
                      <AnimatePresence>
                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-xl px-4 py-3 text-sm font-semibold text-red-700 flex items-center gap-2"
                            style={{
                              background: "#fef2f2",
                              border: "1px solid #fecaca",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="shrink-0"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            {submitError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2.5 font-bold py-4 rounded-xl text-white text-[15px] relative overflow-hidden"
                        style={{
                          background: isSubmitting
                            ? "rgba(29,82,144,0.6)"
                            : "linear-gradient(135deg, #0C2340 0%, #1D5290 100%)",
                          boxShadow: isSubmitting
                            ? "none"
                            : "0 4px 24px rgba(12,35,64,0.35)",
                        }}
                        whileHover={
                          !isSubmitting
                            ? { scale: 1.015, y: -1 }
                            : undefined
                        }
                        whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                        transition={{ duration: 0.15 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending Message…
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </motion.button>

                      {/* Micro-copy */}
                      <p className="text-center text-xs text-ink-muted flex items-center justify-center gap-1.5">
                        <Shield size={11} className="text-ink-muted/70" />
                        Your information is safe with us. We never share your
                        details.
                      </p>
                    </div>

                    {/* Trust strip */}
                    <div
                      className="border-t border-border px-8 py-3.5 flex items-center justify-center gap-6 flex-wrap"
                      style={{ background: "#F8FAFD" }}
                    >
                      {[
                        { icon: <Zap size={13} />, text: "Reply in 2 hrs" },
                        { icon: <Shield size={13} />, text: "100% Private" },
                        { icon: <Gift size={13} />, text: "Free Advice" },
                      ].map(({ icon, text }) => (
                        <span
                          key={text}
                          className="text-xs font-semibold text-ink-muted flex items-center gap-1.5"
                        >
                          {icon} {text}
                        </span>
                      ))}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* ── RIGHT: Map + Info ───────────────────────────────────────── */}
          <FadeUp delay={0.2}>
            <MapPanel />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ SECTION
// ─────────────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-surface-3 section-pad-sm">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <FadeUp className="text-center mb-10">
            <span className="section-eyebrow section-eyebrow-center">
              Quick Answers
            </span>
            <h2
              className="font-display font-bold text-navy-700 mt-3"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
            >
              Common Questions
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {CONTACT_FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <motion.div
                  className="rounded-2xl overflow-hidden border bg-white"
                  animate={{
                    borderColor:
                      open === i
                        ? "rgba(246,166,35,0.4)"
                        : "rgba(12,35,64,0.08)",
                    boxShadow:
                      open === i
                        ? "0 4px 24px rgba(246,166,35,0.1)"
                        : "var(--shadow-card)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="font-display font-bold text-navy-700 text-base leading-snug pr-4">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: open === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          open === i
                            ? "var(--color-saffron-400)"
                            : "var(--color-surface-3)",
                      }}
                    >
                      <ChevronDown
                        size={14}
                        className={open === i ? "text-white" : "text-ink-muted"}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-6 pb-5 pt-0">
                          <div
                            className="h-px mb-4"
                            style={{ background: "rgba(246,166,35,0.2)" }}
                          />
                          <p className="text-ink-secondary text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Still have questions */}
          <FadeUp delay={0.3}>
            <div
              className="mt-8 rounded-2xl p-5 text-center border"
              style={{
                background: "linear-gradient(135deg, #EEF2F8, #F4F6FA)",
                borderColor: "rgba(29,82,144,0.12)",
              }}
            >
              <p className="font-semibold text-navy-700 mb-1">
                Still have a question?
              </p>
              <p className="text-ink-muted text-sm mb-3">
                We&apos;re always happy to help — reach us directly.
              </p>
              <motion.a
                href={`https://wa.me/${PHONE_RAW}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-sm"
                style={{ background: "#25D366" }}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={15} />
                Ask on WhatsApp
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA STRIP
// ─────────────────────────────────────────────────────────────────────────────

function CTAStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C2340 0%, #1D5290 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-custom py-12 relative z-10">
        <FadeUp className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-white text-2xl mb-1">
              Ready to find a tutor?
            </h2>
            <p className="text-white/60 text-sm">
              Join 17,000+ families. First demo class is 100% free.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl text-navy-700 bg-white transition-all duration-200 hover:bg-saffron-50 text-sm"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
              >
                🎓 Find a Tutor — Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/tutor-registration"
                className="inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl text-white border-2 border-white/25 transition-all duration-200 hover:bg-white/10 text-sm"
              >
                ✏️ Join as Tutor
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactContent() {
  return (
    <>
      <HeroSection />
      <ContactCardsSection />
      <ContactFormSection />
      <FAQSection />
      {/* <CTAStrip /> */}
    </>
  );
}