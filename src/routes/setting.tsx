import BreadCrumb from "@/components/BreadCrumb";
import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";

// Route
export const Route = createFileRoute("/setting")({
  component: SettingPage,
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username cannot exceed 50 characters"),
    tikTokUsername: z
      .string()
      .min(3, "TikTok username must be at least 3 characters")
      .max(50, "TikTok username cannot exceed 50 characters"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .max(100, "Confirm Password cannot exceed 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type RegisterValues = z.infer<typeof registerSchema>;

function SettingPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = (values: RegisterValues) => {
    console.log("Sign-in attempted with:", values);
    // navigate({ to: "/" });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col mt-10">
      <BreadCrumb route="Setting" />

      <p className="text-xl mb-5 font-semibold">Setting</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Jon Doe"
                    {...field}
                    className="border border-border h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TikTok Username */}
          <FormField
            control={form.control}
            name="tikTokUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">TikTok Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Jon Doe"
                    {...field}
                    className="border border-border h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
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

          {/* Password with Show/Hide */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Password</FormLabel>
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
                    className={`absolute inset-y-0 right-3 flex items-center `}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Confirm Password</FormLabel>
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
                    className={`absolute inset-y-0 right-3 flex items-center `}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
            {isSubmitting ? <Loader className="animate-spin" /> : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
