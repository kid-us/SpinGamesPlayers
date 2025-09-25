import BreadCrumb from "@/components/BreadCrumb";
import Chapa from "@/components/deposit/Chapa";
import Manual from "@/components/deposit/Manual";
import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";

// valid methods
const methodSchema = z.enum(["chapa", "manual"]);

export const Route = createFileRoute("/deposit")({
  validateSearch: z.object({
    method: methodSchema.optional(),
  }),
  component: DepositPage,
});

function DepositPage() {
  const navigate = useNavigate();

  const search = useSearch({ from: "/deposit" });
  const depositMethod = search.method ?? "chapa";

  const handleSelect = (method: "chapa" | "manual") => {
    navigate({
      to: "/deposit",
      search: (prev) => ({ ...prev, method }),
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col md:mt-20 mt-10">
      <BreadCrumb route="Deposit" />

      <p className="text-xl mb-5 font-semibold">Deposit Money</p>

      <div className="grid grid-cols-2 gap-x-5 mb-8">
        {(["chapa", "manual"] as const).map((method) => (
          <Button
            key={method}
            variant="outline"
            onClick={() => handleSelect(method)}
            className={`${method === depositMethod && "bg-primary text-white"} w-40 capitalize`}
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
