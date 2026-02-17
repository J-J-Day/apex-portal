"use client";

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

const FUNDING_OPTIONS = [
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
  preferences_set: boolean | null;
};

export default function PreferencesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [industries, setIndustries] = useState<string[]>([]);
  const [fundingTypes, setFundingTypes] = useState<string[]>([]);
  const [region, setRegion] = useState<string>("UK-wide");
  const [minAmount, setMinAmount] = useState<string>("50000");
  const [maxAmount, setMaxAmount] = useState<string>("250000");

  const canSave = useMemo(() => {
    return industries.length > 0 && fundingTypes.length > 0 && region.trim().length > 0;
  }, [industries, fundingTypes, region]);

  useEffect(() => {
    const load = async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: prof } = await supabase
        .from("profiles")
        .select("id, industries, funding_types, region, min_amount, preferences_set")
        .eq("id", user.id)
        .single<Profile>();

      if (prof) {
        setIndustries(prof.industries ?? []);
        setFundingTypes(prof.funding_types ?? []);
        setRegion(prof.region ?? "UK-wide");
        setMinAmount(String(prof.min_amount ?? 50000));
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    if (list.includes(value)) setter(list.filter((x) => x !== value));
    else setter([...list, value]);
  };

  const save = async () => {
    setSaving(true);

    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;

    if (!user) {
      router.push("/login");
      return;
    }

    const min = Number(minAmount);
    const min_amount = Number.isFinite(min) ? Math.max(0, Math.round(min)) : 0;

    const { error } = await supabase
      .from("profiles")
      .update({
        industries,
        funding_types: fundingTypes,
        region,
        min_amount,
        preferences_set: true,
      })
      .eq("id", user.id);

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
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Set preferences</h1>
          <p className="text-gray-600 mt-2">
            Tell us what you want to be alerted on. You can change this anytime.
          </p>

          {/* Industries */}
          <div className="mt-8">
            <div className="font-bold text-gray-900 mb-3">Industries</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INDUSTRY_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={industries.includes(opt)}
                    onChange={() => toggle(opt, industries, setIndustries)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Funding types */}
          <div className="mt-8">
            <div className="font-bold text-gray-900 mb-3">Opportunity type</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FUNDING_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={fundingTypes.includes(opt)}
                    onChange={() => toggle(opt, fundingTypes, setFundingTypes)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Region + min amount */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="font-bold text-gray-900 mb-2">Region</div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white"
              >
                <option>UK-wide</option>
                <option>England</option>
                <option>Scotland</option>
                <option>Wales</option>
                <option>Northern Ireland</option>
              </select>
            </div>

            <div>
              <div className="font-bold text-gray-900 mb-2">Minimum funding (£)</div>
              <input
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
                placeholder="e.g. 50000"
              />
              <div className="text-xs text-gray-500 mt-2">
                We’ll only show opportunities above this value.
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Back
            </button>

            <button
              onClick={save}
              disabled={!canSave || saving}
              className="px-6 py-2.5 rounded-lg font-bold text-white disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #F05A28, #7B1E5A)" }}
            >
              {saving ? "Saving…" : "Save preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
