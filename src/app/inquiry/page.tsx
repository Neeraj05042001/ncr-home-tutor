import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import InquiryForm from "@/components/forms/InquiryForm";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Find a Home Tutor — Book Your Free Demo Class",
  description:
    "Tell us your child's class, subject, and area. We'll match you with a verified home tutor in Greater Noida within 24 hours. First demo class is completely free.",
  alternates: {
    canonical: "https://ncrhometutor.com/inquiry",
  },
  openGraph: {
    title: "Find a Home Tutor in Greater Noida — Free Demo Class",
    description:
      "Share your requirements and we'll find the perfect verified tutor for your child within 24 hours. 100% free demo class, zero commitment.",
    url: "https://ncrhometutor.com/inquiry",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InquiryPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #0C2340 0%, #1D5290 55%, #14345A 100%)",
          }}
        >
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Saffron glow — top left */}
          <div
            className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(246,166,35,0.12) 0%, transparent 65%)",
            }}
          />

          {/* Navy glow — bottom right */}
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(29,82,144,0.35) 0%, transparent 70%)",
            }}
          />

          <div className="container-custom section-pad-sm relative z-10">
            <div className="text-center max-w-2xl mx-auto">

              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse shrink-0" />
                <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">
                  Free Demo Class
                </span>
              </div>

              {/* Heading */}
              <h1
                className="font-display font-bold text-white mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  lineHeight: 1.15,
                }}
              >
                Find the{" "}
                <span className="text-gradient-saffron">Perfect Tutor</span>
                {" "}for Your Child
              </h1>

              {/* Sub */}
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Tell us what you need. We'll match you with a verified home
                tutor in your area within{" "}
                <span className="text-saffron-300 font-semibold">24 hours</span>.
                First class is completely free.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: "🎁", text: "Free Demo Class" },
                  { icon: "⚡", text: "Matched in 24 Hours" },
                  { icon: "🛡️", text: "Verified Tutors Only" },
                  { icon: "🔄", text: "Free Replacement" },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/85 font-semibold"
                  >
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Wave → surface-3 */}
          <div
            className="relative pointer-events-none"
            aria-hidden="true"
            style={{ lineHeight: 0, marginTop: "-1px" }}
          >
            <svg
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                height: "clamp(30px, 4vw, 60px)",
                display: "block",
              }}
            >
              <path
                d="M0 20 Q360 60 720 36 Q1080 12 1440 50 L1440 60 L0 60 Z"
                fill="#F4F6FA"
              />
            </svg>
          </div>
        </section>

        {/* ── Form Section ─────────────────────────────────────────────────── */}
        <section className="bg-surface-3 section-pad">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}