"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [companyNumber, setCompanyNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: prof } = await supabase
        .from("profiles")
        .select("company_number")
        .eq("id", user.id)
        .single();

      if (prof?.company_number) setCompanyNumber(prof.company_number);
      setLoading(false);
    };

    run();
  }, [router]);

  const save = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleaned = companyNumber.trim();
    if (!cleaned) {
      setErrorMsg("Please enter a Companies House number.");
      return;
    }

    setSaving(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      setSaving(false);
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ company_number: cleaned })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Company linked successfully.");
    setTimeout(() => router.push("/"), 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-200">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm font-semibold text-white/80 hover:text-white transition"
          >
            ← Back to portal
          </button>
          <div className="text-sm text-white/60">Step 1 of 2</div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/10">
          <h1 className="text-2xl font-semibold tracking-tight">Link your company</h1>
          <p className="mt-2 text-sm text-white/70">
            Add your Companies House number so Apex can personalise matching and reporting.
          </p>

          <div className="mt-6 grid gap-3">
            <label className="text-xs font-semibold text-white/70">Companies House number</label>
            <input
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
              placeholder="e.g. 12345678"
              className="w-full rounded-xl bg-zinc-950/60 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
            />

            {errorMsg && (
              <div className="mt-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mt-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {successMsg}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/50">
                Tip: you can find this on Companies House (it’s the 8-digit company number).
              </div>

              <button
                onClick={save}
                disabled={saving}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/15 hover:opacity-95 disabled:opacity-60 transition"
              >
                {saving ? "Saving…" : "Save & continue"}
              </button>
            </div>
          </div>
        </div>

        {/* Optional next step preview card */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-sm font-semibold">Next: Set preferences</div>
          <p className="mt-1 text-sm text-white/70">
            Choose sectors, regions and keywords to filter opportunities.
          </p>
        </div>
      </main>
    </div>
  );
}
