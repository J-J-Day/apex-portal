"use client";

import React from "react";
import Link from "next/link";

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

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="flex flex-col">
              <div className="secondary-gradient-text text-xl font-extrabold">APEX</div>
              <div className="-mt-0.5 text-[10px] font-semibold leading-none tracking-widest text-slate-500">
                GRANT SOLUTIONS
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <SmoothAnchor href="#how-it-works" className="transition-colors hover:text-slate-900">
              How it works
            </SmoothAnchor>
            <SmoothAnchor href="#challenge" className="transition-colors hover:text-slate-900">
              The challenge
            </SmoothAnchor>
            <SmoothAnchor href="#sources" className="transition-colors hover:text-slate-900">
              Coverage
            </SmoothAnchor>
            <SmoothAnchor href="#faq" className="transition-colors hover:text-slate-900">
              FAQ
            </SmoothAnchor>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="main-gradient-bg rounded-lg px-4 py-2 font-semibold text-white transition hover:opacity-90"
            >
              Create account
            </Link>
          </div>
        </nav>
      </header>

      <section className="bg-white">
        <div className="container mx-auto px-6 py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h1 className="dark-purple-text text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                UK Funding Opportunities Matched to Your Business
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                Many UK funding schemes are published across fragmented sources and often have short
                application windows. Apex helps you maintain visibility by matching opportunities to
                your sector, region and funding criteria — so you can act before deadlines close.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
                Built for SME teams that need better visibility of relevant funding without spending
                hours checking multiple sources.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="main-gradient-bg inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold text-white shadow-sm transition hover:opacity-90"
                >
                  Create account
                </Link>
                <SmoothAnchor
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  See how it works
                </SmoothAnchor>
              </div>

              <div className="mt-6 text-sm italic text-slate-500">
                Currently available at no cost during phased rollout. No card required.
              </div>

              <div className="mt-8 text-sm text-slate-500">
                <span className="font-medium text-slate-600">Monitoring sources including</span>
                <span className="ml-2">
                  Gov.uk · Innovate UK · Local Authority Funding · Official Publications · Sector
                  Support Schemes
                </span>
              </div>
            </div>

            <div
              id="example"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Example opportunity
                  </div>
                  <div className="dark-purple-text mt-1 text-xl font-extrabold leading-tight">
                    Decarbonisation Support Scheme
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600">
                    A structured snapshot of key details to help you quickly judge suitability.
                  </div>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                  UK
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Funding range
                  </div>
                  <div className="text-lg font-bold text-slate-900">£50,000 – £250,000</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Deadline
                  </div>
                  <div className="text-lg font-bold text-slate-900">30 September</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Typical information included
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {[
                      "Eligibility overview and key requirements",
                      "Geographic scope and applicable sectors",
                      "Evidence / documentation commonly required",
                      "Direct source links and deadline tracking",
                    ].map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-600">
                Supports eligible businesses delivering energy reduction measures and low-carbon
                upgrades. Requirements vary by scheme, region and funding body.
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Example for illustration. Matches are based on your criteria and may differ.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-20 max-w-4xl text-center">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Process
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              A Clearer Way to Track Relevant Funding
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              A structured process designed to reduce manual searching and improve visibility of
              relevant opportunities.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-slate-200 md:left-8 md:block" />
            <div className="relative space-y-16">
              <TimelineStep
                step={1}
                title="Set your criteria"
                text="Choose your sectors, regions, funding types and value range."
              />
              <TimelineStep
                step={2}
                title="We track relevant sources"
                text="We review central government portals, Innovate UK, local authorities and verified sector funding sources relevant to your profile."
              />
              <TimelineStep
                step={3}
                title="Receive matched alerts"
                text="When suitable opportunities are identified, you receive concise notifications with key details and source links."
              />
              <TimelineStep
                step={4}
                title="Review and decide"
                text="Assess opportunities quickly and decide which ones are worth pursuing."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="challenge" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                The Challenge with Traditional Grant Research
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                Funding opportunities are often missed not because they are unavailable — but
                because they are difficult to track consistently across fragmented sources.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
              <div className="flex flex-col items-center">
                <h3 className="mb-8 w-full max-w-sm border-b border-slate-200 pb-4 text-center text-xl font-bold text-slate-900">
                  Traditional Grant Tracking
                </h3>
                <ul className="w-full max-w-md space-y-5">
                  {[
                    "Disjointed monitoring of national and regional portals",
                    "Time lost re-checking sources and interpreting criteria",
                    "Inconsistent alerts and delayed awareness",
                    "Manual sorting, filtering and duplication",
                    "Deadlines missed due to administrative overload",
                    "Opportunities lost through limited visibility",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
                      <span className="text-sm leading-normal text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="mb-8 w-full max-w-sm border-b border-slate-200 pb-4 text-center text-xl font-bold text-slate-900">
                  Consistent Funding Visibility
                </h3>
                <ul className="w-full max-w-md space-y-5">
                  {[
                    "One place to review relevant sources",
                    "Visibility aligned to your sector and region",
                    "Notifications when suitable windows open",
                    "Clear oversight of deadlines and key dates",
                    "Reduced reliance on manual tracking",
                    "Greater confidence you’re seeing relevant opportunities early",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                      <span className="text-sm font-medium leading-normal text-slate-900">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 text-center text-sm text-slate-500">
              Better visibility reduces the risk of missed opportunities and supports more confident
              commercial planning.
            </div>
          </div>
        </div>
      </section>

      <section id="sources" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Reliable UK Funding Coverage
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                We track verified funding channels across the UK to reduce the chance of missed
                windows and overlooked deadlines.
              </p>
            </div>

            <div className="mb-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                "Gov.uk Portals",
                "Innovate UK",
                "Local Council Websites",
                "Official Publications",
                "Verified Sector Sources",
              ].map((source) => (
                <div key={source} className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-green-500"
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {source}
                  </span>
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-base leading-relaxed text-slate-600">
                Many schemes are published across different channels with varying levels of clarity.
                Apex provides structured visibility by filtering against your criteria and
                highlighting key deadlines, so you can assess suitability faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="designed-for" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="dark-purple-text mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
              Designed for UK SMEs That Need Better Visibility
            </h2>
            <p className="mb-16 text-base leading-relaxed text-slate-600 md:text-lg">
              For business owners, commercial teams and operations managers who need a clearer view
              of relevant funding opportunities without dedicating hours each week to manual
              searching.
            </p>

            <div className="grid gap-8 text-left md:grid-cols-2">
              <BulletCard
                title="Typical users"
                bullets={[
                  "SME owners seeking better visibility of capital funding opportunities",
                  "Commercial teams targeting project and growth funding",
                  "Operations managers who need clearer oversight of deadlines",
                  "Businesses without the internal capacity for dedicated research",
                ]}
              />
              <BulletCard
                title="What you can configure"
                bullets={[
                  "Sectors and opportunity types",
                  "Region and value range",
                  "Alert frequency and notification preferences",
                  "Criteria can be updated as your needs change",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Clear answers to common questions before creating an account.
              </p>
            </div>

            <div className="space-y-4">
              <FaqItem
                q="Do you help write applications?"
                a="Apex focuses on identifying and surfacing relevant opportunities with clear, structured information. It does not submit applications on your behalf."
              />
              <FaqItem
                q="Will I be spammed with alerts?"
                a="No. Alerts are tied to your criteria, and you control notification preferences. You can pause or update criteria at any time."
              />
              <FaqItem
                q="Is this only for grants?"
                a="Apex may include a range of funding opportunities and support schemes depending on availability and your selected criteria."
              />
              <FaqItem
                q="How do you decide what is relevant?"
                a="Matches are based on the criteria you set — such as sector, region and funding type — and filtered to help reduce irrelevant noise."
              />
              <FaqItem
                q="Is there a cost to sign up?"
                a="Apex is currently available at no cost during phased rollout. Pricing may be introduced after testing and rollout."
              />
              <FaqItem
                q="Can I change my criteria later?"
                a="Yes. Preferences can be updated at any time."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <div className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
                  Ready to set your criteria?
                </div>
                <div className="mt-2 leading-relaxed text-slate-600">
                  Create an account to start receiving matched alerts aligned with your sector and
                  region — and reduce the risk of missed opportunities.
                </div>
                <div className="mt-4 text-sm text-slate-500">
                  No card required • Update preferences anytime • Control alert frequency
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:shrink-0">
                <Link
                  href="/login"
                  className="main-gradient-bg inline-flex items-center justify-center rounded-lg px-10 py-4 text-center text-lg font-bold text-white shadow-sm transition hover:opacity-90"
                >
                  Create account
                </Link>
                <SmoothAnchor
                  href="#challenge"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-10 py-4 text-center text-lg font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Revisit the challenge
                </SmoothAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
            <div className="flex flex-col">
              <div className="secondary-gradient-text text-xl font-extrabold">APEX</div>
              <div className="-mt-0.5 text-[10px] font-semibold leading-none tracking-widest text-slate-500">
                GRANT SOLUTIONS
              </div>
              <div className="mt-6 max-w-sm text-sm leading-relaxed text-slate-500">
                A professional monitoring service helping UK businesses maintain visibility across
                relevant funding channels with consistency and confidence.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-semibold text-slate-600">
              <SmoothAnchor href="#how-it-works" className="hover:text-slate-900">
                How it works
              </SmoothAnchor>
              <SmoothAnchor href="#challenge" className="hover:text-slate-900">
                The challenge
              </SmoothAnchor>
              <SmoothAnchor href="#sources" className="hover:text-slate-900">
                Coverage
              </SmoothAnchor>
              <SmoothAnchor href="#faq" className="hover:text-slate-900">
                FAQ
              </SmoothAnchor>
              <Link href="/login" className="hover:text-slate-900">
                Login
              </Link>
              <Link href="/login" className="hover:text-slate-900">
                Create account
              </Link>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-200 pt-8 text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Apex Grant Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function BulletCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="dark-purple-text mb-6 text-lg font-extrabold">{title}</div>
      <ul className="space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
            <span className="text-sm font-medium leading-relaxed text-slate-600">{b}</span>
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
      <div className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-black md:left-2 md:h-12 md:w-12">
        {step}
      </div>
      <h3 className="text-xl font-bold leading-tight text-slate-900">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
        {text}
      </p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="font-semibold text-slate-900">{q}</div>
      <div className="mt-2 leading-relaxed text-slate-600">{a}</div>
    </div>
  );
}
