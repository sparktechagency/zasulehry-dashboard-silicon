"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

export default function AdminOtp({ trigger, passwordData }: any) {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const payload = {
      ...passwordData,
      oneTimeCode: Number(otp),
    };

    try {
      const res = await myFetch("/auth/change-admin-password", {
        method: "POST",
        body: payload,
      });

      if (res?.success) {
        toast.success(res.message || "Password changed successfully");
        setOpen(false);
        setOtp("");
      } else {
        toast.error((res as any)?.error[0].message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="p-8 rounded-lg text-center">
            <h2 className="text-4xl font-semibold">Change Password</h2>

            <p className="font-medium my-5 capitalize">
              We’ve sent a one-time password (OTP) to your email address. Please
              enter the code below to continue.
            </p>

            <div className="flex justify-center gap-2">
              <InputOTP
                value={otp}
                onChange={setOtp}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="btn-design text-lg w-full mt-6"
              disabled={otp.length !== 6}
            >
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
