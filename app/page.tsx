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
      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profErr && prof) setProfile(prof);

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

  const goLinkCompany = () => router.push("/link-company");
  const goPrefs = () => alert("Next step: we’ll build Search Preferences");

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fas fa-chart-line text-2xl secondary-gradient-text" />
            <div>
              <div className="text-xl font-extrabold secondary-gradient-text leading-tight">
                APEX
              </div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">
                PORTAL
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-600">
              Signed in as{" "}
              <span className="font-semibold text-gray-800">{email}</span>
            </div>

            <button
              onClick={logout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold dark-purple-text">
                Welcome to Apex 👋
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Let’s get your account set up so Apex can automatically match you
                to relevant opportunities and notify you the moment something new
                is published.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="main-gradient-bg text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-md"
                onClick={goLinkCompany}
              >
                Link company
              </button>
              <button
                className="bg-white border border-gray-200 text-gray-800 font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
                onClick={goPrefs}
              >
                Set preferences
              </button>
            </div>
          </div>
        </div>

        {/* Onboarding steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
              <span className="text-xl secondary-gradient-text">
                <i className="fas fa-building" />
              </span>
            </div>
            <h2 className="text-lg font-extrabold dark-purple-text">
              1) Link your company
            </h2>
            <p className="text-gray-600 mt-2 leading-7">
              Add your Companies House number and we’ll automatically pull your
              SIC codes and business details.
            </p>
            <button
              className="mt-5 w-full main-gradient-bg text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition"
              onClick={goLinkCompany}
            >
              Link company
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
