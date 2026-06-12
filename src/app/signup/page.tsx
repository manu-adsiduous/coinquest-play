"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getAcquisitionData } from "@/components/AcquisitionTracker";
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
  const [maybeReturning, setMaybeReturning] = useState(false);

  // Gently nudge returning users: if an account already exists with this
  // visitor's ad click ID, suggest logging in rather than making another one.
  useEffect(() => {
    const acq = getAcquisitionData();
    if (!acq.gclid && !acq.fbclid && !acq.ttclid) return;
    fetch("/api/auth/check-acquisition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acquisition: acq }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.existing) setMaybeReturning(true);
      })
      .catch(() => {});
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

        {maybeReturning && (
          <div className="bg-pixel-blue/10 border-2 border-pixel-blue px-4 py-3 rounded-sm mb-4">
            <p className="text-pixel-blue font-bold text-sm mb-1">Already played here before?</p>
            <p className="text-text-secondary text-xs">
              Looks like you may already have a CoinQuest account.{" "}
              <Link href="/login" className="text-pixel-cyan font-bold hover:underline">Log in</Link>{" "}
              to keep building up coins on it! Or create a new account below if you need a separate one.
            </p>
          </div>
        )}

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
