"use client";

import PortalLayout from "../components/portal-layout";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const INDUSTRY_OPTIONS = [
  "Construction",
  "Renewable Energy",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Professional Services",
  "Hospitality",
  "Retail",
];

const OPPORTUNITY_OPTIONS = [
  "Capital grants",
  "Decarbonisation",
  "Innovation funding",
  "Training funding",
  "Local authority support",
];

type Profile = {
  id: string;
  industries: string[] | null;
  funding_types: string[] | null;
  region: string | null;
  min_amount: number | null;
  max_amount: number | null;
  preferences_set: boolean | null;
};

export default function PreferencesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [industries, setIndustries] = useState<string[]>([]);
  const [fundingTypes, setFundingTypes] = useState<string[]>([]);
  const [region, setRegion] = useState<string>("UK-wide");
  const [minAmount, setMinAmount] = useState<string>("0");
  const [maxAmount, setMaxAmount] = useState<string>("0");

  const canSave = useMemo(() => {
    return (
      industries.length > 0 &&
      fundingTypes.length > 0 &&
      region.trim().length > 0
    );
  }, [industries, fundingTypes, region]);

  useEffect(() => {
    const load = async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: prof, error } = await supabase
        .from("profiles")
        .select("id, industries, funding_types, region, min_amount, max_amount, preferences_set")
        .eq("id", user.id)
        .single();

      if (!error && prof) {
        const p = prof as Profile;
        setIndustries(p.industries ?? []);
        setFundingTypes(p.funding_types ?? []);
        setRegion(p.region ?? "UK-wide");
        setMinAmount(String(p.min_amount ?? 0));
        setMaxAmount(String(p.max_amount ?? 0));
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    if (list.includes(value)) setter(list.filter((x) => x !== value));
    else setter([...list, value]);
  };

  const toMoneyInt = (value: string, fallback: number) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, Math.round(n));
  };

  const formatAmount = (value: string) => {
    const n = Number(value);
    if (!Number.isFinite(n) || n === 0) return "No limit";
    return `£${n.toLocaleString()}`;
  };

  const save = async () => {
    if (!canSave) return;

    setSaving(true);

    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;

    if (!user) {
      setSaving(false);
      router.push("/login");
      return;
    }

    const min_amount = toMoneyInt(minAmount, 0);
    const max_amount = toMoneyInt(maxAmount, 0);

    const finalMax =
      max_amount > 0 && max_amount < min_amount ? min_amount : max_amount;

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          industries,
          funding_types: fundingTypes,
          region,
          min_amount,
          max_amount: finalMax,
          preferences_set: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    setSaving(false);

    if (error) {
      alert(`Could not save preferences: ${error.message}`);
      return;
    }

    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <PortalLayout
        title="Criteria"
        subtitle="Set the funding criteria used to match opportunities."
      >
        <div className="flex min-h-[60vh] items-center justify-center text-slate-600">
          Loading…
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout
      title="Criteria"
      subtitle="Set the funding criteria used to match opportunities."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main form area */}
        <div className="xl:col-span-2 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Industries</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select the sectors most relevant to your business.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INDUSTRY_OPTIONS.map((opt) => {
                const active = industries.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(opt, industries, setIndustries)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-slate-900 bg-slate-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-900">{opt}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Opportunity types</h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose the types of funding you want to receive alerts for.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OPPORTUNITY_OPTIONS.map((opt) => {
                const active = fundingTypes.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(opt, fundingTypes, setFundingTypes)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-slate-900 bg-slate-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-900">{opt}</div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Location & value</h2>
            <p className="mt-1 text-sm text-slate-600">
              Narrow results by geography and funding range.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  <option>UK-wide</option>
                  <option>England</option>
                  <option>Scotland</option>
                  <option>Wales</option>
                  <option>Northern Ireland</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Minimum opportunity value (£)
                </label>
                <input
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  inputMode="numeric"
                  placeholder="0 = no minimum"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700"
                />
                <div className="mt-2 text-xs text-slate-500">
                  Use 0 if you do not want to set a minimum.
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Maximum opportunity value (£)
                </label>
                <input
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  inputMode="numeric"
                  placeholder="0 = no maximum"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700"
                />
                <div className="mt-2 text-xs text-slate-500">
                  Use 0 if you do not want to set a maximum.
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Current summary</h2>
            <p className="mt-1 text-sm text-slate-600">
              This is how opportunities will be matched.
            </p>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <div className="text-slate-500">Industries</div>
                <div className="mt-1 font-medium text-slate-900">
                  {industries.length > 0 ? industries.join(", ") : "None selected"}
                </div>
              </div>

              <div>
                <div className="text-slate-500">Opportunity types</div>
                <div className="mt-1 font-medium text-slate-900">
                  {fundingTypes.length > 0 ? fundingTypes.join(", ") : "None selected"}
                </div>
              </div>

              <div>
                <div className="text-slate-500">Region</div>
                <div className="mt-1 font-medium text-slate-900">{region}</div>
              </div>

              <div>
                <div className="text-slate-500">Funding range</div>
                <div className="mt-1 font-medium text-slate-900">
                  {formatAmount(minAmount)} to {formatAmount(maxAmount)}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => router.push("/")}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                onClick={save}
                disabled={!canSave || saving}
                className="rounded-lg px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: "linear-gradient(90deg, #F05A28, #7B1E5A)" }}
              >
                {saving ? "Saving…" : "Save criteria"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </PortalLayout>
  );
}
