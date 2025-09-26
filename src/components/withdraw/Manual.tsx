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
import axios from "axios";
import { apiKey, token } from "@/services/api";
import { toast, Toaster } from "sonner";

const depositSchema = z.object({
  accountNo: z.string().min(6, "Account Number required"),
  amount: z.string().min(2, "Minimum amount must be 50"),
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
  const form = useForm<DepositValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      accountNo: "",
      amount: "50",
      depositMethod: "",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = async (values: DepositValues) => {
    const data = {
      method: values.depositMethod,
      amount: values.amount,
      account_name: "string",
      account_number: values.accountNo,
    };

    try {
      await axios
        .post(`${apiKey}manual-withdraw`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Reset Form
          form.reset();

          // Success toast
          toast.success(response.data.message, {
            className: "!bg-green-500 !text-white",
            duration: 6000,
          });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* AccountNo */}
        <FormField
          control={form.control}
          name="accountNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Account Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="1000.... / 09... /07..."
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
                      className="flex items-center gap-2 w-full h-11"
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

        {/* Submit */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`w-full h-11 mt-3`}
        >
          {isSubmitting ? <Loader className="animate-spin" /> : "Withdraw"}
        </Button>
      </form>
    </Form>
  );
};

export default Manual;
