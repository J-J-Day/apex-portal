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

// fetch profile from Supabase
const { data: prof, error: profErr } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single();

if (!profErr) {
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
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fas fa-chart-line text-2xl secondary-gradient-text" />
            <div>
              <div className="text-xl font-extrabold secondary-gradient-text leading-tight">APEX</div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">PORTAL</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-600">
              Signed in as <span className="font-semibold text-gray-800">{email}</span>
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
                Let’s get your account set up so Apex can automatically match you to relevant opportunities and notify you the moment something new is published.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="main-gradient-bg text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-md"
                onClick={() => alert("Next step: we’ll build the Link Company screen")}
              >
                Link company
              </button>
              <button
                className="bg-white border border-gray-200 text-gray-800 font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
                onClick={() => alert("Next step: we’ll build Search Preferences")}
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
            <h2 className="text-lg font-extrabold dark-purple-text">1) Link your company</h2>
            <p className="text-gray-600 mt-2 leading-7">
              Add your Companies House number and we’ll automatically pull your SIC codes and business details.
            </p>
            <button
              className="mt-5 w-full main-gradient-bg text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition"
              onClick={() => alert("We’ll build this page next")}
            >
              Link company
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
              <span className="text-xl secondary-gradient-text">
                <i className="fas fa-sliders" />
              </span>
            </div>
            <h2 className="text-lg font-extrabold dark-purple-text">2) Define your focus</h2>
            <p className="text-gray-600 mt-2 leading-7">
              Choose keywords, regions, and contract values so Apex only alerts you on what matters.
            </p>
            <button
              className="mt-5 w-full bg-white border border-gray-200 text-gray-800 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition"
              onClick={() => alert("We’ll build this page next")}
            >
              Set preferences
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
              <span className="text-xl secondary-gradient-text">
                <i className="fas fa-bell" />
              </span>
            </div>
            <h2 className="text-lg font-extrabold dark-purple-text">3) Start monitoring</h2>
            <p className="text-gray-600 mt-2 leading-7">
              Apex scans sources like Contracts Finder and notifies you when new opportunities match your profile.
            </p>
            <div className="mt-5 text-sm text-gray-500">
              Status: <span className="font-semibold text-gray-800">Coming next</span>
            </div>
          </div>
        </div>

        {/* Preview area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-extrabold dark-purple-text">Latest matched opportunities</h3>
              <button
                className="text-sm font-bold secondary-gradient-text"
                onClick={() => alert("We’ll add the opportunities list next")}
              >
                View all
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Placeholder cards */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold dark-purple-text">No opportunities yet</div>
                    <div className="text-gray-600 mt-1">
                      Link your company and set preferences to start receiving matches.
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    Setup required
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-extrabold dark-purple-text">Your setup</h3>

           <div className="mt-5 space-y-4">
  <div className="flex items-center justify-between">
    <div className="text-gray-700 font-semibold">Company linked</div>
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full border ${
        profile?.company_number
          ? "bg-green-50 text-green-700 border-green-100"
          : "bg-red-50 text-red-700 border-red-100"
      }`}
    >
      {profile?.company_number ? "Complete" : "Not yet"}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <div className="text-gray-700 font-semibold">Preferences set</div>
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full border ${
        profile?.preferences_set
          ? "bg-green-50 text-green-700 border-green-100"
          : "bg-red-50 text-red-700 border-red-100"
      }`}
    >
      {profile?.preferences_set ? "Complete" : "Not yet"}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <div className="text-gray-700 font-semibold">Monitoring active</div>
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full border ${
        profile?.company_number && profile?.preferences_set
          ? "bg-green-50 text-green-700 border-green-100"
          : "bg-yellow-50 text-yellow-800 border-yellow-100"
      }`}
    >
      {profile?.company_number && profile?.preferences_set
        ? "Active"
        : "Pending"}
    </span>
  </div>
</div>
            
              <div className="pt-4 border-t border-gray-200">
                <button
                  className="w-full main-gradient-bg text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition"
                  onClick={() => alert("Next: link company form + Companies House API")}
                >
                  Continue setup
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Once setup is complete, you’ll start seeing matched opportunities here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle footer */}
      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} APEX Grant Solutions
      </footer>
    </div>
  );
}
