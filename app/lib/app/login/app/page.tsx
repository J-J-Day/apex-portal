"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
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
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-line text-2xl secondary-gradient-text" />
            <div>
              <div className="text-xl font-extrabold secondary-gradient-text leading-tight">APEX</div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">PORTAL</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden sm:block">
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
        <h1 className="text-3xl font-extrabold dark-purple-text">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Next step: link your company, pull SIC codes, then match opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <span className="text-xl secondary-gradient-text">
                  <i className="fas fa-bookmark" />
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-semibold">Saved Opportunities</div>
                <div className="text-2xl font-extrabold dark-purple-text">0</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <span className="text-xl secondary-gradient-text">
                  <i className="fas fa-magnifying-glass" />
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-semibold">Searches Made</div>
                <div className="text-2xl font-extrabold dark-purple-text">0</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <span className="text-xl secondary-gradient-text">
                  <i className="fas fa-building" />
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-semibold">Company Linked</div>
                <div className="text-2xl font-extrabold dark-purple-text">No</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <i className="fas fa-circle-info text-blue-600" />
            </div>
            <div>
              <div className="font-bold dark-purple-text">Link your company</div>
              <div className="text-gray-600">
                Connect Companies House to automatically pull SIC codes and company details.
              </div>
            </div>
          </div>
          <button className="main-gradient-bg text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-md">
            Link company
          </button>
        </div>
      </main>
    </div>
  );
}
