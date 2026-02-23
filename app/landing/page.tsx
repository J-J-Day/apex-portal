"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar / Nav */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="leading-tight">
              <div className="text-xl font-extrabold secondary-gradient-text">APEX</div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">
                GRANT SOLUTIONS
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#how-it-works" className="hover:text-gray-900">
              How it works
            </a>
            <a href="#example" className="hover:text-gray-900">
              Example
            </a>
            <a href="#access" className="hover:text-gray-900">
              Access
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
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

      {/* Hero */}
      <section className="bg-white">
        <div className="container mx-auto px-6 pt-14 pb-12 md:pt-16 md:pb-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold dark-purple-text leading-tight">
                UK Funding Opportunities Matched to Your Business
              </h1>

              <p className="mt-5 text-lg text-gray-700 leading-relaxed max-w-xl">
                Apex monitors national and regional funding schemes and filters them according to
                your sector, region and funding criteria — so you can focus on reviewing relevant
                opportunities, not searching for them.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold main-gradient-bg hover:opacity-90 transition"
                >
                  Create account
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
                >
                  How it works
                </Link>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Currently available at no cost during phased rollout.
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl">
                <div className="rounded-xl border border-gray-200 p-4 bg-white">
                  <div className="font-semibold text-gray-900">Structured filtering</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Industry, region, opportunity type and value range.
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 p-4 bg-white">
                  <div className="font-semibold text-gray-900">Dashboard view</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Review matched opportunities in one place.
                  </div>
                </div>
              </div>
            </div>

            {/* Example card */}
            <div
              id="example"
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-gray-700">Example opportunity</div>
                  <div className="text-xl font-extrabold dark-purple-text mt-1">
                    Decarbonisation Support Scheme
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    A structured view of the key details you’d expect to see.
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700">
                  UK
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoBox label="Opportunity value" value="£50,000 – £250,000" />
                <InfoBox label="Region" value="UK-wide" />
                <InfoBox label="Opportunity type" value="Decarbonisation" />
                <InfoBox label="Deadline" value="30 September" />
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-700 leading-relaxed">
                Supports eligible businesses delivering energy reduction measures and low-carbon
                upgrades. Requirements and eligibility vary by scheme and region.
              </div>

              <div className="mt-5 text-xs text-gray-500">
                Example only. Actual matches are based on your preferences.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured approach */}
      <section className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-extrabold dark-purple-text">
              A Structured Approach to Funding Discovery
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Many businesses miss relevant funding because opportunities are spread across multiple
              portals, eligibility is unclear, and manual searching takes time. Apex centralises
              monitoring and helps you narrow down what matters.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <BulletCard
                title="Common problems"
                bullets={[
                  "Opportunities scattered across different sources",
                  "Time lost searching and re-checking portals",
                  "Missed deadlines and unclear criteria",
                  "Difficult to keep searches consistent",
                ]}
              />
              <BulletCard
                title="How Apex helps"
                bullets={[
                  "Filter by industry, region and opportunity type",
                  "Set a value range to focus on suitable opportunities",
                  "Receive alerts and review matches in the portal",
                  "Adjust preferences at any time",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-extrabold dark-purple-text">
              How the Platform Works
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              A simple, structured process designed to reduce time spent searching and improve
              visibility of relevant funding.
            </p>

            <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: Timeline card */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                  {/* Vertical line */}
                  <div className="absolute left-10 top-8 bottom-8 w-px bg-gray-200 hidden md:block" />

                  <div className="space-y-10">
                    <TimelineStep
                      step={1}
                      title="Define your criteria"
                      text="Select sectors, opportunity types, region and funding range aligned to your organisation."
                    />
                    <TimelineStep
                      step={2}
                      title="Structured monitoring"
                      text="Apex continuously reviews relevant funding sources and applies structured filtering based on your profile."
                    />
                    <TimelineStep
                      step={3}
                      title="Receive matched alerts"
                      text="When a relevant opportunity is identified, you receive a concise email notification with key information and a direct link."
                    />
                    <TimelineStep
                      step={4}
                      title="Review & assess"
                      text="Log into your dashboard to review matched opportunities in a clear format and determine next steps."
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Visuals */}
              <div className="lg:col-span-5 space-y-6">
                {/* Process overview */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-700">Process overview</div>
                    <span className="text-xs text-gray-500">Structured flow</span>
                  </div>

                  <div className="mt-6 space-y-5">
                    <FlowRow left="Preferences set" right="Industry · Region · Value" />
                    <Arrow />
                    <FlowRow left="Monitoring engine" right="Source review & filtering" />
                    <Arrow />
                    <FlowRow left="Email notification" right="Matched opportunity alert" />
                    <Arrow />
                    <FlowRow left="Portal dashboard" right="Structured review & action" />
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    Alerts are triggered when new opportunities meet your defined criteria.
                  </div>
                </div>

                {/* Portal preview */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold dark-purple-text">Portal view</div>
                    <span className="text-xs text-gray-500">Preview</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Decarbonisation Support Scheme",
                        meta: "UK-wide • £50k–£250k • Deadline 30 Sept",
                      },
                      {
                        title: "Innovation Voucher Fund",
                        meta: "England • £5k–£15k • Deadline 12 Oct",
                      },
                      { title: "Training & Skills Grant", meta: "UK • £2k–£10k • Rolling" },
                    ].map((x) => (
                      <div
                        key={x.title}
                        className="rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition"
                      >
                        <div className="text-sm font-semibold text-gray-900">{x.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{x.meta}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Example only. Actual matches depend on your preferences.
                  </div>
                </div>
              </div>
            </div>

            {/* Small CTA under section to avoid “empty” feel */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div>
                <div className="font-semibold text-gray-900">Ready to set your criteria?</div>
                <div className="text-sm text-gray-600 mt-1">
                  Create an account to set preferences and start receiving matched alerts.
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-white font-semibold main-gradient-bg hover:opacity-90 transition"
                >
                  Create account
                </Link>
                <a
                  href="#example"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
                >
                  View example
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for */}
      <section className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-extrabold dark-purple-text">
              Designed for Growing UK Businesses
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Apex is suited for organisations that want a clearer view of what funding may be
              relevant — without dedicating hours each week to manual searching.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <BulletCard
                title="Typical users"
                bullets={[
                  "SMEs seeking capital funding and support schemes",
                  "Businesses exploring sustainability and decarbonisation",
                  "Organisations looking for innovation or training support",
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

      {/* Access */}
      <section id="access" className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-extrabold dark-purple-text">
              Access & Availability
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Apex is currently available during a phased rollout. New users can create an account
              and begin setting preferences immediately.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold main-gradient-bg hover:opacity-90 transition"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
              >
                Login
              </Link>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Pricing will be introduced once the platform has completed rollout and testing.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-lg font-extrabold secondary-gradient-text">APEX</div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">
                GRANT SOLUTIONS
              </div>
              <div className="text-sm text-gray-600 mt-3 max-w-md leading-relaxed">
                A structured platform to help UK businesses review relevant funding opportunities
                more efficiently.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
                How it works
              </a>
              <a href="#example" className="text-gray-600 hover:text-gray-900">
                Example
              </a>
              <a href="#access" className="text-gray-600 hover:text-gray-900">
                Access
              </a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-gray-500">
            <div>© {new Date().getFullYear()} Apex Grant Solutions. All rights reserved.</div>
            <div>
              Information shown is for demonstration purposes and may not reflect live opportunities.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Small components ---------- */

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
      <div className="mt-1 text-base font-bold text-gray-900">{value}</div>
    </div>
  );
}

function BulletCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="text-lg font-extrabold dark-purple-text">{title}</div>
      <ul className="mt-4 space-y-2 text-gray-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineStep({ step, title, text }: { step: number; title: string; text: string }) {
  return (
    <div className="relative md:pl-16">
      <div className="absolute left-0 md:left-4 w-12 h-12 flex items-center justify-center rounded-xl text-white font-bold main-gradient-bg">
        {step}
      </div>
      <h3 className="text-lg font-semibold dark-purple-text">{title}</h3>
      <p className="text-gray-600 mt-2 max-w-xl">{text}</p>
    </div>
  );
}

function FlowRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="font-semibold text-gray-900">{left}</div>
      <span className="text-xs text-gray-500 text-right">{right}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="w-px h-6 bg-gray-300" />
    </div>
  );
}
