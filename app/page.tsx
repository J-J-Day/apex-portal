"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function PortalHomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? null);

      // Fetch profile
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (prof) {
        setProfile(prof);
      }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-lg">APEX Portal</div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Signed in as <span className="font-semibold">{email}</span>
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Apex 👋</h1>
          <p className="text-gray-600 mb-6">
            Let’s finish setting up your account.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/link-company")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
            >
              Link company
            </button>

            <button
              onClick={() => alert("Preferences screen coming next")}
              className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Set preferences
            </button>
          </div>
        </div>

        {/* Setup Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Your setup</h2>

          <div className="space-y-4">

            {/* Company Linked */}
            <div className="flex justify-between items-center">
              <span>Company linked</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  profile?.company_number
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile?.company_number ? "Complete" : "Not yet"}
              </span>
            </div>

            {/* Preferences */}
            <div className="flex justify-between items-center">
              <span>Preferences set</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  profile?.preferences_set
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile?.preferences_set ? "Complete" : "Not yet"}
              </span>
            </div>

            {/* Monitoring */}
            <div className="flex justify-between items-center">
              <span>Monitoring active</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  profile?.company_number && profile?.preferences_set
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {profile?.company_number && profile?.preferences_set
                  ? "Active"
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
