"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { UserProfile } from "@/lib/types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  sessionCoins: number;
  addSessionCoins: (amount: number) => void;
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  sessionCoins: 0,
  addSessionCoins: () => {},
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionCoins, setSessionCoins] = useState(0);

  const addSessionCoins = useCallback((amount: number) => {
    setSessionCoins((prev) => prev + amount);
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, [fetchMe]);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Get acquisition data from localStorage
      let acquisition = {};
      try {
        acquisition = JSON.parse(localStorage.getItem("cq_acquisition") || "{}");
      } catch {}

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, acquisition, guestCoins: sessionCoins }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Signup failed" };
      setUser(data.user);
      setSessionCoins(0);
      return { error: null };
    } catch {
      return { error: "Something went wrong" };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Login failed" };
      // Fetch full profile with isAdmin flag
      await fetchMe();
      setSessionCoins(0);
      return { error: null };
    } catch {
      return { error: "Something went wrong" };
    }
  };

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setSessionCoins(0);
  };

  return (
    <AuthContext.Provider value={{ user, loading, sessionCoins, addSessionCoins, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
