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
import { cbe, telebirr } from "@/assets";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { apiKey } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

const depositSchema = z.object({
  tx: z.string().min(6, "Transaction ID required."),
  depositMethod: z.string().min(1, "Please choose deposit method."),
});

type DepositValues = z.infer<typeof depositSchema>;

interface Methods {
  id: number;
  name: string;
  img: string;
}

const depositMethods: Methods[] = [
  { id: 1, img: cbe, name: "cbe" },
  { id: 2, img: telebirr, name: "telebirr" },
];

const Manual = () => {
  const { token } = useAuthStore();

  const form = useForm<DepositValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      tx: "",
      depositMethod: "",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = async (values: DepositValues) => {
    const data = {
      method: values.depositMethod,
      transaction_id: values.tx,
    };

    try {
      await axios
        .post(`${apiKey}manual-deposit`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      toast.error(error.response?.data?.error, {
        className: "!bg-red-500 !text-white",
        duration: 6000,
      });
    }
  };

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Transaction methods */}
        <FormField
          control={form.control}
          name="depositMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Deposit Methods</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  {depositMethods.map((methods) => (
                    <Button
                      key={methods.id}
                      type="button"
                      variant={
                        field.value === methods.name ? "default" : "outline"
                      }
                      onClick={() => field.onChange(methods.name)}
                      className="flex items-center gap-2 w-full h-11 text-white"
                    >
                      <img
                        src={methods.img}
                        alt={methods.name}
                        className="w-6 h-6"
                      />
                      <span className="capitalize">{methods.name}</span>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transaction Id */}
        <FormField
          control={form.control}
          name="tx"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Transaction ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter Transaction ID"
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

export default Manual;
