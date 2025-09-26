// auth.ts
import { apiKey } from "@/services/api";
import axios from "axios";

interface User {
  display_name: string;
  id: number;
  phone_number: string;
  tiktok_handle: string;
  wallet: number;
}

export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await axios.get<User>(`${apiKey}me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;
    return !!user;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
};
