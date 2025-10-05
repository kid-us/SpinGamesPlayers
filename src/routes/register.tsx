import { createFileRoute, useNavigate } from "@tanstack/react-router";
export const Route = createFileRoute("/register")({
  component: Register,
});

// Register Page
import { z } from "zod";
import { Link } from "@tanstack/react-router";
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
import { Eye, EyeOff, House, Loader } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { apiKey } from "@/services/api";
import useDocumentTitle from "@/hooks/useDocumentTitle";

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
      .max(10, "Phone number cannot exceed 15 digits"),
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

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [title, _setTitle] = useState("Register - LiveJam");

  useDocumentTitle(title);

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
  const onSubmit = async (values: RegisterValues) => {
    const data = {
      display_name: values.username,
      tiktok_handle: values.tikTokUsername,
      phone_number: values.phone,
      password: values.password,
    };

    try {
      await axios
        .post(`${apiKey}register`, data, {
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

          // After successfully logged in redirect to otp page
          navigate({ to: `/otp?uid=${response.data.uid}` });
        });
    } catch (error: any) {
      // Error toast
      toast.error(
        error.response?.data?.error || "Registration failed. Please try again.",
        {
          className: "!bg-red-500 !text-white",
          duration: 6000,
        }
      );
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen md:py-0 pb-10 md:mt-0 mt-16`}
    >
      <Toaster />

      {/* Return back to Home */}
      <Link
        to="/"
        className="absolute top-5 left-5 flex items-center space-x-1 text-primary"
      >
        <House size={20} />
        <p>Home</p>
      </Link>

      <div className={`md:max-w-sm md:w-[95%] md:p-8 p-5 rounded-lg border`}>
        <h2 className="text-2xl text-center font-semibold text-secondary">
          Be a Member to LiveJamGames
        </h2>
        <div className="flex justify-center">
          <p className="w-60 mb-8 text-zinc-400 text-xs text-center mt-3">
            Craft Your Challenge, Wager Your Skill, and Rise to Riches in Every
            Game!"
          </p>
        </div>

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
              {isSubmitting ? <Loader className="animate-spin" /> : "Register"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-zinc-400 text-xs">
          Already have an account?{" "}
          <Link to={"/login"} className={`text-blue-400 underline text-sm`}>
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
}
