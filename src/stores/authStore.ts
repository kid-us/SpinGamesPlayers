import { apiKey } from "@/services/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  display_name: string;
  id: number;
  phone_number: string;
  tiktok_handle: string;
  wallet: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchMe: () => Promise<void>;
  setToken: (newToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem("token") || null,
      isAuthenticated: !!localStorage.getItem("token"),
      loading: true,

      fetchMe: async () => {
        const token = get().token || localStorage.getItem("token");
        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            token: null,
          });
          return;
        }
        try {
          set({ loading: true });
          const response = await fetch(`${apiKey}me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            if (response.status === 401) {
              localStorage.removeItem("token");
              set({
                user: null,
                isAuthenticated: false,
                loading: false,
                token: null,
              });
            }
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              token: response.status === 401 ? null : get().token,
            });
            throw new Error(`Request failed with status ${response.status}`);
          }
          const userData = await response.json();
          set({ user: userData, isAuthenticated: true, loading: false });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            token: get().token,
          });
        }
      },

      setToken: (newToken: string) => {
        localStorage.setItem("token", newToken);
        set({ token: newToken, isAuthenticated: true });
        get().fetchMe();
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
        fetch(`${apiKey}logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${get().token}` },
        })
          .then(() => {
            window.location.href = "/login";
          })
          .catch(() => {});
      },
    }),
    {
      name: "player-auth-storage",
    }
  )
);
