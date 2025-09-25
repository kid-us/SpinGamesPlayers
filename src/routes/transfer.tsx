import { Loader } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import axios from "axios";
import { createFileRoute } from "@tanstack/react-router";

// Route
export const Route = createFileRoute("/transfer")({
  component: TransferPage,
});

const transferSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  amount: z.string().min(2, "Minimum amount must be 50"),
});

type TransferValues = z.infer<typeof transferSchema>;

function TransferPage() {
  const form = useForm<TransferValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      phone: "",
      amount: "50",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: TransferValues) => {
    console.log("Withdraw attempted with:", values);
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center h-screen">
      <p className="text-xl mb-5 font-semibold">Transfer Money</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="09/07 ..."
                    {...field}
                    className="border border-border h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={50}
                    className="border border-border h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full h-11 mt-3"
          >
            {isSubmitting ? <Loader className="animate-spin" /> : "Transfer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
