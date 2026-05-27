"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackEvent("pageview", { page: "signup" });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error: err } = await signUp(email, password, username);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      trackEvent("sign_up", { method: "email" });
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="pixel-card p-8 w-full max-w-md fade-in">
        <div className="text-center mb-6">
          <span className="pixel-coin coin-bounce mx-auto mb-3 !w-8 !h-8 text-[10px]">C</span>
          <h1 className="font-pixel text-sm text-white">Join CoinQuest!</h1>
          <p className="text-text-secondary mt-1">Create an account to start earning Robux</p>
        </div>

        {error && (
          <div className="bg-roblox-red/10 border-2 border-roblox-red text-roblox-red px-4 py-3 rounded-sm mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pixel-input w-full px-4 py-3 transition-colors"
              placeholder="CoolGamer123"
            />
          </div>
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
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-roblox-green text-white font-bold py-3 rounded-sm pixel-btn hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-pixel-cyan font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
