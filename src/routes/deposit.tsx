import BreadCrumb from "@/components/BreadCrumb";
import Chapa from "@/components/deposit/Chapa";
import Manual from "@/components/deposit/Manual";
import { Button } from "@/components/ui/button";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAuthStore } from "@/stores/authStore";
import {
  createFileRoute,
  redirect,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

// valid methods
const methodSchema = z.enum(["chapa", "manual"]);

export const Route = createFileRoute("/deposit")({
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
  component: DepositPage,
});

function DepositPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [title, _setTitle] = useState("Withdraw - LiveJam");

  useDocumentTitle(title);

  const search = useSearch({ from: "/deposit" });
  const depositMethod = search.method ?? "chapa";

  const handleSelect = (method: "chapa" | "manual") => {
    navigate({
      to: "/deposit",
      search: (prev) => ({ ...prev, method }),
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <BreadCrumb route="Deposit" />

      <p className="mb-4 font-bold text-primary text-xl">
        Your Current Balance is : {user?.wallet.toLocaleString()}
      </p>

      <p className="text-xl mb-5 font-semibold text-secondary">Deposit Money</p>

      <div className="grid grid-cols-2 gap-x-5 mb-8">
        {(["chapa", "manual"] as const).map((method) => (
          <Button
            key={method}
            variant="outline"
            onClick={() => handleSelect(method)}
            className={`${method === depositMethod ? "bg-primary" : "text-secondary border !border-border"} border border-foreground w-full capitalize`}
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
