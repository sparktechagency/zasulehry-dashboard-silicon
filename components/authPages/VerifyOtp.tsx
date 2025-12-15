import Button from "@/components/share/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { myFetch } from "@/utils/myFetch";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await myFetch("/auth/verify-email", {
        method: "POST",
        body: { email, oneTimeCode: Number(otp) },
      });

      if (res?.success) {
        toast.success(res.message);
        router.push(`/new-password?token=${res?.data}`);
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: { email },
      });

      if (res?.success) {
        toast.success(res?.message);
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
    <form onSubmit={handleVerifyOtp}>
      <div className="flex justify-center mt-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div
        className="text-center text-sm text-white my-5 cursor-pointer hover:underline"
        onClick={handleResendOtp}
      >
        Resend
      </div>

      <Button type="submit" className="bg-white text-[#0288A6]">
        Continue
      </Button>
    </form>
  );
}
