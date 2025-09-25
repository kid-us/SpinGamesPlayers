import { Link, useLocation } from "@tanstack/react-router";
import { LoaderPinwheel, LogOut, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <div
      className={`max-w-lg mx-auto flex items-center justify-between py-3 border-b border-zinc-200 ${
        location.pathname === "/login" || location.pathname === "/register"
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
        <LogOut size={20} />
      </div>
    </div>
  );
};

export default Navbar;
