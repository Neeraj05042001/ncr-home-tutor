/**
 * NCR Home Tutor — Site Constants
 * Single source of truth for all content, contact info, and data.
 * Change here → changes everywhere.
 */

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
export const PHONE_NUMBER    = '+91 8076661356'
export const PHONE_RAW       = '+918076661356'
export const PHONE_HREF      = 'tel:+918076661356'
export const EMAIL           = 'info@ncrhometutor.com'
export const WA_MESSAGE      = 'Hi NCR Home Tutor! I am looking for a home tutor in Greater Noida.'
export const WA_HREF         = `https://wa.me/918076661356?text=${encodeURIComponent(WA_MESSAGE)}`
export const MAPS_HREF       = 'https://goo.gl/maps/Fd1vZSRb5agrhfki8'
export const ADDRESS         = 'Radha Krishna Complex, Sector Pi-1, Greater Noida, UP'

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
export const STATS = [
  { value: 13,    suffix: '',    label: 'Years of Experience', description: 'Serving Greater Noida since 2011' },
  { value: 17000, suffix: '+',  label: 'Happy Students',       description: 'Families who trust us' },
  { value: 8000,  suffix: '+',  label: 'Verified Tutors',      description: 'Background-checked & qualified' },
] as const

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Call or Fill the Form',
    description:
      'Tell us your child\'s class, subject, and area. Takes under 2 minutes — we do the rest.',
  },
  {
    step: 2,
    title: 'We Match the Right Tutor',
    description:
      'From 8,000+ verified tutors, we find the best fit for your child\'s syllabus, schedule, and learning style.',
  },
  {
    step: 3,
    title: 'Free Demo Class',
    description:
      'Your child attends the first class completely free. Happy with the tutor? We begin. No pressure, ever.',
  },
] as const

/* ─────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────── */
export const WHY_CHOOSE_US = [
  {
    id: 'verified',
    title: 'Background-Verified Tutors',
    description:
      'Every tutor is identity-verified and evaluated before being assigned to any student. Your child\'s safety is non-negotiable.',
  },
  {
    id: 'fast',
    title: 'Matched in 24 Hours',
    description:
      'No long waiting lists. We understand urgency and have qualified tutors available across every part of Greater Noida.',
  },
  {
    id: 'results',
    title: 'Result-Oriented Teaching',
    description:
      'Our tutors focus on concept clarity and exam readiness — not just syllabus coverage. We track progress and stay accountable.',
  },
  {
    id: 'boards',
    title: 'All Boards Covered',
    description:
      'CBSE, ICSE, UP Board, and IGCSE. Subject experts for every curriculum and every class from Nursery to Graduation.',
  },
  {
    id: 'affordable',
    title: 'Affordable & Transparent',
    description:
      'Clear, upfront fee structure with zero hidden charges. We work within your budget to find the best possible match.',
  },
  {
    id: 'guarantee',
    title: 'Free Replacement Guarantee',
    description:
      'Not happy with the tutor? We replace them free of charge, no questions asked. Your child\'s comfort is everything.',
  },
] as const

/* ─────────────────────────────────────────
   SUBJECTS
───────────────────────────────────────── */
export const SUBJECTS = [
  { name: 'Mathematics',       slug: 'mathematics' },
  { name: 'Science',           slug: 'science' },
  { name: 'Physics',           slug: 'physics' },
  { name: 'Chemistry',         slug: 'chemistry' },
  { name: 'Biology',           slug: 'biology' },
  { name: 'English',           slug: 'english' },
  { name: 'Hindi',             slug: 'hindi' },
  { name: 'Social Science',    slug: 'social-science' },
  { name: 'Accountancy',       slug: 'accountancy' },
  { name: 'Computer Science',  slug: 'computer-science' },
  { name: 'Business Studies',  slug: 'business-studies' },
  { name: 'Economics',         slug: 'economics' },
] as const

export const CLASSES = [
  'Nursery', 'KG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12', 'Graduation',
] as const

export const BOARDS = ['CBSE', 'ICSE', 'UP Board', 'IGCSE'] as const

/* ─────────────────────────────────────────
   AREAS
───────────────────────────────────────── */
export const AREAS = [
  'Alpha 1', 'Alpha 2',
  'Beta 1', 'Beta 2',
  'Gamma', 'Delta',
  'Sector Pi 1', 'Sector Pi 2',
  'Omega', 'Chi', 'Mu', 'Zeta', 'Eta', 'Phi',
  'Gaur City',
  'Noida Extension',
  'Pari Chowk',
  'Sector 93',
  'Sector 137',
  'Techzone 4',
  'Knowledge Park',
  'Surajpur',
  'Kasna',
  'Rabupura',
  'Dadri Road',
] as const

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    id: 1,
    initial: 'P',
    name: 'Priya Sharma',
    role: 'Parent',
    area: 'Sector 93, Greater Noida',
    rating: 5,
    text:
      'Within 24 hours of calling, we had an excellent Maths tutor for our Class 10 daughter. Her board result improved from 68% to 89%. I still cannot believe the transformation in just five months.',
    subject: 'Class 10 — Mathematics',
  },
  {
    id: 2,
    initial: 'R',
    name: 'Rahul Gupta',
    role: 'Parent',
    area: 'Gaur City, Noida Extension',
    rating: 5,
    text:
      'Best decision we made. The Science tutor they sent was patient and genuinely invested in my son\'s progress. He went from failing to scoring 76 in just six months. Remarkable difference.',
    subject: 'Class 9 — Science',
  },
  {
    id: 3,
    initial: 'A',
    name: 'Anita Verma',
    role: 'Parent',
    area: 'Alpha 2, Greater Noida',
    rating: 5,
    text:
      'We have been with NCR Home Tutor for all three of our children across four years. Always reliable, always professional. The free replacement guarantee is real — we experienced it and they handled it without any fuss.',
    subject: '3 children — Multiple Subjects',
  },
] as const

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
export const FAQS = [
  {
    id: 'speed',
    question: 'How quickly can I get a tutor for my child?',
    answer:
      'In most cases, we match you with a verified tutor within 24 hours of your enquiry. For urgent requirements, many parents get a tutor the same day by calling us directly.',
  },
  {
    id: 'demo',
    question: 'Is the first demo class really free?',
    answer:
      'Yes, 100% free. Your child attends the first class with no commitment and no payment required. You only continue if you are completely satisfied with the tutor.',
  },
  {
    id: 'boards',
    question: 'Which boards do your tutors cover?',
    answer:
      'Our tutors are experienced with CBSE, ICSE, UP Board, and IGCSE. Whether your child attends a CBSE school in Sector 93 or a UP Board school in Noida Extension, we have the right tutor.',
  },
  {
    id: 'verified',
    question: 'Are the tutors background-verified?',
    answer:
      'Yes. Every tutor goes through our verification process — ID verification, qualification check, and a teaching demo evaluation — before being added to our network.',
  },
  {
    id: 'replacement',
    question: 'What if my child is not comfortable with the assigned tutor?',
    answer:
      'We offer a free tutor replacement guarantee. If your child or you are not satisfied at any point, simply let us know and we send a replacement at no extra cost, no questions asked.',
  },
  {
    id: 'areas',
    question: 'Do you provide tutors in all areas of Greater Noida?',
    answer:
      'Yes. We cover every sector and locality across Greater Noida — Alpha, Beta, Gamma, Gaur City, Noida Extension, Omega, Sector Pi, Zeta, Knowledge Park, Pari Chowk, and all other areas.',
  },
  {
    id: 'fees',
    question: 'What is the typical fee for home tuition?',
    answer:
      'Fees vary based on class, subject, and session frequency. Options typically start from ₹2,500 per month. Call us for a transparent, no-obligation fee discussion — zero hidden charges, ever.',
  },
] as const

/* ─────────────────────────────────────────
   FORM OPTIONS
───────────────────────────────────────── */
export const FORM_CLASSES = [
  'Nursery / KG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
  'Graduation Level',
] as const

export const FORM_SUBJECTS = [
  'All Subjects',
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Science / SST',
  'Accountancy / Commerce',
  'Computer Science',
  'Business Studies',
  'Economics',
  'Other',
] as const