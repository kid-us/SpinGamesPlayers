import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  redirect,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import z from "zod";
import Chapa from "@/components/withdraw/Chapa";
import Manual from "@/components/withdraw/Manual";
import BreadCrumb from "@/components/BreadCrumb";
import { useAuthStore } from "@/stores/authStore";

// valid methods
const methodSchema = z.enum(["chapa", "manual"]);

export const Route = createFileRoute("/withdraw")({
  beforeLoad: async () => {
    const { isAuthenticated, loading, fetchMe } = useAuthStore.getState();
    if (loading) {
      await fetchMe();
    }
    if (!isAuthenticated) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  validateSearch: z.object({
    method: methodSchema.optional(),
  }),
  component: WithdrawPage,
});

function WithdrawPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const search = useSearch({ from: "/withdraw" });
  const depositMethod = search.method ?? "chapa";

  const handleSelect = (method: "chapa" | "manual") => {
    navigate({
      to: "/withdraw",
      search: (prev) => ({ ...prev, method }),
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col mt-10">
      <BreadCrumb route="Withdraw" />

      <p className="mb-4 font-bold text-sky-500 text-xl">
        Your Current Balance is : {user?.wallet.toLocaleString()}
      </p>

      <p className="text-xl mb-5 font-semibold">Withdraw Money</p>

      <div className="grid grid-cols-2 gap-x-5 mb-8">
        {(["chapa", "manual"] as const).map((method) => (
          <Button
            key={method}
            variant="outline"
            onClick={() => handleSelect(method)}
            className={`${method === depositMethod && "bg-primary text-white"} w-full capitalize`}
          >
            {method}
          </Button>
        ))}
      </div>

      {/* Render based on query param */}
      {depositMethod === "chapa" && <Chapa />}
      {depositMethod === "manual" && <Manual />}
    </div>
  );
}
