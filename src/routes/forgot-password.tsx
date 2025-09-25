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
export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

const resetPasswordSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ForgotPasswordPage() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: ResetPasswordValues) => {
    console.log("Withdraw attempted with:", values);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen`}>
      <div className={`md:max-w-sm w-[95%] p-8 rounded-lg border`}>
        <p className="text-xl mb-5 font-semibold">Forgot your password?</p>
        <p className="text-zinc-500 text-sm">
          No problem! Just enter the phone number that you signed up with to
          reset it.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-4"
          >
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

            {/* Submit */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-11 mt-3"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
