"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type Profile = {
  company_number: string | null;
  preferences_set: boolean | null;
};

export default function PortalHomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
        .select("company_number, preferences_set")
        .eq("id", user.id)
        .single();

      if (prof) setProfile(prof);

      setLoading(false);
    };

    run();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );
  }

  const companyComplete = !!profile?.company_number;
  const preferencesComplete = !!profile?.preferences_set;

  // ✅ If you want users to be able to skip linking company:
  const monitoringActive = preferencesComplete;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-bold">APEX Portal</div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              Signed in as{" "}
              <span className="font-semibold text-gray-800">{email}</span>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-2">Welcome back 👋</h1>
          <p className="text-gray-600 mb-6">
            Complete your setup to start receiving tailored grant alerts.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/link-company")}
              className="px-6 py-3 main-gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Link company (optional)
            </button>

            <button
              onClick={() => router.push("/preferences")}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Set preferences
            </button>
          </div>
        </div>

        {/* Setup Status */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Your Setup</h2>

          <div className="space-y-4">
            <StatusRow label="Company linked (optional)" complete={companyComplete} pending={false} />
            <StatusRow label="Preferences set" complete={preferencesComplete} pending={false} />
            <StatusRow label="Monitoring active" complete={monitoringActive} pending={!monitoringActive} />
          </div>
        </div>

        {/* Opportunities Placeholder */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Matched Opportunities</h2>
          <div className="text-gray-600">
            No matched grants yet. Set your preferences to start receiving alerts.
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusRow({
  label,
  complete,
  pending,
}: {
  label: string;
  complete: boolean;
  pending: boolean;
}) {
  let badgeStyle = "bg-red-100 text-red-700";
  let text = "Not yet";

  if (complete) {
    badgeStyle = "bg-green-100 text-green-700";
    text = "Complete";
  } else if (pending) {
    badgeStyle = "bg-yellow-100 text-yellow-800";
    text = "Pending";
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{label}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle}`}>
        {text}
      </span>
    </div>
  );
}
