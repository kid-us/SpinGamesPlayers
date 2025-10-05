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
import axios from "axios";
import { apiKey, token } from "@/services/api";
import { toast, Toaster } from "sonner";

const depositSchema = z.object({
  amount: z.string().min(2, "Amount must be >=50"),
});

type DepositValues = z.infer<typeof depositSchema>;

const Chapa = () => {
  const form = useForm<DepositValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "50",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = async (values: DepositValues) => {
    try {
      await axios
        .post(
          `${apiKey}chapa-deposit?amount=${values.amount}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Success toast
          toast.success(response.data.message, {
            className: "!bg-green-500 !text-white",
            duration: 6000,
          });
          console.log(response);
          
          // window.location.href = response.data.checkout_url;
        });
    } catch (error: any) {
      // Error toast
      toast.error(error.response?.data?.error, {
        className: "!bg-red-500 !text-white",
        duration: 6000,
      });
    }
  };

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          className={`w-full h-11 mt-3`}
        >
          {isSubmitting ? <Loader className="animate-spin" /> : "Deposit"}
        </Button>
      </form>
    </Form>
  );
};

export default Chapa;
