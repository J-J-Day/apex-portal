"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();

  const [companyNumber, setCompanyNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setErrorMsg(null);
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // Load existing value (if any)
      const { data: prof, error } = await supabase
        .from("profiles")
        .select("company_number")
        .eq("id", user.id)
        .single();

      if (!error && prof?.company_number) {
        setCompanyNumber(prof.company_number);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const save = async () => {
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleaned = companyNumber.trim().toUpperCase();

    if (!cleaned) {
      setSaving(false);
      setErrorMsg("Please enter a Companies House number.");
      return;
    }

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    // Update the user's profile row
    const { error } = await supabase
      .from("profiles")
      .update({ company_number: cleaned })
      .eq("id", user.id);

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    setSuccessMsg("Company linked successfully ✅");
    setSaving(false);

    // Go back to portal after a short moment
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 500);
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">Link company</div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Back
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold">Companies House number</h1>
          <p className="text-gray-600 mt-2">
            Enter your company number and we’ll save it to your profile.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company number
            </label>
            <input
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
              placeholder="e.g. 12345678"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {errorMsg && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
              {successMsg}
            </div>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </main>
    </div>
  );
}
