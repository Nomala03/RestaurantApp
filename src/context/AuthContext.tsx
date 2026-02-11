import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserProfile } from "../models/types";
import * as auth from "../services/authService";

type AuthState = {
  user: UserProfile | null;
  loading: boolean;
  register: (p: Omit<UserProfile, "uid">, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  update: (u: UserProfile) => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const profile = await auth.getSessionProfile();
      setUser(profile);
      setLoading(false);
    })();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      register: async (p, pw) => setUser(await auth.registerUser(p, pw)),
      login: async (email, pw) => setUser(await auth.login(email, pw)),
      logout: async () => {
        await auth.logout();
        setUser(null);
      },
      update: async (u) => setUser(await auth.updateProfile(u)),
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
