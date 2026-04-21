"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import {
  Phone,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { cn, PHONE, PHONE_RAW, WA_LINK, DEFAULT_WA_MSG } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEMS
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     href: "/",          sectionId: null       },
  { label: "About",    href: "/about",     sectionId: null       },
  { label: "Subjects", href: "/#subjects", sectionId: "subjects" },
  { label: "Areas",    href: "/#areas",    sectionId: "areas"    },
  { label: "Blog",     href: "/blog",      sectionId: null       },
  { label: "Contact",  href: "/contact",   sectionId: null       },
] as const;

// Section IDs to observe on the home page
const HOME_SECTION_IDS = NAV_LINKS
  .filter((l) => l.sectionId !== null)
  .map((l) => l.sectionId as string);

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL SPY HOOK
// Observes section elements; returns ID of whichever is currently in viewport
// ─────────────────────────────────────────────────────────────────────────────

function useScrollSpy(ids: string[], enabled: boolean): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the topmost visible section
        const topmost = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        setActiveId(topmost.target.id);
      },
      {
        // Trigger when section enters the top 10%–35% of the viewport
        rootMargin: "-10% 0px -65% 0px",
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, enabled]);

  return activeId;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOTION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.055,
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const bannerVariants: Variants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.22 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENT BANNER
// ─────────────────────────────────────────────────────────────────────────────

function AnnouncementBanner({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="banner"
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #040D15 0%, #0C2340 50%, #040D15 100%)",
          }}
        >
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-4">
            <GraduationCap size={12} className="text-saffron-400 shrink-0" />
            <p className="text-xs font-semibold text-white/70 tracking-wide">
              First Demo Class is Completely{" "}
              <span
                className="font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-widest ml-1 inline-block"
                style={{
                  background: "linear-gradient(135deg, #F6A623, #FBDFA0)",
                  color: "#0C2340",
                }}
              >
                FREE
              </span>
            </p>
            <span className="text-white/25 hidden sm:inline select-none">·</span>
            <a
              href={`tel:+${PHONE_RAW}`}
              className="text-saffron-400/75 text-xs font-semibold hover:text-saffron-400 transition-colors duration-150 hidden sm:inline"
            >
              {PHONE}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP NAV LINK — scroll-spy aware
// ─────────────────────────────────────────────────────────────────────────────

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-[13.5px] font-semibold py-1 px-0.5",
        "transition-colors duration-200 rounded-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400/50",
        active ? "text-navy-700" : "text-ink-secondary hover:text-navy-700",
      )}
    >
      {label}
      {/* Saffron underline — CSS transition avoids layoutId conflicts */}
      <span
        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, #F6A623, #E09010)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          opacity: active ? 1 : 0,
          transition:
            "transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
          transformOrigin: "left",
        }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HAMBURGER — animated icon swap (Menu ↔ X)
// ─────────────────────────────────────────────────────────────────────────────

function Hamburger({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-xl shrink-0",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400/50",
        open
          ? "bg-navy-700 text-white"
          : "text-navy-700 hover:bg-navy-700/[0.07]",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ rotate: -80, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 80, opacity: 0 }}
            transition={{ duration: 0.17 }}
            className="flex"
          >
            <X size={17} strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 80, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -80, opacity: 0 }}
            transition={{ duration: 0.17 }}
            className="flex"
          >
            <Menu size={17} strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #F6A623, #FBDFA0, #E09010)",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING WHATSAPP
// ─────────────────────────────────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-24 right-5 z-[800] flex flex-col items-end gap-2 lg:bottom-8 lg:right-7">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            className="bg-white border border-border rounded-xl px-3.5 py-2 shadow-pop whitespace-nowrap"
          >
            <p className="text-[13px] font-semibold text-navy-700">Chat with us</p>
            <p className="text-[11px] text-ink-muted mt-0.5">
              Usually replies in minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WA_LINK(DEFAULT_WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full"
        style={{
          background: "#25D366",
          boxShadow: "0 6px 28px rgba(37,211,102,0.42)",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(37,211,102,0.55)" }}
        whileTap={{ scale: 0.93 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "#25D366" }}
          animate={{ scale: [1, 1.55, 1.55], opacity: [0.45, 0, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
        <WhatsAppIcon size={26} />
      </motion.a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE STICKY BOTTOM BAR
// Two actions only — Call and Free Demo (WhatsApp = floating button)
// ─────────────────────────────────────────────────────────────────────────────

function MobileBottomBar() {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[700] lg:hidden",
        "grid grid-cols-2 gap-2.5 px-3 py-3",
        "bg-white/97 backdrop-blur-xl",
        "border-t border-border",
        "shadow-[0_-2px_20px_rgba(12,35,64,0.09)]",
      )}
    >
      {/* Call — deepest navy bg, white text = maximum contrast */}
      <a
        href={`tel:+${PHONE_RAW}`}
        className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm"
        style={{
          background: "#0C2340",
          color: "#FFFFFF",
        }}
      >
        <Phone size={15} strokeWidth={2.3} />
        Call Now
      </a>

      {/* Free Demo — saffron bg, deep navy text = maximum contrast */}
      <a
        href="#book-demo"
        className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F6A623 0%, #E09010 100%)",
          color: "#0C2340",
          boxShadow: "0 2px 16px rgba(246,166,35,0.36)",
        }}
      >
        <Sparkles size={14} strokeWidth={2.3} />
        Free Demo
      </a>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [navHidden, setNavHidden]         = useState(false);

  const pathname    = usePathname();
  const lastY       = useRef(0);
  const { scrollY } = useScroll();
  const isHomePage  = pathname === "/";

  // ── Scroll spy — only active on home page ──────────────────────────────
  const activeSection = useScrollSpy(HOME_SECTION_IDS, isHomePage);

  // ── Scroll listener ────────────────────────────────────────────────────
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    setBannerVisible(y < 70);

    if (y > 360) {
      if (y > lastY.current + 8) setNavHidden(true);
      else if (y < lastY.current - 5) setNavHidden(false);
    } else {
      setNavHidden(false);
    }
    lastY.current = y;
  });

  // ── Close menu on wide screen ──────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll when menu is open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Active check — scroll-spy aware ───────────────────────────────────
  // For hash links:   only active when that section is visible on screen
  // For page links:   standard pathname match
  // For /:           active only when on homepage with no section in view
  const isActive = useCallback(
    (href: string, sectionId: string | null): boolean => {
      if (sectionId !== null) {
        // Section link — must be on home page AND section must be in viewport
        return isHomePage && activeSection === sectionId;
      }
      if (href === "/") {
        return isHomePage && activeSection === null;
      }
      return pathname.startsWith(href);
    },
    [pathname, isHomePage, activeSection]
  );

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBanner visible={bannerVisible} />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <motion.header
        animate={{ y: navHidden ? "-110%" : "0%" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/96 backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_0_rgba(12,35,64,0.05),0_4px_24px_rgba(12,35,64,0.07)]"
            : "bg-white border-b border-border/30",
        )}
      >
        <div className="container-custom">
          <div className="flex items-center h-[68px] gap-4">

            {/* ── Logo lockup ─────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              style={{ marginRight: "clamp(12px, 2vw, 32px)" }}
              aria-label="NCR Home Tutor — Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 rounded-xl bg-saffron-400/0 group-hover:bg-saffron-400/10 transition-colors duration-300" />
                <Image
                  src="/logo.png"
                  alt="NCR Home Tutor"
                  width={42}
                  height={42}
                  className="w-[42px] h-[42px] object-contain rounded-xl"
                  priority
                />
              </motion.div>

              {/* Text block — logo title + descriptor */}
              <div className="hidden sm:flex flex-col justify-center gap-[3px]">
                <span
                  className="font-display font-bold text-navy-700 leading-none tracking-[-0.01em]"
                  style={{ fontSize: "15px" }}
                >
                  NCR Home Tutor
                </span>
                <span
                  className="font-semibold text-ink-muted leading-none tracking-[0.09em] uppercase"
                  style={{ fontSize: "9px" }}
                >
                  Home Tuition Bureau&nbsp;·&nbsp;Since 2011
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ───────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-5 flex-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, href, sectionId }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  active={isActive(href, sectionId)}
                />
              ))}
            </nav>

            {/* ── Desktop CTAs ────────────────────────────────────────── */}
            {/*
              Visual hierarchy (left → right, lowest → highest weight):
              1. Phone number  — ghost / text link
              2. WhatsApp      — outline with green tint
              3. Free Demo     — filled saffron (only hard CTA)
            */}
            <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
              {/* 1. Phone ghost link */}
              <motion.a
                href={`tel:+${PHONE_RAW}`}
                className={cn(
                  "hidden lg:inline-flex items-center gap-1.5",
                  "text-ink-secondary hover:text-navy-700",
                  "text-[13px] font-semibold",
                  "rounded-full px-3.5 py-2",
                  "border border-transparent hover:border-border hover:bg-surface-3",
                  "transition-all duration-200",
                )}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={13} strokeWidth={2.3} />
                {PHONE}
              </motion.a>

              {/* Separator */}
              <div className="hidden lg:block w-px h-4 bg-border mx-1 shrink-0" />

              {/* 2. WhatsApp outline */}
              <motion.a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold rounded-full px-4 py-2 transition-all duration-200"
                style={{
                  color: "#138a43",
                  border: "1.5px solid rgba(37,211,102,0.32)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.32)";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon size={14} />
                WhatsApp
              </motion.a>

              {/* 3. Free Demo — primary filled CTA */}
              <motion.a
                href="#book-demo"
                className="inline-flex items-center gap-1.5 font-bold text-[13px] rounded-full px-5 py-2 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #F6A623 0%, #E09010 100%)",
                  color: "#0C2340",           /* dark navy on saffron = high contrast */
                  boxShadow: "0 2px 14px rgba(246,166,35,0.36)",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 6px 24px rgba(246,166,35,0.48)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.38) 50%, transparent 65%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPositionX: ["200%", "-200%"] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1.5,
                  }}
                />
                <Sparkles size={13} strokeWidth={2.3} className="relative z-10" />
                <span className="relative z-10">Free Demo</span>
              </motion.a>
            </div>

            {/* ── Mobile: WA icon + Hamburger ─────────────────────────── */}
            <div className="flex items-center gap-2 md:hidden ml-auto">
              <motion.a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0"
                style={{ background: "#25D366" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon size={16} />
              </motion.a>
              <Hamburger
                open={mobileOpen}
                toggle={() => setMobileOpen((o) => !o)}
              />
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ─────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white"
              style={{ borderTop: "1px solid rgba(12,35,64,0.07)" }}
            >
              <div className="px-5 pt-4 pb-7 space-y-5">

                {/* Nav links */}
                <nav aria-label="Mobile navigation">
                  {NAV_LINKS.map(({ label, href, sectionId }, i) => {
                    const active = isActive(href, sectionId);
                    return (
                      <motion.div
                        key={href}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between py-3.5",
                            "border-b border-border/50",
                            "text-[15px] font-semibold transition-colors duration-150",
                            active
                              ? "text-navy-700"
                              : "text-ink-secondary hover:text-navy-700",
                          )}
                        >
                          <span>{label}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            {active && (
                              <span
                                className="w-[7px] h-[7px] rounded-full"
                                style={{ background: "#F6A623" }}
                              />
                            )}
                            <ChevronRight
                              size={13}
                              strokeWidth={2.5}
                              className="text-ink-muted/40"
                            />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* CTA block */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.36 }}
                  className="space-y-2.5 pt-1"
                >
                  {/* Primary — full width, saffron, dark text */}
                  <a
                    href="#book-demo"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl py-[15px] font-bold text-[15px]"
                    style={{
                      background: "linear-gradient(135deg, #F6A623, #E09010)",
                      color: "#0C2340",
                      boxShadow: "0 4px 20px rgba(246,166,35,0.38)",
                    }}
                  >
                    <Sparkles size={16} strokeWidth={2.3} />
                    Book Free Demo Class
                  </a>

                  {/* Secondary row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Call — deep navy, white text */}
                    <a
                      href={`tel:+${PHONE_RAW}`}
                      className="flex items-center justify-center gap-2 rounded-xl py-[13px] font-bold text-sm"
                      style={{
                        background: "#0C2340",
                        color: "#FFFFFF",
                      }}
                    >
                      <Phone size={14} strokeWidth={2.3} />
                      Call Now
                    </a>
                    {/* WhatsApp — brand green, white text */}
                    <a
                      href={WA_LINK(DEFAULT_WA_MSG)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl py-[13px] font-bold text-sm"
                      style={{
                        background: "#25D366",
                        color: "#FFFFFF",
                      }}
                    >
                      <WhatsAppIcon size={14} />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>

                {/* Social proof strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.48 }}
                  className="flex items-center justify-center gap-4 pt-1"
                >
                  {["⭐ 5.0 rated", "17,000+ families", "Since 2011"].map((t) => (
                    <span key={t} className="text-[11px] text-ink-muted font-semibold">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileBottomBar />
      <FloatingWhatsApp />
    </>
  );
}