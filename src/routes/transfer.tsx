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
import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";
import { apiKey, token } from "@/services/api";
import { toast, Toaster } from "sonner";
import BreadCrumb from "@/components/BreadCrumb";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";

// Route
export const Route = createFileRoute("/transfer")({
  beforeLoad: async () => {
    const { isAuthenticated, loading, fetchMe } = useAuthStore.getState();
    if (loading) {
      await fetchMe();
    }
    if (!isAuthenticated) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  component: TransferPage,
});

const transferSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits"),
  amount: z.string().min(2, "Minimum amount must be 50"),
});

type TransferValues = z.infer<typeof transferSchema>;

function TransferPage() {
  const [title, _setTitle] = useState("Transfer Money - LiveJam");

  useDocumentTitle(title);

  const form = useForm<TransferValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      phone: "",
      amount: "50",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: TransferValues) => {
    const data = {
      recipient_phone_number: values.phone,
      amount: Number(values.amount),
    };

    try {
      await axios
        .post(`${apiKey}transfer-fund`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Success toast
          toast.success(response.data.message, {
            className: "!bg-green-500 !text-white",
            duration: 6000,
          });
          // Reset Form
          form.reset();
        });
    } catch (error: any) {
      // Error toast
      toast.error(error.response?.data?.detail, {
        className: "!bg-red-500 !text-white",
        duration: 6000,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <Toaster />
      <BreadCrumb route="Transfer" />

      <p className="text-xl mb-5 font-semibold text-secondary">
        Transfer Money
      </p>

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
