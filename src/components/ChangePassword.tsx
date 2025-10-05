import { Eye, EyeOff, Loader } from "lucide-react";
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

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { apiKey } from "@/services/api";

const resetPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ResetPasswordValues) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const data = {
      old_password: values.oldPassword,
      new_password: values.password,
    };

    try {
      await axios
        .post(`${apiKey}change-password`, data, {
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

          localStorage.clear();
          // After Login
          navigate({ to: `/login` });
        });
    } catch (error: any) {
      // Error toast
      toast.error(
        error.response?.data?.error || "Update failed. Please try again.",
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
      <div className={`mt-10`}>
        <p className="text-xl mb-5 font-semibold text-secondary">
          Create your new password
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-4"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs mt-3">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border border-border h-10 pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={`absolute inset-y-0 right-3 flex items-center text-primary`}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">New Password</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className={`border border-border h-10`}
                      />
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
    </>
  );
};

export default ChangePassword;
