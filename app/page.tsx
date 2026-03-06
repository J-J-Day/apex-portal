"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import PortalLayout from "./components/portal-layout";

type Profile = {
  id: string;
  industries: string[] | null;
  funding_types: string[] | null;
  region: string | null;
  min_amount: number | null;
  max_amount: number | null;
  preferences_set: boolean | null;
};

const latestOpportunities = [
  {
    title: "Decarbonisation Support Scheme",
    funding: "£50k – £250k",
    region: "UK-wide",
    deadline: "30 September",
    source: "Innovate UK",
    status: "New",
  },
  {
    title: "Innovation Voucher Fund",
    funding: "£5k – £15k",
    region: "England",
    deadline: "12 October",
    source: "Gov.uk",
    status: "Closing Soon",
  },
  {
    title: "Training & Skills Grant",
    funding: "£2k – £10k",
    region: "UK",
    deadline: "Rolling",
    source: "Official Publication",
    status: "Open",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, industries, funding_types, region, min_amount, max_amount, preferences_set")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const formatAmount = (value: number | null) => {
    if (!value || value === 0) return "No limit";
    return `£${value.toLocaleString()}`;
  };

  const industriesText =
    profile?.industries && profile.industries.length > 0
      ? profile.industries.join(", ")
      : "Not set";

  const fundingTypesText =
    profile?.funding_types && profile.funding_types.length > 0
      ? profile.funding_types.join(", ")
      : "Not set";

  const regionText = profile?.region || "Not set";

  const fundingRangeText = `${formatAmount(profile?.min_amount ?? 0)} to ${formatAmount(
    profile?.max_amount ?? 0
  )}`;

  return (
    <PortalLayout
      title="Dashboard"
      subtitle="Overview of opportunities matched to your criteria."
    >
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center text-slate-600">
          Loading…
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="New Matches" value="12" />
            <SummaryCard label="Closing Soon" value="3" />
            <SummaryCard label="Saved Opportunities" value="5" />
            <SummaryCard label="Alerts Active" value={profile?.preferences_set ? "On" : "Off"} />
          </section>

          {/* Main dashboard row */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Latest opportunities */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Latest Matched Opportunities
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    The most recent opportunities aligned with your current criteria.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {latestOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.title}
                    className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-base font-semibold text-slate-900">
                          {opportunity.title}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                          <span>{opportunity.funding}</span>
                          <span>{opportunity.region}</span>
                          <span>Deadline: {opportunity.deadline}</span>
                          <span>Source: {opportunity.source}</span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          opportunity.status === "New"
                            ? "bg-emerald-50 text-emerald-700"
                            : opportunity.status === "Closing Soon"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {opportunity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">Your Criteria</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Industry</span>
                    <span className="text-right font-medium text-slate-900">{industriesText}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Region</span>
                    <span className="text-right font-medium text-slate-900">{regionText}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Funding range</span>
                    <span className="text-right font-medium text-slate-900">{fundingRangeText}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Opportunity type</span>
                    <span className="text-right font-medium text-slate-900">{fundingTypesText}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/preferences")}
                  className="mt-6 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Edit criteria
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">Alerts</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Email alerts</span>
                    <span className="font-medium text-emerald-700">
                      {profile?.preferences_set ? "Enabled" : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Frequency</span>
                    <span className="font-medium text-slate-900">Immediate</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/preferences")}
                  className="mt-6 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Manage alerts
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </PortalLayout>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}
