"use client";

import Button from "@/components/share/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  email: string;
  // number: string;
};

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: data,
      });

      if (res?.success) {
        toast.success(res?.message);
        router.push(`/verify-otp?email=${data?.email}`);
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  return (
    <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email" className="block text-md mb-1 text-white">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="w-full rounded-md px-3 h-11"
          {...register("email", { required: "Email is required" })}
        />
      </div>
      {/* <div>
            <Label htmlFor="number" className="block text-md mb-1 text-white">
              Contact Number
            </Label>
            <Input
              id="number"
              type="number"
              placeholder="Enter Your Contact Number"
              className="w-full rounded-md px-3 h-11  "
            />
          </div> */}

      <Button type="submit" className="bg-white text-[#0288A6]">
        Continue
      </Button>
    </form>
  );
}
