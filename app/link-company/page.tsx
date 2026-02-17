"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [companyNumber, setCompanyNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? null);

      // Prefill existing company number if already saved
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

  const save = async () => {
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
      router.push("/login");
      return;
    }

    // Upsert ensures the row exists and is updated
    const { error: upsertErr } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        company_number: cleaned,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    setSaving(false);

    if (upsertErr) {
      setError(upsertErr.message);
      return;
    }

    router.push("/"); // back to portal home
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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-lg">APEX Portal</div>
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-semibold">{email}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2">Link your company</h1>
          <p className="text-gray-600 mb-6">
            Enter your Companies House number (e.g. 12345678 or SC123456).
          </p>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Companies House number
          </label>
          <input
            value={companyNumber}
            onChange={(e) => setCompanyNumber(e.target.value)}
            placeholder="e.g. 12345678"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />

          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-3 rounded-lg bg-black text-white hover:opacity-90 transition disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save company"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
