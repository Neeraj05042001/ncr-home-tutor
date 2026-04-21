import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AboutContent from "@/components/about/AboutContent";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us — Greater Noida's Most Trusted Home Tuition Bureau Since 2011",
  description:
    "Learn about NCR Home Tutor — Greater Noida's leading home tuition bureau since 2011. Founded by Vikas Dixit, we have connected 17,000+ students with 8,000+ verified tutors across Delhi NCR. Our mission, our story, and our promise.",
  keywords: [
    "about NCR Home Tutor",
    "home tuition bureau Greater Noida",
    "Vikas Dixit NCR Home Tutor",
    "trusted home tutor bureau since 2011",
    "home tutor agency Greater Noida",
    "verified tutor network Delhi NCR",
    "home tuition Greater Noida history",
  ],
  alternates: {
    canonical: "https://ncrhometutor.com/about",
  },
  openGraph: {
    title: "About NCR Home Tutor — Trusted Since 2011 | Greater Noida",
    description:
      "13+ years of connecting families with verified home tutors. 17,000+ happy students. 8,000+ qualified tutors. Learn our story, mission, and what makes us Greater Noida's most trusted tuition bureau.",
    url: "https://ncrhometutor.com/about",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About NCR Home Tutor — Greater Noida's Most Trusted Home Tuition Bureau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About NCR Home Tutor — Trusted Since 2011",
    description:
      "13+ years, 17,000+ students, 8,000+ tutors. The story behind Greater Noida's most trusted home tuition bureau.",
  },
};

// ─── JSON-LD — AboutPage Schema ───────────────────────────────────────────────

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://ncrhometutor.com/about#webpage",
  url: "https://ncrhometutor.com/about",
  name: "About NCR Home Tutor",
  description:
    "NCR Home Tutor is Greater Noida's most trusted home tuition bureau since 2011, founded by Vikas Dixit. We connect students with verified home tutors across Delhi NCR.",
  inLanguage: "en-IN",
  isPartOf: {
    "@id": "https://ncrhometutor.com/#website",
  },
  about: {
    "@type": "LocalBusiness",
    "@id": "https://ncrhometutor.com/#organization",
    name: "NCR Home Tutor",
    foundingDate: "2011",
    founder: {
      "@type": "Person",
      name: "Vikas Dixit",
      jobTitle: "Founder",
      worksFor: {
        "@id": "https://ncrhometutor.com/#organization",
      },
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "8000",
      description: "Verified tutors in network",
    },
    slogan: "Connecting Families with Verified Home Tutors Since 2011",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}