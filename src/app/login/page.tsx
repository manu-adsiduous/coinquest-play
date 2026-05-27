"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackEvent("pageview", { page: "login" });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      trackEvent("login", { method: "email" });
      // Redirect admins to console
      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "manu@adsiduous.com").split(",").map(e => e.trim());
      router.push(adminEmails.includes(email) ? "/console" : "/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="pixel-card p-8 w-full max-w-md fade-in">
        <div className="text-center mb-6">
          <span className="pixel-coin coin-bounce mx-auto mb-3 !w-8 !h-8 text-[10px]">C</span>
          <h1 className="font-pixel text-sm text-white">Welcome Back!</h1>
          <p className="text-text-secondary mt-1">Log in to continue earning coins</p>
        </div>

        {error && (
          <div className="bg-roblox-red/10 border-2 border-roblox-red text-roblox-red px-4 py-3 rounded-sm mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pixel-input w-full px-4 py-3 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pixel-input w-full px-4 py-3 transition-colors"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-roblox-green text-white font-bold py-3 rounded-sm pixel-btn hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-pixel-cyan font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
