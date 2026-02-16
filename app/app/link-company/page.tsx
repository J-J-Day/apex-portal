"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [companyNumber, setCompanyNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // Prefill from profile if it exists
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

  const onSave = async () => {
    setError(null);

    const cleaned = companyNumber.trim().toUpperCase();
    if (!cleaned) {
      setError("Please enter your Companies House number.");
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

    const { error: upErr } = await supabase
      .from("profiles")
      .update({ company_number: cleaned })
      .eq("id", user.id);

    setSaving(false);

    if (upErr) {
      setError(upErr.message);
      return;
    }

    // back to portal home
    router.push("/");
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
      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <button
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6"
          onClick={() => router.push("/")}
        >
          ← Back to dashboard
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-extrabold dark-purple-text">
            Link your company
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your Companies House number. Next we’ll automatically pull your SIC codes and business details.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Companies House number
            </label>
            <input
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
              placeholder="e.g. 12345678"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: it’s usually 8 characters (sometimes starts with letters).
            </p>
          </div>

          {error && (
            <div className="mt-4 text-sm font-semibold text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={onSave}
              disabled={saving}
              className="main-gradient-bg text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save company"}
            </button>

            <button
              onClick={() => router.push("/")}
              className="bg-white border border-gray-200 text-gray-800 font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
