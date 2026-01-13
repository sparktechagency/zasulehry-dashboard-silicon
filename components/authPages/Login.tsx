"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { myFetch } from "@/utils/myFetch";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next/client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  number: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);

    try {
      const res = await myFetch("/auth/login", {
        method: "POST",
        body: data,
      });

      if (res?.success) {
        toast.success(res?.message);

        setCookie("accessToken", res?.data?.accessToken);
        setCookie("role", res?.data?.role);

        router.push("/dashboard");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="email" className="block text-md mb-1 text-white">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="w-full rounded-md px-3 h-11 "
          {...register("email", { required: "Required your email" })}
        />
        {errors.email && (
          <span className="text-red-400">{errors.email.message}</span>
        )}
      </div>

      <Label htmlFor="password" className="block text-md mb-1 text-white">
        Password
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your Password"
          className="w-full rounded-md px-3 h-11"
          {...register("password", { required: "Required your password" })}
        />
        {errors.password && (
          <span className="text-red-400">{errors.password.message}</span>
        )}
        <span
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>
      <div className="text-right mt-1">
        <Link
          href="/forgot-password"
          className="text-sm hover:underline font-semibold"
        >
          Forgot Password
        </Link>
      </div>

      {/* <AdminOtp2
        title="Log In"
        trigger={
          <button className="bg-white text-[#0288A6] w-full py-2 cursor-pointer">
            Log In
          </button>
        }
      /> */}
      <button className="bg-white text-[#0288A6] w-full py-2 cursor-pointer">
        Log In
      </button>
    </form>
  );
}
