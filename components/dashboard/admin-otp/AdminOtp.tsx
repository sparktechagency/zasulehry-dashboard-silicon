"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AdminOtp2 from "./AdminOtp2";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function AdminOtp({ trigger }: { trigger: React.ReactNode }) {
  // const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <div className=" p-8 rounded-lg  text-center">
          <h2 className="text-4xl font-semibold">Change Password</h2>
          <p className="font-medium my-5 capitalize">
            We’ve sent a one-time password (OTP) to your email address. Please
            enter the code below to continue. (kkk****@gmail.com)
          </p>
          <div className="flex justify-center gap-2">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-sm font-medium my-4">
            Resent in 0:{timer < 10 ? `0${timer}` : timer}
          </p>

          <AdminOtp2
            title="Change Password"
            trigger={
              <button className="w-full btn-design font-semibold py-2 rounded cursor-pointer">
                Confirm
              </button>
            }
          />
          {/* 
          <Link href="/">
            <Button type="submit" className="btn-design text-lg">
              Confirm
            </Button>
          </Link> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
