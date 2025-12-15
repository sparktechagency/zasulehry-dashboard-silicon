"use client";

import Button from "@/components/share/Button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);

      if (val && idx < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${idx + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white text-center">
        <h2 className="text-4xl font-semibold">Verify Your Account</h2>
        <p className="font-medium my-5">
          We’ve sent a one-time password (OTP) to your email/phone. Please enter
          the code below to continue.
        </p>
        <div className="flex justify-center gap-2">
          {otp.map((num, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 text-center text-lg font-medium border rounded"
              value={num}
              onChange={(e) => handleChange(e, idx)}
            />
          ))}
        </div>

        <p className="text-sm font-medium my-4">
          Resent in 0:{timer < 10 ? `0${timer}` : timer}
        </p>

        <Link href="/new-password">
          <Button type="submit" className="bg-white text-[#0288A6]">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
