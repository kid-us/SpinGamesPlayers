// Login Route
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createFileRoute("/login")({
  component: Login,
});

// Login Page
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
import axios from "axios";
import { apiKey } from "@/services/api";
import { toast, Toaster } from "sonner";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = async (values: LoginValues) => {
    const data = {
      phone_number: values.phone,
      password: values.password,
    };

    try {
      await axios
        .post(`${apiKey}login`, data, {
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

          localStorage.setItem("token", response.data.session_token);
          // After Login
          navigate({ to: `/` });
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
    <div className={`flex items-center justify-center min-h-screen`}>
      <Toaster />

      {/* Return back to Home */}
      <Link
        to="/"
        className="absolute top-5 left-5 flex items-center space-x-1"
      >
        <House size={20} />
        <p>Home</p>
      </Link>

      <div className={`md:max-w-sm md:w-[95%] md:p-8 p-5 rounded-lg border`}>
        <h2 className="text-2xl text-center font-semibold">
          Sign in to Spin Games
        </h2>
        <div className="flex justify-center">
          <p className="w-60 mb-8 text-zinc-500 text-sm text-center mt-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 underline "
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`w-full h-11 mt-3`}
            >
              {isSubmitting ? <Loader className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-zinc-500 text-xs">
          Don't have an account?{" "}
          <Link to={"/register"} className={`text-blue-500 underline text-sm`}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
