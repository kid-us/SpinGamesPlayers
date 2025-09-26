import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { isAuthenticated, loading, fetchMe } = useAuthStore.getState();
    if (loading) {
      await fetchMe();
    }
    if (!isAuthenticated) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  component: HomePage,
});

type RoutePath =
  | "/deposit"
  | "/withdraw"
  | "/transaction-history"
  | "/game-history"
  | "/transfer"
  | "/setting";

const routes: { id: number; path: RoutePath }[] = [
  { id: 1, path: "/deposit" },
  { id: 2, path: "/withdraw" },
  { id: 3, path: "/transaction-history" },
  { id: 4, path: "/game-history" },
  { id: 5, path: "/transfer" },
  { id: 6, path: "/setting" },
];

function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-lg mx-auto flex flex-col mt-10 md:px-2">
      <p className="text-lg">
        Welcome back{" "}
        <span className="text-sky-500 font-bold text-xl">
          {user?.display_name}
        </span>{" "}
        Your current balance is{" "}
        <span className="text-sky-500 font-bold text-2xl">
          {user?.wallet.toLocaleString()}
        </span>{" "}
        ETB
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-10">
        {routes.map((route) => (
          <Link
            key={route.id}
            to={route.path}
            className="capitalize bg-primary rounded text-white text-center py-3 hover:bg-primary/80 transition"
          >
            {route.path.replace("-", " ").replace("/", "")}
          </Link>
        ))}
      </div>
    </div>
  );
}
