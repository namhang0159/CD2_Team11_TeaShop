"use client";

import { FetchMeAPI, LoginAPI } from "@/util/api";
import { is } from "date-fns/locale";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  // ========================
  // LOAD USER FROM API
  // ========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await FetchMeAPI();

        setUser(res.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
        logout();
      }
    };

    fetchUser();
  }, []);

  // ========================
  // LOGIN API
  // ========================
  const login = async (email: string, password: string) => {
    try {
      const res = await LoginAPI({ email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const me = await FetchMeAPI();
      setUser(me.data);
      setIsLoggedIn(true);

      router.push("/"); // ✅ OK
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ========================
  // LOGOUT
  // ========================
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
