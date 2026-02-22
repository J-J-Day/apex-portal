"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [companyNumber, setCompanyNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidCompanyNumber = useMemo(() => {
    const v = companyNumber.trim().toUpperCase();
    return /^(\d{8}|[A-Z]{2}\d{6})$/.test(v);
  }, [companyNumber]);

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
      setError("Please enter your Companies House number, or click Skip for now.");
      return;
    }

    if (!/^(\d{8}|[A-Z]{2}\d{6})$/.test(cleaned)) {
      setError("That doesn’t look like a valid Companies House number (e.g. 12345678 or SC123456).");
      return;
    }

    setSaving(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: upsertErr } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          company_number: cleaned,
          company_linked: true,
          company_linking_skipped: false, // ✅ if they link, un-skip
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    setSaving(false);

    if (upsertErr) {
      setError(upsertErr.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const skip = async () => {
    setError(null);
    setSkipping(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    // Mark skipped. Do NOT set company_linked true.
    const { error: upsertErr } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          company_linking_skipped: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    setSkipping(false);

    if (upsertErr) {
      setError(upsertErr.message);
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
          <h1 className="text-2xl font-bold mb-2">Link your company (optional)</h1>
          <p className="text-gray-600 mb-6">
            If you link your company, we can auto-fill details later. If not, you can still use Apex by setting preferences.
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

          {companyNumber.trim().length > 0 && !isValidCompanyNumber && !error && (
            <div className="mt-3 text-xs text-gray-500">
              Format hint: 8 digits (12345678) or 2 letters + 6 digits (SC123456).
            </div>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              onClick={skip}
              disabled={skipping || saving}
              className="px-5 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
            >
              {skipping ? "Skipping…" : "Skip for now"}
            </button>

            <button
              onClick={save}
              disabled={saving || skipping || !isValidCompanyNumber}
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
