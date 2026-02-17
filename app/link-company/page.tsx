"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LinkCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [companyNumber, setCompanyNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setLoading(false);
    };
    run();
  }, [router]);

  const save = async () => {
    setMessage(null);
    setSaving(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    const cleaned = companyNumber.trim().toUpperCase();

    const { error } = await supabase
      .from("profiles")
      .upsert(
        { id: user.id, company_number: cleaned },
        { onConflict: "id" }
      );

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Saved! ✅");
      router.push("/");
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold dark-purple-text">Link your company</h1>
        <p className="text-gray-600 mt-2">
          Enter your Companies House number (e.g. 12345678 or SC123456).
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mt-6">
          <label className="text-sm font-semibold text-gray-700">Companies House number</label>
          <input
            value={companyNumber}
            onChange={(e) => setCompanyNumber(e.target.value)}
            className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="e.g. 12345678"
          />

          <button
            onClick={save}
            disabled={saving || companyNumber.trim().length < 6}
            className="mt-4 w-full main-gradient-bg text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save company"}
          </button>

          {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}

          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full bg-white border border-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Back to portal
          </button>
        </div>
      </div>
    </div>
  );
}
