"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn, PHONE, PHONE_RAW, WA_LINK, DEFAULT_WA_MSG } from "@/lib/utils";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/Button";

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About Us",     href: "/about" },
  { label: "Subjects",     href: "/#subjects" },
  { label: "Areas",        href: "/#areas" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/#contact" },
] as const;

// ─── Framer Motion Variants ────────────────────────────────────────────────

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileNavItem = {
  closed: { opacity: 0, x: -20 },
  open:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const announcementVariants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.3 } },
};

// ─── TopBar Component ─────────────────────────────────────────────────────

function TopBar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="topbar"
          variants={announcementVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-navy-700 overflow-hidden"
        >
          <div className="container-custom">
            <div className="flex items-center justify-center gap-2 py-2.5">
              <span className="text-xs font-semibold text-white/75 tracking-wide">
                🎓 First Demo Class is Completely
              </span>
              <span className="bg-saffron-400 text-navy-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                FREE
              </span>
              <span className="text-white/50 hidden sm:inline text-xs">—</span>
              <a
                href={`tel:${PHONE_RAW}`}
                className="text-saffron-400 text-xs font-bold hover:text-saffron-300 transition-colors hidden sm:inline"
              >
                Call now: {PHONE}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Hamburger ─────────────────────────────────────────────────────────────

function Hamburger({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "relative flex flex-col justify-center items-center",
        "w-10 h-10 rounded-xl transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400",
        open ? "bg-navy-700" : "hover:bg-navy-700/5"
      )}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "block w-5 h-0.5 rounded-full mb-1.5 transition-colors",
          open ? "bg-white" : "bg-navy-700"
        )}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className={cn("block w-5 h-0.5 rounded-full mb-1.5", open ? "bg-white" : "bg-navy-700")}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn("block w-5 h-0.5 rounded-full", open ? "bg-white" : "bg-navy-700")}
      />
    </button>
  );
}

// ─── Active indicator dot ─────────────────────────────────────────────────

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
        "relative text-sm font-semibold px-1 py-1",
        "transition-colors duration-200",
        "group focus-visible:outline-none",
        active ? "text-navy-700" : "text-ink-secondary hover:text-navy-700"
      )}
    >
      {label}
      {/* Underline indicator */}
      <motion.span
        layoutId="nav-indicator"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-saffron-400 rounded-full"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "center" }}
      />
    </Link>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [hidden, setHidden]               = useState(false);

  const pathname  = usePathname();
  const lastY     = useRef(0);
  const { scrollY } = useScroll();

  // Hide/show navbar on scroll up/down, with topbar dismiss
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    setTopBarVisible(y < 80);

    // Hide navbar when scrolling down fast (past hero)
    if (y > 400) {
      if (y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 3) {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ── Top Announcement Bar ── */}
      <TopBar visible={topBarVisible} />

      {/* ── Main Header ── */}
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-50 w-full",
          "transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(12,35,64,0.1)] border-b border-border"
            : "bg-white border-b border-border/50"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group"
              aria-label="NCR Home Tutor - Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative"
              >
                {/* Logo glow on hover */}
                <div className="absolute inset-0 rounded-xl bg-saffron-400/0 group-hover:bg-saffron-400/10 transition-colors duration-300" />
                <Image
                  src="/logo.png"
                  alt="NCR Home Tutor"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain rounded-xl"
                  priority
                />
              </motion.div>

              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-navy-700 text-[17px] leading-tight tracking-tight">
                  NCR Home Tutor
                </span>
                <span className="text-[10.5px] font-semibold text-ink-muted tracking-widest uppercase">
                  Greater Noida&apos;s #1 Tuition Bureau
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  active={isActive(href)}
                />
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {/* Phone */}
              <motion.a
                href={`tel:${PHONE_RAW}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "hidden lg:inline-flex items-center gap-2",
                  "text-navy-700 font-semibold text-sm",
                  "border-2 border-navy-700/20 rounded-full px-4 py-2.5",
                  "hover:border-navy-700/60 hover:bg-navy-700/5",
                  "transition-all duration-200"
                )}
              >
                <PhoneIcon size={15} />
                <span>{PHONE}</span>
              </motion.a>

              {/* WhatsApp CTA */}
              <motion.a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(37,211,102,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "inline-flex items-center gap-2",
                  "bg-whatsapp text-white font-bold text-sm",
                  "rounded-full px-5 py-2.5",
                  "transition-colors duration-200"
                )}
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp</span>
              </motion.a>

              {/* Book Demo CTA */}
              <motion.a
                href="#book-demo"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(246,166,35,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "inline-flex items-center gap-2",
                  "bg-saffron-400 text-navy-700 font-bold text-sm",
                  "rounded-full px-5 py-2.5",
                  "relative overflow-hidden",
                  "transition-colors duration-200 hover:bg-saffron-500"
                )}
              >
                <span className="relative z-10">Free Demo</span>
                {/* Shimmer effect */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s linear infinite",
                  }}
                />
              </motion.a>
            </div>

            {/* ── Mobile: WA icon + Hamburger ── */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.a
                href={WA_LINK(DEFAULT_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.93 }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-whatsapp text-white"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </motion.a>

              <Hamburger
                open={mobileOpen}
                toggle={() => setMobileOpen((o) => !o)}
              />
            </div>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white border-t border-border"
            >
              <div className="container-custom py-4 pb-6">

                {/* Nav links */}
                <nav className="mb-5" aria-label="Mobile navigation">
                  {NAV_LINKS.map(({ label, href }, i) => (
                    <motion.div
                      key={href}
                      custom={i}
                      variants={mobileNavItem}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between",
                          "py-3.5 border-b border-border",
                          "text-base font-semibold transition-colors duration-150",
                          isActive(href)
                            ? "text-navy-700"
                            : "text-ink-secondary hover:text-navy-700"
                        )}
                      >
                        <span>{label}</span>
                        {isActive(href) && (
                          <span className="w-2 h-2 rounded-full bg-saffron-400" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <a
                    href={`tel:${PHONE_RAW}`}
                    className={cn(
                      "flex items-center justify-center gap-2",
                      "bg-navy-700 text-white font-bold text-sm",
                      "rounded-2xl py-3.5 px-4",
                      "transition-opacity hover:opacity-90"
                    )}
                  >
                    <PhoneIcon size={16} />
                    Call Now
                  </a>
                  <a
                    href={WA_LINK(DEFAULT_WA_MSG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2",
                      "bg-whatsapp text-white font-bold text-sm",
                      "rounded-2xl py-3.5 px-4",
                      "transition-opacity hover:opacity-90"
                    )}
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </motion.div>

                {/* Trust note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-center text-xs text-ink-muted mt-4"
                >
                  ⭐ 5.0 rated · 17,000+ families · Since 2011
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <MobileBottomBar />

      {/* ── Floating WhatsApp ── */}
      <FloatingWhatsApp />
    </>
  );
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #F6A623, #E09010)",
      }}
    />
  );
}

// ─── Floating WhatsApp Button ────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLabel(false), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-28 right-5 z-[800] flex flex-col items-end gap-2.5 lg:bottom-8 lg:right-7">
      {/* Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "bg-white text-ink font-semibold text-sm",
              "px-3.5 py-2 rounded-xl shadow-pop",
              "border border-border whitespace-nowrap"
            )}
          >
            💬 Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      {/* WA Button */}
      <motion.a
        href={WA_LINK(DEFAULT_WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12, boxShadow: "0 12px 40px rgba(37,211,102,0.55)" }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full shadow-wa"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring opacity-60" />
        <span
          className="absolute inset-0 rounded-full bg-whatsapp opacity-40"
          style={{ animation: "pulse-ring 2s ease-out 0.5s infinite" }}
        />
        <WhatsAppIcon size={26} />
      </motion.a>
    </div>
  );
}

// ─── Mobile Sticky Bottom Bar ────────────────────────────────────────────────

function MobileBottomBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-700",
        "flex items-center gap-2.5 p-3",
        "bg-white/95 backdrop-blur-xl border-t border-border",
        "shadow-[0_-4px_24px_rgba(12,35,64,0.12)]",
        "lg:hidden" // hide on desktop
      )}
    >
      <a
        href={`tel:${PHONE_RAW}`}
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "bg-navy-700 text-white font-bold text-sm",
          "rounded-2xl py-3.5",
          "transition-opacity active:opacity-80"
        )}
      >
        <PhoneIcon size={16} />
        Call Now
      </a>
      <a
        href={WA_LINK(DEFAULT_WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "bg-whatsapp text-white font-bold text-sm",
          "rounded-2xl py-3.5",
          "transition-opacity active:opacity-80"
        )}
      >
        <WhatsAppIcon size={16} />
        WhatsApp
      </a>
      <a
        href="#book-demo"
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "bg-saffron-400 text-navy-700 font-bold text-sm",
          "rounded-2xl py-3.5",
          "transition-opacity active:opacity-80 relative overflow-hidden"
        )}
      >
        <span className="relative z-10">Free Demo</span>
      </a>
    </motion.div>
  );
}