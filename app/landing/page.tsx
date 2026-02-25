"use client";

import React from "react";
import Link from "next/link";

/**
 * SmoothAnchor
 * - Use for in-page anchors only (href starts with #)
 * - Keeps smooth scroll without breaking Next.js Link usage for routes
 */
function SmoothAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-100">
      {/* Brand Styles (local to this page) */}
      <style>{`
        :root {
          --apex-orange: #E95420;
          --apex-purple: #87245B;
          --apex-dark: #2c001e;
        }

        .main-gradient-bg {
          background: linear-gradient(to right, var(--apex-orange), var(--apex-purple));
        }

        .secondary-gradient-text {
          background: linear-gradient(to right, var(--apex-orange), #5E2750);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
          padding: 0.15em 0;
          line-height: 1.1;
        }

        .dark-purple-text {
          color: var(--apex-dark);
        }
      `}</style>

      {/* Top bar / Nav */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="flex flex-col">
              <div className="text-xl font-extrabold secondary-gradient-text">
                APEX
              </div>
              <div className="text-[10px] font-semibold text-slate-500 tracking-widest leading-none -mt-0.5">
                GRANT SOLUTIONS
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600 font-medium">
            <SmoothAnchor
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors"
            >
              How it works
            </SmoothAnchor>
            <SmoothAnchor
              href="#challenge"
              className="hover:text-slate-900 transition-colors"
            >
              The Challenge
            </SmoothAnchor>
            <SmoothAnchor
              href="#sources"
              className="hover:text-slate-900 transition-colors"
            >
              Coverage
            </SmoothAnchor>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-white font-semibold main-gradient-bg hover:opacity-90 transition"
            >
              Create account
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero (bg: white) */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold dark-purple-text leading-tight tracking-tight">
                UK Funding Opportunities Matched to Your Business
              </h1>

              <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                Apex monitors national and regional funding schemes and filters them according to
                your sector, region and funding criteria — so you can focus on reviewing relevant
                opportunities, not searching for them.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-bold main-gradient-bg hover:opacity-90 transition shadow-sm"
                >
                  Create account
                </Link>
                <SmoothAnchor
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition"
                >
                  How it works
                </SmoothAnchor>
              </div>

              <div className="mt-6 text-sm text-slate-500 italic">
                Currently available at no cost during phased rollout.
              </div>
            </div>

            {/* Example Briefing Card */}
            <div
              id="example"
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Example opportunity
                  </div>
                  <div className="text-xl font-extrabold dark-purple-text mt-1 leading-tight">
                    Decarbonisation Support Scheme
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                  UK
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">
                    Funding value
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    £50,000 – £250,000
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">
                    Deadline
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    30 September
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600 leading-relaxed">
                Supports eligible businesses delivering energy reduction measures and low-carbon
                upgrades.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process (bg: slate-50) */}
      <section id="how-it-works" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 block">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Identify Your Next Opportunity
            </h2>
            <p className="text-slate-600 mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              A professional path to discovering relevant grants and support schemes without the
              need for manual searching.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            <div className="space-y-16 relative">
              <TimelineStep
                step={1}
                title="Define your search"
                text="Select the specific sectors, regions, and funding types that align with your business requirements."
              />
              <TimelineStep
                step={2}
                title="Targeted matching"
                text="We review national and regional sources to identify opportunities that fit your defined profile."
              />
              <TimelineStep
                step={3}
                title="Receive direct alerts"
                text="Get notified when suitable schemes or application windows become available."
              />
              <TimelineStep
                step={4}
                title="Review and proceed"
                text="Access clear summaries of each match to determine which funding opportunities to pursue."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge (bg: white) */}
      <section id="challenge" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Challenge with Traditional Grant Research
              </h2>
              <p className="text-slate-600 mt-4 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Funding opportunities are often missed not because they are unavailable — but because
                they are difficult to track consistently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200 w-full text-center max-w-sm">
                  Traditional Grant Tracking
                </h3>
                <ul className="space-y-5 w-full max-w-md">
                  {[
                    "Disjointed monitoring of multiple regional and national portals",
                    "Inefficient manual checking of various source websites",
                    "Inconsistent alerts leading to delayed awareness",
                    "Resources exhausted on manual sorting and filtering",
                    "Critical deadlines missed due to administrative oversight",
                    "Commercial opportunities lost through fragmented visibility",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200 w-full text-center max-w-sm">
                  Consistent Funding Visibility
                </h3>
                <ul className="space-y-5 w-full max-w-md">
                  {[
                    "One place to review relevant funding sources",
                    "Clear visibility based on your sector and region",
                    "Timely notification of suitable schemes and windows",
                    "Clear oversight of critical application dates",
                    "Significant reduction in manual tracking",
                    "Greater confidence that relevant opportunities are identified",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-900 font-medium text-sm leading-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optional mini-bridge line to next section */}
            <div className="mt-16 text-center text-sm text-slate-500">
              Consistent visibility reduces the risk of missed opportunities and supports more confident commercial decisions.
            </div>
          </div>
        </div>
      </section>

      {/* Coverage (bg: slate-50) */}
      <section id="sources" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Comprehensive UK Funding Coverage
              </h2>
              <p className="text-slate-600 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                We review and track verified funding sources across the UK to provide reliable, up-to-date information.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 mb-16">
              {[
                "Gov.uk Portals",
                "Innovate UK",
                "Local Council Websites",
                "Major News Outlets",
                "Official Publications",
              ].map((source) => (
                <div key={source} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {source}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-slate-600 text-base leading-relaxed max-w-3xl mx-auto italic">
                Funding opportunities are frequently overlooked due to fragmented publication across national
                and regional sources. Apex was established to provide structured visibility and reduce that risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for (bg: white) */}
      <section id="designed-for" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold dark-purple-text tracking-tight mb-8">
              Designed for Growing UK Businesses
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-16">
              Apex is suited for organisations that want a clearer view of what funding may be relevant without manual searching.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <BulletCard
                title="Typical users"
                bullets={[
                  "SMEs seeking capital funding",
                  "Businesses exploring sustainability",
                  "Organisations looking for innovation support",
                  "Teams without dedicated grant research resources",
                ]}
              />
              <BulletCard
                title="What you can configure"
                bullets={[
                  "Industries and opportunity types",
                  "Region and value range",
                  "Optional company linking (not required)",
                  "Preferences can be updated any time",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA (bg: slate-50) */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
              <div className="max-w-xl">
                <div className="font-bold text-slate-900 text-2xl tracking-tight leading-tight">
                  Ready to set your criteria?
                </div>
                <div className="text-slate-600 mt-2 leading-relaxed">
                  Create an account to start receiving matched alerts aligned with your industry and region.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-lg text-white font-bold main-gradient-bg hover:opacity-90 transition shadow-sm text-center text-lg"
                >
                  Create account
                </Link>
                <SmoothAnchor
                  href="#challenge"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-lg border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition text-center text-lg"
                >
                  Learn more
                </SmoothAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
            <div className="flex flex-col">
              <div className="text-xl font-extrabold secondary-gradient-text">
                APEX
              </div>
              <div className="text-[10px] font-semibold text-slate-500 tracking-widest leading-none -mt-0.5">
                GRANT SOLUTIONS
              </div>
              <div className="text-sm text-slate-500 mt-6 max-w-sm leading-relaxed">
                A professional monitoring service helping UK businesses identify relevant funding
                opportunities with consistency and confidence.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-semibold text-slate-600">
              <SmoothAnchor href="#how-it-works" className="hover:text-slate-900">
                How it works
              </SmoothAnchor>
              <SmoothAnchor href="#challenge" className="hover:text-slate-900">
                Challenge
              </SmoothAnchor>
              <SmoothAnchor href="#sources" className="hover:text-slate-900">
                Coverage
              </SmoothAnchor>
              <Link href="/login" className="hover:text-slate-900">
                Login
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} Apex Grant Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Shared components ---------- */

function BulletCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8">
      <div className="text-lg font-extrabold dark-purple-text mb-6">{title}</div>
      <ul className="space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 items-start">
            <span className="mt-2 h-1 w-1 rounded-full bg-slate-300 shrink-0" />
            <span className="text-sm leading-relaxed text-slate-600 font-medium">
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineStep({
  step,
  title,
  text,
}: {
  step: number;
  title: string;
  text: string;
}) {
  return (
    <div className="relative pl-12 md:pl-20">
      <div className="absolute left-0 md:left-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-black text-sm font-bold z-10">
        {step}
      </div>
      <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
      <p className="text-slate-600 mt-2 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
        {text}
      </p>
    </div>
  );
}
