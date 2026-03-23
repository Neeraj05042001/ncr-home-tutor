import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Variants } from "framer-motion";

// ─── cn helper (shadcn-style) ─────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Shared Framer Motion Variants ───────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const cardHover = {
  rest:  { y: 0, boxShadow: "0 2px 16px rgba(12,35,64,0.08)" },
  hover: {
    y: -6,
    boxShadow: "0 16px 48px rgba(12,35,64,0.16)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const buttonTap = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.03 },
  transition: { type: "spring", stiffness: 400, damping: 20 },
};

// ─── Phone number formatter ───────────────────────────────────────────────────
export const PHONE = "+91 8076661356";
export const PHONE_RAW = "+918076661356";
export const WA_LINK = (msg?: string) =>
  `https://wa.me/918076661356${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
export const DEFAULT_WA_MSG =
  "Hello, I am looking for a home tutor in Greater Noida. Please help me find the right tutor for my child.";