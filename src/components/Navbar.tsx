import { apiKey } from "@/services/api";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { LoaderPinwheel, LogOut, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
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
    }
  };

  return (
    <div
      className={`max-w-lg mx-auto flex items-center justify-between py-3 border-b border-zinc-200 ${
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/otp" ||
        location.pathname === "/reset-password" ||
        location.pathname === "/forgot-password"
          ? "hidden"
          : ""
      }`}
    >
      <Link to="/" className="flex items-center justify-start space-x-5">
        <LoaderPinwheel size={40} />
        <p className="text-2xl font-bold">Spin Games</p>
      </Link>

      <div className="flex items-center space-x-8">
        <div className="md:flex hidden items-center space-x-2 font-bold">
          <User size={20} />
          <p>Lorem</p>
        </div>
        <LogOut onClick={handleLogOut} className="cursor-pointer" size={20} />
      </div>
    </div>
  );
};

export default Navbar;
