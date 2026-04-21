import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ContactContent from "@/components/contact/ContactContent";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact Us — NCR Home Tutor | Call, WhatsApp or Write to Us",
  description:
    "Get in touch with NCR Home Tutor. Call or WhatsApp +91 8076661356, email info@ncrhometutor.com, or visit us at Sector Pi-1, Greater Noida. We respond within 2 hours.",
  keywords: [
    "contact NCR Home Tutor",
    "home tutor Greater Noida contact",
    "call NCR Home Tutor",
    "WhatsApp home tutor Greater Noida",
    "tuition bureau contact Greater Noida",
    "NCR Home Tutor phone number",
    "NCR Home Tutor address",
  ],
  alternates: {
    canonical: "https://ncrhometutor.com/contact",
  },
  openGraph: {
    title: "Contact NCR Home Tutor — Call, WhatsApp or Write",
    description:
      "Reach us on +91 8076661356 or WhatsApp. We respond within 2 hours. Based in Sector Pi-1, Greater Noida.",
    url: "https://ncrhometutor.com/contact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact NCR Home Tutor — Greater Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NCR Home Tutor",
    description:
      "Call or WhatsApp +91 8076661356. Responding within 2 hours. Greater Noida's most trusted home tuition bureau.",
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://ncrhometutor.com/contact#webpage",
      url: "https://ncrhometutor.com/contact",
      name: "Contact NCR Home Tutor",
      description:
        "Contact page for NCR Home Tutor — Greater Noida's leading home tuition bureau.",
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://ncrhometutor.com/#website" },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://ncrhometutor.com/#organization",
      name: "NCR Home Tutor",
      telephone: "+91-8076661356",
      email: "info@ncrhometutor.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Radha Krishna Complex, Aicher Market, Sector Pi-1",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201310",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "18:00",
        },
      ],
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
        />
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}