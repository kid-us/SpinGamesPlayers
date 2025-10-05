import { Toaster } from "@/components/ui/sonner";
import "../App.css";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <div
        className={`${
          location.pathname === "/login" || location.pathname === "/register"
            ? "px-5"
            : "px-5"
        } pb-5 mt-8`}
      >
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
