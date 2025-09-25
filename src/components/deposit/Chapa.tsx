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
  const onSubmit = (values: DepositValues) => {
    console.log("Sign-in attempted with:", values);
    // navigate({ to: "/" });
  };

  return (
    <Form {...form}>
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
