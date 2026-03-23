/**
 * NCR Home Tutor — Animation Variants
 * All Motion variants used across the site.
 * Import from here — never define inline in components.
 *
 * Uses: motion/react (formerly framer-motion, rebranded at v11+)
 */

import type { Variants } from 'motion/react'

/* ── Custom easing curves ── */
export const easings = {
  smooth:  [0.22, 1, 0.36, 1] as const,
  expo:    [0.16, 1, 0.3, 1] as const,
  spring:  [0.34, 1.56, 0.64, 1] as const,
  inOut:   [0.4, 0, 0.2, 1] as const,
}

/* ─────────────────────────────────────────
   REVEAL VARIANTS
───────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: easings.smooth },
  },
}

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easings.inOut },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: easings.smooth },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: easings.smooth },
  },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: easings.spring },
  },
}

/* ─────────────────────────────────────────
   STAGGER CONTAINERS
───────────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

/* ─────────────────────────────────────────
   STAGGER ITEMS
───────────────────────────────────────── */

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: easings.smooth },
  },
}

export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

export const staggerPill: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.35, ease: easings.spring },
  },
}

/* ─────────────────────────────────────────
   HERO ANIMATIONS
───────────────────────────────────────── */

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: easings.smooth },
  },
}

export const heroBadge: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: easings.spring },
  },
}

export const heroFormCard: Variants = {
  hidden: { opacity: 0, x: 40, y: 20 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, ease: easings.smooth, delay: 0.35 },
  },
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */

export const navReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

/* ─────────────────────────────────────────
   FLOATING ELEMENTS
───────────────────────────────────────── */

export const floatIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: {
      delay: 1.5 + i * 0.15,
      duration: 0.5,
      ease: easings.spring,
    },
  }),
}

/* ─────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────── */

export const faqAnswer: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.35, ease: easings.smooth },
      opacity: { duration: 0.25, delay: 0.08 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.28, ease: easings.inOut },
      opacity: { duration: 0.15 },
    },
  },
}

export const faqChevron: Variants = {
  closed: { rotate: 0 },
  open: {
    rotate: 180,
    transition: { duration: 0.3, ease: easings.smooth },
  },
}

/* ─────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────── */

export const statReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: easings.smooth },
  }),
}

/* ─────────────────────────────────────────
   VIEWPORT DEFAULTS
   Apply to every whileInView — always once: true
───────────────────────────────────────── */

export const viewportOnce = { once: true, margin: '-80px' } as const
export const viewportTight = { once: true, margin: '-40px' } as const