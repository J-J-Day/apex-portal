"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const title = useMemo(() => (mode === "login" ? "Welcome back" : "Create your account"), [mode]);

  const onSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      if (!email || !password) {
        setMessage("Please enter an email and password.");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setMessage(error.message);
          return;
        }

        // Some Supabase setups require email confirmation.
        // Even if confirmation is ON, we can show a helpful message.
        setMessage("Account created. If email confirmation is enabled, check your inbox. Otherwise, you’re in.");
        router.push("/");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <i className="fas fa-chart-line text-3xl secondary-gradient-text" />
          <div className="text-center">
            <div className="text-3xl font-extrabold secondary-gradient-text leading-tight">APEX</div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">GRANT SOLUTIONS</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold dark-purple-text">{title}</h1>
          <p className="text-gray-600 mt-2">
            {mode === "login"
              ? "Log in to access your dashboard."
              : "Sign up to start receiving matched opportunities."}
          </p>

          {/* Toggle */}
          <div className="mt-6 grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMode("login")}
              className={`py-2 rounded-lg font-semibold transition ${
                mode === "login" ? "bg-white shadow-sm dark-purple-text" : "text-gray-600 hover:text-gray-800"
              }`}
              type="button"
            >
              Log in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`py-2 rounded-lg font-semibold transition ${
                mode === "signup" ? "bg-white shadow-sm dark-purple-text" : "text-gray-600 hover:text-gray-800"
              }`}
              type="button"
            >
              Create account
            </button>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-envelope" />
                </span>
                <input
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-lock" />
                </span>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Use at least 8 characters for a stronger password.</p>
            </div>

            {message && (
              <div className="text-sm rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                {message}
              </div>
            )}

            <button
              onClick={onSubmit}
              disabled={loading}
              className="w-full main-gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-60"
              type="button"
            >
              {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full text-gray-600 hover:text-gray-900 font-semibold py-3 rounded-xl"
              type="button"
            >
              Back to dashboard
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing you agree to basic platform terms (you can add proper legal pages later).
        </p>
      </div>
    </div>
  );
}
