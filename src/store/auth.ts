import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;
      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.email);

      set({
        token: data.token,
        username: data.user.email,
        isAuthenticated: true,
      });
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ token: null, username: null, isAuthenticated: false });
  },
}));
