"use client";

import { useRouter } from "next/navigation";

export default function PreferencesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => router.push("/")}
          className="text-sm font-semibold text-white/80 hover:text-white transition"
        >
          ← Back to portal
        </button>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/10">
          <h1 className="text-2xl font-semibold tracking-tight">Set preferences</h1>
          <p className="mt-2 text-sm text-white/70">
            Coming next — we’ll add keywords, regions, and contract value filters here.
          </p>
        </div>
      </div>
    </div>
  );
}
