import { Link } from "@tanstack/react-router";
import { LoaderPinwheel, LogOut, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between py-3 border-b border-zinc-200">
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
