import BreadCrumb from "@/components/BreadCrumb";
import { createFileRoute, redirect } from "@tanstack/react-router";
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
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { apiKey, token } from "@/services/api";
import axios from "axios";
import { Toaster, toast } from "sonner";
import ChangePassword from "@/components/ChangePassword";
import { useAuthStore } from "@/stores/authStore";
import useDocumentTitle from "@/hooks/useDocumentTitle";

// Route
export const Route = createFileRoute("/setting")({
  beforeLoad: async () => {
    const { isAuthenticated, loading, fetchMe } = useAuthStore.getState();
    if (loading) {
      await fetchMe();
    }
    if (!isAuthenticated) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  component: SettingPage,
});

// Zod schema for form validation
export const registerSchema = z.object({
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
});

type RegisterValues = z.infer<typeof registerSchema>;

function SettingPage() {
  const { user, fetchMe } = useAuthStore();
  const [title, _setTitle] = useState("Setting - LiveJam");

  useDocumentTitle(title);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      username: "",
      tikTokUsername: "",
    },
  });

  // Update the user values
  useEffect(() => {
    if (user) {
      form.setValue("username", user.display_name || "");
      form.setValue("tikTokUsername", user.tiktok_handle || "");
      form.setValue("phone", user.phone_number || "");
    }
  }, [user, form]);

  const { isSubmitting } = form.formState;

  // Watch form values to determine if changes have been made
  const watchedValues = form.watch();
  const hasChanges =
    user &&
    (user.display_name !== watchedValues.username ||
      user.tiktok_handle !== watchedValues.tikTokUsername);

  // Handle form submission
  const onSubmit = async (values: RegisterValues) => {
    if (!token || !user || !hasChanges) {
      toast.error("No authentication token found or no changes made.");
      return;
    }

    try {
      const requests: Promise<any>[] = [];

      // Update Username
      if (user.display_name !== values.username) {
        requests.push(
          axios.post(
            `${apiKey}update-display-name?new_display_name=${values.username}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
      }

      // Update TikTok Handle
      if (user.tiktok_handle !== values.tikTokUsername) {
        requests.push(
          axios.post(
            `${apiKey}update-tiktok-handle?new_tiktok_handle=${values.tikTokUsername}`, // Fixed to use tikTokUsername
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
      }

      // Wait for all requests to complete
      const responses = await Promise.all(requests);

      // Show success messages for all completed requests
      responses.forEach((response) => {
        toast.success(response.data.message, {
          className: "!bg-green-500 !text-white",
          duration: 6000,
        });

        fetchMe();
      });
    } catch (error: any) {
      // Handle errors
      toast.error(
        error.response?.data?.error || "Update failed. Please try again.",
        {
          className: "!bg-red-500 !text-white",
          duration: 6000,
        }
      );
    }
  };

  // Disable button if no user, submitting, or no changes made
  const isButtonDisabled = !user || isSubmitting || !hasChanges;

  return (
    <div className="max-w-lg mx-auto flex flex-col mt-10">
      <Toaster />

      <BreadCrumb route="Setting" />
      <p className="text-xl mb-5 font-semibold text-secondary">Setting</p>

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
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={isButtonDisabled}
            type="submit"
            className={`w-full h-11 mt-3 ${
              !hasChanges && user && !isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>

      <ChangePassword />
    </div>
  );
}

export default SettingPage;
