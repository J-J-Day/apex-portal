"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="text-2xl font-extrabold secondary-gradient-text leading-tight">
              APEX
            </div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest mt-1">
              GRANT SOLUTIONS
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition border border-gray-200"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg text-white font-bold main-gradient-bg hover:opacity-90 transition shadow-sm"
            >
              Create free account
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="container mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700">
                <span className="font-semibold">Early access</span>
                <span className="text-gray-400">•</span>
                <span>Free for founding users</span>
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight dark-purple-text">
                Find funding your business actually qualifies for — automatically.
              </h1>

              <p className="mt-5 text-lg text-gray-600 max-w-xl leading-7">
                Apex monitors UK funding sources and matches opportunities to your business
                profile. No searching, no spreadsheets — just relevant opportunities in one
                place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg text-white font-bold main-gradient-bg hover:opacity-90 transition shadow-sm text-center"
                >
                  Create free account
                </Link>

                <a
                  href="#example"
                  className="px-6 py-3 rounded-lg font-bold text-gray-800 border border-gray-200 hover:bg-gray-50 transition text-center"
                >
                  See example matches
                </a>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                No sales call required. Set your preferences in under 2 minutes.
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MiniStat title="Save time" desc="Stop manual searching across portals." />
                <MiniStat title="Stay relevant" desc="Match by sector, region and value." />
                <MiniStat title="Act faster" desc="See opportunities earlier." />
              </div>
            </div>

            {/* Example Card */}
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl main-gradient-bg text-white flex items-center justify-center font-extrabold">
                    A
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Matched opportunity</div>
                    <div className="text-lg font-extrabold dark-purple-text">
                      Decarbonisation Support Scheme
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <Info label="Value" value="£50,000 – £250,000" />
                  <Info label="Region" value="UK-wide" />
                  <Info label="Best for" value="SMEs & growing teams" />
                  <Info label="Deadline" value="30 Sept" />
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 leading-6">
                    Short summary appears here, tailored to your preferences — so you can
                    decide quickly if it’s worth pursuing.
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg main-gradient-bg text-white font-bold hover:opacity-90 transition">
                      View summary
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-gray-200 font-semibold text-gray-800 hover:bg-gray-50 transition">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-100 rounded-full opacity-60 -z-10" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-60 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 py-14 md:py-18">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold dark-purple-text">How it works</h2>
            <p className="mt-3 text-gray-600 leading-7">
              A simple workflow built for busy business owners. Set it once, then review
              relevant opportunities in your dashboard.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step
              n="1"
              title="Set your preferences"
              desc="Choose industries, opportunity types, region, and value range."
            />
            <Step
              n="2"
              title="We match opportunities"
              desc="Apex monitors sources and filters opportunities based on your profile."
            />
            <Step
              n="3"
              title="Review & take action"
              desc="See matches in your portal and decide quickly what’s worth pursuing."
            />
          </div>
        </div>
      </section>

      {/* Who it's for + trust */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-14 md:py-18">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-extrabold dark-purple-text">
                Built for UK SMEs
              </h2>
              <p className="mt-3 text-gray-600 leading-7">
                Apex is designed to feel simple, familiar and business-like — not “techy”.
                You’ll always know what you’re looking at and what to do next.
              </p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Filter by sector, region and opportunity value</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Company linking is optional (useful for auto-enrichment later)</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Clean onboarding and clear next steps in the dashboard</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-extrabold dark-purple-text">
                Early access — free for now
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                We’re onboarding a small number of founding users. During early access,
                the platform is free while we refine matching and notification features.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg text-white font-bold main-gradient-bg hover:opacity-90 transition shadow-sm text-center"
                >
                  Create free account
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg border border-gray-200 font-bold text-gray-800 hover:bg-gray-50 transition text-center"
                >
                  Login
                </Link>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Tip: you can explore the portal immediately after signup.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example section anchor */}
      <section id="example" className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 py-14 md:py-18">
          <h2 className="text-3xl font-extrabold dark-purple-text">
            Example match format
          </h2>
          <p className="mt-3 text-gray-600 leading-7 max-w-2xl">
            Your portal will show opportunities with the key info up front — plus a
            plain-English summary so you can decide quickly.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ExampleCard
              title="Capital grant (SME upgrade)"
              value="Up to £120,000"
              region="England"
              deadline="Rolling"
            />
            <ExampleCard
              title="Innovation funding"
              value="£25,000 – £300,000"
              region="UK-wide"
              deadline="30 Nov"
            />
            <ExampleCard
              title="Training support"
              value="Up to £20,000"
              region="Scotland"
              deadline="14 Oct"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c001e] text-white">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-lg font-extrabold">APEX Grant Solutions</div>
            <div className="mt-2 text-gray-300 text-sm max-w-md">
              A simple portal that helps UK businesses find relevant funding opportunities
              without manual searching.
            </div>
          </div>

          <div className="text-sm text-gray-300 space-y-2">
            <div>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </div>
            <div>
              <Link href="/login" className="hover:text-white">
                Create account
              </Link>
            </div>
            <div className="opacity-70">Pricing: coming soon</div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} APEX Grant Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/** Small components */

function MiniStat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="font-extrabold dark-purple-text">{title}</div>
      <div className="mt-1 text-sm text-gray-600 leading-6">{desc}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
        {label}
      </div>
      <div className="mt-1 font-bold text-gray-800">{value}</div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="w-10 h-10 rounded-xl main-gradient-bg text-white flex items-center justify-center font-extrabold">
        {n}
      </div>
      <div className="mt-4 text-lg font-extrabold dark-purple-text">{title}</div>
      <div className="mt-2 text-gray-600 leading-7">{desc}</div>
    </div>
  );
}

function ExampleCard({
  title,
  value,
  region,
  deadline,
}: {
  title: string;
  value: string;
  region: string;
  deadline: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="font-extrabold dark-purple-text">{title}</div>
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="text-gray-500">Value</span>
          <span className="font-semibold">{value}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Region</span>
          <span className="font-semibold">{region}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Deadline</span>
          <span className="font-semibold">{deadline}</span>
        </div>
      </div>
      <div className="mt-5">
        <button className="w-full px-4 py-2 rounded-lg border border-gray-200 font-bold text-gray-800 hover:bg-gray-50 transition">
          View example summary
        </button>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-black">
      ✓
    </span>
  );
}
