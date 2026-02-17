"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

type Profile = {
  id: string;
  company_number: string | null;
  preferences_set: boolean | null;
};

export default function PortalHomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? null);

      const { data: prof } = await supabase
        .from("profiles")
        .select("id, company_number, preferences_set")
        .eq("id", user.id)
        .single();

      setProfile((prof as Profile) ?? null);
      setLoading(false);
    };

    run();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const companyLinked = !!profile?.company_number;
  const prefsSet = !!profile?.preferences_set;
  const progress = useMemo(() => {
    // 0 / 2 steps complete (company + prefs)
    const done = (companyLinked ? 1 : 0) + (prefsSet ? 1 : 0);
    return Math.round((done / 2) * 100);
  }, [companyLinked, prefsSet]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-950">
        <div className="flex items-center gap-3 text-zinc-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="group flex items-center gap-3"
            aria-label="Apex Portal Home"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 15l3-3 3 2 5-6" />
              </svg>
            </div>
            <div className="leading-tight text-left">
              <div className="text-sm font-semibold tracking-wide text-white">
                APEX <span className="text-white/60">Portal</span>
              </div>
              <div className="text-xs text-white/50">Grant matching dashboard</div>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/70">
                Signed in as <span className="text-white font-medium">{email}</span>
              </span>
            </div>

            <button
              onClick={logout}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/10 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative mx-auto max-w-6xl px-6 py-10">
        {/* Hero / Welcome */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome to Apex <span className="text-white/70">👋</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                Finish setup once and Apex will only alert you on opportunities that match your focus.
              </p>

              {/* Progress */}
              <div className="mt-5 max-w-md">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Setup progress</span>
                  <span className="font-semibold text-white/80">{progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10 ring-1 ring-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/link-company")}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/15 hover:opacity-95 transition"
              >
                Link company
              </button>

              <button
                onClick={() => router.push("/preferences")}
                className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/10 transition"
              >
                Set preferences
              </button>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Setup tiles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Tile: Company */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-white/60">Step 1</div>
                    <h3 className="mt-1 text-lg font-semibold">Link your company</h3>
                    <p className="mt-2 text-sm text-white/70">
                      Add your Companies House number so we can tailor searches to your business.
                    </p>
                  </div>

                  <StatusPill ok={companyLinked} okText="Linked" badText="Not linked" />
                </div>

                <button
                  onClick={() => router.push("/link-company")}
                  className="mt-5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15 ring-1 ring-white/10 transition"
                >
                  {companyLinked ? "View / update company" : "Link company"}
                </button>
              </div>

              {/* Tile: Preferences */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-white/60">Step 2</div>
                    <h3 className="mt-1 text-lg font-semibold">Define your focus</h3>
                    <p className="mt-2 text-sm text-white/70">
                      Keywords, regions, contract value… so you only get the good stuff.
                    </p>
                  </div>

                  <StatusPill ok={prefsSet} okText="Set" badText="Not set" />
                </div>

                <button
                  onClick={() => router.push("/preferences")}
                  className="mt-5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15 ring-1 ring-white/10 transition"
                >
                  {prefsSet ? "Edit preferences" : "Set preferences"}
                </button>
              </div>
            </div>

            {/* Matched opportunities (placeholder) */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Latest matched opportunities</h3>
                <button
                  className="text-sm font-semibold text-white/70 hover:text-white transition"
                  onClick={() => router.push("/opportunities")}
                >
                  View all →
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <div className="text-sm font-semibold">No opportunities yet</div>
                <p className="mt-1 text-sm text-white/70">
                  Link your company and set preferences to start receiving matches.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Setup summary */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-lg font-semibold">Your setup</h3>
            <div className="mt-5 space-y-4">
              <SetupRow label="Company linked" status={companyLinked ? "Complete" : "Not yet"} tone={companyLinked ? "good" : "bad"} />
              <SetupRow label="Preferences set" status={prefsSet ? "Complete" : "Not yet"} tone={prefsSet ? "good" : "bad"} />

              <SetupRow
                label="Monitoring active"
                status={companyLinked && prefsSet ? "Active" : "Pending"}
                tone={companyLinked && prefsSet ? "good" : "warn"}
              />

              <div className="pt-4">
                <button
                  onClick={() => (companyLinked ? router.push("/preferences") : router.push("/link-company"))}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/15 hover:opacity-95 transition"
                >
                  Continue setup
                </button>
                <p className="mt-3 text-xs text-white/55">
                  Once setup is complete, Apex will start matching and surfacing opportunities here.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} APEX Grant Solutions
        </footer>
      </main>
    </div>
  );
}

function StatusPill({
  ok,
  okText,
  badText,
}: {
  ok: boolean;
  okText: string;
  badText: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        ok
          ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20"
          : "bg-rose-500/15 text-rose-200 ring-rose-400/20",
      ].join(" ")}
    >
      {ok ? okText : badText}
    </span>
  );
}

function SetupRow({
  label,
  status,
  tone,
}: {
  label: string;
  status: string;
  tone: "good" | "bad" | "warn";
}) {
  const styles =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20"
      : tone === "bad"
      ? "bg-rose-500/15 text-rose-200 ring-rose-400/20"
      : "bg-amber-500/15 text-amber-200 ring-amber-400/20";

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-white/80">{label}</div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles}`}>
        {status}
      </span>
    </div>
  );
}
