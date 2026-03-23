"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, PHONE, PHONE_RAW, WA_LINK, DEFAULT_WA_MSG } from "@/lib/utils";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "How It Works",    href: "/#how-it-works" },
  { label: "Subjects Covered", href: "/#subjects" },
  { label: "Areas Covered",   href: "/#areas" },
  { label: "Testimonials",    href: "/#testimonials" },
  { label: "FAQ",             href: "/#faq" },
  { label: "About Us",        href: "/about" },
  { label: "Blog",            href: "/blog" },
];

const AREA_LINKS = [
  { label: "Home Tutor Gaur City",         href: "/home-tutor-gaur-city" },
  { label: "Home Tutor Noida Extension",   href: "/home-tutor-noida-extension" },
  { label: "Home Tutor Alpha Greater Noida", href: "/home-tutor-alpha-greater-noida" },
  { label: "Home Tutor Beta Greater Noida",  href: "/home-tutor-beta-greater-noida" },
  { label: "Home Tutor Pari Chowk",        href: "/home-tutor-pari-chowk" },
  { label: "Home Tutor Techzone",          href: "/home-tutor-techzone" },
  { label: "Home Tutor Knowledge Park",    href: "/home-tutor-knowledge-park" },
];

const SUBJECT_LINKS = [
  { label: "Maths Tutor Greater Noida",    href: "/maths-tutor-greater-noida" },
  { label: "Science Tutor Greater Noida",  href: "/science-tutor-greater-noida" },
  { label: "Physics Tutor Greater Noida",  href: "/physics-tutor-greater-noida" },
  { label: "Chemistry Tutor Greater Noida", href: "/chemistry-tutor-greater-noida" },
  { label: "English Tutor Greater Noida",  href: "/english-tutor-greater-noida" },
  { label: "Accountancy Tutor Greater Noida", href: "/accountancy-tutor-greater-noida" },
];

// ─── Column Heading ───────────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-label font-bold uppercase tracking-[0.1em] text-saffron-400 mb-4">
      {children}
    </h3>
  );
}

// ─── Footer Component ─────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#050F1A] text-white/60 relative overflow-hidden">

      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(246,166,35,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Main Footer Grid ── */}
      <div className="container-custom relative z-10">

        {/* Pre-footer CTA strip */}
        <div className="border-b border-white/8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-display-sm font-bold text-white mb-1">
                Ready to find the right tutor?
              </h2>
              <p className="text-sm text-white/55">
                Free demo class · Verified tutors · 24-hour matching
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center md:justify-end">
              <a
                href={`tel:${PHONE_RAW}`}
                className={cn(
                  "inline-flex items-center gap-2 font-bold text-sm",
                  "bg-saffron-400 text-navy-700 rounded-full px-6 py-3",
                  "hover:bg-saffron-500 transition-colors"
                )}
              >
                <PhoneIcon size={15} />
                Call {PHONE}
              </a>
              <a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 font-bold text-sm",
                  "bg-whatsapp text-white rounded-full px-6 py-3",
                  "hover:opacity-90 transition-opacity"
                )}
              >
                <WhatsAppIcon size={15} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* ── Four Column Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="bg-navy-600 rounded-xl p-1.5 group-hover:bg-navy-500 transition-colors">
                <Image
                  src="/logo.png"
                  alt="NCR Home Tutor"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg text-white">
                NCR Home Tutor
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-white/55 mb-5 max-w-xs">
              Greater Noida's most trusted home tuition bureau since 2011.
              Connecting families with verified, qualified tutors — all classes,
              all subjects, all boards.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${PHONE_RAW}`}
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-saffron-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-400/15">
                  <PhoneIcon size={14} />
                </span>
                {PHONE}
              </a>

              <a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-whatsapp transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp/15">
                  <WhatsAppIcon size={14} />
                </span>
                WhatsApp Us
              </a>

              <p className="flex items-start gap-2.5 text-sm text-white/55">
                <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                  📍
                </span>
                <span>
                  Radha Krishna Complex, Aicher Market,
                  Sector Pi-1, Greater Noida, UP 201310
                </span>
              </p>
            </div>

            {/* Google rating badge */}
            <div className="mt-5 inline-flex items-center gap-2.5 bg-white/6 border border-white/8 rounded-xl px-4 py-2.5">
              <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
              <div>
                <p className="text-xs font-semibold text-white/80">5.0 on Google</p>
                <p className="text-[10px] text-white/45">Trusted since 2011</p>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-400/0 group-hover:bg-saffron-400 transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tutor-registration"
                  className="text-sm text-saffron-400/80 hover:text-saffron-400 transition-colors duration-150 font-medium flex items-center gap-1.5"
                >
                  → Tutor Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Areas */}
          <div>
            <ColHeading>Areas We Serve</ColHeading>
            <ul className="space-y-2.5">
              {AREA_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-400/0 group-hover:bg-saffron-400 transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Subjects */}
          <div>
            <ColHeading>Subjects</ColHeading>
            <ul className="space-y-2.5">
              {SUBJECT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-400/0 group-hover:bg-saffron-400 transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Boards */}
            <div className="mt-6">
              <ColHeading>Boards Covered</ColHeading>
              <div className="flex flex-wrap gap-2">
                {["CBSE", "ICSE", "UP Board", "IGCSE"].map((b) => (
                  <span
                    key={b}
                    className="text-xs font-semibold text-white/70 bg-white/8 border border-white/10 rounded-full px-3 py-1"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="border-t border-white/8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "13+",    label: "Years of Trust" },
            { num: "17,000+", label: "Happy Students" },
            { num: "8,000+", label: "Verified Tutors" },
            { num: "24 hrs",  label: "Tutor Matching" },
          ].map(({ num, label }) => (
            <div key={label} className="py-2">
              <div className="font-display font-bold text-2xl text-white mb-0.5">{num}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Footer Bottom ── */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} NCR Home Tutor. All rights reserved.
            Serving Greater Noida since 2011.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="text-xs text-white/35 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs text-white/35 hover:text-white/70 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-white/35 hover:text-white/70 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}