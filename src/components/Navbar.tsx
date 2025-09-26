import { apiKey } from "@/services/api";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { LoaderPinwheel, LogOut, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Example: Fetch user data from localStorage or context
  const userName = localStorage.getItem("userName") || "Guest";

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        `${apiKey}logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast/notification
      alert("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto flex items-center justify-between py-3 border-b border-zinc-200 ${
        location.pathname === "/login" || location.pathname === "/register"
          ? "hidden"
          : ""
      }`}
    >
      <Link
        to="/"
        className="flex items-center justify-start space-x-5"
        aria-label="Go to Spin Games homepage"
      >
        <LoaderPinwheel size={40} aria-hidden="true" />
        <p className="text-2xl font-bold">Spin Games</p>
      </Link>

      <div className="flex items-center space-x-8">
        <div className="md:flex hidden items-center space-x-2 font-bold">
          <User size={20} aria-hidden="true" />
          <p>{userName}</p>
        </div>
        <button
          onClick={handleLogOut}
          disabled={isLoggingOut}
          className="cursor-pointer disabled:opacity-50"
          aria-label="Log out"
          title="Log out"
        >
          {isLoggingOut ? (
            <LoaderPinwheel size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
