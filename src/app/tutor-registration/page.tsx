import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TutorRegistrationForm from "@/components/forms/TutorRegistrationForm";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tutor Registration — Join Our Network",
  description:
    "Register as a verified home tutor with NCR Home Tutor. Join 8,000+ tutors across Delhi NCR and get regular student leads. 100% free registration, zero commission.",
  alternates: {
    canonical: "https://ncrhometutor.com/tutor-registration",
  },
  openGraph: {
    title: "Join Our Tutor Network — NCR Home Tutor",
    description:
      "Get verified, get leads. Register as a home tutor and connect with hundreds of families looking for qualified tutors in Delhi NCR.",
    url: "https://ncrhometutor.com/tutor-registration",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorRegistrationPage() {
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

          {/* Saffron glow — top right */}
          <div
            className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(246,166,35,0.14) 0%, transparent 65%)",
            }}
          />
          {/* Navy glow — bottom left */}
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
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
                  Tutor Registration
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
                Join Our{" "}
                <span className="text-gradient-saffron">Tutor Network</span>
              </h1>

              {/* Sub-heading */}
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Get verified, get leads. Connect with hundreds of families
                across Delhi &amp; NCR who are actively looking for qualified
                home tutors.
              </p>

              {/* Benefit pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: "✅", text: "Free Registration" },
                  { icon: "🎯", text: "Regular Student Leads" },
                  { icon: "🛡️", text: "Verified Tutor Badge" },
                  { icon: "💸", text: "Zero Commission" },
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

          {/* Wave divider → transitions into surface-3 */}
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
              <TutorRegistrationForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}