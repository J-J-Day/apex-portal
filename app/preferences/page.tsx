"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function PreferencesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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

      setLoading(false);
    };

    run();
  }, [router]);

  const save = async () => {
    setError(null);
    setSaving(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: upsertErr } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        preferences_set: true,
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
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2">Set preferences</h1>
          <p className="text-gray-600 mb-6">
            For now, this is a simple placeholder — we’ll add real options next.
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-3 rounded-lg bg-black text-white hover:opacity-90 transition disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save preferences"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
