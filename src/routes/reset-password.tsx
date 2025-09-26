import { Eye, EyeOff, Loader } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { apiKey } from "@/services/api";

// Define the expected shape of search parameters
interface SearchParams {
  uid?: string;
}

// Route
export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      uid: typeof search.uid === "string" ? search.uid : undefined,
    };
  },
});

const resetPasswordSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
  const searchParams = useSearch({ from: "/reset-password" }) as SearchParams;
  const navigate = useNavigate();

  const uid = searchParams.uid;

  // IF uid is not there redirect to login
  useEffect(() => {
    if (!uid) {
      navigate({ to: "/login" });
    }
  }, [uid]);

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      pin: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!uid) {
      toast.error("User ID or OTP is missing. Please try again.", {
        className: "!bg-red-500 !text-white",
        duration: 6000,
      });
      return;
    }

    const data = {
      uid,
      otp: values.pin,
      new_password: values.password,
    };

    try {
      const response = await axios.post(
        `${apiKey}confirm-forget-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success toast
      toast.success(response.data.message || "OTP verified successfully!", {
        className: "!bg-green-500 !text-white",
        duration: 6000,
      });

      // Redirect to login page
      navigate({ to: "/login" });
    } catch (error: any) {
      // Error toast
      toast.error(
        error.response?.data?.error ||
          "OTP verification failed. Please try again.",
        {
          className: "!bg-red-500 !text-white",
          duration: 6000,
        }
      );
    }
  };

  return (
    <>
      <Toaster />

      <div
        className={`flex flex-col items-center justify-center h-screen mt-10`}
      >
        <div className={`md:max-w-sm w-[95%] p-8 rounded-lg border`}>
          <p className="text-xl mb-5 font-semibold">Create your new password</p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-4"
            >
              {/* OTP */}
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Password</FormLabel>
                    <FormControl className="relative">
                      <div className="">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className={`border border-border h-10`}
                        />
                        {!showPassword ? (
                          <Eye
                            size={18}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 cursor-pointer"
                          />
                        ) : (
                          <EyeOff
                            size={18}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 cursor-pointer"
                          />
                        )}
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
                className="w-full h-11 mt-3"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create New Password"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
