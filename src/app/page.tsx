import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/Trustbar";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyUs from "@/components/landing/WhyUs";
import SubjectsSection from "@/components/landing/SubjectsSection";
import AreasSection from "@/components/landing/AreaSection";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";

// Page-level SEO override
export const metadata: Metadata = {
  title:
    "Home Tutor in Greater Noida | #1 Tuition Bureau Since 2011 — NCR Home Tutor",
  description:
    "Find verified home tutors in Greater Noida for all classes (1–12), Maths, Science, English — CBSE, ICSE, UP Board. Free demo class. 17,000+ happy students. Call +91 8076661356.",
  alternates: {
    canonical: "https://ncrhometutor.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" aria-label="Main content">
        <HeroSection />
        <TrustBar />
        <HowItWorks />
        <WhyUs />
        <SubjectsSection />
        <AreasSection />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        {/* FinalCTA */}
      </main>

      <Footer />
    </>
  );
}
