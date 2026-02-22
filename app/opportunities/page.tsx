"use client";

import { useRouter } from "next/navigation";

export default function OpportunitiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-2">Matched opportunities</h1>
          <p className="text-gray-600 mb-6">
            This is where your matched grants will appear. Next we’ll connect this to your saved preferences.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => router.push("/preferences")}
              className="px-5 py-2.5 rounded-lg main-gradient-bg text-white font-semibold hover:opacity-90 transition"
            >
              Edit preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
