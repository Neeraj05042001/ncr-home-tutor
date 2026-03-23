import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// ─── FONTS ───────────────────────────────────────────────────────────────────

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

// ─── METADATA ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://ncrhometutor.com"),

  title: {
    template: "%s | NCR Home Tutor — Greater Noida",
    default:
      "Home Tutor in Greater Noida | #1 Tuition Bureau Since 2011 — NCR Home Tutor",
  },

  description:
    "Find verified home tutors in Greater Noida for all classes (1–12), all subjects (Maths, Science, English), all boards (CBSE, ICSE, UP Board). Free demo class. 17,000+ happy students. Call or WhatsApp: +91 8076661356.",

  keywords: [
    "home tutor greater noida",
    "home tuition greater noida",
    "tutor near me greater noida",
    "home tutor gaur city",
    "home tutor noida extension",
    "maths tutor greater noida",
    "science tutor greater noida",
    "cbse tutor greater noida",
    "home tutor alpha beta gamma greater noida",
    "private tutor greater noida",
    "home tuition bureau greater noida",
    "tutor for class 10 greater noida",
    "tutor for class 12 greater noida",
  ],

  authors: [{ name: "NCR Home Tutor", url: "https://ncrhometutor.com" }],
  creator: "NCR Home Tutor",
  publisher: "NCR Home Tutor",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ncrhometutor.com",
    siteName: "NCR Home Tutor",
    title:
      "Home Tutor in Greater Noida | #1 Tuition Bureau Since 2011",
    description:
      "Verified home tutors for all classes, all subjects, all boards in Greater Noida. Free demo class. 17,000+ happy students. Call +91 8076661356.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NCR Home Tutor — Greater Noida's Most Trusted Home Tuition Bureau",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Home Tutor in Greater Noida | NCR Home Tutor",
    description:
      "Verified home tutors in Greater Noida. All classes, all subjects. Free demo class. 17,000+ happy students.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://ncrhometutor.com",
  },

  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE", // replace after GSC setup
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C2340",
};

// ─── STRUCTURED DATA (JSON-LD) ────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": "https://ncrhometutor.com/#organization",
      name: "NCR Home Tutor",
      alternateName: "NCR Home Tutor Greater Noida",
      description:
        "Greater Noida's most trusted home tuition bureau since 2011. Connecting families with verified, qualified home tutors for all classes (1–12), all subjects, CBSE/ICSE/UP Board.",
      url: "https://ncrhometutor.com",
      logo: "https://ncrhometutor.com/logo.png",
      image: "https://ncrhometutor.com/og-image.jpg",
      telephone: "+91-8076661356",
      email: "contact@ncrhometutor.com",
      foundingDate: "2011",
      numberOfEmployees: "8000+",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Radha Krishna Complex, Aicher Market, Sector Pi-1",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201310",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.4744,
        longitude: 77.504,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
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
      areaServed: [
        "Greater Noida",
        "Gaur City",
        "Noida Extension",
        "Alpha Greater Noida",
        "Beta Greater Noida",
        "Gamma Greater Noida",
        "Delta Greater Noida",
        "Omega Greater Noida",
        "Zeta Greater Noida",
        "Pari Chowk",
        "Knowledge Park",
        "Techzone",
        "Sector Pi Greater Noida",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Home Tutoring Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Home Tuition for Classes 1–12",
            description:
              "One-on-one in-home tutoring for all classes from 1 to 12 in Greater Noida",
          },
          {
            "@type": "Offer",
            name: "Free Demo Class",
            description: "First demonstration class completely free of charge",
            price: "0",
            priceCurrency: "INR",
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
        reviewCount: "17000",
      },
      sameAs: [
        "https://www.facebook.com/ncrhometutor",
        "https://www.instagram.com/ncrhometutor",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ncrhometutor.com/#website",
      url: "https://ncrhometutor.com",
      name: "NCR Home Tutor",
      publisher: { "@id": "https://ncrhometutor.com/#organization" },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://ncrhometutor.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ─── ROOT LAYOUT ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-body antialiased bg-surface text-ink overflow-x-hidden ">
        {/* Scroll progress bar — rendered via JS in each page */}
        {children}
      </body>
    </html>
  );
}