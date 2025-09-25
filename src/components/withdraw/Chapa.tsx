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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";

const chapaWithdrawSchema = z.object({
  name: z.string().min(3, "Account Holder name required"),
  accountNo: z.string().min(6, "Account Number required"),
  amount: z.string().min(2, "Minimum amount must be 50"),
  bank: z.string().min(3, "Bank Required"),
});

type ChapaWithdrawValues = z.infer<typeof chapaWithdrawSchema>;

const Chapa = () => {
  const [banks, setBanks] = useState<{ id: string; name: string }[]>([]);

  // Fetch banks
  useEffect(() => {
    axios
      .get(`https://apiv2.zusebingo.com/api/v2/payment/banks`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        // Assuming response.data is an array of banks with id and name
        setBanks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const form = useForm<ChapaWithdrawValues>({
    resolver: zodResolver(chapaWithdrawSchema),
    defaultValues: {
      accountNo: "",
      bank: "",
      name: "",
      amount: "50",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: ChapaWithdrawValues) => {
    console.log("Withdraw attempted with:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Account Holder Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Joe Doe"
                  className="border border-border h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Bank */}
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Bank</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={banks.length === 0} // disable until banks load
                >
                  <SelectTrigger className="w-full !h-10 rounded">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.name}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          {isSubmitting ? <Loader className="animate-spin" /> : "Withdraw"}
        </Button>
      </form>
    </Form>
  );
};

export default Chapa;
