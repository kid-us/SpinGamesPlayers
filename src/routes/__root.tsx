import { Toaster } from "@/components/ui/sonner";
import "../App.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="lg:px-0 px-8">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
