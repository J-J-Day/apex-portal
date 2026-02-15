"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      if (!email || !password) {
        setMessage("Please enter an email and password.");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) return setMessage(error.message);
        router.push("/");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMessage(error.message);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <i className="fas fa-chart-line text-3xl secondary-gradient-text" />
          <div className="text-center">
            <div className="text-3xl font-extrabold secondary-gradient-text leading-tight">APEX</div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest -mt-1">GRANT SOLUTIONS</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold dark-purple-text">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-600 mt-2">
            {mode === "login" ? "Log in to access your dashboard." : "Sign up to start receiving matched opportunities."}
          </p>

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

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            {message && (
              <div className="text-sm rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                {message}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full main-gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-60"
              type="button"
            >
              {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
