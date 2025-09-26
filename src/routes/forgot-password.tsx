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
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { apiKey } from "@/services/api";
import { toast, Toaster } from "sonner";

// Route
export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

const resetPasswordSchema = z.object({
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      await axios
        .post(`${apiKey}forget-password`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Success toast
          toast.success(response.data.message, {
            className: "!bg-green-500 !text-white",
            duration: 6000,
          });

          // After Login
          navigate({
            to: `/reset-password?uid=${response.data.uid}`,
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
    <div className={`flex flex-col items-center justify-center min-h-screen`}>
      <Toaster />

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
              name="phone_number"
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
