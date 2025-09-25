import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import z from "zod";
import Chapa from "@/components/withdraw/Chapa";
import Manual from "@/components/withdraw/Manual";

// valid methods
const methodSchema = z.enum(["chapa", "manual"]);

export const Route = createFileRoute("/withdraw")({
  validateSearch: z.object({
    method: methodSchema.optional(),
  }),
  component: WithdrawPage,
});

function WithdrawPage() {
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
    <div className="max-w-lg mx-auto flex flex-col justify-center h-screen">
      <p className="text-xl mb-5 font-semibold">Withdraw Money</p>

      <div className="flex space-x-5 mb-8">
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
