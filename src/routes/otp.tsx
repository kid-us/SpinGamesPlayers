import { useEffect } from "react";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { apiKey } from "@/services/api";
import { toast, Toaster } from "sonner";
import { Loader } from "lucide-react";

// Define the expected shape of search parameters
interface SearchParams {
  uid?: string;
}

// Define the form schema
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

// Configure the route with search parameter typing
export const Route = createFileRoute("/otp")({
  component: OTPPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      uid: typeof search.uid === "string" ? search.uid : undefined,
    };
  },
});

function OTPPage() {
  // Use useSearch with the SearchParams type
  const searchParams = useSearch({ from: "/otp" }) as SearchParams;
  const navigate = useNavigate();

  const uid = searchParams.uid;

  // IF uid is not there redirect to login
  useEffect(() => {
    if (!uid) {
      navigate({ to: "/login" });
    }
  }, [uid]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Redirect to /register if uid is missing
  useEffect(() => {
    if (!uid) {
      toast.error(
        "User ID is missing. Please start the registration process again.",
        {
          className: "!bg-red-500 !text-white",
          duration: 6000,
        }
      );
      navigate({ to: "/register" });
    }
  }, [uid, navigate]);

  const { isSubmitting } = form.formState;

  // On Submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!uid) {
      toast.error("User ID is missing. Please try again.", {
        className: "!bg-red-500 !text-white",
        duration: 6000,
      });
      return;
    }

    const data = {
      uid,
      otp: values.pin,
    };

    try {
      const response = await axios.post(`${apiKey}confirm-otp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    <div className="max-w-lg mx-auto flex flex-col mt-10">
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
          <Button disabled={isSubmitting || !uid} type="submit">
            {isSubmitting ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
