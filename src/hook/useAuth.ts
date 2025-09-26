import { apiKey } from "@/services/api";
import { useState, useEffect } from "react";

interface User {
  display_name: string;
  id: number;
  phone_number: string;
  tiktok_handle: string;
  wallet: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const response = await fetch(`${apiKey}me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Unauthorized");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Not authenticated");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
