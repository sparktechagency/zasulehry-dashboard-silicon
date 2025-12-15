"use client";

import VerifyOtp from "@/components/authPages/VerifyOtp";

export default function OtpVerification() {
  // useEffect(() => {
  //   if (timer === 0) return;
  //   const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
  //   return () => clearInterval(countdown);
  // }, [timer]);

  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white text-center">
        <h2 className="text-4xl font-semibold">Verify Your Account</h2>
        <p className="font-medium my-5">
          We’ve sent a one-time password (OTP) to your email/phone. Please enter
          the code below to continue.
        </p>

        <VerifyOtp />
      </div>
    </div>
  );
}
